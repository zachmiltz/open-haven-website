// app/page.tsx
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { BetaBadge } from "@/components/sections/beta-badge"
import { ConvergenceSection } from "@/components/sections/convergence-section"
import { NavigatorSection } from "@/components/sections/navigator-section"
import { ContributorsSection } from "@/components/sections/contributors-section"
import { ResourcesSection } from "@/components/sections/resources-section"
import { Footer } from "@/components/footer"
import { ProtocolChatbot } from "@/components/protocol-chatbot"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <BetaBadge />
      <ConvergenceSection />
      <NavigatorSection />
      <ContributorsSection />
      <ResourcesSection />
      <Footer />
      <ProtocolChatbot />
    </main>
  )
}
