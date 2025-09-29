"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Plus, Edit, Trash2, Home, Building, User } from "lucide-react"

interface Address {
  id: number
  name: string
  phone: string
  address: string
  ward: string
  district: string
  city: string
  type: "home" | "office" | "other"
  isDefault: boolean
}

export function AddressManager() {
  // Khởi tạo danh sách địa chỉ rỗng để loại bỏ dữ liệu ảo
  const [addresses, setAddresses] = useState<Address[]>([])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  const cities = ["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Hải Phòng", "Biên Hòa", "Nha Trang", "Huế"]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="w-4 h-4" />
      case "office":
        return <Building className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "home":
        return "Nhà riêng"
      case "office":
        return "Văn phòng"
      default:
        return "Khác"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <MapPin className="w-6 h-6 text-pink-500 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Địa chỉ giao hàng</h1>
        </div>
        <p className="text-gray-600">Quản lý địa chỉ giao hàng của bạn để đặt bánh nhanh chóng</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Address List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Danh sách địa chỉ</h2>
            <Button onClick={() => setShowAddForm(true)} className="bg-pink-500 hover:bg-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              Thêm địa chỉ mới
            </Button>
          </div>

          {addresses.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Bạn chưa có địa chỉ giao hàng</h3>
                <p className="text-gray-500 mb-4">Hãy thêm địa chỉ để tiện lợi khi đặt hàng lần sau</p>
                <Button onClick={() => setShowAddForm(true)} className="bg-pink-500 hover:bg-pink-600">
                  <Plus className="w-4 h-4 mr-2" /> Thêm địa chỉ mới
                </Button>
              </CardContent>
            </Card>
          ) : (
            addresses.map((address) => (
              <Card key={address.id} className="relative">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(address.type)}
                      <span className="font-medium">{getTypeLabel(address.type)}</span>
                      {address.isDefault && <Badge className="bg-green-100 text-green-800">Mặc định</Badge>}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingAddress(address)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{address.name}</span>
                      <span className="text-gray-500">|</span>
                      <span className="text-gray-600">{address.phone}</span>
                    </div>
                    <p className="text-gray-700">
                      {address.address}, {address.ward}, {address.district}, {address.city}
                    </p>
                  </div>

                  {!address.isDefault && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-4 bg-transparent"
                      onClick={() => {
                        setAddresses(
                          addresses.map((addr) => ({
                            ...addr,
                            isDefault: addr.id === address.id,
                          })),
                        )
                      }}
                    >
                      Đặt làm mặc định
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Add/Edit Form */}
        <div className="lg:col-span-1">
          {(showAddForm || editingAddress) && (
            <Card>
              <CardHeader>
                <CardTitle>{editingAddress ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Họ tên</Label>
                    <Input id="name" placeholder="Nguyễn Văn A" defaultValue={editingAddress?.name} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" placeholder="0901234567" defaultValue={editingAddress?.phone} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Địa chỉ cụ thể</Label>
                  <Textarea id="address" placeholder="Số nhà, tên đường..." defaultValue={editingAddress?.address} />
                </div>

                <div>
                  <Label>Tỉnh/Thành phố</Label>
                  <Select defaultValue={editingAddress?.city}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tỉnh/thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Quận/Huyện</Label>
                    <Select defaultValue={editingAddress?.district}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn quận/huyện" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quan-1">Quận 1</SelectItem>
                        <SelectItem value="quan-2">Quận 2</SelectItem>
                        <SelectItem value="quan-3">Quận 3</SelectItem>
                        <SelectItem value="quan-4">Quận 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Phường/Xã</Label>
                    <Select defaultValue={editingAddress?.ward}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn phường/xã" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phuong-ben-nghe">Phường Bến Nghé</SelectItem>
                        <SelectItem value="phuong-ben-thanh">Phường Bến Thành</SelectItem>
                        <SelectItem value="phuong-co-giang">Phường Cô Giang</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Loại địa chỉ</Label>
                  <Select defaultValue={editingAddress?.type || "home"}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">
                        <div className="flex items-center">
                          <Home className="w-4 h-4 mr-2" />
                          Nhà riêng
                        </div>
                      </SelectItem>
                      <SelectItem value="office">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-2" />
                          Văn phòng
                        </div>
                      </SelectItem>
                      <SelectItem value="other">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Khác
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
                  <Button
                    className="flex-1 bg-pink-500 hover:bg-pink-600"
                    onClick={() => {
                      setShowAddForm(false)
                      setEditingAddress(null)
                    }}
                  >
                    {editingAddress ? "Cập nhật" : "Thêm địa chỉ"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false)
                      setEditingAddress(null)
                    }}
                  >
                    Hủy
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Hỗ trợ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <MapPin className="w-4 h-4 mr-2" />
                Tìm địa chỉ trên bản đồ
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                📞 Gọi hỗ trợ: 1900 1234
              </Button>
              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                💡 <strong>Mẹo:</strong> Địa chỉ mặc định sẽ được sử dụng tự động khi đặt hàng
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
