import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CustomCakeDesigner } from "@/components/custom-cake-designer"

export default function CustomCakePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CustomCakeDesigner />
      <Footer />
    </div>
  )
}
