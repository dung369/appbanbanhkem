import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EventCakeHero } from "@/components/event-cake-hero"
import { ProductList } from "@/components/product-list"
import { CategoryFilters } from "@/components/category-filters"

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
            <ProductList
              category="event"
              title="Bánh Sự Kiện"
              description="Bánh cho các sự kiện đặc biệt"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
