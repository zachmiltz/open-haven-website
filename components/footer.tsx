import { Github, Mail } from "lucide-react"

const footerLinks = [
  { label: "About", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Contact", href: "#" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="font-mono text-sm font-bold text-primary-foreground">
                  OP
                </span>
              </div>
              <span className="font-semibold text-foreground">
                Open Protocol Navigator
              </span>
            </div>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              In partnership with the Collaborative Technology Alliance
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm italic text-muted-foreground">
            "Built for convergence, not competition"
          </p>
        </div>
      </div>
    </footer>
  )
}
