import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { KidsCakeHero } from "@/components/kids-cake-hero"
import { ProductList } from "@/components/product-list"
import { CategoryFilters } from "@/components/category-filters"

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
            <ProductList
              category="kids"
              title="Bánh Trẻ Em"
              description="Bánh dành cho các bé yêu"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
