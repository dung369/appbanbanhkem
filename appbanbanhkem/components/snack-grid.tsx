"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Eye, Heart, Package, Award } from "lucide-react"

interface Snack {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  orders: number
  image: string
  category: string
  description: string
  weight: string
  origin: string
  isOrganic?: boolean
  isImported?: boolean
  isBestSeller?: boolean
}

export function SnackGrid() {
  const [snacks] = useState<Snack[]>([
    {
      id: 1,
      name: "Bánh quy bơ Đan Mạch",
      price: 85000,
      originalPrice: 120000,
      rating: 4.8,
      orders: 1234,
      image: "/placeholder.svg?height=200&width=200",
      category: "Bánh quy",
      description: "Bánh quy bơ thơm ngon từ Đan Mạch, giòn tan",
      weight: "454g",
      origin: "Đan Mạch",
      isImported: true,
      isBestSeller: true,
    },
    {
      id: 2,
      name: "Chocolate đen 70% cacao",
      price: 65000,
      originalPrice: 80000,
      rating: 4.9,
      orders: 987,
      image: "/placeholder.svg?height=200&width=200",
      category: "Chocolate",
      description: "Chocolate đen nguyên chất 70% cacao, vị đắng nhẹ",
      weight: "100g",
      origin: "Bỉ",
      isOrganic: true,
      isImported: true,
    },
    {
      id: 3,
      name: "Hạt điều rang muối",
      price: 120000,
      rating: 4.7,
      orders: 756,
      image: "/placeholder.svg?height=200&width=200",
      category: "Hạt rang",
      description: "Hạt điều Bình Phước rang muối thơm ngon",
      weight: "500g",
      origin: "Việt Nam",
      isOrganic: true,
    },
    {
      id: 4,
      name: "Kẹo dẻo trái cây",
      price: 45000,
      originalPrice: 55000,
      rating: 4.5,
      orders: 2341,
      image: "/placeholder.svg?height=200&width=200",
      category: "Kẹo",
      description: "Kẹo dẻo nhiều vị trái cây tự nhiên",
      weight: "200g",
      origin: "Việt Nam",
      isBestSeller: true,
    },
    {
      id: 5,
      name: "Bánh tráng nướng",
      price: 35000,
      rating: 4.6,
      orders: 1876,
      image: "/placeholder.svg?height=200&width=200",
      category: "Bánh tráng",
      description: "Bánh tráng nướng Đà Lạt giòn rụm",
      weight: "100g",
      origin: "Đà Lạt",
      isBestSeller: true,
    },
    {
      id: 6,
      name: "Khoai tây chiên vị BBQ",
      price: 28000,
      originalPrice: 35000,
      rating: 4.4,
      orders: 1567,
      image: "/placeholder.svg?height=200&width=200",
      category: "Snack",
      description: "Khoai tây chiên giòn với vị BBQ đậm đà",
      weight: "150g",
      origin: "Việt Nam",
    },
    {
      id: 7,
      name: "Hạnh nhân rang bơ",
      price: 150000,
      originalPrice: 180000,
      rating: 4.8,
      orders: 432,
      image: "/placeholder.svg?height=200&width=200",
      category: "Hạt rang",
      description: "Hạnh nhân Mỹ rang bơ thơm ngon, bổ dưỡng",
      weight: "500g",
      origin: "Mỹ",
      isImported: true,
      isOrganic: true,
    },
    {
      id: 8,
      name: "Bánh quy yến mạch",
      price: 55000,
      rating: 4.6,
      orders: 654,
      image: "/placeholder.svg?height=200&width=200",
      category: "Bánh quy",
      description: "Bánh quy yến mạch healthy, ít đường",
      weight: "200g",
      origin: "Việt Nam",
      isOrganic: true,
    },
    {
      id: 9,
      name: "Mứt dừa non",
      price: 42000,
      originalPrice: 50000,
      rating: 4.7,
      orders: 543,
      image: "/placeholder.svg?height=200&width=200",
      category: "Mứt",
      description: "Mứt dừa non Bến Tre ngọt thanh, mềm dai",
      weight: "250g",
      origin: "Bến Tre",
    },
  ])

  return (
    <div className="space-y-6">
      {/* Sort and View Options */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Hiển thị {snacks.length} sản phẩm</span>
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

      {/* Snacks Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snacks.map((snack) => (
          <Card key={snack.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative">
              <img
                src={snack.image || "/placeholder.svg"}
                alt={snack.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 space-y-2">
                {snack.isBestSeller && <Badge className="bg-orange-500 text-white">🏆 Bán chạy</Badge>}
                {snack.isOrganic && <Badge className="bg-green-500 text-white">🌱 Organic</Badge>}
                {snack.isImported && <Badge className="bg-blue-500 text-white">🌍 Nhập khẩu</Badge>}
                {snack.originalPrice && (
                  <Badge className="bg-red-500 text-white">
                    -{Math.round((1 - snack.price / snack.originalPrice) * 100)}%
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
                    {snack.category}
                  </Badge>
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{snack.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{snack.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Package className="w-4 h-4" />
                    <span>{snack.weight}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span>{snack.origin}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{snack.rating}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{snack.orders} đã bán</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-orange-600">{snack.price.toLocaleString()}đ</span>
                    {snack.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {snack.originalPrice.toLocaleString()}đ
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
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

      {/* Special Categories */}
      <Card className="bg-gradient-to-r from-green-50 to-yellow-50 border-green-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-gray-900">🌱 Danh mục đặc biệt</h3>
            <div className="grid md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg border text-center">
                <div className="text-2xl mb-2">🌱</div>
                <h4 className="font-semibold mb-1">Organic</h4>
                <p className="text-sm text-gray-600">Sản phẩm hữu cơ</p>
              </div>
              <div className="bg-white p-4 rounded-lg border text-center">
                <div className="text-2xl mb-2">🌍</div>
                <h4 className="font-semibold mb-1">Nhập khẩu</h4>
                <p className="text-sm text-gray-600">Từ các nước</p>
              </div>
              <div className="bg-white p-4 rounded-lg border text-center">
                <div className="text-2xl mb-2">🏠</div>
                <h4 className="font-semibold mb-1">Nội địa</h4>
                <p className="text-sm text-gray-600">Sản xuất tại VN</p>
              </div>
              <div className="bg-white p-4 rounded-lg border text-center">
                <div className="text-2xl mb-2">💚</div>
                <h4 className="font-semibold mb-1">Healthy</h4>
                <p className="text-sm text-gray-600">Ít đường, ít muối</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-8">
        <Button variant="outline" size="sm">
          Trước
        </Button>
        <Button size="sm" className="bg-orange-500 text-white">
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
