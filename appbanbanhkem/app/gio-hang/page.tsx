import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShoppingCartComponent } from "@/components/shopping-cart"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ShoppingCartComponent />
      <Footer />
    </div>
  )
}
