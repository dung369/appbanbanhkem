"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Eye } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  orders: number
  imageUrl: string
  category: string
  size: string
  flavor: string
  isCustomizable: boolean
  isTrending?: boolean
  isBestSeller?: boolean
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)

  const handleViewDetail = () => {
    router.push(`/san-pham/${product.id}`)
  }

  const getCategoryPath = (category: string) => {
    const categoryMap: Record<string, string> = {
      "birthday": "banh-sinh-nhat",
      "wedding": "banh-cuoi",
      "event": "banh-su-kien",
      "kids": "banh-tre-em",
      "hot-trend": "hot-trend",
      "beverage": "do-uong",
      "snack": "do-an-vat",
      "home": "",
    }
    return categoryMap[category] || ""
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={product.imageUrl || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isTrending && (
            <Badge className="bg-red-500 text-white">Trending</Badge>
          )}
          {product.isBestSeller && (
            <Badge className="bg-yellow-500 text-white">Đổi màu</Badge>
          )}
        </div>
        
        {product.isCustomizable && (
          <Badge className="absolute top-3 right-3 bg-blue-500 text-white">
            🎨 Tùy chỉnh
          </Badge>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 hover:bg-white"
            onClick={handleViewDetail}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="bg-white/90 hover:bg-white"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 hover:text-pink-600 cursor-pointer" onClick={handleViewDetail}>
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{product.description}</p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Kích cỡ: {product.size}</span>
            <span>Vị: {product.flavor}</span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">({product.orders})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-pink-600">
                {product.price.toLocaleString()}đ
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {product.originalPrice.toLocaleString()}đ
                </span>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Xem chi tiết
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
