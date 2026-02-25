"use client"

import { ArrowDown, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MyceliumBackground } from "@/components/mycelium-background"

export function HeroSection() {
  const scrollTo = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-16"
    >
      <MyceliumBackground />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm backdrop-blur-sm">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="text-muted-foreground">
            In partnership with the Collaborative Technology Alliance
          </span>
        </div>

        <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Navigate the{" "}
          <span className="text-primary">Open Protocol</span>{" "}
          Landscape
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
          A community-curated guide to decentralized infrastructure — helping
          you choose the right protocols for data sovereignty,
          interoperability, and local-first applications.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="gap-2 px-8"
            onClick={() => scrollTo("#protocols")}
          >
            Find Your Stack
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 bg-transparent"
            onClick={() => scrollTo("#principles")}
          >
            <BookOpen className="h-4 w-4" />
            Learn the Fundamentals
          </Button>
        </div>

        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => scrollTo("#disclaimer")}
            className="flex animate-bounce flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Scroll down"
          >
            <span className="text-xs">Scroll to explore</span>
            <ArrowDown className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
