import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { DisclaimerBanner } from "@/components/sections/disclaimer-banner"
import { PrinciplesSection } from "@/components/sections/principles-section"
import { ProtocolDirectory } from "@/components/sections/protocol-directory"
import { ExportSection } from "@/components/sections/export-section"
import { ContributorsSection } from "@/components/sections/contributors-section"
import { ResourcesSection } from "@/components/sections/resources-section"
import { Footer } from "@/components/footer"
import { ProtocolChatbot } from "@/components/protocol-chatbot"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <DisclaimerBanner />
      <PrinciplesSection />
      <ProtocolDirectory />
      <ExportSection />
      <ContributorsSection />
      <ResourcesSection />
      <Footer />
      <ProtocolChatbot />
    </main>
  )
}
