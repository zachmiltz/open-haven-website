"use client"

import { useState } from "react"
import {
  MessageCircle,
  FileEdit,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  ExternalLink,
} from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { protocols, categories } from "@/lib/protocol-data"

const recommendedProtocols = protocols.filter((p) => p.status === "recommended")

export function ProtocolDirectory() {
  const [showFullRegistry, setShowFullRegistry] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [expandedProtocol, setExpandedProtocol] = useState<string | null>(null)
  const [feedbackProtocol, setFeedbackProtocol] = useState<string | null>(null)

  const filteredProtocols = protocols.filter((protocol) => {
    const matchesSearch =
      protocol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      protocol.useCase.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      categoryFilter === "All" || protocol.category === categoryFilter
    const matchesStatus =
      statusFilter === "All" || protocol.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "recommended":
        return (
          <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
            Recommended
          </Badge>
        )
      case "considered":
        return (
          <Badge className="bg-warning/20 text-warning-foreground hover:bg-warning/30">
            Considered
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="text-muted-foreground">
            Not Selected
          </Badge>
        )
    }
  }

  return (
    <section id="protocols" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Protocol Directory
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Curated recommendations by use case, with full transparency on what
            we evaluated and why.
          </p>
        </div>

        {/* Use Case Matrix - Primary View */}
        <div className="mb-8 overflow-hidden rounded-xl border border-border bg-card">
          <div className="border-b border-border bg-muted/50 px-6 py-4">
            <h3 className="font-semibold text-foreground">
              Recommended Protocols by Use Case
            </h3>
          </div>

          <div className="divide-y divide-border">
            {recommendedProtocols.map((protocol) => (
              <div
                key={protocol.id}
                className="group px-6 py-5 transition-colors hover:bg-muted/30"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-primary">
                        {protocol.useCase}
                      </span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-semibold text-foreground">
                        {protocol.name}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {protocol.rationale}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium">Alternatives:</span>
                      {protocol.alternatives.map((alt, i) => (
                        <span key={alt}>
                          {alt}
                          {i < protocol.alternatives.length - 1 && ","}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    {protocol.communityLink && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 bg-transparent"
                        asChild
                      >
                        <a
                          href={protocol.communityLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Join Conversation
                        </a>
                      </Button>
                    )}
                    <Dialog
                      open={feedbackProtocol === protocol.id}
                      onOpenChange={(open) =>
                        setFeedbackProtocol(open ? protocol.id : null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                          <FileEdit className="h-4 w-4" />
                          Feedback
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Submit Feedback on {protocol.name}
                          </DialogTitle>
                          <DialogDescription>
                            Share your experience or suggestions for this
                            protocol evaluation.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="feedback-type">Feedback Type</Label>
                            <Select defaultValue="suggestion">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="suggestion">
                                  Suggestion
                                </SelectItem>
                                <SelectItem value="correction">
                                  Correction
                                </SelectItem>
                                <SelectItem value="experience">
                                  Experience Report
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="feedback-message">Message</Label>
                            <Textarea
                              id="feedback-message"
                              placeholder="Share your feedback..."
                              rows={4}
                            />
                          </div>
                        </div>
                        <Button className="w-full">Submit Feedback</Button>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Registry Toggle */}
        <div className="mb-6">
          <Button
            variant="outline"
            className="w-full gap-2 sm:w-auto bg-transparent"
            onClick={() => setShowFullRegistry(!showFullRegistry)}
          >
            {showFullRegistry ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Hide Full Registry
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                View All Evaluated Protocols
              </>
            )}
          </Button>
        </div>

        {/* Full Registry */}
        {showFullRegistry && (
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            {/* Filters */}
            <div className="flex flex-col gap-4 border-b border-border bg-muted/50 p-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search protocols..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Status</SelectItem>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="considered">Considered</SelectItem>
                  <SelectItem value="not-selected">Not Selected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Protocol List */}
            <div className="divide-y divide-border">
              {filteredProtocols.map((protocol) => (
                <div key={protocol.id} className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedProtocol(
                        expandedProtocol === protocol.id ? null : protocol.id
                      )
                    }
                    className="flex w-full items-center justify-between text-left"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-semibold text-foreground">
                        {protocol.name}
                      </span>
                      {getStatusBadge(protocol.status)}
                      <Badge variant="outline" className="text-xs">
                        {protocol.category}
                      </Badge>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        expandedProtocol === protocol.id && "rotate-180"
                      )}
                    />
                  </button>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {protocol.summary}
                  </p>

                  {expandedProtocol === protocol.id && (
                    <div className="mt-4 rounded-lg bg-muted/50 p-4">
                      <h4 className="mb-2 text-sm font-medium text-foreground">
                        Evaluation Rationale
                      </h4>
                      <p className="mb-4 text-sm text-muted-foreground">
                        {protocol.rationale}
                      </p>
                      {protocol.docLink && (
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={protocol.docLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gap-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Documentation
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {filteredProtocols.length === 0 && (
                <div className="px-6 py-12 text-center text-muted-foreground">
                  No protocols found matching your filters.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
