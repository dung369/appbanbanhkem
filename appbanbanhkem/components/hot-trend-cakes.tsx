import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"

const hotTrendCakes = [
  {
    name: "Bánh Doraemon",
    description: "Hình mặt Doraemon xanh đáng yêu, cực hợp sinh nhật bé trai",
    price: "450.000đ",
    originalPrice: "550.000đ",
    rating: 4.9,
    orders: 234,
    image: "/placeholder.svg?height=250&width=250",
    trending: true,
  },
  {
    name: "Bánh Pikachu",
    description: "Màu vàng nổi bật, tai & đuôi tạo hình cực cute",
    price: "420.000đ",
    originalPrice: "500.000đ",
    rating: 4.8,
    orders: 189,
    image: "/placeholder.svg?height=250&width=250",
    trending: true,
  },
  {
    name: "Bánh Gấu Panda",
    description: 'Bánh đơn giản mà đẹp, rất "Instagrammable"',
    price: "380.000đ",
    originalPrice: "450.000đ",
    rating: 4.7,
    orders: 156,
    image: "/placeholder.svg?height=250&width=250",
    trending: false,
  },
  {
    name: "Rainbow Cake",
    description: "Bánh nhiều lớp màu bên trong, cực bắt mắt khi cắt",
    price: "520.000đ",
    originalPrice: "600.000đ",
    rating: 4.9,
    orders: 298,
    image: "/placeholder.svg?height=250&width=250",
    trending: true,
  },
  {
    name: "Barbie Cake",
    description: "Búp bê thật, váy là phần bánh — bé gái rất thích",
    price: "680.000đ",
    originalPrice: "780.000đ",
    rating: 4.8,
    orders: 145,
    image: "/placeholder.svg?height=250&width=250",
    trending: false,
  },
  {
    name: "Bánh in ảnh",
    description: "In ảnh người thân, idol… lên mặt bánh",
    price: "350.000đ",
    originalPrice: "420.000đ",
    rating: 4.6,
    orders: 267,
    image: "/placeholder.svg?height=250&width=250",
    trending: true,
  },
]

export function HotTrendCakes() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 text-lg">
              🔥 HOT TREND
            </Badge>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Bánh đang "viral" trên mạng xã hội</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Những mẫu bánh được đặt nhiều nhất, phù hợp với xu hướng hiện tại
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotTrendCakes.map((cake, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={cake.image || "/placeholder.svg"}
                  alt={cake.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {cake.trending && <Badge className="absolute top-3 left-3 bg-red-500 text-white">🔥 Trending</Badge>}
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{cake.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{cake.description}</p>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{cake.rating}</span>
                  </div>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="text-sm text-gray-600">{cake.orders} đã bán</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-pink-600">{cake.price}</span>
                    <span className="text-sm text-gray-400 line-through">{cake.originalPrice}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Đặt nhanh
                  </Button>
                  <Button variant="outline" size="sm">
                    Xem chi tiết
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button size="lg" variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent">
            Xem tất cả bánh Hot Trend →
          </Button>
        </div>
      </div>
    </section>
  )
}
