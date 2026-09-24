import os
import sys
import json
import re
from datetime import datetime, timezone
import threading

def parse_transcript(transcript_path):
    if not os.path.exists(transcript_path):
        return []
    
    entries = []
    with open(transcript_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                data = json.loads(line)
                entries.append(data)
            except Exception:
                continue
    return entries

def extract_prompt_text(raw_content):
    if not raw_content:
        return ""
    # Check for <USER_REQUEST>...</USER_REQUEST>
    match = re.search(r"<USER_REQUEST>(.*?)</USER_REQUEST>", raw_content, re.DOTALL)
    if match:
        return match.group(1).strip()
    return raw_content.strip()

def process_session(conversation_id, transcript_path, workspace_root, model_name=None):
    # Prefer transcript_full.jsonl if it exists in the same directory
    log_dir = os.path.dirname(transcript_path)
    full_transcript_path = os.path.join(log_dir, "transcript_full.jsonl")
    path_to_use = full_transcript_path if os.path.exists(full_transcript_path) else transcript_path

    entries = parse_transcript(path_to_use)
    if not entries:
        return

    # Extract author from git if possible
    author = "Zars1wali"
    project = os.path.basename(os.path.normpath(workspace_root)) if workspace_root else "Fanthom AI"

    # Identify exchanges:
    # A turn begins with USER_INPUT
    # Intermediate steps can have PLANNER_RESPONSE with tool_calls
    # The turn response is the final PLANNER_RESPONSE with content and no tool_calls, or the last PLANNER_RESPONSE before the next USER_INPUT
    exchanges = []
    current_prompt = None
    current_prompt_time = None
    last_response = None
    last_response_time = None
    detected_model = model_name or "Gemini 3.8 Flash (Medium)"

    for entry in entries:
        step_type = entry.get("type")
        source = entry.get("source")
        
        if step_type == "USER_INPUT":
            if current_prompt is not None:
                # Save previous exchange
                exchanges.append({
                    "prompt": current_prompt,
                    "prompt_time": current_prompt_time,
                    "response": last_response or "",
                    "response_time": last_response_time or current_prompt_time,
                    "model": detected_model
                })
            
            raw_content = entry.get("content", "")
            # Check if model setting change is present in the prompt payload
            model_match = re.search(r"setting `Model Selection` from None to (.*?)\.\s*(?:No need|\n|$)", raw_content)
            if model_match:
                detected_model = model_match.group(1).strip()

            current_prompt = extract_prompt_text(raw_content)
            current_prompt_time = entry.get("created_at", datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"))
            last_response = None
            last_response_time = None

        elif step_type == "PLANNER_RESPONSE":
            content = entry.get("content", "")
            tool_calls = entry.get("tool_calls", [])
            # If it has content and no tool calls, or if it's the latest content
            if content and not tool_calls:
                last_response = content
                last_response_time = entry.get("created_at", datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"))
            elif content and not last_response:
                last_response = content
                last_response_time = entry.get("created_at", datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"))

    if current_prompt is not None:
        exchanges.append({
            "prompt": current_prompt,
            "prompt_time": current_prompt_time,
            "response": last_response or "",
            "response_time": last_response_time or current_prompt_time,
            "model": detected_model
        })

    if not exchanges:
        return

    # Check if first prompt time is available
    first_prompt_time = exchanges[0]["prompt_time"]
    last_prompt_time = exchanges[-1]["prompt_time"]

    # Parse first prompt date
    try:
        dt = datetime.strptime(first_prompt_time.replace("Z", "+0000"), "%Y-%m-%dT%H:%M:%S%z")
        date_str = dt.strftime("%Y-%m-%d")
        time_slug = dt.strftime("%Y-%m-%d_%H-%M-%S")
    except Exception:
        date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        time_slug = datetime.now(timezone.utc).strftime("%Y-%m-%d_%H-%M-%S")

    short_id = conversation_id[:8] if len(conversation_id) >= 8 else conversation_id

    # Format file header
    log_content = []
    log_content.append("---")
    log_content.append(f"session_id: {conversation_id}")
    log_content.append(f"date: {date_str}")
    log_content.append(f"author: {author}")
    log_content.append(f"model: {detected_model}")
    log_content.append(f"tool: antigravity")
    log_content.append(f"project: {project}")
    log_content.append(f"total_exchanges: {len(exchanges)}")
    log_content.append(f"first_prompt_time: {first_prompt_time}")
    log_content.append(f"last_prompt_time: {last_prompt_time}")
    log_content.append("---")
    log_content.append("")
    log_content.append(f"# Session Log - {date_str}")
    log_content.append("")
    log_content.append(f"Session: `{short_id}` | Project: `{project}` | Author: `{author}`")
    log_content.append("")
    log_content.append("---")
    log_content.append("")

    for i, ex in enumerate(exchanges, start=1):
        log_content.append(f"[LOG_ENTRY type=PROMPT num={i} session={short_id}]")
        log_content.append(f"timestamp: {ex['prompt_time']}")
        log_content.append(f"model: {ex['model']}")
        log_content.append("")
        log_content.append(ex["prompt"])
        log_content.append("")
        log_content.append("")
        log_content.append(f"[LOG_ENTRY type=RESPONSE num={i} session={short_id}]")
        log_content.append(f"timestamp: {ex['response_time']}")
        log_content.append(f"model: {ex['model']}")
        log_content.append("")
        log_content.append(ex["response"])
        log_content.append("")
        log_content.append("")

    logs_dir = os.path.join(workspace_root, ".agent-logs")
    os.makedirs(logs_dir, exist_ok=True)

    # Search for an existing file for this session_id to maintain the same filename
    target_filename = None
    for existing_file in os.listdir(logs_dir):
        if existing_file.endswith(f"_{conversation_id}.md") or existing_file == f"{conversation_id}.md":
            target_filename = existing_file
            break

    if not target_filename:
        target_filename = f"{time_slug}_{conversation_id}.md"

    target_path = os.path.join(logs_dir, target_filename)
    with open(target_path, "w", encoding="utf-8") as f:
        f.write("\n".join(log_content).strip() + "\n")

    return target_path

def main():
    # Hook contract: read stdin safely with timeout (prevents hanging on Windows pipes)
    stdin_text = ""
    def read_stdin():
        nonlocal stdin_text
        try:
            stdin_text = sys.stdin.read()
        except Exception:
            pass

    t = threading.Thread(target=read_stdin, daemon=True)
    t.start()
    t.join(timeout=0.2)

    input_data = {}
    if stdin_text.strip():
        try:
            input_data = json.loads(stdin_text)
        except Exception:
            pass

    workspace_paths = input_data.get("workspacePaths", [])
    workspace_root = workspace_paths[0] if workspace_paths else r"c:\Users\waliz\OneDrive\Desktop\Fanthom AI"
    conversation_id = input_data.get("conversationId")
    transcript_path = input_data.get("transcriptPath")
    model_name = input_data.get("modelName")

    # If missing, discover from default location
    brain_dir = os.path.expanduser(r"~\.gemini\antigravity-ide\brain")
    if not conversation_id or not transcript_path:
        if os.path.exists(brain_dir):
            conv_dirs = [os.path.join(brain_dir, d) for d in os.listdir(brain_dir) if os.path.isdir(os.path.join(brain_dir, d))]
            if conv_dirs:
                latest_conv = max(conv_dirs, key=os.path.getmtime)
                conversation_id = os.path.basename(latest_conv)
                transcript_path = os.path.join(latest_conv, ".system_generated", "logs", "transcript_full.jsonl")

    if conversation_id and transcript_path:
        process_session(conversation_id, transcript_path, workspace_root, model_name)

    # Output valid hook response
    print(json.dumps({}))

if __name__ == "__main__":
    main()
