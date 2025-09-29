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
  const [accessories] = useState<Accessory[]>([])

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

      {accessories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border rounded-lg bg-gray-50 text-center">
          <img src="/placeholder.svg" alt="No products" className="w-20 h-20 opacity-40 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Chưa có sản phẩm</h3>
          <p className="text-sm text-gray-600">Sản phẩm sẽ hiển thị tại đây sau khi Admin thêm mới.</p>
        </div>
      ) : (
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
      )}

      {/* Placeholder: combo suggestions can be added later by Admin */}

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
