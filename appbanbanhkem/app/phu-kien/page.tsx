import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AccessoriesHero } from "@/components/accessories-hero"
import { AccessoriesGrid } from "@/components/accessories-grid"
import { CategoryFilters } from "@/components/category-filters"

export default function AccessoriesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AccessoriesHero />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CategoryFilters category="accessories" />
          </div>
          <div className="lg:col-span-3">
            <AccessoriesGrid />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
