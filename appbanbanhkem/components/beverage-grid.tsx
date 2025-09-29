"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Eye, Heart, Thermometer, Clock } from "lucide-react"

interface Beverage {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  orders: number
  image: string
  category: string
  description: string
  temperature: "hot" | "cold" | "both"
  prepTime: string
  size: string[]
  isPopular?: boolean
  isNew?: boolean
}

export function BeverageGrid() {
  const [beverages] = useState<Beverage[]>([])

  const getTemperatureIcon = (temp: string) => {
    switch (temp) {
      case "hot":
        return <Thermometer className="w-4 h-4 text-red-500" />
      case "cold":
        return <Thermometer className="w-4 h-4 text-blue-500" />
      case "both":
        return <Thermometer className="w-4 h-4 text-purple-500" />
      default:
        return null
    }
  }

  const getTemperatureText = (temp: string) => {
    switch (temp) {
      case "hot":
        return "Nóng"
      case "cold":
        return "Lạnh"
      case "both":
        return "Nóng/Lạnh"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      {/* Sort and View Options */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Hiển thị {beverages.length} sản phẩm</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sắp xếp:</span>
          <Button variant="outline" size="sm">
            Bán chạy
          </Button>
          <Button variant="outline" size="sm">
            Giá thấp
          </Button>
          <Button variant="outline" size="sm">
            Đánh giá cao
          </Button>
        </div>
      </div>

      {beverages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border rounded-lg bg-gray-50 text-center">
          <img src="/placeholder.svg" alt="No products" className="w-20 h-20 opacity-40 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Chưa có sản phẩm</h3>
          <p className="text-sm text-gray-600">Sản phẩm sẽ hiển thị tại đây sau khi Admin thêm mới.</p>
        </div>
      ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beverages.map((beverage) => (
          <Card key={beverage.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative">
              <img
                src={beverage.image || "/placeholder.svg"}
                alt={beverage.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 space-y-2">
                {beverage.isPopular && <Badge className="bg-orange-500 text-white">🔥 Bán chạy</Badge>}
                {beverage.isNew && <Badge className="bg-green-500 text-white">✨ Mới</Badge>}
                {beverage.originalPrice && (
                  <Badge className="bg-red-500 text-white">
                    -{Math.round((1 - beverage.price / beverage.originalPrice) * 100)}%
                  </Badge>
                )}
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <Button size="sm" variant="secondary" className="bg-white/90">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/90">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <Badge variant="outline" className="text-xs mb-2">
                    {beverage.category}
                  </Badge>
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{beverage.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{beverage.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    {getTemperatureIcon(beverage.temperature)}
                    <span>{getTemperatureText(beverage.temperature)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{beverage.prepTime}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{beverage.rating}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{beverage.orders} đã bán</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-blue-600">{beverage.price.toLocaleString()}đ</span>
                    {beverage.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {beverage.originalPrice.toLocaleString()}đ
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {beverage.size.map((size) => (
                      <Badge key={size} variant="outline" className="text-xs">
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Thêm vào giỏ
                  </Button>
                  <Button variant="outline" size="sm">
                    Chi tiết
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      )}

      {/* Combo Suggestions */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-gray-900">🎁 Combo bánh + đồ uống</h3>
            <p className="text-gray-600">Kết hợp bánh ngọt với đồ uống yêu thích để có trải nghiệm hoàn hảo!</p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">🧁 Combo Sinh nhật</h4>
                <p className="text-sm text-gray-600 mb-2">Bánh sinh nhật + Trà sữa + Nến</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">520.000đ</span>
                  <span className="text-sm text-gray-400 line-through">650.000đ</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">☕ Combo Cà phê</h4>
                <p className="text-sm text-gray-600 mb-2">Bánh tiramisu + Cappuccino</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">420.000đ</span>
                  <span className="text-sm text-gray-400 line-through">520.000đ</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">🌟 Combo Cao cấp</h4>
                <p className="text-sm text-gray-600 mb-2">Bánh 3 tầng + 4 đồ uống</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">1.250.000đ</span>
                  <span className="text-sm text-gray-400 line-through">1.500.000đ</span>
                </div>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
              Xem tất cả combo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-8">
        <Button variant="outline" size="sm">
          Trước
        </Button>
        <Button size="sm" className="bg-blue-500 text-white">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          Sau
        </Button>
      </div>
    </div>
  )
}
