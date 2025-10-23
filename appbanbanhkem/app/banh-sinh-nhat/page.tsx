import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BirthdayCakeHero } from "@/components/birthday-cake-hero"
import { ProductList } from "@/components/product-list"
import { CategoryFilters } from "@/components/category-filters"

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
            <ProductList
              category="birthday"
              title="Bánh Sinh Nhật"
              description="Những mẫu bánh sinh nhật đẹp và độc đáo nhất"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
