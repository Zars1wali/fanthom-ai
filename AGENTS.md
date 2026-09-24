# Agent Instructions & Capture Setup

## Automatic Prompt & Response Logging
- This repository uses automatic session capture configured in `.agents/hooks.json` and `.agents/agent_capture.py`.
- On every prompt and response, the `Stop` and `PostInvocation` hooks automatically update the session log in `.agent-logs/` matching the format `YYYY-MM-DD_HH-MM-SS_<session-id>.md`.
- Never delete or modify `.agent-logs/` manually; all prompts and responses are tracked verbatim.
