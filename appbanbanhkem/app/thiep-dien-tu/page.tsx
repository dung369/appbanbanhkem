import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DigitalCardDesigner } from "@/components/digital-card-designer"

export default function DigitalCardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <Header />
      <DigitalCardDesigner />
      <Footer />
    </div>
  )
}
