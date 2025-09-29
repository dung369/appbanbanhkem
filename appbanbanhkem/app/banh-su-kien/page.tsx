import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EventCakeHero } from "@/components/event-cake-hero"
import { ProductGrid } from "@/components/product-grid"
import { CategoryFilters } from "@/components/category-filters"

// Dữ liệu sản phẩm sẽ do Admin thêm, hiện không truyền danh sách mặc định

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
            <ProductGrid />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
