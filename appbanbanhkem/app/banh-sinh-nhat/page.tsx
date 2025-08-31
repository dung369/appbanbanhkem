import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BirthdayCakeHero } from "@/components/birthday-cake-hero"
import { ProductGrid } from "@/components/product-grid"
import { CategoryFilters } from "@/components/category-filters"

const birthdayCakes = [
  {
    id: 1,
    name: "Bánh sinh nhật hoa hồng",
    price: "450.000đ",
    originalPrice: "550.000đ",
    rating: 4.9,
    orders: 234,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bánh hoa",
    size: "Tròn 20cm",
    flavor: "Vanilla",
    isCustomizable: true,
  },
  {
    id: 2,
    name: "Bánh sinh nhật chocolate 3 tầng",
    price: "680.000đ",
    originalPrice: "780.000đ",
    rating: 4.8,
    orders: 189,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bánh nhiều tầng",
    size: "3 tầng",
    flavor: "Chocolate",
    isCustomizable: true,
  },
  {
    id: 3,
    name: "Bánh sinh nhật trái cây tươi",
    price: "520.000đ",
    originalPrice: "600.000đ",
    rating: 4.7,
    orders: 156,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bánh trái cây",
    size: "Vuông 25cm",
    flavor: "Dâu tây",
    isCustomizable: true,
  },
  {
    id: 4,
    name: "Bánh sinh nhật red velvet",
    price: "420.000đ",
    originalPrice: "500.000đ",
    rating: 4.9,
    orders: 298,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bánh đặc biệt",
    size: "Tròn 22cm",
    flavor: "Red Velvet",
    isCustomizable: true,
  },
  {
    id: 5,
    name: "Bánh sinh nhật tiramisu",
    price: "480.000đ",
    originalPrice: "580.000đ",
    rating: 4.8,
    orders: 145,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bánh đặc biệt",
    size: "Tròn 20cm",
    flavor: "Tiramisu",
    isCustomizable: true,
  },
  {
    id: 6,
    name: "Bánh sinh nhật matcha",
    price: "390.000đ",
    originalPrice: "470.000đ",
    rating: 4.6,
    orders: 267,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bánh trà xanh",
    size: "Tròn 18cm",
    flavor: "Matcha",
    isCustomizable: true,
  },
]

export default function BirthdayCakePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <BirthdayCakeHero />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CategoryFilters category="birthday" />
          </div>
          <div className="lg:col-span-3">
            <ProductGrid products={birthdayCakes} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
