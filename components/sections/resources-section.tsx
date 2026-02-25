"use client"

import {
  FileText,
  Users,
  PlusCircle,
  ExternalLink,
  BookOpen,
  MessageSquare,
  Github,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const resources = [
  {
    title: "Local-First Software",
    description: "Foundational paper on offline-capable, collaborative apps",
    link: "https://www.inkandswitch.com/local-first/",
    icon: FileText,
  },
  {
    title: "W3C DID Specification",
    description: "Decentralized Identifiers standard documentation",
    link: "https://www.w3.org/TR/did-core/",
    icon: BookOpen,
  },
  {
    title: "ActivityPub Overview",
    description: "W3C recommendation for decentralized social networking",
    link: "https://www.w3.org/TR/activitypub/",
    icon: FileText,
  },
  {
    title: "Holochain Dev Portal",
    description: "Getting started with agent-centric apps",
    link: "https://developer.holochain.org/",
    icon: BookOpen,
  },
]

const communities = [
  {
    title: "CTA Discord",
    description: "Join the Collaborative Technology Alliance community",
    icon: MessageSquare,
  },
  {
    title: "Protocol Communities",
    description: "Links to individual protocol discussion spaces",
    icon: Users,
  },
]

const contribute = [
  {
    title: "Submit Evaluation",
    description: "Add a new protocol evaluation to the directory",
    icon: PlusCircle,
  },
  {
    title: "Suggest Protocol",
    description: "Recommend a protocol for consideration",
    icon: FileText,
  },
  {
    title: "Report Issue",
    description: "Found an error? Let us know",
    icon: Github,
  },
]

export function ResourcesSection() {
  return (
    <section id="resources" className="bg-card px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Go Deeper
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Resources, communities, and ways to contribute to the project.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Key Resources */}
          <div className="rounded-xl border border-border bg-background p-6">
            <h3 className="mb-6 flex items-center gap-2 font-semibold text-foreground">
              <BookOpen className="h-5 w-5 text-primary" />
              Key Resources
            </h3>
            <div className="space-y-4">
              {resources.map((resource) => (
                <a
                  key={resource.title}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
                >
                  <resource.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-foreground group-hover:text-primary">
                        {resource.title}
                      </span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {resource.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Community Links */}
          <div className="rounded-xl border border-border bg-background p-6">
            <h3 className="mb-6 flex items-center gap-2 font-semibold text-foreground">
              <Users className="h-5 w-5 text-primary" />
              Community Links
            </h3>
            <div className="space-y-4">
              {communities.map((community) => (
                <button
                  key={community.title}
                  type="button"
                  className="group flex w-full items-start gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted"
                >
                  <community.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary">
                      {community.title}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {community.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-lg bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Coming soon:</strong>{" "}
                Integrated community directory with real-time activity feeds.
              </p>
            </div>
          </div>

          {/* Contribute */}
          <div className="rounded-xl border border-border bg-background p-6">
            <h3 className="mb-6 flex items-center gap-2 font-semibold text-foreground">
              <PlusCircle className="h-5 w-5 text-primary" />
              Contribute
            </h3>
            <div className="space-y-4">
              {contribute.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="group flex w-full items-start gap-3 rounded-lg p-2 text-left transition-colors hover:bg-muted"
                >
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary">
                      {item.title}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <Button className="mt-6 w-full gap-2 bg-transparent" variant="outline">
              <Github className="h-4 w-4" />
              View on GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
