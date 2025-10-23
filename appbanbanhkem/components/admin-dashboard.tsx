"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddProductModal } from "@/components/add-product-modal"
import { ProductCard } from "@/components/product-card"
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
  LogOut,
  Loader2,
} from "lucide-react"

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
  stock: number
  status: string
  createdAt: any
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const router = useRouter()

  // Load products from Firestore
  const loadProducts = async () => {
    // Check if we're on client-side and db is available
    if (typeof window === "undefined" || !db) {
      setLoading(false)
      return
    }

    setLoading(true)
    
    try {
      // Simple query without orderBy to avoid index requirement
      const q = query(collection(db, "products"))
      const querySnapshot = await getDocs(q)
      
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[]
      
      // Sort in memory by createdAt
      productsData.sort((a, b) => {
        const timeA = a.createdAt?.toMillis?.() || 0
        const timeB = b.createdAt?.toMillis?.() || 0
        return timeB - timeA
      })
      
      setProducts(productsData)
      setFilteredProducts(productsData)
    } catch (error) {
      console.error("Error loading products:", error)
      // Set empty array on error to show empty state
      setProducts([])
      setFilteredProducts([])
    } finally {
      setLoading(false)
    }
  }

  // Mount check
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load products only after component is mounted
  useEffect(() => {
    if (mounted) {
      loadProducts()
    }
  }, [mounted])

  // Filter products
  useEffect(() => {
    let filtered = products

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((p) => p.category === categoryFilter)
    }

    setFilteredProducts(filtered)
  }, [searchQuery, categoryFilter, products])

  // Delete product
  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return

    try {
      await deleteDoc(doc(db, "products", productId))
      loadProducts()
      alert("Xóa sản phẩm thành công!")
    } catch (error) {
      console.error("Error deleting product:", error)
      alert("Có lỗi xảy ra khi xóa sản phẩm!")
    }
  }

  // Mock data
  const stats = {
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalProducts: products.length,
  }

  // Start with zero/empty data – ready for real integrations
  const recentOrders: Array<{
    id: string
    customer: string
    product: string
    amount: number
    status: string
    date: string
  }> = []

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
            <img src="/favicon.ico" alt="Logo" className="w-8 h-8 rounded" />
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
          <div className="px-6 py-2">
            <Button
              variant={activeTab === "feedback" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("feedback")}
            >
              {/* using Bell icon already imported */}
              <Bell className="w-4 h-4 mr-2" />
              Ghi nhận ý kiến
            </Button>
          </div>
          <div className="px-6 py-2">
            <Button
              variant={activeTab === "chat" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("chat")}
            >
              <Users className="w-4 h-4 mr-2" />
              Chat với khách hàng
            </Button>
          </div>
          <div className="px-6 py-2">
            <Button
              variant={activeTab === "reports" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("reports")}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Báo cáo & thống kê
            </Button>
          </div>
          <div className="px-6 py-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setShowFilterModal(true)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Lọc dữ liệu
            </Button>
          </div>
        </nav>

        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600"
            onClick={async () => {
              try {
                await signOut(auth)
              } finally {
                router.replace("/auth")
              }
            }}
          >
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
                    <div className="flex items-center mt-2 text-gray-500">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">0% thay đổi</span>
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
                    <div className="flex items-center mt-2 text-gray-500">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">0% thay đổi</span>
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
                    <div className="flex items-center mt-2 text-gray-500">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">0% thay đổi</span>
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
                    <div className="flex items-center mt-2 text-gray-500">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm">0 sản phẩm mới</span>
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
                  {recentOrders.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">Chưa có đơn hàng</div>
                  ) : (
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
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === "feedback" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ghi nhận ý kiến khách hàng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white rounded-lg border p-6">
                    <p className="text-gray-700 font-medium mb-2">Ghi nhận ý kiến khách hàng</p>
                    <div className="text-gray-500">Chưa có phản hồi</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Chat Tab */}
          {activeTab === "chat" && (
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white px-6 py-4 flex items-center justify-between">
                  <div className="font-semibold">Chat với khách hàng</div>
                  <div className="text-sm">Đang hoạt động •
                    <span className="ml-1 inline-block w-2 h-2 bg-green-400 rounded-full align-middle"></span>
                  </div>
                </div>
                <CardContent className="p-0">
                  <div className="grid grid-cols-12 h-[60vh]">
                    <div className="col-span-3 border-r p-4">
                      <div className="text-sm text-gray-700 font-medium mb-3">Cuộc trò chuyện</div>
                      <div className="h-full flex items-center justify-center text-gray-500">
                        Chưa có cuộc trò chuyện
                      </div>
                    </div>
                    <div className="col-span-9 flex flex-col">
                      <div className="flex-1 flex items-center justify-center text-gray-500">
                        Chưa có tin nhắn
                      </div>
                      <div className="border-t p-4">
                        <Input placeholder="Nhập tin nhắn..." />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Doanh thu tháng này</p>
                        <p className="text-2xl font-bold">0</p>
                      </div>
                      <span className="text-green-500">$</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Đơn hàng tháng này</p>
                        <p className="text-2xl font-bold">0</p>
                      </div>
                      <ShoppingCart className="w-6 h-6 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Khách hàng mới</p>
                        <p className="text-2xl font-bold">0</p>
                      </div>
                      <Users className="w-6 h-6 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Sản phẩm bán ra</p>
                        <p className="text-2xl font-bold">0</p>
                      </div>
                      <Package className="w-6 h-6 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Xu hướng doanh thu 6 tháng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-50 border rounded flex items-center justify-center text-gray-400">
                      Biểu đồ (đang trống)
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Danh mục sản phẩm</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-50 border rounded flex items-center justify-center text-gray-400">
                      Biểu đồ (đang trống)
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Hiệu suất 7 ngày qua</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 bg-gray-50 border rounded flex items-center justify-center text-gray-400">
                      Biểu đồ (đang trống)
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Sản phẩm bán chạy nhất</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 bg-gray-50 border rounded flex items-center justify-center text-gray-400">
                      Chưa có dữ liệu
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Phân khúc khách hàng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded p-4 text-center">
                        <div className="text-gray-600">Khách hàng mới</div>
                        <div className="text-2xl font-bold">0</div>
                        <div className="text-xs text-gray-500">0đ Chi tiêu trung bình</div>
                      </div>
                      <div className="border rounded p-4 text-center">
                        <div className="text-gray-600">Khách hàng thường xuyên</div>
                        <div className="text-2xl font-bold">0</div>
                        <div className="text-xs text-gray-500">0đ Chi tiêu trung bình</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div />
              </div>
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
                        {recentOrders.length === 0 ? (
                          <tr>
                            <td className="px-6 py-8 text-center text-gray-500" colSpan={7}>
                              Không có đơn hàng
                            </td>
                          </tr>
                        ) : (
                          recentOrders.map((order) => (
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
                          ))
                        )}
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
                  <Input
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả danh mục</SelectItem>
                      <SelectItem value="home">Trang chủ (Bán chạy)</SelectItem>
                      <SelectItem value="birthday">Bánh sinh nhật</SelectItem>
                      <SelectItem value="wedding">Bánh cưới</SelectItem>
                      <SelectItem value="event">Bánh sự kiện</SelectItem>
                      <SelectItem value="kids">Bánh trẻ em</SelectItem>
                      <SelectItem value="hot-trend">🔥 Hot Trend</SelectItem>
                      <SelectItem value="beverage">Đồ uống</SelectItem>
                      <SelectItem value="snack">Đồ ăn vặt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  onClick={() => setShowAddProductModal(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm sản phẩm
                </Button>
              </div>

              {/* Products Grid */}
              {loading ? (
                <Card>
                  <CardContent className="p-10 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-pink-500" />
                    <p className="text-gray-500">Đang tải sản phẩm...</p>
                  </CardContent>
                </Card>
              ) : filteredProducts.length === 0 ? (
                <Card>
                  <CardContent className="p-10 text-center">
                    <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {searchQuery || categoryFilter !== "all" ? "Không tìm thấy sản phẩm" : "Chưa có sản phẩm"}
                    </h3>
                    <p className="text-gray-500 mb-4">
                      {searchQuery || categoryFilter !== "all"
                        ? "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
                        : "Nhấn nút 'Thêm sản phẩm' để bắt đầu"}
                    </p>
                    {!searchQuery && categoryFilter === "all" && (
                      <Button
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                        onClick={() => setShowAddProductModal(true)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Thêm sản phẩm đầu tiên
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600">
                      Hiển thị {filteredProducts.length} / {products.length} sản phẩm
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <Card key={product.id} className="overflow-hidden">
                        <div className="relative">
                          <img
                            src={product.imageUrl || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.isTrending && (
                              <Badge className="bg-red-500 text-white">🔥 Hot</Badge>
                            )}
                            {product.isBestSeller && (
                              <Badge className="bg-yellow-500 text-white">Bán chạy</Badge>
                            )}
                          </div>
                          {getProductStatusBadge(product.status)}
                        </div>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                              <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">{product.category}</span>
                              <span className="text-gray-600">Tồn: {product.stock}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-xl font-bold text-pink-600">
                                  {product.price.toLocaleString()}đ
                                </span>
                                {product.originalPrice && (
                                  <span className="text-sm text-gray-400 line-through ml-2">
                                    {product.originalPrice.toLocaleString()}đ
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                onClick={() => router.push(`/san-pham/${product.id}`)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Xem chi tiết
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
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
                  <p className="text-gray-600">Chưa có khách hàng</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        onSuccess={() => {
          loadProducts()
          alert("Thêm sản phẩm thành công!")
        }}
      />

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div className="font-semibold">Lọc dữ liệu / Xóa bản ghi</div>
              <button onClick={() => setShowFilterModal(false)} className="text-gray-500">✕</button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <div className="text-sm mb-1">Loại dữ liệu</div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Đơn hàng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="orders">Đơn hàng</SelectItem>
                    <SelectItem value="customers">Khách hàng</SelectItem>
                    <SelectItem value="products">Sản phẩm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="text-sm mb-1">Bản ghi</div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="-- Chọn bản ghi --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">(Chưa có)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t px-4 py-3">
              <Button variant="outline" className="bg-transparent" onClick={() => setShowFilterModal(false)}>
                Hủy
              </Button>
              <Button className="bg-red-500 hover:bg-red-600">Xóa</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
