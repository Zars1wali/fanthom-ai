import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SiteShell } from '../components/shell/SiteShell';
import { API_ENDPOINTS, LLMS_TXT_CONTENT } from '../content/docs';
import { Button, Chip } from '../components/ui';

type DocSection = 'quickstart' | 'reference' | 'webhooks' | 'sdks' | 'oauth' | 'mcp' | 'examples' | 'llms';

export const DevelopersPage: React.FC = () => {
  const { subpage } = useParams<{ subpage?: string }>();

  const activeSection: DocSection = (subpage as DocSection) || 'reference';

  // Language snippet switcher state: curl | ts | py
  const [activeLang, setActiveLang] = useState<'curl' | 'ts' | 'py'>('curl');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <SiteShell
      currentSection="developers"
      breadcrumbs={[{ label: 'Developers Hub', path: '/developers' }, { label: activeSection.toUpperCase() }]}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '240px minmax(0, 1fr) 220px', minHeight: 'calc(100vh - 60px)' }}>
        {/* LEFT PANE: NAVIGATION RAIL */}
        <aside
          style={{
            background: 'var(--surface)',
            borderRight: '1px solid var(--line)',
            padding: '24px 16px',
            position: 'sticky',
            top: '60px',
            height: 'calc(100vh - 60px)',
            overflowY: 'auto',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink-3)', marginBottom: '12px', paddingLeft: '8px' }}>
            Documentation
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px' }}>
            <Link
              to="/developers/quickstart"
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                background: activeSection === 'quickstart' ? 'var(--surface-sunk)' : 'transparent',
                color: activeSection === 'quickstart' ? 'var(--ink)' : 'var(--ink-2)',
              }}
            >
              🚀 Quickstart (5-Min)
            </Link>
            <Link
              to="/developers/reference"
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                background: activeSection === 'reference' ? 'var(--surface-sunk)' : 'transparent',
                color: activeSection === 'reference' ? 'var(--ink)' : 'var(--ink-2)',
              }}
            >
              📖 REST API (12 Endpoints)
            </Link>
            <Link
              to="/developers/webhooks"
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                background: activeSection === 'webhooks' ? 'var(--surface-sunk)' : 'transparent',
                color: activeSection === 'webhooks' ? 'var(--ink)' : 'var(--ink-2)',
              }}
            >
              ⚡ Webhooks & Events
            </Link>
            <Link
              to="/developers/mcp"
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                background: activeSection === 'mcp' ? 'var(--surface-sunk)' : 'transparent',
                color: activeSection === 'mcp' ? 'var(--ink)' : 'var(--ink-2)',
              }}
            >
              🤖 MCP Server (AI Agents)
            </Link>
            <Link
              to="/developers/sdks"
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                background: activeSection === 'sdks' ? 'var(--surface-sunk)' : 'transparent',
                color: activeSection === 'sdks' ? 'var(--ink)' : 'var(--ink-2)',
              }}
            >
              📦 Official SDKs
            </Link>
            <Link
              to="/developers/oauth"
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                background: activeSection === 'oauth' ? 'var(--surface-sunk)' : 'transparent',
                color: activeSection === 'oauth' ? 'var(--ink)' : 'var(--ink-2)',
              }}
            >
              🔐 OAuth 2.0 Auth
            </Link>
            <Link
              to="/developers/examples"
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                background: activeSection === 'examples' ? 'var(--surface-sunk)' : 'transparent',
                color: activeSection === 'examples' ? 'var(--ink)' : 'var(--ink-2)',
              }}
            >
              💡 Recipes & Examples
            </Link>
            <Link
              to="/developers/llms"
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
                background: activeSection === 'llms' ? 'var(--surface-sunk)' : 'transparent',
                color: activeSection === 'llms' ? 'var(--ink)' : 'var(--ink-2)',
              }}
            >
              📄 llms.txt Reference
            </Link>
          </nav>
        </aside>

        {/* CENTER PANE: MAIN DOCUMENTATION CONTENT */}
        <main style={{ padding: '40px 48px', overflowY: 'auto' }}>
          {/* Quickstart View */}
          {activeSection === 'quickstart' && (
            <div style={{ maxWidth: '800px' }}>
              <Chip variant="cue">5-Minute Integration</Chip>
              <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '12px 0 16px' }}>Developer Quickstart</h1>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '32px' }}>
                Start retrieving meeting transcripts, structured summaries, and timecode receipts in under 5 minutes.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>1. Obtain your API Key</h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink-2)', marginBottom: '12px' }}>
                    Generate a secret key in your workspace settings. Secret keys carry full access to your organization's meetings.
                  </p>
                  <pre style={{ background: '#1A202C', color: '#68D391', padding: '14px', borderRadius: '8px', fontSize: '13px', margin: 0 }}>
                    export FATHOM_API_KEY="fathom_live_sampleKey_481029"
                  </pre>
                </div>

                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>2. Fetch your first meeting</h3>
                  <pre style={{ background: '#1A202C', color: '#68D391', padding: '14px', borderRadius: '8px', fontSize: '13px', margin: 0 }}>
{`curl https://api.fathom.ai/v1/meetings/mtg-q3-roadmap \\
  -H "Authorization: Bearer $FATHOM_API_KEY"`}
                  </pre>
                </div>

                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>3. Parse Receipts</h3>
                  <p style={{ fontSize: '14px', color: 'var(--ink-2)' }}>
                    Every item in the summary payload contains a <code>receipt_timecode</code> field integer (seconds into recording). Link your users directly to exact context.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* REST API Reference (12 Endpoints) */}
          {activeSection === 'reference' && (
            <div style={{ maxWidth: '860px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <Chip variant="cue">REST API v1</Chip>
                  <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '8px 0 4px' }}>API Reference</h1>
                  <p style={{ fontSize: '14px', color: 'var(--ink-2)', margin: 0 }}>
                    12 typed endpoints for meetings, transcripts, summaries, webhooks, and clips.
                  </p>
                </div>

                {/* Code Language Switcher */}
                <div style={{ display: 'flex', background: 'var(--surface-sunk)', padding: '4px', borderRadius: '8px', border: '1px solid var(--line)', gap: '4px' }}>
                  {(['curl', 'ts', 'py'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        background: activeLang === lang ? 'var(--surface)' : 'transparent',
                        color: activeLang === lang ? 'var(--ink)' : 'var(--ink-2)',
                      }}
                    >
                      {lang === 'curl' ? 'cURL' : lang === 'ts' ? 'TypeScript' : 'Python'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Endpoints List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginTop: '32px' }}>
                {API_ENDPOINTS.map((ep, idx) => {
                  const snippet = activeLang === 'curl' ? ep.curlSnippet : activeLang === 'ts' ? ep.tsSnippet : ep.pySnippet;
                  const anchorId = ep.path.replace(/[\/:]/g, '-');

                  return (
                    <section key={idx} id={anchorId} style={{ borderTop: idx > 0 ? '1px solid var(--line)' : 'none', paddingTop: idx > 0 ? '32px' : 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            background: ep.method === 'GET' ? '#EBF5FF' : ep.method === 'POST' ? '#E6FFFA' : '#FFF5F5',
                            color: ep.method === 'GET' ? '#2563EB' : ep.method === 'POST' ? '#319795' : '#E53E3E',
                          }}
                        >
                          {ep.method}
                        </span>
                        <code style={{ fontSize: '16px', fontWeight: 700, color: 'var(--ink)' }}>{ep.path}</code>
                      </div>

                      <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '4px 0 8px' }}>{ep.summary}</h2>
                      <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: '16px' }}>
                        {ep.description}
                      </p>

                      {/* Code Sample Box with Copy Button */}
                      <div style={{ position: 'relative', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#2D3748', padding: '6px 12px', borderRadius: '8px 8px 0 0', fontSize: '11px', color: '#A0AEC0' }}>
                          <span>Sample Request ({activeLang.toUpperCase()})</span>
                          <button
                            onClick={() => copyToClipboard(snippet, `code-${idx}`)}
                            style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}
                          >
                            {copiedId === `code-${idx}` ? 'Copied! ✓' : 'Copy Code'}
                          </button>
                        </div>
                        <pre style={{ background: '#1A202C', color: '#68D391', padding: '16px', borderRadius: '0 0 8px 8px', fontSize: '12px', margin: 0, overflowX: 'auto', fontFamily: 'monospace' }}>
                          {snippet}
                        </pre>
                      </div>

                      {/* Response Body Box */}
                      <div style={{ position: 'relative' }}>
                        <div style={{ background: 'var(--surface-sunk)', padding: '6px 12px', borderRadius: '8px 8px 0 0', fontSize: '11px', color: 'var(--ink-3)', fontWeight: 700 }}>
                          Sample 200 OK Response Payload
                        </div>
                        <pre style={{ background: 'var(--surface)', border: '1px solid var(--line)', padding: '16px', borderRadius: '0 0 8px 8px', fontSize: '12px', margin: 0, overflowX: 'auto', fontFamily: 'monospace', color: 'var(--ink)' }}>
                          {ep.responseBody}
                        </pre>
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>
          )}

          {/* Webhooks View */}
          {activeSection === 'webhooks' && (
            <div style={{ maxWidth: '800px' }}>
              <Chip variant="cue">Real-Time Event Streams</Chip>
              <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '12px 0 16px' }}>Webhooks & Event Subscriptions</h1>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '32px' }}>
                Receive instantaneous HTTP POST payloads whenever a meeting finishes, an action item is extracted, or highlights are pinned.
              </p>

              <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>HMAC SHA-256 Signature Verification</h3>
                <p style={{ fontSize: '14px', color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: '12px' }}>
                  Every webhook header includes a <code>Fathom-Signature</code> header computed from your secret webhook key. Verify this signature to prevent replay and spoofing attacks.
                </p>
                <pre style={{ background: '#1A202C', color: '#68D391', padding: '12px', borderRadius: '8px', fontSize: '12px', margin: 0 }}>
                  const signature = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
                </pre>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px' }}>Supported Event Types</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div>• <code>meeting.completed</code> — Emitted immediately when recording ends and raw audio is uploaded.</div>
                <div>• <code>meeting.summary.created</code> — Emitted when executive summary and receipts finish synthesis.</div>
                <div>• <code>action_item.created</code> — Emitted for each verbal commitment detected in dialogue.</div>
                <div>• <code>clip.created</code> — Emitted when a highlight reel or trimmed video is compiled.</div>
              </div>
            </div>
          )}

          {/* MCP Server View */}
          {activeSection === 'mcp' && (
            <div style={{ maxWidth: '800px' }}>
              <Chip variant="cue">Model Context Protocol</Chip>
              <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '12px 0 16px' }}>Model Context Protocol (MCP) Server</h1>
              <p style={{ fontSize: '16px', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: '24px' }}>
                Connect Claude Desktop, Antigravity, and autonomous agent frameworks directly to your meeting archives using the official Fathom MCP server.
              </p>

              <div style={{ background: '#1A202C', color: '#68D391', padding: '16px', borderRadius: '8px', fontSize: '13px', marginBottom: '24px' }}>
{`// claude_desktop_config.json
{
  "mcpServers": {
    "fathom": {
      "command": "npx",
      "args": ["-y", "@fathom/mcp-server"],
      "env": {
        "FATHOM_API_KEY": "fathom_live_yourSecretKey"
      }
    }
  }
}`}
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Exposed MCP Tools</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: 'var(--ink-2)' }}>
                <li><code>list_meetings</code> — Query past conversations by date, tag, or participants.</li>
                <li><code>search_transcripts</code> — Vector and keyword search across spoken segments.</li>
                <li><code>get_receipts</code> — Retrieve exact timecodes and spoken audio URLs for a meeting ID.</li>
                <li><code>ask_meeting_ai</code> — Run natural language inquiries with cited audio timestamps.</li>
              </ul>
            </div>
          )}

          {/* llms.txt Reference View */}
          {activeSection === 'llms' && (
            <div style={{ maxWidth: '800px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, margin: 0 }}>llms.txt Reference File</h1>
                <Button size="sm" variant="secondary" onClick={() => copyToClipboard(LLMS_TXT_CONTENT, 'llms-txt')}>
                  {copiedId === 'llms-txt' ? 'Copied! ✓' : 'Copy llms.txt'}
                </Button>
              </div>
              <pre style={{ background: 'var(--surface)', border: '1px solid var(--line)', padding: '24px', borderRadius: '12px', fontSize: '13px', lineHeight: 1.6, overflowX: 'auto', color: 'var(--ink)', fontFamily: 'monospace' }}>
                {LLMS_TXT_CONTENT}
              </pre>
            </div>
          )}

          {/* SDKs View */}
          {activeSection === 'sdks' && (
            <div style={{ maxWidth: '800px' }}>
              <Chip variant="cue">Client Libraries</Chip>
              <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '12px 0 16px' }}>Official Client SDKs</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '24px' }}>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>TypeScript / Node.js</h3>
                  <pre style={{ background: '#1A202C', color: '#68D391', padding: '10px', borderRadius: '6px', fontSize: '12px' }}>
                    npm install @fathom/sdk
                  </pre>
                </div>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Python</h3>
                  <pre style={{ background: '#1A202C', color: '#68D391', padding: '10px', borderRadius: '6px', fontSize: '12px' }}>
                    pip install fathom-python
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* OAuth View */}
          {activeSection === 'oauth' && (
            <div style={{ maxWidth: '800px' }}>
              <Chip variant="cue">Authentication</Chip>
              <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '12px 0 16px' }}>OAuth 2.0 Integration Guide</h1>
              <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6 }}>
                Build marketplace apps that allow third-party Fathom users to authorize your application with granular scopes (<code>meetings.read</code>, <code>summaries.read</code>, <code>webhooks.manage</code>).
              </p>
            </div>
          )}

          {/* Examples View */}
          {activeSection === 'examples' && (
            <div style={{ maxWidth: '800px' }}>
              <Chip variant="cue">Recipes</Chip>
              <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '12px 0 16px' }}>Developer Recipes & Examples</h1>
              <p style={{ fontSize: '15px', color: 'var(--ink-2)', lineHeight: 1.6 }}>
                Production-ready code snippets for syncing meetings to Airtable, streaming dialogue to Slack, and downloading audio stems.
              </p>
            </div>
          )}
        </main>

        {/* RIGHT PANE: ON-THIS-PAGE ANCHORS */}
        <aside
          style={{
            background: 'var(--surface)',
            borderLeft: '1px solid var(--line)',
            padding: '24px 16px',
            position: 'sticky',
            top: '60px',
            height: 'calc(100vh - 60px)',
            overflowY: 'auto',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--ink-3)', marginBottom: '12px' }}>
            On This Page
          </div>
          {activeSection === 'reference' ? (
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
              {API_ENDPOINTS.map((ep, idx) => (
                <a
                  key={idx}
                  href={`#${ep.path.replace(/[\/:]/g, '-')}`}
                  style={{ color: 'var(--ink-2)', textDecoration: 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {ep.method} {ep.path}
                </a>
              ))}
            </nav>
          ) : (
            <div style={{ fontSize: '12px', color: 'var(--ink-3)' }}>
              Standard documentation section.
            </div>
          )}
        </aside>
      </div>
    </SiteShell>
  );
};
