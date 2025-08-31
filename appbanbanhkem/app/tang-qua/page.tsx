import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GiftSurpriseForm } from "@/components/gift-surprise-form"

export default function GiftSurprisePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <Header />
      <GiftSurpriseForm />
      <Footer />
    </div>
  )
}
