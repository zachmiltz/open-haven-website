"use client"
import { Sprout, ArrowRight } from "lucide-react"

export function BetaBadge() {
  return (
    <section
      id="beta"
      className="border-y border-primary/20 bg-primary/5 px-4 py-3"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Sprout className="h-4 w-4 shrink-0 text-primary" />
          <p className="text-sm text-foreground">
            <strong className="text-primary">Beta</strong> — Real data, growing fast.
            All entries are draft, human-reviewed, and dated.
          </p>
        </div>
        <a
          href="#contributors"
          className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Help us improve
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  )
}
