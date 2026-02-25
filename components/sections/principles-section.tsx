"use client"

import React from "react"

import { useState } from "react"
import {
  Shield,
  Link2,
  Laptop,
  Lock,
  GitBranch,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { principles } from "@/lib/protocol-data"

const iconMap: Record<string, React.ElementType> = {
  shield: Shield,
  link: Link2,
  laptop: Laptop,
  lock: Lock,
  "git-branch": GitBranch,
}

export function PrinciplesSection() {
  const [expandedId, setExpandedId] = useState<string | null>("data-sovereignty")

  return (
    <section id="principles" className="bg-card px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Core Principles
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            The foundational values that guide our protocol recommendations
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => {
            const Icon = iconMap[principle.icon]
            const isExpanded = expandedId === principle.id

            return (
              <button
                key={principle.id}
                type="button"
                onClick={() =>
                  setExpandedId(isExpanded ? null : principle.id)
                }
                className={cn(
                  "group relative overflow-hidden rounded-xl border border-border bg-background p-6 text-left transition-all hover:border-primary/50 hover:shadow-lg",
                  isExpanded && "border-primary/50 ring-1 ring-primary/20"
                )}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-muted-foreground transition-transform",
                      isExpanded && "rotate-180"
                    )}
                  />
                </div>

                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {principle.title}
                </h3>

                <p
                  className={cn(
                    "text-sm text-muted-foreground transition-all",
                    isExpanded
                      ? "line-clamp-none"
                      : "line-clamp-2"
                  )}
                >
                  {principle.description}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
