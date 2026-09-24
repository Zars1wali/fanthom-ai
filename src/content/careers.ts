export interface CareerOpening {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
}

export const CAREER_OPENINGS: CareerOpening[] = [
  {
    slug: 'staff-audio-dsp-engineer',
    title: 'Staff Audio DSP & Diarization Engineer',
    department: 'Machine Learning & Core Infrastructure',
    location: 'Remote (US/EU) or San Francisco, CA',
    type: 'Full-time',
    overview:
      'Help us build the most accurate real-time speech separation engine in the world. You will work on acoustic feature modeling, multi-channel diarization, and sub-50ms speaker tracking algorithms. Sample job opening.',
    responsibilities: [
      'Architect low-latency streaming speaker diarization pipelines handling multi-person meeting audio',
      'Optimize Whisper and custom transformer models for edge inference on desktop and cloud clusters',
      'Implement beamforming and noise-reduction filters for challenging acoustic environments',
    ],
    qualifications: [
      '6+ years of experience in speech processing, DSP, or applied acoustic machine learning',
      'Proficiency in C++, Rust, and Python with PyTorch/TensorFlow',
      'Demonstrated experience shipping production ML models operating at high scale',
    ],
  },
  {
    slug: 'senior-frontend-engineer-design-systems',
    title: 'Senior Front-End Engineer — Design Systems & Player',
    department: 'Product Engineering',
    location: 'Remote (Global)',
    type: 'Full-time',
    overview:
      'Own the player experience, The Score timeline visualization, and our unified multi-platform design tokens. You value 60fps animations, extreme keyboard ergonomics, and accessible semantic markup. Sample job opening.',
    responsibilities: [
      'Maintain and evolve our design system primitives, typography scale, and broadcast-suite aesthetic',
      'Optimize the audio clock playback engine for instantaneous seek and responsive multi-track rendering',
      'Ensure WCAG 2.2 AA accessibility and keyboard navigation across all user interfaces',
    ],
    qualifications: [
      '5+ years building complex, data-dense web applications in modern TypeScript, React, and Vanilla CSS',
      'Deep understanding of browser rendering pipelines, requestAnimationFrame, and audio synchronization',
      'Exceptional eye for design craft, layout typography, and micro-interactions',
    ],
  },
  {
    slug: 'staff-revops-solutions-architect',
    title: 'Staff RevOps & Enterprise Solutions Architect',
    department: 'Customer Solutions',
    location: 'New York, NY or Remote (US)',
    type: 'Full-time',
    overview:
      'Partner with Fortune 500 sales operations leaders to deploy custom CRM integrations, MEDDIC field mappings, and automated pipeline governance on Fathom. Sample job opening.',
    responsibilities: [
      'Lead technical discovery and enterprise CRM schema design for key strategic accounts',
      'Develop custom webhook workflows and bidirectional sync handlers for complex Salesforce instances',
      'Translate enterprise customer requirements into core platform feature specifications',
    ],
    qualifications: [
      '5+ years in technical sales engineering, RevOps architecture, or enterprise SaaS integrations',
      'Expertise in Salesforce Sales Cloud, HubSpot CRM, and modern REST/GraphQL APIs',
      'Strong client-facing communication skills and ability to present to C-level executives',
    ],
  },
];
