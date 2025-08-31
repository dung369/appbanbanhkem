import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-pink-100 via-purple-50 to-pink-100 py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
                Bánh kem
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                  {" "}
                  tươi ngon
                </span>
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700">Giao tận nơi 🚚</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Đặt bánh online dễ dàng, tùy chỉnh theo ý thích. Giao hàng nhanh chóng, bánh tươi ngon đảm bảo chất
                lượng.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                🛒 Đặt bánh ngay
              </Button>
              <Button size="lg" variant="outline">
                🎨 Tùy chỉnh bánh riêng
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">10K+</div>
                <div className="text-sm text-gray-600">Khách hàng</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">500+</div>
                <div className="text-sm text-gray-600">Mẫu bánh</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">24/7</div>
                <div className="text-sm text-gray-600">Hỗ trợ</div>
              </div>
            </div>
          </div>

          {/* Right content - Hero image */}
          <div className="relative">
            <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Bánh kem đẹp"
                className="w-full h-80 object-cover rounded-lg"
              />
              <div className="absolute -top-4 -right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                -20% 🎉
              </div>
            </Card>

            {/* Floating elements */}
            <div className="absolute -bottom-4 -left-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              ⭐ 4.9/5 đánh giá
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
