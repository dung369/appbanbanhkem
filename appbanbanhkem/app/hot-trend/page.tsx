import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HotTrendHero } from "@/components/hot-trend-hero"
import { ProductGrid } from "@/components/product-grid"
import { CategoryFilters } from "@/components/category-filters"

// Dữ liệu sản phẩm sẽ do Admin thêm, hiện không truyền danh sách mặc định

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
            <ProductGrid />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
