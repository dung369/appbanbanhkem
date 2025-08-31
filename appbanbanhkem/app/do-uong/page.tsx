import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BeverageHero } from "@/components/beverage-hero"
import { BeverageGrid } from "@/components/beverage-grid"
import { CategoryFilters } from "@/components/category-filters"

export default function BeveragePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <BeverageHero />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CategoryFilters category="beverages" />
          </div>
          <div className="lg:col-span-3">
            <BeverageGrid />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
