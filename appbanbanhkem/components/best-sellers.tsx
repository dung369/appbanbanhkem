import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"

type BestSeller = { name: string; price: string; rating: number; orders: number; image?: string }
const bestSellers: BestSeller[] = []

export function BestSellers() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-yellow-500 text-white px-4 py-2 text-lg mb-4">⭐ BÁN CHẠY NHẤT</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Những chiếc bánh được yêu thích nhất</h2>
        </div>

        {bestSellers.length === 0 ? (
          <div className="border rounded-lg bg-white py-12 text-center text-gray-600">
            Chưa có sản phẩm bán chạy. Sản phẩm sẽ hiển thị khi Admin thêm vào.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((cake, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <img
                  src={cake.image || "/placeholder.svg"}
                  alt={cake.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 left-2 bg-yellow-500 text-white text-xs">#{index + 1}</Badge>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{cake.name}</h3>

                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium ml-1">{cake.rating}</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="text-sm text-gray-600">{cake.orders} đã bán</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-pink-600">{cake.price}</span>
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        )}
      </div>
    </section>
  )
}
