import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedCategories } from "@/components/featured-categories"
import { HotTrendCakes } from "@/components/hot-trend-cakes"
import { BestSellers } from "@/components/best-sellers"
import { Services } from "@/components/services"
import { Footer } from "@/components/footer"
import { FlashSaleBanner } from "@/components/flash-sale-banner"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />

      {/* Flash Sale Banner */}
      <div className="container mx-auto px-4 py-8">
        <FlashSaleBanner />
      </div>

      <FeaturedCategories />
      <HotTrendCakes />
      <BestSellers />
      <Services />
      <Footer />
    </div>
  )
}
