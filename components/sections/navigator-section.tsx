"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  MessageCircle,
  Fingerprint,
  Users,
  BookOpen,
  Calendar,
  HeartHandshake,
  Server,
  Network,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToolCard } from "@/components/navigator/tool-card"
import { PromptExportDialog } from "@/components/navigator/prompt-export-dialog"
import { domains, affordances, protocols, type Domain, type Affordance, type Protocol } from "@/lib/protocol-data"

const iconMap: Record<string, React.ElementType> = {
  "message-circle": MessageCircle,
  fingerprint: Fingerprint,
  users: Users,
  "book-open": BookOpen,
  calendar: Calendar,
  "heart-handshake": HeartHandshake,
  server: Server,
  network: Network,
}

export function NavigatorSection() {
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null)
  const [checkedAffordanceIds, setCheckedAffordanceIds] = useState<Set<string>>(new Set())
  const [selectedProtocolIds, setSelectedProtocolIds] = useState<Set<string>>(new Set())
  const [exportOpen, setExportOpen] = useState(false)

  const selectedDomain = useMemo(
    () => domains.find((d) => d.id === selectedDomainId),
    [selectedDomainId]
  )

  const domainAffordances = useMemo(
    () =>
      selectedDomainId
        ? affordances.filter((a) => a.domainIds.includes(selectedDomainId))
        : [],
    [selectedDomainId]
  )

  const domainProtocols = useMemo(
    () =>
      selectedDomainId
        ? protocols.filter((p) => p.domainIds.includes(selectedDomainId))
        : [],
    [selectedDomainId]
  )

  const filteredProtocols = useMemo(() => {
    if (checkedAffordanceIds.size === 0) return domainProtocols
    return domainProtocols.filter((p) => {
      const protocolAffordances = new Set([
        ...p.verifiedAffordanceIds,
        ...p.claimedAffordanceIds,
      ])
      return Array.from(checkedAffordanceIds).some((id) =>
        protocolAffordances.has(id)
      )
    })
  }, [domainProtocols, checkedAffordanceIds])

  const selectedProtocols = useMemo(
    () => protocols.filter((p) => selectedProtocolIds.has(p.id)),
    [selectedProtocolIds]
  )

  const checkedAffordances = useMemo(
    () => affordances.filter((a) => checkedAffordanceIds.has(a.id)),
    [checkedAffordanceIds]
  )

  const handleDomainClick = (domainId: string) => {
    if (selectedDomainId === domainId) {
      // Deselect
      setSelectedDomainId(null)
      setCheckedAffordanceIds(new Set())
      setSelectedProtocolIds(new Set())
    } else {
      // Select and pre-check all affordances for this domain
      setSelectedDomainId(domainId)
      const domainAffs = affordances.filter((a) => a.domainIds.includes(domainId))
      setCheckedAffordanceIds(new Set(domainAffs.map((a) => a.id)))
      setSelectedProtocolIds(new Set())
    }
  }

  const toggleAffordance = (affordanceId: string) => {
    setCheckedAffordanceIds((prev) => {
      const next = new Set(prev)
      if (next.has(affordanceId)) {
        next.delete(affordanceId)
      } else {
        next.add(affordanceId)
      }
      return next
    })
  }

  const toggleProtocol = (protocolId: string) => {
    setSelectedProtocolIds((prev) => {
      const next = new Set(prev)
      if (next.has(protocolId)) {
        next.delete(protocolId)
      } else {
        next.add(protocolId)
      }
      return next
    })
  }

  return (
    <section id="navigator" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Find Your Stack
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Start with your use case. We'll show you what technical properties matter,
            then which protocols deliver them.
          </p>
        </div>

        {/* Step 1: Domain Grid */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {domains.map((domain) => {
            const Icon = iconMap[domain.icon] || MessageCircle
            const isSelected = selectedDomainId === domain.id
            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => handleDomainClick(domain.id)}
                className={`rounded-xl border p-5 text-left transition-all ${
                  isSelected
                    ? "border-primary ring-1 ring-primary/20 bg-primary/5"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">{domain.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {domain.description}
                </p>
              </button>
            )
          })}
        </div>

        {/* Step 2: Affordances Panel */}
        {selectedDomain && (
          <div className="mt-10 rounded-xl border border-border bg-card p-6">
            <h3 className="mb-2 font-semibold text-foreground">
              What matters for {selectedDomain.name}
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              These are the technical properties that matter for this use case. Uncheck
              any that aren't priorities for you.
            </p>
            <div className="flex flex-wrap gap-2">
              {domainAffordances.map((affordance) => {
                const isChecked = checkedAffordanceIds.has(affordance.id)
                return (
                  <button
                    key={affordance.id}
                    type="button"
                    onClick={() => toggleAffordance(affordance.id)}
                    className={`rounded-full border px-3 py-1.5 text-sm transition-all ${
                      isChecked
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {isChecked && <span className="mr-1">✓</span>}
                    {affordance.name}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 3: Tools Panel */}
        {selectedDomain && (
          <div className="mt-8 space-y-4">
            <h3 className="font-semibold text-foreground">
              Protocols for {selectedDomain.name}
            </h3>
            {filteredProtocols.length === 0 ? (
              <p className="rounded-xl border border-border bg-muted/50 p-6 text-center text-sm text-muted-foreground">
                No protocols match all selected affordances — try unchecking some.
              </p>
            ) : (
              filteredProtocols.map((protocol) => (
                <ToolCard
                  key={protocol.id}
                  protocol={protocol}
                  selected={selectedProtocolIds.has(protocol.id)}
                  onToggle={() => toggleProtocol(protocol.id)}
                />
              ))
            )}
          </div>
        )}

        {/* Export Row */}
        {selectedProtocolIds.size > 0 && (
          <div className="mt-8 flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-4">
            <span className="text-sm text-foreground">
              {selectedProtocolIds.size} protocol(s) selected
            </span>
            <Button onClick={() => setExportOpen(true)} className="gap-2">
              Generate Prompt
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Full registry link */}
        <div className="mt-12 text-center">
          <Link
            href="/registry"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Explore the full registry
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <PromptExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        selectedProtocols={selectedProtocols}
        selectedDomain={selectedDomain}
        selectedAffordances={checkedAffordances}
      />
    </section>
  )
}
