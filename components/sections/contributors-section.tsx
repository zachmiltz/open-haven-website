"use client"

import { ArrowRight, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { contributors } from "@/lib/protocol-data"

export function ContributorsSection() {
  return (
    <section id="contributors" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Who's Behind This
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Meet the builders and researchers who contributed these evaluations.
          </p>
        </div>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contributors.map((contributor) => (
            <div
              key={contributor.id}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                  <User className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {contributor.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {contributor.affiliation}
                  </p>
                </div>
              </div>

              <p className="mb-4 text-sm text-muted-foreground">
                {contributor.bio}
              </p>

              <div className="flex flex-wrap gap-1">
                {contributor.protocols.map((protocol) => (
                  <Badge key={protocol} variant="secondary" className="text-xs">
                    {protocol}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
          <h3 className="mb-2 text-xl font-semibold text-foreground">
            Want to contribute?
          </h3>
          <p className="mb-6 text-muted-foreground">
            Join our evaluation working group and help shape the future of open
            protocol recommendations.
          </p>
          <Button className="gap-2">
            Join the Working Group
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
