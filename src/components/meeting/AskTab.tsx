import React, { useState } from 'react';
import { mockRepo } from '../../data/mockRepo';
import { ReceiptChip, Button } from '../ui';
import './meeting.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: { time: number; label: string }[];
}

export interface AskTabProps {
  meetingId: string;
  onSeek: (seconds: number) => void;
}

export const AskTab: React.FC<AskTabProps> = ({ meetingId, onSeek }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'assistant',
      content: 'I can answer questions grounded directly in this meeting\'s transcript. Every fact cites the exact moment it was spoken.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const samplePrompts = [
    'What was decided about pricing and tiers?',
    'What are the next steps for the hiring freeze?',
    'What issues did Aisha report with transcript accuracy?',
  ];

  const handleSubmit = async (queryText?: string) => {
    const q = (queryText || input).trim();
    if (!q || isStreaming) return;

    setInput('');
    const userMsgId = `user-${Date.now()}`;
    const botMsgId = `bot-${Date.now()}`;

    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: 'user', content: q },
      { id: botMsgId, role: 'assistant', content: '', citations: [] },
    ]);

    setIsStreaming(true);

    try {
      const stream = mockRepo.ask(q, 'meeting', meetingId);
      let streamedText = '';
      const cites: { time: number; label: string }[] = [];

      for await (const chunk of stream) {
        if (chunk.type === 'text') {
          streamedText += chunk.content;
          setMessages((prev) =>
            prev.map((m) => (m.id === botMsgId ? { ...m, content: streamedText } : m))
          );
        } else if (chunk.type === 'citation' && chunk.time !== undefined) {
          cites.push({ time: chunk.time, label: chunk.content });
          setMessages((prev) =>
            prev.map((m) => (m.id === botMsgId ? { ...m, citations: [...cites] } : m))
          );
        }
      }
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {/* Messages Scroll Area */}
      <div className="ask-conversation" style={{ padding: 'var(--sp-4)', flex: 1, overflowY: 'auto' }}>
        {messages.map((m) => (
          <div
            key={m.id}
            className={`ask-bubble ${m.role === 'user' ? 'ask-user' : 'ask-bot'}`}
          >
            <div>{m.content}</div>

            {m.citations && m.citations.length > 0 && (
              <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: 'var(--ink-3)', fontWeight: 600 }}>Citations:</span>
                {m.citations.map((c, i) => (
                  <ReceiptChip
                    key={i}
                    at={c.time}
                    title={`Jump to cited moment at ${c.time}s`}
                    onClick={(t) => onSeek(t)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        {isStreaming && (
          <div style={{ fontSize: '12px', color: 'var(--ink-3)', fontStyle: 'italic', paddingLeft: '8px' }}>
            Streaming answer…
          </div>
        )}
      </div>

      {/* Suggested Prompts */}
      <div style={{ padding: 'var(--sp-2) var(--sp-4)', display: 'flex', flexWrap: 'wrap', gap: '4px', background: 'var(--surface-sunk)' }}>
        {samplePrompts.map((p, i) => (
          <button
            key={i}
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => handleSubmit(p)}
            disabled={isStreaming}
            style={{ fontSize: '11px', background: '#ffffff', border: '1px solid var(--line)' }}
          >
            "{p}"
          </button>
        ))}
      </div>

      {/* Input Row */}
      <form
        className="ask-input-box"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about this meeting…"
          disabled={isStreaming}
          style={{
            flex: 1,
            padding: '8px 12px',
            fontSize: '13px',
            borderRadius: 'var(--radius-control)',
            border: '1px solid var(--line)',
            outline: 'none',
          }}
        />
        <Button variant="primary" size="sm" type="submit" disabled={!input.trim() || isStreaming}>
          Ask
        </Button>
      </form>
    </div>
  );
};
