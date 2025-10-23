import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HotTrendHero } from "@/components/hot-trend-hero"
import { ProductList } from "@/components/product-list"
import { CategoryFilters } from "@/components/category-filters"

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
            <ProductList
              category="hot-trend"
              title="🔥 Hot Trend"
              description="Những sản phẩm đang được yêu thích nhất"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
