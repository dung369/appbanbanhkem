"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ShoppingCartIcon,
  PlusIcon,
  MinusIcon,
  TrashIcon,
  GiftIcon,
  PercentIcon,
  MapPinIcon,
  ClockIcon,
} from "lucide-react"
import Link from "next/link"

interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  size: string
  flavor: string
  customization?: string
  selected: boolean
}

export function ShoppingCartComponent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Bánh sinh nhật hoa hồng",
      price: 450000,
      originalPrice: 550000,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      size: "Tròn 20cm",
      flavor: "Vanilla",
      customization: "Viết chữ: Happy Birthday",
      selected: true,
    },
    {
      id: 2,
      name: "Bánh Doraemon 3D",
      price: 520000,
      originalPrice: 620000,
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100",
      size: "Tròn 20cm",
      flavor: "Chocolate",
      selected: true,
    },
    {
      id: 3,
      name: "Bánh cưới 3 tầng",
      price: 1200000,
      originalPrice: 1400000,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      size: "3 tầng (15-20-25cm)",
      flavor: "Vanilla & Chocolate",
      selected: false,
    },
  ])

  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== item))
  }

  const toggleItemSelection = (id: number) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)))
  }

  const selectAllItems = (selected: boolean) => {
    setCartItems((items) => items.map((item) => ({ ...item, selected })))
  }

  const selectedItems = cartItems.filter((item) => item.selected)
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = appliedCoupon ? subtotal * 0.1 : 0
  const shippingFee = subtotal >= 500000 ? 0 : 30000
  const total = subtotal - discount + shippingFee

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "sweetcake10") {
      setAppliedCoupon("SWEETCAKE10")
      setCouponCode("")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <ShoppingCartIcon className="w-6 h-6 text-pink-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng của bạn</h1>
        </div>
        <p className="text-gray-600">Bạn có {cartItems.length} sản phẩm trong giỏ hàng</p>
      </div>

      {cartItems.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <ShoppingCartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Giỏ hàng trống</h3>
            <p className="text-gray-500 mb-6">Hãy thêm một số bánh ngon vào giỏ hàng nhé!</p>
            <Link href="/">
              <Button className="bg-pink-500 hover:bg-pink-600">Tiếp tục mua sắm</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Select All */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedItems.length === cartItems.length}
                    onCheckedChange={(checked) => selectAllItems(!!checked)}
                  />
                  <span className="font-medium">
                    Chọn tất cả ({selectedItems.length}/{cartItems.length})
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Cart Items List */}
            {cartItems.map((item) => (
              <Card key={item.id} className={`${item.selected ? "ring-2 ring-pink-200" : ""}`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Checkbox checked={item.selected} onCheckedChange={() => toggleItemSelection(item.id)} />

                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Kích cỡ: {item.size}</p>
                        <p>Hương vị: {item.flavor}</p>
                        {item.customization && <p className="text-pink-600">🎨 {item.customization}</p>}
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-pink-600">{item.price.toLocaleString()}đ</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {item.originalPrice.toLocaleString()}đ
                          </span>
                        )}
                        {item.originalPrice && (
                          <Badge className="bg-red-100 text-red-800">
                            -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-lg">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <MinusIcon className="w-4 h-4" />
                        </Button>
                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                        <Button size="sm" variant="ghost" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <PlusIcon className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Remove Button */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 bg-transparent"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Coupon */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PercentIcon className="w-5 h-5 mr-2" />
                  Mã giảm giá
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Nhập mã giảm giá"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button onClick={applyCoupon} variant="outline">
                    Áp dụng
                  </Button>
                </div>

                {appliedCoupon && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 font-medium">✅ {appliedCoupon}</span>
                      <Button size="sm" variant="ghost" onClick={() => setAppliedCoupon(null)} className="text-red-600">
                        Xóa
                      </Button>
                    </div>
                    <p className="text-sm text-green-600">Giảm 10% tổng đơn hàng</p>
                  </div>
                )}

                <div className="text-sm text-gray-600">
                  <p>💡 Mã giảm giá có sẵn:</p>
                  <ul className="mt-2 space-y-1">
                    <li>• SWEETCAKE10: Giảm 10%</li>
                    <li>• NEWCUSTOMER: Giảm 15% (khách mới)</li>
                    <li>• FREESHIP: Miễn phí ship</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tạm tính ({selectedItems.length} sản phẩm)</span>
                    <span>{subtotal.toLocaleString()}đ</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá ({appliedCoupon})</span>
                      <span>-{discount.toLocaleString()}đ</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Phí giao hàng</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-green-600">Miễn phí</span>
                      ) : (
                        `${shippingFee.toLocaleString()}đ`
                      )}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Tổng cộng</span>
                  <span className="text-pink-600">{total.toLocaleString()}đ</span>
                </div>

                {subtotal < 500000 && (
                  <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                    🚚 Mua thêm {(500000 - subtotal).toLocaleString()}đ để được miễn phí giao hàng
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-2" />
                  Giao hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <ClockIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Giao hàng: 2-3 ngày làm việc</span>
                </div>
                <Link href="/dia-chi">
                  <Button variant="outline" className="w-full bg-transparent">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    Chọn địa chỉ giao hàng
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Checkout Button */}
            <Button
              className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              disabled={selectedItems.length === 0}
            >
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              Thanh toán ({selectedItems.length} sản phẩm)
            </Button>

            {/* Gift Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GiftIcon className="w-5 h-5 mr-2" />
                  Quà tặng kèm
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <span className="text-sm">Nến sinh nhật (Miễn phí)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <span className="text-sm">Dao cắt bánh (Miễn phí)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <span className="text-sm">Thiệp chúc mừng (+20.000đ)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <span className="text-sm">Hộp quà cao cấp (+50.000đ)</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
