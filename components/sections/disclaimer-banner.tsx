"use client"

import { Sprout, ArrowRight } from "lucide-react"

export function DisclaimerBanner() {
  return (
    <section
      id="disclaimer"
      className="border-y border-warning/30 bg-warning/20 px-4 py-4"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3 sm:items-center">
          <Sprout className="mt-0.5 h-5 w-5 shrink-0 text-warning-foreground sm:mt-0" />
          <p className="text-sm text-warning-foreground">
            <strong>Demo Mode:</strong> The protocol evaluations below are
            placeholder examples for demonstration purposes only. They do not
            yet represent actual community consensus or CTA working group
            decisions.
          </p>
        </div>
        <a
          href="#contributors"
          className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-warning-foreground underline-offset-4 hover:underline"
        >
          Want to contribute? Join Us
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  )
}
