import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WeddingCakeHero } from "@/components/wedding-cake-hero"
import { ProductList } from "@/components/product-list"
import { CategoryFilters } from "@/components/category-filters"

export default function WeddingCakePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <WeddingCakeHero />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CategoryFilters category="wedding" />
          </div>
          <div className="lg:col-span-3">
            <ProductList
              category="wedding"
              title="Bánh Cưới"
              description="Những mẫu bánh cưới sang trọng và lãng mạn"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
