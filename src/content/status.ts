export interface StatusComponent {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  uptime90Days: number;
  recentStatus: ('green' | 'yellow' | 'red')[];
}

export interface IncidentRecord {
  id: string;
  date: string;
  title: string;
  impact: 'Minor' | 'Major' | 'Maintenance';
  resolved: boolean;
  timeline: { time: string; message: string }[];
}

export const SYSTEM_COMPONENTS: StatusComponent[] = [
  {
    id: 'audio-ingestion',
    name: 'Real-time Audio Ingestion & Bot Gateway',
    status: 'operational',
    uptime90Days: 99.98,
    recentStatus: Array(30).fill('green'),
  },
  {
    id: 'transcription-engine',
    name: 'Acoustic Model & Speaker Diarization Engine',
    status: 'operational',
    uptime90Days: 99.95,
    recentStatus: Array(30).fill('green'),
  },
  {
    id: 'summary-synthesis',
    name: 'LLM Summary & Receipt Synthesis Pipeline',
    status: 'operational',
    uptime90Days: 99.99,
    recentStatus: Array(30).fill('green'),
  },
  {
    id: 'crm-sync',
    name: 'CRM Integrations & Webhook Dispatch (Salesforce, HubSpot)',
    status: 'operational',
    uptime90Days: 99.92,
    recentStatus: Array(28).fill('green').concat(['yellow', 'green']),
  },
  {
    id: 'web-application',
    name: 'Web Application & Video Streaming Player',
    status: 'operational',
    uptime90Days: 100.0,
    recentStatus: Array(30).fill('green'),
  },
  {
    id: 'developer-api',
    name: 'REST API & Model Context Protocol (MCP) Server',
    status: 'operational',
    uptime90Days: 99.97,
    recentStatus: Array(30).fill('green'),
  },
];

export const RECENT_INCIDENTS: IncidentRecord[] = [
  {
    id: 'inc-2026-09-14',
    date: 'September 14, 2026',
    title: 'Intermittent Webhook Dispatch Latency for HubSpot Engagements',
    impact: 'Minor',
    resolved: true,
    timeline: [
      { time: '14:22 UTC', message: 'Engineers noticed elevated queue latency for outbound HubSpot webhook deliveries.' },
      { time: '14:45 UTC', message: 'Root cause identified: API rate throttling from upstream provider. Backoff queues engaged.' },
      { time: '15:10 UTC', message: 'All queued webhooks dispatched successfully. System returned to fully operational status.' },
    ],
  },
  {
    id: 'inc-2026-08-30',
    date: 'August 30, 2026',
    title: 'Scheduled Maintenance: Acoustic Model Architecture Upgrade',
    impact: 'Maintenance',
    resolved: true,
    timeline: [
      { time: '02:00 UTC', message: 'Scheduled maintenance commenced to deploy sub-50ms diarization boundary upgrades.' },
      { time: '02:35 UTC', message: 'Model rollout completed across all regions. Live call capture unaffected.' },
    ],
  },
];
