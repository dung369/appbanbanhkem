"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Eye, Heart } from "lucide-react"

interface Accessory {
  id: number
  name: string
  price: number
  originalPrice?: number
  rating: number
  orders: number
  image: string
  category: string
  description: string
  inStock: boolean
  isCombo?: boolean
}

export function AccessoriesGrid() {
  const [accessories] = useState<Accessory[]>([
    {
      id: 1,
      name: "Bộ nến sinh nhật số 0-9",
      price: 25000,
      originalPrice: 35000,
      rating: 4.8,
      orders: 1234,
      image: "/placeholder.svg?height=200&width=200",
      category: "Nến sinh nhật",
      description: "Bộ nến số đầy đủ từ 0-9, chất liệu sáp an toàn",
      inStock: true,
    },
    {
      id: 2,
      name: "Dao cắt bánh inox cao cấp",
      price: 45000,
      originalPrice: 60000,
      rating: 4.9,
      orders: 892,
      image: "/placeholder.svg?height=200&width=200",
      category: "Dụng cụ",
      description: "Dao cắt bánh inox 304, tay cầm chống trượt",
      inStock: true,
    },
    {
      id: 3,
      name: "Bong bóng sinh nhật Happy Birthday",
      price: 35000,
      originalPrice: 50000,
      rating: 4.7,
      orders: 567,
      image: "/placeholder.svg?height=200&width=200",
      category: "Trang trí",
      description: "Set 10 bong bóng chữ Happy Birthday màu vàng gold",
      inStock: true,
    },
    {
      id: 4,
      name: "Combo trang trí sinh nhật Pink",
      price: 120000,
      originalPrice: 180000,
      rating: 4.8,
      orders: 345,
      image: "/placeholder.svg?height=200&width=200",
      category: "Combo",
      description: "Bao gồm: bong bóng, dây treo, nón sinh nhật, khăn giấy",
      inStock: true,
      isCombo: true,
    },
    {
      id: 5,
      name: "Nón sinh nhật kim tuyến",
      price: 15000,
      originalPrice: 25000,
      rating: 4.6,
      orders: 789,
      image: "/placeholder.svg?height=200&width=200",
      category: "Phụ kiện",
      description: "Set 6 nón sinh nhật kim tuyến nhiều màu",
      inStock: true,
    },
    {
      id: 6,
      name: "Khăn giấy sinh nhật cao cấp",
      price: 20000,
      originalPrice: 30000,
      rating: 4.5,
      orders: 456,
      image: "/placeholder.svg?height=200&width=200",
      category: "Dụng cụ",
      description: "Khăn giấy 3 lớp, họa tiết sinh nhật đáng yêu",
      inStock: true,
    },
    {
      id: 7,
      name: "Dây treo trang trí Happy Birthday",
      price: 30000,
      originalPrice: 45000,
      rating: 4.7,
      orders: 623,
      image: "/placeholder.svg?height=200&width=200",
      category: "Trang trí",
      description: "Dây treo chữ Happy Birthday bằng giấy cứng",
      inStock: true,
    },
    {
      id: 8,
      name: "Nến pháo hoa sinh nhật",
      price: 40000,
      originalPrice: 55000,
      rating: 4.9,
      orders: 234,
      image: "/placeholder.svg?height=200&width=200",
      category: "Nến sinh nhật",
      description: "Nến pháo hoa an toàn, tạo hiệu ứng đẹp mắt",
      inStock: false,
    },
    {
      id: 9,
      name: "Hộp quà sinh nhật cao cấp",
      price: 65000,
      originalPrice: 85000,
      rating: 4.8,
      orders: 345,
      image: "/placeholder.svg?height=200&width=200",
      category: "Hộp quà",
      description: "Hộp quà giấy cứng, có nơ ribbon sang trọng",
      inStock: true,
    },
    {
      id: 10,
      name: "Combo mega sinh nhật VIP",
      price: 250000,
      originalPrice: 350000,
      rating: 4.9,
      orders: 123,
      image: "/placeholder.svg?height=200&width=200",
      category: "Combo",
      description: "Combo đầy đủ: trang trí, nến, dụng cụ, quà tặng",
      inStock: true,
      isCombo: true,
    },
    {
      id: 11,
      name: "Thiệp chúc mừng sinh nhật",
      price: 12000,
      originalPrice: 20000,
      rating: 4.4,
      orders: 678,
      image: "/placeholder.svg?height=200&width=200",
      category: "Thiệp",
      description: "Thiệp sinh nhật 3D pop-up đẹp mắt",
      inStock: true,
    },
    {
      id: 12,
      name: "Kẹo trang trí bánh sinh nhật",
      price: 18000,
      originalPrice: 28000,
      rating: 4.6,
      orders: 456,
      image: "/placeholder.svg?height=200&width=200",
      category: "Trang trí bánh",
      description: "Set kẹo trang trí nhiều hình dạng đáng yêu",
      inStock: true,
    },
  ])

  return (
    <div className="space-y-6">
      {/* Sort and View Options */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Hiển thị {accessories.length} sản phẩm</span>
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

      {/* Accessories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accessories.map((accessory) => (
          <Card key={accessory.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative">
              <img
                src={accessory.image || "/placeholder.svg"}
                alt={accessory.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 space-y-2">
                {accessory.isCombo && <Badge className="bg-purple-500 text-white">🎁 Combo</Badge>}
                {accessory.originalPrice && (
                  <Badge className="bg-red-500 text-white">
                    -{Math.round((1 - accessory.price / accessory.originalPrice) * 100)}%
                  </Badge>
                )}
                {!accessory.inStock && <Badge className="bg-gray-500 text-white">Hết hàng</Badge>}
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
                    {accessory.category}
                  </Badge>
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{accessory.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{accessory.description}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{accessory.rating}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{accessory.orders} đã bán</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-orange-600">{accessory.price.toLocaleString()}đ</span>
                    {accessory.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {accessory.originalPrice.toLocaleString()}đ
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                    disabled={!accessory.inStock}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {accessory.inStock ? "Thêm vào giỏ" : "Hết hàng"}
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
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-gray-900">🎁 Gợi ý combo tiết kiệm</h3>
            <p className="text-gray-600">Mua combo để tiết kiệm hơn và có đầy đủ phụ kiện cho bữa tiệc hoàn hảo!</p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">🎈 Combo Cơ bản</h4>
                <p className="text-sm text-gray-600 mb-2">Nến + Dao cắt + Khăn giấy</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-orange-600">85.000đ</span>
                  <span className="text-sm text-gray-400 line-through">120.000đ</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">🎉 Combo Tiêu chuẩn</h4>
                <p className="text-sm text-gray-600 mb-2">Cơ bản + Bong bóng + Nón</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-orange-600">150.000đ</span>
                  <span className="text-sm text-gray-400 line-through">220.000đ</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">👑 Combo VIP</h4>
                <p className="text-sm text-gray-600 mb-2">Tiêu chuẩn + Hộp quà + Thiệp</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-orange-600">250.000đ</span>
                  <span className="text-sm text-gray-400 line-through">380.000đ</span>
                </div>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
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
