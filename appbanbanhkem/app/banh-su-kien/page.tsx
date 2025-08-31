import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EventCakeHero } from "@/components/event-cake-hero"
import { ProductGrid } from "@/components/product-grid"
import { CategoryFilters } from "@/components/category-filters"

const eventCakes = [
  {
    id: 1,
    name: "Bánh khai trương công ty",
    price: "850.000đ",
    originalPrice: "1.000.000đ",
    rating: 4.8,
    orders: 123,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bánh khai trương",
    size: "Vuông 30x40cm",
    flavor: "Vanilla",
    isCustomizable: true,
  },
  {
    id: 2,
    name: "Bánh tốt nghiệp",
    price: "420.000đ",
    originalPrice: "500.000đ",
    rating: 4.7,
    orders: 89,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bánh tốt nghiệp",
    size: "Tròn 25cm",
    flavor: "Chocolate",
    isCustomizable: true,
  },
  {
    id: 3,
    name: "Bánh thôi nôi em bé",
    price: "380.000đ",
    originalPrice: "450.000đ",
    rating: 4.9,
    orders: 156,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bánh thôi nôi",
    size: "Tròn 20cm",
    flavor: "Strawberry",
    isCustomizable: true,
  },
  {
    id: 4,
    name: "Bánh lễ hội Trung thu",
    price: "320.000đ",
    originalPrice: "400.000đ",
    rating: 4.6,
    orders: 234,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bánh lễ hội",
    size: "Tròn 22cm",
    flavor: "Lotus",
    isCustomizable: true,
  },
]

export default function EventCakePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <EventCakeHero />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CategoryFilters category="event" />
          </div>
          <div className="lg:col-span-3">
            <ProductGrid products={eventCakes} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
