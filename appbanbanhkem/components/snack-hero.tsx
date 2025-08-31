import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function SnackHero() {
  return (
    <section className="bg-gradient-to-r from-orange-100 via-yellow-50 to-orange-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <Badge className="bg-orange-500 text-white px-4 py-2 text-lg">🍿 ĐỒ ĂN VẶT</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Đồ ăn vặt
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              {" "}
              ngon miệng
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Thưởng thức những món ăn vặt thơm ngon: bánh quy, kẹo, chocolate, hạt rang và nhiều món ngon khác. Hoàn hảo
            cho mọi dịp!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500">
              🛒 Mua đồ ăn vặt
            </Button>
            <Button size="lg" variant="outline">
              🎁 Combo tiệc nhỏ
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
