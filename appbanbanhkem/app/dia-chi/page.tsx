import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AddressManager } from "@/components/address-manager"

export default function AddressPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AddressManager />
      <Footer />
    </div>
  )
}
