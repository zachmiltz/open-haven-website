"use client"
import { ExternalLink, MessageCircle, CheckCircle2, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GovernanceBadge } from "@/components/ui/governance-badge"
import { CaptureRiskIndicator } from "@/components/ui/capture-risk"
import type { Protocol } from "@/lib/protocol-data"

interface ToolCardProps {
  protocol: Protocol
  selected: boolean
  onToggle: () => void
}

export function ToolCard({ protocol, selected, onToggle }: ToolCardProps) {
  return (
    <div
      className={`rounded-xl border bg-background p-5 transition-all ${
        selected
          ? "border-primary ring-1 ring-primary/20"
          : "border-border hover:border-primary/40"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onToggle}
              className="flex items-center gap-2 text-left"
            >
              {selected ? (
                <CheckCircle2 className="h-4 w-4 text-primary" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="font-semibold text-foreground">{protocol.name}</span>
            </button>
            <Badge variant="outline" className="text-xs font-normal">
              {protocol.architectureType === "fully-p2p"
                ? "Fully P2P"
                : protocol.architectureType === "federated"
                ? "Federated"
                : "Hybrid"}
            </Badge>
            <GovernanceBadge model={protocol.governanceModel} />
          </div>

          <p className="text-sm text-muted-foreground">{protocol.summary}</p>

          <div className="flex flex-wrap items-center gap-3">
            <CaptureRiskIndicator risk={protocol.captureRisk} />
            <span className="text-xs text-muted-foreground">
              Last investigated:{" "}
              {new Date(protocol.lastInvestigated).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
            {protocol.isDraft && (
              <span className="text-xs text-muted-foreground">~ Draft</span>
            )}
          </div>

          {protocol.verifiedAffordanceIds.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {protocol.verifiedAffordanceIds.slice(0, 4).map((id) => (
                <span
                  key={id}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                >
                  ✓ {id.replace(/-/g, " ")}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex shrink-0 flex-col gap-2">
          {protocol.communityLink && (
            <Button size="sm" variant="outline" className="gap-1.5 bg-transparent" asChild>
              <a href={protocol.communityLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-3.5 w-3.5" />
                Community
              </a>
            </Button>
          )}
          {protocol.docLink && (
            <Button size="sm" variant="ghost" className="gap-1.5" asChild>
              <a href={protocol.docLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
                Docs
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
