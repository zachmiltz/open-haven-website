export interface Protocol {
  id: string
  name: string
  useCase: string
  rationale: string
  alternatives: string[]
  status: "recommended" | "considered" | "not-selected"
  category: string
  summary: string
  docLink?: string
  communityLink?: string
}

export const protocols: Protocol[] = [
  {
    id: "holochain",
    name: "Holochain",
    useCase: "Agent-Centric Apps",
    rationale:
      "[Demo content] Eliminates global consensus bottlenecks; each agent maintains their own source chain with DHT validation. Ideal for collaborative apps without blockchain overhead.",
    alternatives: ["Solid", "IPFS+libp2p", "Ceramic"],
    status: "recommended",
    category: "Application Framework",
    summary:
      "Agent-centric distributed computing framework for peer-to-peer applications.",
    docLink: "https://developer.holochain.org/",
    communityLink: "https://discord.gg/holochain",
  },
  {
    id: "nextgraph",
    name: "NextGraph",
    useCase: "Semantic Data Sync",
    rationale:
      "[Demo content] Combines CRDTs, semantic web (RDF), and end-to-end encryption. Git-like branching model for linked data.",
    alternatives: ["Gun.js", "OrbitDB", "Automerge"],
    status: "recommended",
    category: "Data Synchronization",
    summary:
      "Decentralized semantic data platform with CRDTs and encryption.",
    docLink: "https://nextgraph.org/docs/",
    communityLink: "https://matrix.to/#/#nextgraph:matrix.org",
  },
  {
    id: "murmurations",
    name: "Murmurations",
    useCase: "Ecosystem Mapping",
    rationale:
      "[Demo content] Purpose-built for directory interoperability. Simple schema-based approach for mapping organizations and projects across networks.",
    alternatives: ["Schema.org", "Wikidata", "Custom solutions"],
    status: "recommended",
    category: "Directory & Discovery",
    summary:
      "Distributed data sharing protocol for mapping organizations and projects.",
    docLink: "https://murmurations.network/",
    communityLink: "https://discord.gg/murmurations",
  },
  {
    id: "ipfs",
    name: "IPFS",
    useCase: "Content Storage",
    rationale:
      "[Demo content] Content-addressed, distributed storage. Mature ecosystem and wide adoption for static assets and data persistence.",
    alternatives: ["Hypercore", "Arweave", "Filecoin"],
    status: "recommended",
    category: "Storage",
    summary:
      "Content-addressed peer-to-peer hypermedia distribution protocol.",
    docLink: "https://docs.ipfs.tech/",
    communityLink: "https://discord.gg/ipfs",
  },
  {
    id: "activitypub",
    name: "ActivityPub",
    useCase: "Federated Social",
    rationale:
      "[Demo content] W3C standard powering Mastodon, PeerTube, etc. Largest existing federated network with proven interoperability.",
    alternatives: ["AT Protocol", "Nostr", "Matrix"],
    status: "recommended",
    category: "Social & Communication",
    summary:
      "W3C standard for decentralized social networking and content distribution.",
    docLink: "https://www.w3.org/TR/activitypub/",
    communityLink: "https://socialhub.activitypub.rocks/",
  },
  {
    id: "solid",
    name: "Solid",
    useCase: "Personal Data Pods",
    rationale:
      "[Demo content] Tim Berners-Lee's vision for user-controlled data pods. Strong RDF foundation and growing enterprise interest.",
    alternatives: ["Holochain", "NextGraph", "RemoteStorage"],
    status: "recommended",
    category: "Data Sovereignty",
    summary:
      "Web decentralization project for personal data pods and linked data.",
    docLink: "https://solidproject.org/developers",
    communityLink: "https://forum.solidproject.org/",
  },
  {
    id: "dids-vcs",
    name: "DIDs + VCs",
    useCase: "Decentralized Identity",
    rationale:
      "[Demo content] W3C standards for self-sovereign identity. Verifiable Credentials enable portable, privacy-preserving attestations.",
    alternatives: ["Ceramic IDX", "ENS", "Keybase-style"],
    status: "recommended",
    category: "Identity",
    summary:
      "W3C standards for decentralized identifiers and verifiable credentials.",
    docLink: "https://www.w3.org/TR/did-core/",
    communityLink: "https://identity.foundation/",
  },
  // Additional protocols for full registry
  {
    id: "ceramic",
    name: "Ceramic",
    useCase: "Decentralized Data",
    rationale:
      "[Demo content] Mutable data streams with blockchain anchoring. Good for profiles and social graphs.",
    alternatives: ["OrbitDB", "Gun.js"],
    status: "considered",
    category: "Data Synchronization",
    summary: "Decentralized data network for composable Web3 applications.",
    docLink: "https://ceramic.network/",
  },
  {
    id: "nostr",
    name: "Nostr",
    useCase: "Social Protocol",
    rationale:
      "[Demo content] Simple relay-based protocol with cryptographic identities. Lightweight and censorship-resistant.",
    alternatives: ["ActivityPub", "AT Protocol"],
    status: "considered",
    category: "Social & Communication",
    summary:
      "Notes and Other Stuff Transmitted by Relays - simple social protocol.",
    docLink: "https://nostr.com/",
  },
  {
    id: "matrix",
    name: "Matrix",
    useCase: "Secure Messaging",
    rationale:
      "[Demo content] Federated messaging with end-to-end encryption. Mature ecosystem but focused on chat.",
    alternatives: ["Signal Protocol", "XMPP"],
    status: "considered",
    category: "Social & Communication",
    summary: "Open standard for decentralized, real-time communication.",
    docLink: "https://matrix.org/",
  },
  {
    id: "at-protocol",
    name: "AT Protocol",
    useCase: "Social Networking",
    rationale:
      "[Demo content] Powers Bluesky. Good account portability but more centralized than ActivityPub.",
    alternatives: ["ActivityPub", "Nostr"],
    status: "considered",
    category: "Social & Communication",
    summary:
      "Federated social networking protocol with account portability.",
    docLink: "https://atproto.com/",
  },
  {
    id: "hypercore",
    name: "Hypercore",
    useCase: "P2P Data",
    rationale:
      "[Demo content] Append-only logs with sparse replication. Great for specific use cases but less general than IPFS.",
    alternatives: ["IPFS", "Gun.js"],
    status: "not-selected",
    category: "Storage",
    summary: "Secure, distributed append-only log for building P2P apps.",
    docLink: "https://hypercore-protocol.org/",
  },
]

export const principles = [
  {
    id: "data-sovereignty",
    title: "Data Sovereignty",
    description:
      "Your data belongs to you. Period. These protocols ensure you control where it lives and who accesses it.",
    icon: "shield",
  },
  {
    id: "interoperability",
    title: "Interoperability",
    description:
      "No more walled gardens. Open protocols speak to each other, preventing lock-in and enabling ecosystem fluidity.",
    icon: "link",
  },
  {
    id: "local-first",
    title: "Local-First",
    description:
      "Your apps should work offline, sync seamlessly, and never hold your data hostage in the cloud.",
    icon: "laptop",
  },
  {
    id: "privacy-by-design",
    title: "Privacy by Design",
    description:
      "Encryption and consent aren't afterthoughts—they're architectural foundations.",
    icon: "lock",
  },
  {
    id: "decentralization-spectrum",
    title: "Decentralization Spectrum",
    description:
      "From federated to fully peer-to-peer. Understand the trade-offs and choose your level.",
    icon: "git-branch",
  },
]

export const contributors = [
  {
    id: "1",
    name: "Dr. Maya Chen",
    affiliation: "Distributed Systems Lab",
    bio: "Researcher focused on consensus mechanisms and peer-to-peer networking protocols.",
    protocols: ["Holochain", "IPFS"],
  },
  {
    id: "2",
    name: "Alex Rivera",
    affiliation: "Open Web Foundation",
    bio: "Developer advocate working on federated social protocols and interoperability standards.",
    protocols: ["ActivityPub", "AT Protocol"],
  },
  {
    id: "3",
    name: "Sam Okonkwo",
    affiliation: "CTA Working Group",
    bio: "Community organizer bridging technical implementations with grassroots movements.",
    protocols: ["Murmurations", "Solid"],
  },
  {
    id: "4",
    name: "Jordan Ellis",
    affiliation: "Privacy Tech Collective",
    bio: "Cryptographer specializing in end-to-end encryption and identity systems.",
    protocols: ["DIDs + VCs", "NextGraph"],
  },
  {
    id: "5",
    name: "Priya Sharma",
    affiliation: "Semantic Web Initiative",
    bio: "Data scientist exploring linked data and knowledge graph applications.",
    protocols: ["NextGraph", "Solid"],
  },
  {
    id: "6",
    name: "Marcus Johnson",
    affiliation: "Decentralized Storage Alliance",
    bio: "Infrastructure engineer with expertise in content-addressed storage systems.",
    protocols: ["IPFS", "Hypercore"],
  },
]

export const categories = [
  "All",
  "Application Framework",
  "Data Synchronization",
  "Directory & Discovery",
  "Storage",
  "Social & Communication",
  "Data Sovereignty",
  "Identity",
]
