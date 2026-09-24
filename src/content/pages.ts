export const COMPANY_ABOUT = {
  mission: 'To eliminate administrative friction from human conversation and replace guesswork with factual truth.',
  foundingStory:
    'Fathom was founded on a simple observation: modern knowledge workers spend nearly half their working lives in meetings, yet the commitments, technical decisions, and customer signals exchanged in those meetings vanish the moment the call disconnects. Traditional note-taking forces people to split their attention between listening and typing. When automated AI summaries arrived, they introduced a new dilemma: summaries without receipts cannot be trusted in high-stakes decisions. We built Fathom to provide truthful conversational intelligence, where every claim is anchored to exact spoken audio receipts.',
  values: [
    {
      title: 'Every Claim Has a Source',
      description: 'We do not ask users to trust algorithms blindly. If our platform asserts a takeaway, decision, or metric, we provide an immediate link to the exact spoken second.',
    },
    {
      title: 'Ergonomics Over Novelty',
      description: 'We prioritize sub-50ms seek speeds, 60fps playheads, and keyboard efficiency over superficial AI parlor tricks. Software should feel like a finely tuned instrument.',
    },
    {
      title: 'Discretion and Privacy as Defaults',
      description: 'Meeting conversations contain sensitive human and business exchanges. We never train public foundation models on customer data, and we pioneer bot-free recording.',
    },
    {
      title: 'Frictionless Distribution',
      description: 'Meeting insights must flow effortlessly to wherever teams do work — into Slack, Salesforce, Notion, and HubSpot — without requiring manual human re-entry.',
    },
  ],
  leadership: [
    { name: 'Alex Morgan', role: 'Co-Founder & Chief Executive Officer', bio: 'Former engineer and product lead focused on high-performance human-computer interaction.' },
    { name: 'Priya Sharma', role: 'Co-Founder & Chief Technology Officer', bio: 'Machine learning specialist specializing in real-time acoustic signal processing and diarization.' },
    { name: 'Marcus Vance', role: 'VP of Product Experience', bio: 'Design systems advocate passionate about spatial audio visualization and keyboard-driven ergonomics.' },
  ],
};

export const TRUST_CENTER_DATA = {
  overview:
    'At Fathom, security and privacy are architectural foundations, not afterthoughts. We process confidential customer conversations, proprietary technical debates, and executive negotiations with enterprise-grade encryption, strict data isolation, and comprehensive compliance standards.',
  encryption: [
    { title: 'Data in Transit', detail: 'All audio streams, API traffic, and web sessions are encrypted using TLS 1.3 with modern cipher suites.' },
    { title: 'Data at Rest', detail: 'Audio recordings, transcripts, and embeddings are encrypted with AES-256 with per-organization key rotation.' },
    { title: 'Zero Model Training', detail: 'Customer audio and transcripts are strictly never used to train public or commercial AI models.' },
    { title: 'Dedicated Isolation', detail: 'Enterprise customers can enforce regional tenant isolation (US, EU, or hybrid cloud regions).' },
  ],
  subprocessors: [
    { name: 'Amazon Web Services (AWS)', purpose: 'Cloud infrastructure, encrypted S3 storage, and compute hosting', location: 'United States & European Union' },
    { name: 'Anthropic PBC', purpose: 'Zero-retention LLM inference for executive summaries (Enterprise privacy agreement)', location: 'United States' },
    { name: 'OpenAI LLC', purpose: 'Zero-data-retention API endpoint for specialized query synthesis', location: 'United States' },
    { name: 'Cloudflare Inc.', purpose: 'Edge CDN distribution, DDoS mitigation, and SSL termination', location: 'Global Edge Network' },
  ],
  complianceDisclaimer: 'Sample demonstration compliance overview. All attestations and certificates shown are illustrative design artifacts for the rebuild prototype.',
};

export const LEGAL_TERMS = {
  lastUpdated: 'September 24, 2026',
  disclaimer: 'This document is a design prototype sample demonstrating structure and typography. It does not constitute binding legal terms or formal legal advice.',
  sections: [
    {
      heading: '1. Acceptance of Terms',
      content:
        'By accessing or utilizing the Fathom meeting intelligence platform ("Service"), you agree to be bound by these Terms of Service. If you are entering into these terms on behalf of a company or legal entity, you represent that you possess the authority to bind such entity to these provisions.',
    },
    {
      heading: '2. Meeting Recording & Consent Obligations',
      content:
        'You acknowledge that local, state, and international laws govern the recording of audio and video conversations. You agree to obtain all necessary consents from call participants prior to initiating recording, whether utilizing our bot presence or bot-free local capture tools.',
    },
    {
      heading: '3. Data Ownership and License',
      content:
        'You retain full and exclusive ownership of all meeting recordings, audio stems, transcripts, and customer data uploaded to the Service. Fathom is granted a limited license solely to process, transcribe, and index your content to provide the Service to your organization.',
    },
    {
      heading: '4. Enterprise Privacy Commitments',
      content:
        'Fathom agrees that customer meeting audio and verbatim transcripts will never be shared with third parties for commercial advertising, nor utilized to train foundation machine learning models without express written authorization.',
    },
    {
      heading: '5. Service Level Commitments & Terminations',
      content:
        'Fathom provides 99.9% uptime commitments for paid Enterprise workspaces. Either party may terminate subscription agreements with 30 days written notice upon conclusion of active contract terms.',
    },
  ],
};

export const LEGAL_PRIVACY = {
  lastUpdated: 'September 24, 2026',
  disclaimer: 'This privacy policy is a design prototype sample demonstrating privacy disclosures and data governance structure. It is not formal legal advice.',
  sections: [
    {
      heading: '1. Information We Collect',
      content:
        'We collect account profile information (name, work email, corporate domain), calendar event metadata (attendee names, meeting titles, scheduled start times), and audio streams captured during meetings that you explicitly designate for recording.',
    },
    {
      heading: '2. How We Process Meeting Dialogue',
      content:
        'Audio is processed through our streaming diarization pipeline to separate speakers and generate time-aligned transcripts. Structured LLM inference extracts action items and summaries, which are stored encrypted in your private workspace database.',
    },
    {
      heading: '3. Zero Third-Party Model Training Guarantee',
      content:
        'We maintain strict business associate and commercial agreements with our LLM inference providers ensuring that customer audio, transcripts, and summaries are processed in memory and never retained for model training.',
    },
    {
      heading: '4. Data Retention and Deletion',
      content:
        'You can delete any meeting recording, transcript, or clip permanently from your library at any time. When deleted, all associated audio files, embeddings, and transcript segments are purged from our cloud storage within 24 hours.',
    },
    {
      heading: '5. Contacting Data Protection Officers',
      content:
        'For inquiries regarding GDPR rights, CCPA data requests, or DPA execution, contact privacy@demo.fathom.ai.',
    },
  ],
};
