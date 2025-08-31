"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gift, Heart, SmileIcon as Surprise, User } from "lucide-react"

export function GiftSurpriseForm() {
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [deliveryTime, setDeliveryTime] = useState("specific")
  const [giftData, setGiftData] = useState({
    // Thông tin người tặng
    senderName: "",
    senderPhone: "",
    senderEmail: "",

    // Thông tin người nhận
    recipientName: "",
    recipientPhone: "",
    recipientAddress: "",

    // Thông tin quà tặng
    occasionType: "",
    deliveryDate: "",
    deliveryTime: "",
    surpriseMessage: "",
    specialInstructions: "",

    // Tùy chọn đặc biệt
    hideIdentity: false,
    callBeforeDelivery: true,
    takePhoto: true,
    sendConfirmation: true,
  })

  const occasions = [
    { value: "birthday", label: "🎂 Sinh nhật", color: "bg-pink-100 text-pink-800" },
    { value: "anniversary", label: "💕 Kỷ niệm", color: "bg-red-100 text-red-800" },
    { value: "congratulation", label: "🎉 Chúc mừng", color: "bg-green-100 text-green-800" },
    { value: "apology", label: "🙏 Xin lỗi", color: "bg-blue-100 text-blue-800" },
    { value: "surprise", label: "✨ Bất ngờ", color: "bg-purple-100 text-purple-800" },
    { value: "valentine", label: "💝 Valentine", color: "bg-rose-100 text-rose-800" },
    { value: "graduation", label: "🎓 Tốt nghiệp", color: "bg-yellow-100 text-yellow-800" },
    { value: "other", label: "🎁 Khác", color: "bg-gray-100 text-gray-800" },
  ]

  const timeSlots = [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "18:00 - 20:00",
    "20:00 - 22:00",
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 text-lg mb-4 animate-bounce">
          🎁 TẶNG QUÀ BẤT NGỜ
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Gửi tặng
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            {" "}
            niềm vui bất ngờ
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Tạo những khoảnh khắc đáng nhớ bằng cách gửi bánh kem bất ngờ đến người thân yêu. Chúng tôi sẽ giữ bí mật danh
          tính của bạn!
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form chính */}
        <div className="lg:col-span-2 space-y-6">
          {/* Thông tin người tặng */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-pink-500" />
                Thông tin người tặng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="senderName">Họ tên của bạn</Label>
                  <Input
                    id="senderName"
                    placeholder="Nguyễn Văn A"
                    value={giftData.senderName}
                    onChange={(e) => setGiftData({ ...giftData, senderName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="senderPhone">Số điện thoại</Label>
                  <Input
                    id="senderPhone"
                    placeholder="0901234567"
                    value={giftData.senderPhone}
                    onChange={(e) => setGiftData({ ...giftData, senderPhone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="senderEmail">Email (để nhận xác nhận)</Label>
                <Input
                  id="senderEmail"
                  type="email"
                  placeholder="your@email.com"
                  value={giftData.senderEmail}
                  onChange={(e) => setGiftData({ ...giftData, senderEmail: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Thông tin người nhận */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="w-5 h-5 mr-2 text-purple-500" />
                Thông tin người nhận
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="recipientName">Tên người nhận</Label>
                  <Input
                    id="recipientName"
                    placeholder="Trần Thị B"
                    value={giftData.recipientName}
                    onChange={(e) => setGiftData({ ...giftData, recipientName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="recipientPhone">Số điện thoại người nhận</Label>
                  <Input
                    id="recipientPhone"
                    placeholder="0987654321"
                    value={giftData.recipientPhone}
                    onChange={(e) => setGiftData({ ...giftData, recipientPhone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="recipientAddress">Địa chỉ giao hàng</Label>
                <Textarea
                  id="recipientAddress"
                  placeholder="123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM"
                  value={giftData.recipientAddress}
                  onChange={(e) => setGiftData({ ...giftData, recipientAddress: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Chi tiết quà tặng */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Surprise className="w-5 h-5 mr-2 text-orange-500" />
                Chi tiết quà tặng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-3 block">Dịp tặng quà</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {occasions.map((occasion) => (
                    <Button
                      key={occasion.value}
                      variant={giftData.occasionType === occasion.value ? "default" : "outline"}
                      size="sm"
                      className="h-auto p-3 flex flex-col items-center space-y-1 bg-transparent"
                      onClick={() => setGiftData({ ...giftData, occasionType: occasion.value })}
                    >
                      <span className="text-lg">{occasion.label.split(" ")[0]}</span>
                      <span className="text-xs">{occasion.label.split(" ").slice(1).join(" ")}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deliveryDate">Ngày giao hàng</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={giftData.deliveryDate}
                    onChange={(e) => setGiftData({ ...giftData, deliveryDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Khung giờ giao hàng</Label>
                  <Select
                    value={giftData.deliveryTime}
                    onValueChange={(value) => setGiftData({ ...giftData, deliveryTime: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn khung giờ" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="surpriseMessage">Lời nhắn bất ngờ</Label>
                <Textarea
                  id="surpriseMessage"
                  placeholder="Chúc mừng sinh nhật! Hy vọng bạn sẽ thích món quà này..."
                  value={giftData.surpriseMessage}
                  onChange={(e) => setGiftData({ ...giftData, surpriseMessage: e.target.value })}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-gray-500 mt-1">Lời nhắn sẽ được in trên thiệp đi kèm</p>
              </div>

              <div>
                <Label htmlFor="specialInstructions">Yêu cầu đặc biệt</Label>
                <Textarea
                  id="specialInstructions"
                  placeholder="VD: Giao vào giờ nghỉ trưa, không nói là ai tặng..."
                  value={giftData.specialInstructions}
                  onChange={(e) => setGiftData({ ...giftData, specialInstructions: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Tùy chọn đặc biệt */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                Tùy chọn đặc biệt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-pink-50 rounded-lg">
                  <Checkbox
                    id="hideIdentity"
                    checked={giftData.hideIdentity}
                    onCheckedChange={(checked) => setGiftData({ ...giftData, hideIdentity: !!checked })}
                  />
                  <div>
                    <Label htmlFor="hideIdentity" className="font-medium text-pink-800">
                      🕵️ Ẩn danh người tặng
                    </Label>
                    <p className="text-sm text-pink-600">Không tiết lộ thông tin của bạn cho người nhận</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Checkbox
                    id="callBeforeDelivery"
                    checked={giftData.callBeforeDelivery}
                    onCheckedChange={(checked) => setGiftData({ ...giftData, callBeforeDelivery: !!checked })}
                  />
                  <div>
                    <Label htmlFor="callBeforeDelivery" className="font-medium text-blue-800">
                      📞 Gọi trước khi giao
                    </Label>
                    <p className="text-sm text-blue-600">Shipper sẽ gọi xác nhận trước khi đến</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <Checkbox
                    id="takePhoto"
                    checked={giftData.takePhoto}
                    onCheckedChange={(checked) => setGiftData({ ...giftData, takePhoto: !!checked })}
                  />
                  <div>
                    <Label htmlFor="takePhoto" className="font-medium text-green-800">
                      📸 Chụp ảnh khi giao
                    </Label>
                    <p className="text-sm text-green-600">Gửi ảnh xác nhận đã giao thành công cho bạn</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Checkbox
                    id="sendConfirmation"
                    checked={giftData.sendConfirmation}
                    onCheckedChange={(checked) => setGiftData({ ...giftData, sendConfirmation: !!checked })}
                  />
                  <div>
                    <Label htmlFor="sendConfirmation" className="font-medium text-purple-800">
                      ✉️ Gửi xác nhận email
                    </Label>
                    <p className="text-sm text-purple-600">Nhận email xác nhận khi đơn hàng được giao thành công</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tóm tắt đơn hàng */}
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Tóm tắt quà tặng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Người tặng:</span>
                  <span className="font-medium">{giftData.senderName || "Chưa nhập"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Người nhận:</span>
                  <span className="font-medium">{giftData.recipientName || "Chưa nhập"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dịp:</span>
                  <span className="font-medium">
                    {occasions.find((o) => o.value === giftData.occasionType)?.label || "Chưa chọn"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Ngày giao:</span>
                  <span className="font-medium">{giftData.deliveryDate || "Chưa chọn"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Giờ giao:</span>
                  <span className="font-medium">{giftData.deliveryTime || "Chưa chọn"}</span>
                </div>
              </div>

              {giftData.hideIdentity && (
                <div className="bg-pink-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-pink-600">🕵️</span>
                    <span className="text-sm font-medium text-pink-800">Giao hàng ẩn danh</span>
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Phí dịch vụ tặng quà:</span>
                  <span className="text-green-600">50.000đ</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Bao gồm: thiệp, đóng gói đặc biệt, giao hàng bí mật</p>
              </div>

              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                <Gift className="w-5 h-5 mr-2" />
                Tiếp tục chọn bánh
              </Button>
            </CardContent>
          </Card>

          {/* Hướng dẫn */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cách thức hoạt động</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">1.</span>
                <span>Điền thông tin người tặng và người nhận</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">2.</span>
                <span>Chọn bánh và viết lời nhắn</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">3.</span>
                <span>Chúng tôi sẽ giao đúng giờ đã hẹn</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">4.</span>
                <span>Gửi ảnh xác nhận cho bạn</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
