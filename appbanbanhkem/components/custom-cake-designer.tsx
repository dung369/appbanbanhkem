"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Palette, Type, ImageIcon, Save, ShoppingCart } from "lucide-react"

export function CustomCakeDesigner() {
  const [selectedShape, setSelectedShape] = useState("round")
  const [selectedSize, setSelectedSize] = useState("20cm")
  const [selectedFlavor, setSelectedFlavor] = useState("vanilla")
  const [selectedColor, setSelectedColor] = useState("#ff69b4")
  const [customText, setCustomText] = useState("")
  const [estimatedPrice, setEstimatedPrice] = useState(450000)

  const shapes = [
    { id: "round", name: "Tròn", price: 0 },
    { id: "square", name: "Vuông", price: 20000 },
    { id: "heart", name: "Trái tim", price: 50000 },
    { id: "star", name: "Ngôi sao", price: 80000 },
    { id: "custom", name: "Tùy chỉnh", price: 150000 },
  ]

  const sizes = [
    { id: "15cm", name: "15cm (4-6 người)", price: 0 },
    { id: "18cm", name: "18cm (6-8 người)", price: 50000 },
    { id: "20cm", name: "20cm (8-10 người)", price: 100000 },
    { id: "25cm", name: "25cm (12-15 người)", price: 200000 },
    { id: "30cm", name: "30cm (20-25 người)", price: 350000 },
  ]

  const flavors = [
    { id: "vanilla", name: "Vanilla", price: 0 },
    { id: "chocolate", name: "Chocolate", price: 20000 },
    { id: "strawberry", name: "Dâu tây", price: 30000 },
    { id: "matcha", name: "Trà xanh", price: 40000 },
    { id: "tiramisu", name: "Tiramisu", price: 60000 },
    { id: "red-velvet", name: "Red Velvet", price: 50000 },
  ]

  const colors = [
    "#ff69b4",
    "#ff1493",
    "#dc143c",
    "#ff4500",
    "#ffa500",
    "#ffff00",
    "#9acd32",
    "#00ff00",
    "#00ffff",
    "#1e90ff",
    "#0000ff",
    "#8a2be2",
    "#9400d3",
    "#ff00ff",
    "#ffffff",
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 text-lg mb-4">
          🎨 TÙY CHỈNH BÁNH RIÊNG
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Thiết kế bánh kem
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            {" "}
            theo ý thích
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Tạo ra chiếc bánh độc nhất vô nhị với công cụ thiết kế trực tuyến. Chọn hình dáng, màu sắc, hương vị và thêm
          những chi tiết cá nhân
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Design Panel */}
        <div className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Cơ bản</TabsTrigger>
              <TabsTrigger value="design">Thiết kế</TabsTrigger>
              <TabsTrigger value="text">Chữ viết</TabsTrigger>
              <TabsTrigger value="image">Hình ảnh</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    Thông tin cơ bản
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Shape Selection */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Hình dáng bánh</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {shapes.map((shape) => (
                        <Button
                          key={shape.id}
                          variant={selectedShape === shape.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedShape(shape.id)}
                          className="flex flex-col h-auto py-3"
                        >
                          <span className="text-lg mb-1">
                            {shape.id === "round" && "⭕"}
                            {shape.id === "square" && "⬜"}
                            {shape.id === "heart" && "💖"}
                            {shape.id === "star" && "⭐"}
                            {shape.id === "custom" && "🎨"}
                          </span>
                          <span className="text-xs">{shape.name}</span>
                          {shape.price > 0 && (
                            <span className="text-xs text-gray-500">+{shape.price.toLocaleString()}đ</span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Kích cỡ</Label>
                    <Select value={selectedSize} onValueChange={setSelectedSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size.id} value={size.id}>
                            {size.name} {size.price > 0 && `(+${size.price.toLocaleString()}đ)`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Flavor Selection */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Hương vị</Label>
                    <Select value={selectedFlavor} onValueChange={setSelectedFlavor}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {flavors.map((flavor) => (
                          <SelectItem key={flavor.id} value={flavor.id}>
                            {flavor.name} {flavor.price > 0 && `(+${flavor.price.toLocaleString()}đ)`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="design" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    Màu sắc & Trang trí
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Màu chủ đạo</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          className={`w-10 h-10 rounded-full border-2 ${
                            selectedColor === color ? "border-gray-800" : "border-gray-300"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColor(color)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">Phong cách trang trí</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        🌸 Hoa tươi
                      </Button>
                      <Button variant="outline" size="sm">
                        ✨ Lấp lánh
                      </Button>
                      <Button variant="outline" size="sm">
                        🎀 Nơ ribbon
                      </Button>
                      <Button variant="outline" size="sm">
                        🍓 Trái cây
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="text" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Type className="w-5 h-5 mr-2" />
                    Chữ viết trên bánh
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="custom-text" className="text-sm font-medium mb-2 block">
                      Nội dung chữ viết
                    </Label>
                    <Textarea
                      id="custom-text"
                      placeholder="VD: Chúc mừng sinh nhật, Happy Birthday..."
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">Tối đa 50 ký tự. Phí viết chữ: 30.000đ</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">Font chữ</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        📝 Viết tay
                      </Button>
                      <Button variant="outline" size="sm">
                        🎨 Nghệ thuật
                      </Button>
                      <Button variant="outline" size="sm">
                        💫 Lấp lánh
                      </Button>
                      <Button variant="outline" size="sm">
                        🌟 3D nổi
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="image" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ImageIcon className="w-5 h-5 mr-2" />
                    Hình ảnh cá nhân
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Tải lên hình ảnh để in trên bánh</p>
                    <p className="text-sm text-gray-500 mb-4">Hỗ trợ JPG, PNG. Kích thước tối thiểu 300x300px</p>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Chọn file
                    </Button>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">Vị trí in ảnh</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        🎯 Giữa bánh
                      </Button>
                      <Button variant="outline" size="sm">
                        📐 Góc bánh
                      </Button>
                      <Button variant="outline" size="sm">
                        🔄 Toàn bộ
                      </Button>
                      <Button variant="outline" size="sm">
                        🎨 Tùy chỉnh
                      </Button>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      💡 <strong>Lưu ý:</strong> Phí in ảnh: 80.000đ. Hình ảnh sẽ được xử lý để phù hợp với bánh kem.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview & Order */}
        <div className="space-y-6">
          {/* Cake Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Xem trước bánh của bạn</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <div
                  className="w-48 h-48 rounded-full flex items-center justify-center text-6xl"
                  style={{ backgroundColor: selectedColor }}
                >
                  🎂
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="font-medium">
                  Bánh {shapes.find((s) => s.id === selectedShape)?.name} {selectedSize}
                </p>
                <p className="text-sm text-gray-600">Hương vị: {flavors.find((f) => f.id === selectedFlavor)?.name}</p>
                {customText && <p className="text-sm text-pink-600 italic">"{customText}"</p>}
              </div>
            </CardContent>
          </Card>

          {/* Price Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết giá</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Bánh cơ bản</span>
                <span>450.000đ</span>
              </div>
              <div className="flex justify-between">
                <span>Hình dáng ({shapes.find((s) => s.id === selectedShape)?.name})</span>
                <span>+{shapes.find((s) => s.id === selectedShape)?.price.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between">
                <span>Kích cỡ ({selectedSize})</span>
                <span>+{sizes.find((s) => s.id === selectedSize)?.price.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between">
                <span>Hương vị ({flavors.find((f) => f.id === selectedFlavor)?.name})</span>
                <span>+{flavors.find((f) => f.id === selectedFlavor)?.price.toLocaleString()}đ</span>
              </div>
              {customText && (
                <div className="flex justify-between">
                  <span>Viết chữ</span>
                  <span>+30.000đ</span>
                </div>
              )}
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Tổng cộng</span>
                <span className="text-pink-600">{estimatedPrice.toLocaleString()}đ</span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 h-12">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Thêm vào giỏ hàng
            </Button>
            <Button variant="outline" className="w-full h-12 bg-transparent">
              <Save className="w-5 h-5 mr-2" />
              Lưu thiết kế
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              💬 Tư vấn với chuyên gia
            </Button>
          </div>

          {/* Additional Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Thời gian làm bánh: 2-3 ngày</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Miễn phí giao hàng trong 10km</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Đảm bảo chất lượng 100%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Hỗ trợ đổi trả nếu không hài lòng</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
