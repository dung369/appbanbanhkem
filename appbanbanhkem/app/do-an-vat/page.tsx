import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SnackHero } from "@/components/snack-hero"
import { ProductList } from "@/components/product-list"
import { CategoryFilters } from "@/components/category-filters"

export default function SnackPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SnackHero />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CategoryFilters category="snacks" />
          </div>
          <div className="lg:col-span-3">
            <ProductList
              category="snack"
              title="Đồ Ăn Vặt Ngon"
              description="Các món ăn vặt thơm ngon hấp dẫn"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
