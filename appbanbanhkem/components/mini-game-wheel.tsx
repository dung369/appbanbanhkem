"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Sparkles, RotateCw, X } from "lucide-react"

interface Prize {
  id: number
  name: string
  value: string
  color: string
  icon: string
  probability: number
}

interface MiniGameWheelProps {
  isOpen: boolean
  onClose: () => void
}

export function MiniGameWheel({ isOpen, onClose }: MiniGameWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<Prize | null>(null)
  const [hasSpun, setHasSpun] = useState(false)

  const prizes: Prize[] = [
    { id: 1, name: "Giảm 50%", value: "50% OFF", color: "#FF6B6B", icon: "🎉", probability: 5 },
    { id: 2, name: "Miễn phí ship", value: "FREE SHIP", color: "#4ECDC4", icon: "🚚", probability: 15 },
    { id: 3, name: "Giảm 20%", value: "20% OFF", color: "#45B7D1", icon: "💰", probability: 20 },
    { id: 4, name: "Bánh mini", value: "FREE CAKE", color: "#96CEB4", icon: "🧁", probability: 10 },
    { id: 5, name: "Giảm 10%", value: "10% OFF", color: "#FFEAA7", icon: "🎁", probability: 25 },
    { id: 6, name: "Thử lại", value: "TRY AGAIN", color: "#DDA0DD", icon: "🔄", probability: 15 },
    { id: 7, name: "Nến miễn phí", value: "FREE CANDLE", color: "#FFB6C1", icon: "🕯️", probability: 8 },
    { id: 8, name: "Chúc may mắn", value: "GOOD LUCK", color: "#F0E68C", icon: "🍀", probability: 2 },
  ]

  const spinWheel = () => {
    if (isSpinning || hasSpun) return

    setIsSpinning(true)
    setResult(null)

    // Simulate spinning for 3 seconds
    setTimeout(() => {
      // Weighted random selection
      const random = Math.random() * 100
      let cumulative = 0
      let selectedPrize = prizes[0]

      for (const prize of prizes) {
        cumulative += prize.probability
        if (random <= cumulative) {
          selectedPrize = prize
          break
        }
      }

      setResult(selectedPrize)
      setIsSpinning(false)
      setHasSpun(true)
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-gradient-to-b from-purple-50 to-pink-50 border-2 border-purple-200">
        <CardHeader className="text-center relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
          >
            <X className="w-4 h-4" />
          </button>
          <CardTitle className="text-2xl font-bold text-purple-800">
            <Sparkles className="w-6 h-6 inline mr-2" />
            Vòng quay may mắn
            <Sparkles className="w-6 h-6 inline ml-2" />
          </CardTitle>
          <p className="text-purple-600">Quay để nhận ưu đãi đặc biệt!</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Wheel */}
          <div className="relative">
            <div
              className={`w-80 h-80 mx-auto rounded-full border-8 border-yellow-400 relative overflow-hidden ${
                isSpinning ? "animate-spin" : ""
              }`}
              style={{
                animationDuration: isSpinning ? "3s" : "0s",
                animationTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            >
              {prizes.map((prize, index) => {
                const angle = (360 / prizes.length) * index
                const nextAngle = (360 / prizes.length) * (index + 1)

                return (
                  <div
                    key={prize.id}
                    className="absolute w-full h-full flex items-center justify-center text-white font-bold text-sm"
                    style={{
                      background: `conic-gradient(from ${angle}deg, ${prize.color} ${angle}deg, ${prize.color} ${nextAngle}deg, transparent ${nextAngle}deg)`,
                      clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(((angle - 90) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((angle - 90) * Math.PI) / 180)}%, ${50 + 50 * Math.cos(((nextAngle - 90) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((nextAngle - 90) * Math.PI) / 180)}%)`,
                    }}
                  >
                    <div
                      className="absolute text-center"
                      style={{
                        transform: `rotate(${angle + (360 / prizes.length) / 2}deg)`,
                        top: "20%",
                        left: "50%",
                        transformOrigin: "0 100px",
                      }}
                    >
                      <div className="text-2xl mb-1">{prize.icon}</div>
                      <div className="text-xs font-bold whitespace-nowrap">{prize.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-yellow-400"></div>
            </div>

            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-yellow-400 rounded-full border-4 border-white flex items-center justify-center">
              <RotateCw className="w-6 h-6 text-yellow-800" />
            </div>
          </div>

          {/* Spin Button */}
          <div className="text-center">
            {!hasSpun ? (
              <Button
                onClick={spinWheel}
                disabled={isSpinning}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-3 text-lg font-bold"
              >
                {isSpinning ? (
                  <>
                    <RotateCw className="w-5 h-5 mr-2 animate-spin" />
                    Đang quay...
                  </>
                ) : (
                  <>
                    <Gift className="w-5 h-5 mr-2" />
                    QUAY NGAY!
                  </>
                )}
              </Button>
            ) : (
              <div className="space-y-4">
                {result && (
                  <div className="bg-white p-6 rounded-lg border-2 border-yellow-400 shadow-lg">
                    <div className="text-center">
                      <div className="text-4xl mb-2">{result.icon}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Chúc mừng!</h3>
                      <p className="text-lg text-purple-600 font-semibold">{result.name}</p>
                      <Badge className="mt-2 bg-yellow-400 text-yellow-900 font-bold">Mã: LUCKY{result.id}</Badge>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button
                    onClick={() => {
                      setHasSpun(false)
                      setResult(null)
                    }}
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    Quay lại
                  </Button>
                  <Button onClick={onClose} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500">
                    Sử dụng ngay
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Rules */}
          <div className="text-xs text-gray-600 bg-white/50 p-3 rounded-lg">
            <p className="font-semibold mb-1">📋 Lưu ý:</p>
            <ul className="space-y-1">
              <li>• Mỗi khách hàng chỉ được quay 1 lần/ngày</li>
              <li>• Mã giảm giá có hiệu lực trong 24h</li>
              <li>• Áp dụng cho đơn hàng từ 200.000đ</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
