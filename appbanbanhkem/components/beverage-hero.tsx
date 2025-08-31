import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function BeverageHero() {
  return (
    <section className="bg-gradient-to-r from-blue-100 via-cyan-50 to-blue-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <Badge className="bg-blue-500 text-white px-4 py-2 text-lg">🥤 ĐỒ UỐNG</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Đồ uống
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500"> tươi mát</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bộ sưu tập đồ uống đa dạng từ trà sữa, cà phê, nước ép tươi đến các loại smoothie bổ dưỡng. Hoàn hảo để kết
            hợp cùng bánh ngọt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500">
              🛒 Đặt đồ uống ngay
            </Button>
            <Button size="lg" variant="outline">
              🎁 Combo bánh + nước
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
