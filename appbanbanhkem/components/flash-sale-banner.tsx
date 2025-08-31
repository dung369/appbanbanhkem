"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Flame, Clock, ShoppingCart, Zap } from "lucide-react"

interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
}

export function FlashSaleBanner() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 23, minutes: 59, seconds: 59 })
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else {
          // Reset timer for demo
          return { hours: 23, minutes: 59, seconds: 59 }
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!isVisible) return null

  const flashSaleItems = [
    {
      name: "Bánh Red Velvet",
      originalPrice: 450000,
      salePrice: 299000,
      discount: 34,
      image: "/placeholder.svg?height=80&width=80",
      stock: 12,
    },
    {
      name: "Bánh Tiramisu",
      originalPrice: 520000,
      salePrice: 349000,
      discount: 33,
      image: "/placeholder.svg?height=80&width=80",
      stock: 8,
    },
    {
      name: "Bánh Chocolate 3 tầng",
      originalPrice: 890000,
      salePrice: 599000,
      discount: 33,
      image: "/placeholder.svg?height=80&width=80",
      stock: 5,
    },
  ]

  return (
    <div className="relative">
      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 z-10 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-gray-600 hover:bg-white"
      >
        ×
      </button>

      <Card className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white border-0 shadow-2xl">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Flame className="w-8 h-8 text-yellow-300 animate-bounce" />
              <h2 className="text-3xl font-bold">FLASH SALE</h2>
              <Flame className="w-8 h-8 text-yellow-300 animate-bounce" />
            </div>
            <p className="text-lg opacity-90">Giảm giá sốc chỉ trong hôm nay!</p>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-300" />
              <span className="text-lg font-medium">Kết thúc sau:</span>
            </div>
            <div className="flex space-x-2">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center min-w-[60px]">
                <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
                <div className="text-xs opacity-80">Giờ</div>
              </div>
              <div className="text-2xl font-bold self-center">:</div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center min-w-[60px]">
                <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
                <div className="text-xs opacity-80">Phút</div>
              </div>
              <div className="text-2xl font-bold self-center">:</div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-center min-w-[60px]">
                <div className="text-2xl font-bold animate-pulse">{timeLeft.seconds.toString().padStart(2, "0")}</div>
                <div className="text-xs opacity-80">Giây</div>
              </div>
            </div>
          </div>

          {/* Flash Sale Items */}
          <div className="grid md:grid-cols-3 gap-4">
            {flashSaleItems.map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">{item.salePrice.toLocaleString()}đ</span>
                      <span className="text-sm line-through opacity-70">{item.originalPrice.toLocaleString()}đ</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-yellow-400 text-yellow-900 font-bold">-{item.discount}%</Badge>
                  <span className="text-sm opacity-80">Còn {item.stock} cái</span>
                </div>

                <Button size="sm" className="w-full bg-white text-pink-600 hover:bg-gray-100 font-semibold">
                  <Zap className="w-4 h-4 mr-2" />
                  Mua ngay
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Button size="lg" className="bg-yellow-400 text-yellow-900 hover:bg-yellow-300 font-bold px-8">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Xem tất cả Flash Sale
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
