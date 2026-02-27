// lib/protocol-data.ts

export interface Domain {
  id: string
  name: string
  description: string  // one sentence, plain language
  icon: string         // lucide-react icon name
}

export interface Affordance {
  id: string
  name: string
  description: string  // plain language: why this matters
  domainIds: string[]
}

export interface Protocol {
  id: string
  name: string
  summary: string
  entityType: "P2P Protocol" | "P2P Platform" | "Federated Protocol" | "Decentralized App" | "Semantic & Data Protocol" | "Identity Protocol" | "P2P Infrastructure" | "Hybrid"
  architectureType: "fully-p2p" | "federated" | "hybrid"
  governanceModel: "foundation" | "dao" | "single-company" | "open-standard-body" | "community"
  captureRisk: "low" | "medium" | "high"
  sourceLicense: string
  selfHostable: boolean
  domainIds: string[]
  verifiedAffordanceIds: string[]
  claimedAffordanceIds: string[]
  lastInvestigated: string  // ISO date "2026-01-15"
  isDraft: boolean
  status: "recommended" | "considered" | "not-selected"
  docLink?: string
  communityLink?: string
  contributorNote?: string
}

export const domains: Domain[] = [
  {
    id: "communication",
    name: "Communication",
    description: "Secure, private, censorship-resistant messaging and publishing for individuals and groups.",
    icon: "message-circle",
  },
  {
    id: "identity-trust",
    name: "Identity & Trust",
    description: "Self-sovereign identity, verifiable credentials, and reputation without centralized gatekeepers.",
    icon: "fingerprint",
  },
  {
    id: "group-governance",
    name: "Group Formation & Governance",
    description: "Collective decision-making, coordination, and governance for communities and organizations.",
    icon: "users",
  },
  {
    id: "co-creation",
    name: "Co-Creation & Knowledge",
    description: "Collaborative editing, shared knowledge bases, and creative work without platform lock-in.",
    icon: "book-open",
  },
  {
    id: "events-coordination",
    name: "Events & Coordination",
    description: "Scheduling, resource coordination, and logistics for distributed groups.",
    icon: "calendar",
  },
  {
    id: "mutual-aid",
    name: "Mutual Aid & Exchange",
    description: "Resource sharing, gifting economies, and peer-to-peer exchange without extractive intermediaries.",
    icon: "heart-handshake",
  },
  {
    id: "platform-sovereignty",
    name: "Platform Evolution & Sovereignty",
    description: "Tools and protocols for building, hosting, and governing your own digital infrastructure.",
    icon: "server",
  },
  {
    id: "relationship-awareness",
    name: "Relationship & Awareness",
    description: "⚠️ Frontier Territory — Emerging protocols for social graphs, trust networks, and collective sense-making.",
    icon: "network",
  },
]

export const affordances: Affordance[] = [
  // Communication
  { id: "e2e-encrypted", name: "End-to-end encrypted", description: "Messages are encrypted on your device — no server can read them.", domainIds: ["communication", "co-creation"] },
  { id: "censorship-resistant", name: "Censorship-resistant", description: "No single party can block or remove content.", domainIds: ["communication", "platform-sovereignty"] },
  { id: "offline-capable", name: "Works offline", description: "Functions without continuous internet — syncs when reconnected.", domainIds: ["communication", "co-creation", "mutual-aid"] },
  { id: "self-hostable", name: "Self-hostable", description: "You can run your own server — no dependency on a third-party service.", domainIds: ["communication", "platform-sovereignty", "group-governance"] },
  { id: "federated", name: "Federated", description: "Different servers can talk to each other — no single company controls the network.", domainIds: ["communication", "group-governance"] },
  // Identity
  { id: "self-sovereign", name: "Self-sovereign identity", description: "Your identity is controlled by you, not an app or platform.", domainIds: ["identity-trust"] },
  { id: "verifiable-credentials", name: "Verifiable credentials", description: "Cryptographic proofs of claims — portable, privacy-preserving attestations.", domainIds: ["identity-trust"] },
  { id: "no-central-authority", name: "No central authority", description: "No company or government is required to validate your identity.", domainIds: ["identity-trust", "platform-sovereignty"] },
  // Group Governance
  { id: "on-chain-governance", name: "On-chain governance", description: "Decisions recorded immutably — auditable by all participants.", domainIds: ["group-governance"] },
  { id: "consent-based", name: "Consent-based membership", description: "Joining and leaving is voluntary and cryptographically verifiable.", domainIds: ["group-governance", "mutual-aid"] },
  // Co-Creation
  { id: "crdt-sync", name: "Conflict-free real-time sync", description: "Multiple people edit simultaneously — merges automatically without conflicts.", domainIds: ["co-creation"] },
  { id: "local-first", name: "Local-first", description: "Your data lives on your device first — cloud is optional.", domainIds: ["co-creation", "communication"] },
  // Mutual Aid
  { id: "no-intermediary", name: "No intermediary", description: "Peer-to-peer exchange without a platform extracting fees or data.", domainIds: ["mutual-aid"] },
  { id: "resource-tracking", name: "Resource tracking", description: "Tracks offers, needs, and flows across a network transparently.", domainIds: ["mutual-aid", "events-coordination"] },
  // Platform Sovereignty
  { id: "open-source", name: "Open source", description: "Code is publicly auditable — no black boxes.", domainIds: ["platform-sovereignty", "communication", "co-creation"] },
  { id: "data-portability", name: "Data portability", description: "Export your data anytime in standard formats — no lock-in.", domainIds: ["platform-sovereignty", "identity-trust"] },
]

export const protocols: Protocol[] = [
  {
    id: "matrix",
    name: "Matrix",
    summary: "Open standard for decentralized, real-time communication. Powers Element and hundreds of other clients.",
    entityType: "Federated Protocol",
    architectureType: "federated",
    governanceModel: "foundation",
    captureRisk: "low",
    sourceLicense: "Apache-2.0",
    selfHostable: true,
    domainIds: ["communication"],
    verifiedAffordanceIds: ["e2e-encrypted", "self-hostable", "federated", "open-source"],
    claimedAffordanceIds: ["censorship-resistant"],
    lastInvestigated: "2026-01-20",
    isDraft: true,
    status: "recommended",
    docLink: "https://matrix.org/docs/",
    communityLink: "https://matrix.to/#/#matrix:matrix.org",
    contributorNote: "Draft — pending full review by data team",
  },
  {
    id: "activitypub",
    name: "ActivityPub",
    summary: "W3C standard powering Mastodon, PeerTube, and the broader Fediverse. Largest federated social network.",
    entityType: "Federated Protocol",
    architectureType: "federated",
    governanceModel: "open-standard-body",
    captureRisk: "low",
    sourceLicense: "W3C",
    selfHostable: true,
    domainIds: ["communication", "co-creation"],
    verifiedAffordanceIds: ["federated", "self-hostable", "open-source", "data-portability"],
    claimedAffordanceIds: ["censorship-resistant"],
    lastInvestigated: "2026-01-15",
    isDraft: true,
    status: "recommended",
    docLink: "https://www.w3.org/TR/activitypub/",
    communityLink: "https://socialhub.activitypub.rocks/",
    contributorNote: "Draft — pending full review by data team",
  },
  {
    id: "dids-vcs",
    name: "DIDs + Verifiable Credentials",
    summary: "W3C standards for decentralized identifiers and verifiable credentials. Foundation for self-sovereign identity.",
    entityType: "Identity Protocol",
    architectureType: "hybrid",
    governanceModel: "open-standard-body",
    captureRisk: "low",
    sourceLicense: "W3C",
    selfHostable: true,
    domainIds: ["identity-trust"],
    verifiedAffordanceIds: ["self-sovereign", "verifiable-credentials", "no-central-authority", "open-source"],
    claimedAffordanceIds: ["data-portability"],
    lastInvestigated: "2026-01-10",
    isDraft: true,
    status: "recommended",
    docLink: "https://www.w3.org/TR/did-core/",
    communityLink: "https://identity.foundation/",
    contributorNote: "Draft — pending full review by data team",
  },
  {
    id: "holochain",
    name: "Holochain",
    summary: "Agent-centric distributed computing framework for peer-to-peer applications. No global consensus required.",
    entityType: "P2P Protocol",
    architectureType: "fully-p2p",
    governanceModel: "foundation",
    captureRisk: "low",
    sourceLicense: "CAL-1.0",
    selfHostable: true,
    domainIds: ["platform-sovereignty", "group-governance", "co-creation"],
    verifiedAffordanceIds: ["no-central-authority", "open-source", "local-first"],
    claimedAffordanceIds: ["offline-capable", "self-hostable", "consent-based"],
    lastInvestigated: "2026-01-18",
    isDraft: true,
    status: "recommended",
    docLink: "https://developer.holochain.org/",
    communityLink: "https://discord.gg/holochain",
    contributorNote: "Draft — pending full review by data team",
  },
  {
    id: "nextgraph",
    name: "NextGraph",
    summary: "Local-first, E2EE, P2P platform combining CRDTs and semantic web. Presented at FOSDEM 2026.",
    entityType: "P2P Protocol",
    architectureType: "fully-p2p",
    governanceModel: "community",
    captureRisk: "low",
    sourceLicense: "AGPL-3.0",
    selfHostable: true,
    domainIds: ["co-creation", "communication"],
    verifiedAffordanceIds: ["e2e-encrypted", "local-first", "crdt-sync", "open-source"],
    claimedAffordanceIds: ["offline-capable", "censorship-resistant"],
    lastInvestigated: "2026-02-01",
    isDraft: true,
    status: "recommended",
    docLink: "https://nextgraph.org/docs/",
    communityLink: "https://matrix.to/#/#nextgraph:matrix.org",
    contributorNote: "Draft — pending full review by data team",
  },
  {
    id: "murmurations",
    name: "Murmurations",
    summary: "Distributed data sharing protocol for mapping organizations and projects across networks.",
    entityType: "Semantic & Data Protocol",
    architectureType: "federated",
    governanceModel: "community",
    captureRisk: "low",
    sourceLicense: "MIT",
    selfHostable: true,
    domainIds: ["mutual-aid", "events-coordination"],
    verifiedAffordanceIds: ["open-source", "data-portability", "federated"],
    claimedAffordanceIds: ["no-intermediary", "resource-tracking"],
    lastInvestigated: "2026-01-05",
    isDraft: true,
    status: "recommended",
    docLink: "https://murmurations.network/",
    communityLink: "https://discord.gg/murmurations",
    contributorNote: "Draft — pending full review by data team",
  },
  {
    id: "ipfs",
    name: "IPFS",
    summary: "Content-addressed peer-to-peer hypermedia distribution protocol. Mature ecosystem, wide adoption.",
    entityType: "P2P Infrastructure",
    architectureType: "fully-p2p",
    governanceModel: "foundation",
    captureRisk: "medium",
    sourceLicense: "MIT",
    selfHostable: true,
    domainIds: ["platform-sovereignty", "co-creation"],
    verifiedAffordanceIds: ["open-source", "censorship-resistant", "self-hostable"],
    claimedAffordanceIds: ["data-portability"],
    lastInvestigated: "2026-01-12",
    isDraft: true,
    status: "recommended",
    docLink: "https://docs.ipfs.tech/",
    communityLink: "https://discord.gg/ipfs",
    contributorNote: "Draft — capture risk medium due to Protocol Labs concentration",
  },
  {
    id: "nostr",
    name: "Nostr",
    summary: "Notes and Other Stuff Transmitted by Relays. Simple relay-based protocol with cryptographic identities.",
    entityType: "P2P Protocol",
    architectureType: "federated",
    governanceModel: "community",
    captureRisk: "low",
    sourceLicense: "Public Domain",
    selfHostable: true,
    domainIds: ["communication"],
    verifiedAffordanceIds: ["censorship-resistant", "self-hostable", "open-source", "no-central-authority"],
    claimedAffordanceIds: ["e2e-encrypted"],
    lastInvestigated: "2026-01-08",
    isDraft: true,
    status: "considered",
    docLink: "https://nostr.com/",
    communityLink: "https://nostr.com/",
    contributorNote: "Draft — e2e encryption is opt-in via NIP-44, not default",
  },
]

// Legacy export for compatibility (used by PromptExportDialog)
export const categories = ["All", ...Array.from(new Set(protocols.map(p => p.entityType)))]
