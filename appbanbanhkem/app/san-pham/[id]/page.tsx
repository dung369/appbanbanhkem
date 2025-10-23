"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Star, Heart, ShoppingCart, Minus, Plus, ArrowLeft, Loader2 } from "lucide-react"
import { ProductGallery } from "@/components/product-gallery"

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  orders: number
  imageUrl: string
  imageUrls?: string[]
  category: string
  size: string
  flavor: string
  isCustomizable: boolean
  isTrending?: boolean
  isBestSeller?: boolean
  stock: number
  status: string
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const docRef = doc(db, "products", params.id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product)
        } else {
          alert("Sản phẩm không tồn tại!")
          router.push("/")
        }
      } catch (error) {
        console.error("Error loading product:", error)
        alert("Có lỗi xảy ra khi tải sản phẩm!")
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.id, router])

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 0)) {
      setQuantity(newQuantity)
    }
  }

  const getCategoryName = (category: string) => {
    const categoryMap: Record<string, string> = {
      "home": "Trang chủ",
      "birthday": "Bánh sinh nhật",
      "wedding": "Bánh cưới",
      "event": "Bánh sự kiện",
      "kids": "Bánh trẻ em",
      "hot-trend": "🔥 Hot Trend",
      "beverage": "Đồ uống tươi mát",
      "snack": "Đồ ăn vặt ngon",
    }
    return categoryMap[category] || category
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-pink-500" />
          <p className="text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => router.back()} className="mb-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </div>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <ProductGallery
                images={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls : [product.imageUrl]}
                productName={product.name}
              />
              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                {product.isTrending && (
                  <Badge className="bg-red-500 text-white text-base px-3 py-1">Trending</Badge>
                )}
                {product.isBestSeller && (
                  <Badge className="bg-yellow-500 text-white text-base px-3 py-1">Đổi màu</Badge>
                )}
              </div>
              {product.isCustomizable && (
                <Badge className="absolute top-4 right-4 bg-blue-500 text-white text-base px-3 py-1 z-10 pointer-events-none">
                  🎨 Tùy chỉnh được
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-3">{getCategoryName(product.category)}</Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium">{product.rating}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{product.orders} đã bán</span>
            </div>

            {/* Price */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold text-pink-600">
                    {product.price.toLocaleString()}đ
                  </span>
                  {product.originalPrice && (
                    <div className="flex flex-col">
                      <span className="text-xl text-gray-400 line-through">
                        {product.originalPrice.toLocaleString()}đ
                      </span>
                      <span className="text-sm text-red-500 font-medium">
                        Giảm {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Kích cỡ</p>
                    <p className="font-semibold text-lg">{product.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Hương vị</p>
                    <p className="font-semibold text-lg">{product.flavor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Trạng thái</p>
                    <Badge className={product.stock > 0 ? "bg-green-500" : "bg-red-500"}>
                      {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : "Hết hàng"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tùy chỉnh</p>
                    <p className="font-semibold text-lg">
                      {product.isCustomizable ? "✅ Có thể" : "❌ Không"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quantity & Actions */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-3">Số lượng</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1
                          if (val >= 1 && val <= product.stock) {
                            setQuantity(val)
                          }
                        }}
                        className="w-20 text-center border-0 focus-visible:ring-0"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-sm text-gray-600">
                      Tổng: <span className="font-bold text-pink-600 text-lg">
                        {(product.price * quantity).toLocaleString()}đ
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 h-12 text-lg"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Thêm vào giỏ hàng
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? "border-red-500 text-red-500" : ""}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500" : ""}`} />
                  </Button>
                </div>

                {product.isCustomizable && (
                  <Button
                    variant="outline"
                    className="w-full h-12 border-2 border-blue-500 text-blue-500 hover:bg-blue-50"
                    onClick={() => router.push("/tuy-chinh-banh")}
                  >
                    🎨 Tùy chỉnh bánh theo ý muốn
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Thông tin thêm</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Miễn phí giao hàng trong bán kính 5km</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Đảm bảo chất lượng 100% tươi mới</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Hỗ trợ đổi trả trong vòng 24h nếu có lỗi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Tặng kèm thiệp chúc mừng và nến sinh nhật</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
