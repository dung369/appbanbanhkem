import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HotTrendHero } from "@/components/hot-trend-hero"
import { ProductGrid } from "@/components/product-grid"
import { CategoryFilters } from "@/components/category-filters"

const hotTrendCakes = [
  {
    id: 1,
    name: "Bánh Money Cake - Rút tiền",
    price: "680.000đ",
    originalPrice: "800.000đ",
    rating: 4.9,
    orders: 456,
    image: "/placeholder.svg?height=300&width=300",
    category: "Viral TikTok",
    size: "Hộp 20x20cm",
    flavor: "Chocolate",
    isCustomizable: true,
    trending: true,
  },
  {
    id: 2,
    name: "Bánh Squid Game",
    price: "520.000đ",
    originalPrice: "620.000đ",
    rating: 4.8,
    orders: 389,
    image: "/placeholder.svg?height=300&width=300",
    category: "Phim hot",
    size: "Vuông 25cm",
    flavor: "Red Velvet",
    isCustomizable: true,
    trending: true,
  },
  {
    id: 3,
    name: "Bánh Bubble Tea 3D",
    price: "450.000đ",
    originalPrice: "550.000đ",
    rating: 4.7,
    orders: 234,
    image: "/placeholder.svg?height=300&width=300",
    category: "Đồ uống",
    size: "Hình ly 15x25cm",
    flavor: "Taro",
    isCustomizable: true,
    trending: true,
  },
  {
    id: 4,
    name: "Bánh Among Us",
    price: "380.000đ",
    originalPrice: "450.000đ",
    rating: 4.6,
    orders: 298,
    image: "/placeholder.svg?height=300&width=300",
    category: "Game",
    size: "Tròn 20cm",
    flavor: "Vanilla",
    isCustomizable: true,
    trending: true,
  },
  {
    id: 5,
    name: "Bánh BTS Army",
    price: "590.000đ",
    originalPrice: "690.000đ",
    rating: 4.9,
    orders: 567,
    image: "/placeholder.svg?height=300&width=300",
    category: "K-pop",
    size: "Tròn 25cm",
    flavor: "Purple Yam",
    isCustomizable: true,
    trending: true,
  },
  {
    id: 6,
    name: "Bánh Minimalist Hàn Quốc",
    price: "420.000đ",
    originalPrice: "500.000đ",
    rating: 4.8,
    orders: 345,
    image: "/placeholder.svg?height=300&width=300",
    category: "K-style",
    size: "Tròn 18cm",
    flavor: "Matcha",
    isCustomizable: true,
    trending: true,
  },
]

export default function HotTrendPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HotTrendHero />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CategoryFilters category="hottrend" />
          </div>
          <div className="lg:col-span-3">
            <ProductGrid products={hotTrendCakes} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
