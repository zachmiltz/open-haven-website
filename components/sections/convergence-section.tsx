import { Users, GitMerge, Globe } from "lucide-react"

const signals = [
  {
    icon: GitMerge,
    title: "Technical Convergence Emerging",
    description:
      "Across 69+ protocols catalogued, clear clusters are forming around local-first data sync, federated identity, and censorship-resistant communication. The convergence matrix is making these patterns visible for the first time.",
  },
  {
    icon: Users,
    title: "The Coalition Is Growing",
    description:
      "OpenHaven is built by a coalition spanning CTA, DWeb, ARG, and independent researchers. This page represents collective work — not a single organization's view of the landscape.",
  },
  {
    icon: Globe,
    title: "Social Convergence Precedes Technical",
    description:
      "Technical interoperability depends on social interoperability. OpenHaven maps both — the protocols and the people building community around them.",
  },
]

export function ConvergenceSection() {
  return (
    <section id="convergence" className="bg-card px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 text-center">
          <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            State of Convergence — Beta Draft
          </span>
        </div>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            We Are Converging
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            This section will be authored collaboratively by OpenHaven, CTA, DWeb, and the Atlas Research Group.
            What follows is a placeholder — the real narrative is being written together.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {signals.map((signal) => (
            <div
              key={signal.title}
              className="rounded-xl border border-border bg-background p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <signal.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{signal.title}</h3>
              <p className="text-sm text-muted-foreground">{signal.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Want to contribute to this narrative?</strong>{" "}
            We're looking for coalition members and researchers to co-author the State of Convergence.{" "}
            <a href="#contributors" className="text-primary underline-offset-4 hover:underline">
              Get involved →
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
