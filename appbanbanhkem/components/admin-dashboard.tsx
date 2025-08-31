"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
  Bell,
  Settings,
  LogOut,
} from "lucide-react"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  // Mock data
  const stats = {
    totalOrders: 1234,
    totalRevenue: 45600000,
    totalCustomers: 892,
    totalProducts: 156,
  }

  const recentOrders = [
    {
      id: "#ORD001",
      customer: "Nguyễn Văn A",
      product: "Bánh sinh nhật hoa hồng",
      amount: 450000,
      status: "pending",
      date: "2024-01-15",
    },
    {
      id: "#ORD002",
      customer: "Trần Thị B",
      product: "Bánh cưới 3 tầng",
      amount: 1200000,
      status: "processing",
      date: "2024-01-15",
    },
    {
      id: "#ORD003",
      customer: "Lê Văn C",
      product: "Bánh Doraemon",
      amount: 520000,
      status: "completed",
      date: "2024-01-14",
    },
  ]

  const products = [
    {
      id: 1,
      name: "Bánh sinh nhật hoa hồng",
      category: "Bánh sinh nhật",
      price: 450000,
      stock: 25,
      status: "active",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Bánh cưới 3 tầng",
      category: "Bánh cưới",
      price: 1200000,
      stock: 8,
      status: "active",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      name: "Bánh Doraemon",
      category: "Bánh trẻ em",
      price: 520000,
      stock: 0,
      status: "out_of_stock",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Chờ xử lý</Badge>
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Đang làm</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Hoàn thành</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Đã hủy</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getProductStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Đang bán</Badge>
      case "out_of_stock":
        return <Badge className="bg-red-100 text-red-800">Hết hàng</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Ngừng bán</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">🧁</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-pink-600">SweetCake</h2>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="mt-6">
          <div className="px-6 py-2">
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("dashboard")}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </div>
          <div className="px-6 py-2">
            <Button
              variant={activeTab === "orders" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("orders")}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Đơn hàng
            </Button>
          </div>
          <div className="px-6 py-2">
            <Button
              variant={activeTab === "products" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("products")}
            >
              <Package className="w-4 h-4 mr-2" />
              Sản phẩm
            </Button>
          </div>
          <div className="px-6 py-2">
            <Button
              variant={activeTab === "customers" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("customers")}
            >
              <Users className="w-4 h-4 mr-2" />
              Khách hàng
            </Button>
          </div>
        </nav>

        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Cài đặt
          </Button>
          <Button variant="ghost" className="w-full justify-start text-red-600">
            <LogOut className="w-4 h-4 mr-2" />
            Đăng xuất
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "orders" && "Quản lý đơn hàng"}
              {activeTab === "products" && "Quản lý sản phẩm"}
              {activeTab === "customers" && "Quản lý khách hàng"}
            </h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <span className="font-medium">Admin</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Tổng đơn hàng</p>
                        <p className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</p>
                      </div>
                      <ShoppingCart className="w-8 h-8 text-blue-500" />
                    </div>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+12% so với tháng trước</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Doanh thu</p>
                        <p className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()}đ</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-green-500" />
                    </div>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+8% so với tháng trước</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Khách hàng</p>
                        <p className="text-2xl font-bold">{stats.totalCustomers.toLocaleString()}</p>
                      </div>
                      <Users className="w-8 h-8 text-purple-500" />
                    </div>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+15% so với tháng trước</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Sản phẩm</p>
                        <p className="text-2xl font-bold">{stats.totalProducts}</p>
                      </div>
                      <Package className="w-8 h-8 text-orange-500" />
                    </div>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+5 sản phẩm mới</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Đơn hàng gần đây</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.customer}</p>
                          </div>
                          <div>
                            <p className="text-sm">{order.product}</p>
                            <p className="text-sm text-gray-600">{order.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="font-medium">{order.amount.toLocaleString()}đ</span>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <Input placeholder="Tìm kiếm đơn hàng..." />
                    </div>
                    <Select>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Trạng thái" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="pending">Chờ xử lý</SelectItem>
                        <SelectItem value="processing">Đang làm</SelectItem>
                        <SelectItem value="completed">Hoàn thành</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Lọc
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Xuất Excel
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Orders Table */}
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã đơn</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Khách hàng
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sản phẩm</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số tiền</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Trạng thái
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {recentOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{order.customer}</td>
                            <td className="px-6 py-4">{order.product}</td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">
                              {order.amount.toLocaleString()}đ
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(order.status)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="space-y-6">
              {/* Actions */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <Input placeholder="Tìm kiếm sản phẩm..." className="w-64" />
                  <Select>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="birthday">Bánh sinh nhật</SelectItem>
                      <SelectItem value="wedding">Bánh cưới</SelectItem>
                      <SelectItem value="kids">Bánh trẻ em</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-pink-500 hover:bg-pink-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm sản phẩm
                </Button>
              </div>

              {/* Products Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-gray-600">{product.category}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-pink-600">{product.price.toLocaleString()}đ</span>
                            {getProductStatusBadge(product.status)}
                          </div>
                          <p className="text-sm text-gray-600">Tồn kho: {product.stock}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Edit className="w-4 h-4 mr-2" />
                          Sửa
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === "customers" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Danh sách khách hàng</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Chức năng quản lý khách hàng đang được phát triển...</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
