import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { KidsCakeHero } from "@/components/kids-cake-hero"
import { ProductGrid } from "@/components/product-grid"
import { CategoryFilters } from "@/components/category-filters"

const kidsCakes = [
  {
    id: 1,
    name: "Bánh Doraemon 3D",
    price: "520.000đ",
    originalPrice: "620.000đ",
    rating: 4.9,
    orders: 345,
    image: "/placeholder.svg?height=300&width=300",
    category: "Nhân vật hoạt hình",
    size: "Tròn 20cm",
    flavor: "Vanilla",
    isCustomizable: true,
  },
  {
    id: 2,
    name: "Bánh công chúa Elsa",
    price: "480.000đ",
    originalPrice: "580.000đ",
    rating: 4.8,
    orders: 267,
    image: "/placeholder.svg?height=300&width=300",
    category: "Công chúa",
    size: "Tròn 22cm",
    flavor: "Blueberry",
    isCustomizable: true,
  },
  {
    id: 3,
    name: "Bánh siêu nhân Spider-Man",
    price: "450.000đ",
    originalPrice: "550.000đ",
    rating: 4.7,
    orders: 189,
    image: "/placeholder.svg?height=300&width=300",
    category: "Siêu anh hùng",
    size: "Tròn 20cm",
    flavor: "Chocolate",
    isCustomizable: true,
  },
  {
    id: 4,
    name: "Bánh xe ô tô đua",
    price: "420.000đ",
    originalPrice: "500.000đ",
    rating: 4.8,
    orders: 156,
    image: "/placeholder.svg?height=300&width=300",
    category: "Xe cộ",
    size: "Hình xe 25x15cm",
    flavor: "Strawberry",
    isCustomizable: true,
  },
  {
    id: 5,
    name: "Bánh My Little Pony",
    price: "390.000đ",
    originalPrice: "470.000đ",
    rating: 4.6,
    orders: 234,
    image: "/placeholder.svg?height=300&width=300",
    category: "Pony",
    size: "Tròn 18cm",
    flavor: "Rainbow",
    isCustomizable: true,
  },
  {
    id: 6,
    name: "Bánh Pokemon Pikachu",
    price: "460.000đ",
    originalPrice: "560.000đ",
    rating: 4.9,
    orders: 298,
    image: "/placeholder.svg?height=300&width=300",
    category: "Pokemon",
    size: "Tròn 20cm",
    flavor: "Lemon",
    isCustomizable: true,
  },
]

export default function KidsCakePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <KidsCakeHero />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CategoryFilters category="kids" />
          </div>
          <div className="lg:col-span-3">
            <ProductGrid products={kidsCakes} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
