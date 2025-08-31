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
  const [beverages] = useState<Beverage[]>([
    {
      id: 1,
      name: "Trà sữa trân châu đường đen",
      price: 45000,
      originalPrice: 55000,
      rating: 4.8,
      orders: 2341,
      image: "/placeholder.svg?height=200&width=200",
      category: "Trà sữa",
      description: "Trà sữa thơm ngon với trân châu đường đen dai ngon",
      temperature: "both",
      prepTime: "5-7 phút",
      size: ["M", "L"],
      isPopular: true,
    },
    {
      id: 2,
      name: "Cà phê sữa đá Việt Nam",
      price: 35000,
      originalPrice: 42000,
      rating: 4.9,
      orders: 1876,
      image: "/placeholder.svg?height=200&width=200",
      category: "Cà phê",
      description: "Cà phê phin truyền thống với sữa đặc ngọt ngào",
      temperature: "cold",
      prepTime: "3-5 phút",
      size: ["M", "L"],
      isPopular: true,
    },
    {
      id: 3,
      name: "Smoothie xoài dứa",
      price: 42000,
      originalPrice: 50000,
      rating: 4.7,
      orders: 1234,
      image: "/placeholder.svg?height=200&width=200",
      category: "Smoothie",
      description: "Smoothie xoài dứa tươi mát, bổ dưỡng",
      temperature: "cold",
      prepTime: "3-4 phút",
      size: ["M", "L", "XL"],
      isNew: true,
    },
    {
      id: 4,
      name: "Nước ép cam tươi",
      price: 38000,
      rating: 4.6,
      orders: 987,
      image: "/placeholder.svg?height=200&width=200",
      category: "Nước ép",
      description: "Nước ép cam tươi 100%, giàu vitamin C",
      temperature: "cold",
      prepTime: "2-3 phút",
      size: ["M", "L"],
    },
    {
      id: 5,
      name: "Trà đào cam sả",
      price: 40000,
      originalPrice: 48000,
      rating: 4.8,
      orders: 1567,
      image: "/placeholder.svg?height=200&width=200",
      category: "Trà trái cây",
      description: "Trà đào cam sả thơm mát, vị chua ngọt hài hòa",
      temperature: "cold",
      prepTime: "4-6 phút",
      size: ["M", "L"],
      isPopular: true,
    },
    {
      id: 6,
      name: "Cappuccino nóng",
      price: 48000,
      rating: 4.7,
      orders: 876,
      image: "/placeholder.svg?height=200&width=200",
      category: "Cà phê",
      description: "Cappuccino Ý với lớp foam sữa mịn màng",
      temperature: "hot",
      prepTime: "4-5 phút",
      size: ["M", "L"],
    },
    {
      id: 7,
      name: "Matcha latte đá",
      price: 52000,
      originalPrice: 60000,
      rating: 4.5,
      orders: 654,
      image: "/placeholder.svg?height=200&width=200",
      category: "Trà",
      description: "Matcha Nhật Bản nguyên chất với sữa tươi",
      temperature: "both",
      prepTime: "5-6 phút",
      size: ["M", "L"],
      isNew: true,
    },
    {
      id: 8,
      name: "Sinh tố bơ",
      price: 45000,
      rating: 4.6,
      orders: 543,
      image: "/placeholder.svg?height=200&width=200",
      category: "Sinh tố",
      description: "Sinh tố bơ béo ngậy, bổ dưỡng",
      temperature: "cold",
      prepTime: "3-4 phút",
      size: ["M", "L"],
    },
    {
      id: 9,
      name: "Trà sữa hokkaido",
      price: 55000,
      originalPrice: 65000,
      rating: 4.9,
      orders: 432,
      image: "/placeholder.svg?height=200&width=200",
      category: "Trà sữa",
      description: "Trà sữa hokkaido cao cấp với kem tươi Nhật",
      temperature: "both",
      prepTime: "6-8 phút",
      size: ["M", "L"],
      isNew: true,
    },
  ])

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

      {/* Beverages Grid */}
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
