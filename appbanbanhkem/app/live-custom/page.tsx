import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LiveCustomDesigner } from "@/components/live-custom-designer"

export default function LiveCustomPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <LiveCustomDesigner />
      <Footer />
    </div>
  )
}
