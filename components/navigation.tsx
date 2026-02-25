"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { label: "Principles", href: "#principles" },
  { label: "Protocols", href: "#protocols" },
  { label: "Export", href: "#export" },
  { label: "Contributors", href: "#contributors" },
  { label: "Resources", href: "#resources" },
]

export function Navigation() {
  const [open, setOpen] = useState(false)

  const scrollTo = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setOpen(false)
  }

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => scrollTo("#hero")}
          className="flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="font-mono text-sm font-bold text-primary-foreground">
              OP
            </span>
          </div>
          <span className="hidden font-semibold text-foreground sm:inline">
            Open Protocol Navigator
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => scrollTo(item.href)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </button>
          ))}
          <Button
            size="sm"
            className="ml-4"
            onClick={() => scrollTo("#protocols")}
          >
            Find Your Stack
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="mt-8 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => scrollTo(item.href)}
                  className="rounded-md px-3 py-2 text-left text-base font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {item.label}
                </button>
              ))}
              <Button
                className="mt-4"
                onClick={() => scrollTo("#protocols")}
              >
                Find Your Stack
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
