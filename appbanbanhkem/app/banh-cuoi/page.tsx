import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WeddingCakeHero } from "@/components/wedding-cake-hero"
import { ProductGrid } from "@/components/product-grid"
import { CategoryFilters } from "@/components/category-filters"

const weddingCakes = [
  {
    id: 1,
    name: "Bánh cưới 3 tầng hoa hồng trắng",
    price: "1.200.000đ",
    originalPrice: "1.400.000đ",
    rating: 4.9,
    orders: 89,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bánh 3 tầng",
    size: "3 tầng (15-20-25cm)",
    flavor: "Vanilla & Chocolate",
    isCustomizable: true,
  },
  {
    id: 2,
    name: "Bánh cưới sang trọng 4 tầng",
    price: "1.800.000đ",
    originalPrice: "2.100.000đ",
    rating: 4.8,
    orders: 45,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bánh 4 tầng",
    size: "4 tầng (12-16-20-24cm)",
    flavor: "Red Velvet & Vanilla",
    isCustomizable: true,
  },
  {
    id: 3,
    name: "Bánh cưới minimalist",
    price: "950.000đ",
    originalPrice: "1.150.000đ",
    rating: 4.7,
    orders: 67,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bánh đơn giản",
    size: "2 tầng (18-25cm)",
    flavor: "Lemon & Strawberry",
    isCustomizable: true,
  },
  {
    id: 4,
    name: "Bánh cưới hoa tươi",
    price: "1.350.000đ",
    originalPrice: "1.600.000đ",
    rating: 4.9,
    orders: 78,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bánh hoa tươi",
    size: "3 tầng (16-22-28cm)",
    flavor: "Vanilla & Fruit",
    isCustomizable: true,
  },
]

export default function WeddingCakePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <WeddingCakeHero />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CategoryFilters category="wedding" />
          </div>
          <div className="lg:col-span-3">
            <ProductGrid products={weddingCakes} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
