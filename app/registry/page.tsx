"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronDown, ChevronUp, Check, Search, ExternalLink } from "lucide-react"
import { protocols, domains, affordances, type Protocol } from "@/lib/protocol-data"
import { PromptExportDialog } from "@/components/navigator/prompt-export-dialog"
import { GovernanceBadge } from "@/components/ui/governance-badge"
import { CaptureRiskIndicator } from "@/components/ui/capture-risk"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const archLabel = (a: string) =>
  a === "fully-p2p" ? "Fully P2P" : a === "federated" ? "Federated" : "Hybrid"

const entityTypes = ["All", ...Array.from(new Set(protocols.map((p) => p.entityType)))]
const architectureTypes = ["All", "fully-p2p", "federated", "hybrid"]
const governanceModels = ["All", "foundation", "dao", "single-company", "open-standard-body", "community"]
const captureRisks = ["All", "low", "medium", "high"]

export default function RegistryPage() {
  const [search, setSearch] = useState("")
  const [entityFilter, setEntityFilter] = useState("All")
  const [archFilter, setArchFilter] = useState("All")
  const [govFilter, setGovFilter] = useState("All")
  const [riskFilter, setRiskFilter] = useState("All")
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [sortColumn, setSortColumn] = useState<keyof Protocol | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const filtered = useMemo(() => {
    let result = protocols.filter((p) => {
      const matchesSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.summary.toLowerCase().includes(search.toLowerCase())
      const matchesEntity = entityFilter === "All" || p.entityType === entityFilter
      const matchesArch = archFilter === "All" || p.architectureType === archFilter
      const matchesGov = govFilter === "All" || p.governanceModel === govFilter
      const matchesRisk = riskFilter === "All" || p.captureRisk === riskFilter
      return matchesSearch && matchesEntity && matchesArch && matchesGov && matchesRisk
    })

    if (sortColumn) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortColumn]
        const bVal = b[sortColumn]
        if (typeof aVal === "string" && typeof bVal === "string") {
          return sortDirection === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal)
        }
        if (typeof aVal === "boolean" && typeof bVal === "boolean") {
          return sortDirection === "asc"
            ? Number(aVal) - Number(bVal)
            : Number(bVal) - Number(aVal)
        }
        return 0
      })
    }

    return result
  }, [search, entityFilter, archFilter, govFilter, riskFilter, sortColumn, sortDirection])

  const toggleExpand = (id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelect = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selectedRows.size === filtered.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(filtered.map((p) => p.id)))
    }
  }

  const handleSort = (column: keyof Protocol) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const SortIcon = ({ column }: { column: keyof Protocol }) => {
    if (sortColumn !== column) return null
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 inline h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 inline h-4 w-4" />
    )
  }

  const selectedProtocols = protocols.filter((p) => selectedRows.has(p.id))

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/#navigator"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Navigator
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Full Protocol Registry
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            The complete convergence matrix — every protocol evaluated, with full metadata. For researchers, coalition builders, and power users.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-6 rounded-xl border border-border bg-card p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search protocols..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={entityFilter} onValueChange={setEntityFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Entity Type" />
              </SelectTrigger>
              <SelectContent>
                {entityTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={archFilter} onValueChange={setArchFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Architecture" />
              </SelectTrigger>
              <SelectContent>
                {architectureTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t === "All" ? "All" : archLabel(t)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={govFilter} onValueChange={setGovFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Governance" />
              </SelectTrigger>
              <SelectContent>
                {governanceModels.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t === "All" ? "All" : t.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Capture Risk" />
              </SelectTrigger>
              <SelectContent>
                {captureRisks.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t === "All" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <PromptExportDialog
              selectedProtocols={selectedProtocols}
              trigger={
                <Button variant="default" disabled={selectedRows.size === 0}>
                  Export Selected ({selectedRows.size})
                </Button>
              }
            />
          </div>
          <div className="mt-3 text-sm text-muted-foreground">
            Showing {filtered.length} of {protocols.length} protocols
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left">
                    <button
                      type="button"
                      onClick={toggleSelectAll}
                      className="flex h-5 w-5 items-center justify-center rounded border border-border bg-background transition-colors hover:bg-muted"
                    >
                      {selectedRows.size === filtered.length && filtered.length > 0 && (
                        <Check className="h-3 w-3 text-foreground" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    <button
                      type="button"
                      onClick={() => handleSort("name")}
                      className="inline-flex items-center hover:text-foreground"
                    >
                      Name
                      <SortIcon column="name" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    <button
                      type="button"
                      onClick={() => handleSort("entityType")}
                      className="inline-flex items-center hover:text-foreground"
                    >
                      Entity Type
                      <SortIcon column="entityType" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    <button
                      type="button"
                      onClick={() => handleSort("architectureType")}
                      className="inline-flex items-center hover:text-foreground"
                    >
                      Architecture
                      <SortIcon column="architectureType" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    <button
                      type="button"
                      onClick={() => handleSort("governanceModel")}
                      className="inline-flex items-center hover:text-foreground"
                    >
                      Governance
                      <SortIcon column="governanceModel" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    <button
                      type="button"
                      onClick={() => handleSort("captureRisk")}
                      className="inline-flex items-center hover:text-foreground"
                    >
                      Capture Risk
                      <SortIcon column="captureRisk" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    <button
                      type="button"
                      onClick={() => handleSort("selfHostable")}
                      className="inline-flex items-center hover:text-foreground"
                    >
                      Self-Hostable
                      <SortIcon column="selfHostable" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">
                    <button
                      type="button"
                      onClick={() => handleSort("lastInvestigated")}
                      className="inline-flex items-center hover:text-foreground"
                    >
                      Last Investigated
                      <SortIcon column="lastInvestigated" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((protocol) => {
                  const isExpanded = expandedRows.has(protocol.id)
                  const isSelected = selectedRows.has(protocol.id)
                  return (
                    <>
                      <tr
                        key={protocol.id}
                        className={`border-b border-border transition-colors hover:bg-muted/30 ${
                          isExpanded ? "bg-muted/20" : ""
                        }`}
                      >
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => toggleSelect(protocol.id)}
                            className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                              isSelected
                                ? "border-primary bg-primary"
                                : "border-border bg-background hover:bg-muted"
                            }`}
                          >
                            {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{protocol.name}</span>
                            {protocol.isDraft && (
                              <Badge variant="outline" className="text-xs text-muted-foreground">
                                ~ Draft
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{protocol.entityType}</td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {archLabel(protocol.architectureType)}
                        </td>
                        <td className="px-4 py-3">
                          <GovernanceBadge model={protocol.governanceModel} />
                        </td>
                        <td className="px-4 py-3">
                          <CaptureRiskIndicator risk={protocol.captureRisk} />
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {protocol.selfHostable ? "Yes" : "No"}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {protocol.lastInvestigated}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            type="button"
                            onClick={() => toggleExpand(protocol.id)}
                            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="h-4 w-4" />
                                Collapse
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4" />
                                Expand
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr key={`${protocol.id}-expanded`} className="border-b border-border bg-muted/10">
                          <td colSpan={9} className="px-4 py-4">
                            <div className="space-y-4">
                              <p className="text-sm text-muted-foreground">{protocol.summary}</p>
                              {protocol.contributorNote && (
                                <p className="text-sm italic text-muted-foreground">
                                  Note: {protocol.contributorNote}
                                </p>
                              )}
                              <div className="flex flex-wrap gap-4">
                                <div>
                                  <span className="text-xs font-medium uppercase text-muted-foreground">
                                    Verified Affordances
                                  </span>
                                  <div className="mt-1 flex flex-wrap gap-1">
                                    {protocol.verifiedAffordanceIds.map((id) => {
                                      const aff = affordances.find((a) => a.id === id)
                                      return (
                                        <Badge
                                          key={id}
                                          variant="outline"
                                          className="border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400"
                                        >
                                          {aff?.name || id}
                                        </Badge>
                                      )
                                    })}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-xs font-medium uppercase text-muted-foreground">
                                    Claimed Affordances
                                  </span>
                                  <div className="mt-1 flex flex-wrap gap-1">
                                    {protocol.claimedAffordanceIds.map((id) => {
                                      const aff = affordances.find((a) => a.id === id)
                                      return (
                                        <Badge key={id} variant="outline" className="text-muted-foreground">
                                          {aff?.name || id}
                                        </Badge>
                                      )
                                    })}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-muted-foreground">
                                  License: {protocol.sourceLicense}
                                </span>
                                {protocol.docLink && (
                                  <a
                                    href={protocol.docLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-primary hover:underline"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                    Docs
                                  </a>
                                )}
                                {protocol.communityLink && (
                                  <a
                                    href={protocol.communityLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-primary hover:underline"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                    Community
                                  </a>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  )
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No protocols match your filters.
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
