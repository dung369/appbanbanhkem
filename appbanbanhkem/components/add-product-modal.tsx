"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { db, auth } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { X, Upload, Loader2 } from "lucide-react"

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddProductModal({ isOpen, onClose, onSuccess }: AddProductModalProps) {
  const [loading, setLoading] = useState(false)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    size: "",
    flavor: "",
    stock: "",
    isCustomizable: false,
    isBestSeller: false,
    isTrending: false,
  })

  const categories = [
    { value: "home", label: "Trang chủ (Bán chạy nhất)" },
    { value: "birthday", label: "Bánh sinh nhật" },
    { value: "wedding", label: "Bánh cưới" },
    { value: "event", label: "Bánh sự kiện" },
    { value: "kids", label: "Bánh trẻ em" },
    { value: "hot-trend", label: "🔥 Hot Trend" },
    { value: "beverage", label: "Đồ uống tươi mát" },
    { value: "snack", label: "Đồ ăn vặt ngon" },
  ]

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      // Giới hạn tối đa 4 ảnh (1 ảnh chính + 3 ảnh phụ)
      const remainingSlots = 4 - imageFiles.length
      if (remainingSlots <= 0) {
        alert("Chỉ được thêm tối đa 4 ảnh!")
        return
      }
      
      const filesToAdd = files.slice(0, remainingSlots)
      setImageFiles((prev) => [...prev, ...filesToAdd])
      
      filesToAdd.forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
      
      if (files.length > remainingSlots) {
        alert(`Chỉ thêm được ${remainingSlots} ảnh nữa. Tối đa 4 ảnh!`)
      }
    }
  }

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log("=== Starting product submission ===")
    console.log("Form data:", formData)
    console.log("Image files count:", imageFiles.length)
    
    // Check auth
    const currentUser = auth.currentUser
    console.log("Current user:", currentUser?.email)
    if (!currentUser) {
      alert("Bạn chưa đăng nhập! Vui lòng đăng nhập lại.")
      return
    }
    
    if (imageFiles.length === 0) {
      alert("Vui lòng thêm ít nhất 1 hình ảnh sản phẩm!")
      return
    }

    // Check if Firebase is available
    if (!db) {
      alert("Firebase chưa sẵn sàng. Vui lòng thử lại sau!")
      console.error("Firebase not initialized:", { db })
      return
    }
    
    setLoading(true)

    try {
      console.log("Step 1: Converting images to base64...")
      const imageUrls: string[] = []
      
      // Convert images to base64 (temporary solution without Storage)
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i]
        console.log(`Converting image ${i + 1}/${imageFiles.length}:`, file.name)
        
        try {
          // Convert to base64
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(file)
          })
          
          imageUrls.push(base64)
          console.log(`Image ${i + 1} converted (${Math.round(base64.length / 1024)}KB)`)
        } catch (convertError: any) {
          console.error(`Error converting image ${i + 1}:`, convertError)
          throw new Error(`Lỗi xử lý ảnh ${i + 1}: ${convertError.message}`)
        }
      }

      console.log("Step 2: All images converted successfully")
      console.log("Image URLs (base64):", imageUrls.map(url => url.substring(0, 50) + '...'))

      // Prepare product data
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price),
        originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : null,
        category: formData.category,
        size: formData.size,
        flavor: formData.flavor,
        stock: parseInt(formData.stock),
        isCustomizable: formData.isCustomizable,
        isBestSeller: formData.isBestSeller,
        isTrending: formData.isTrending || formData.category === "hot-trend",
        imageUrl: imageUrls[0], // Main image
        imageUrls, // All images
        rating: 5.0,
        orders: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: "active",
      }

      console.log("Step 3: Prepared product data:", productData)

      // Add to Firestore
      console.log("Step 4: Adding to Firestore...")
      const docRef = await addDoc(collection(db, "products"), productData)
      
      console.log("✅ Product added successfully with ID:", docRef.id)

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        category: "",
        size: "",
        flavor: "",
        stock: "",
        isCustomizable: false,
        isBestSeller: false,
        isTrending: false,
      })
      setImageFiles([])
      setImagePreviews([])

      // Close modal first
      onClose()
      
      // Show success message
      alert("✅ Thêm sản phẩm thành công!")
      
      // Then trigger refresh
      onSuccess()
    } catch (error) {
      console.error("❌ Error adding product:", error)
      console.error("Error details:", {
        message: (error as Error).message,
        code: (error as any).code,
        stack: (error as Error).stack
      })
      alert("❌ Có lỗi xảy ra khi thêm sản phẩm: " + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Thêm sản phẩm mới</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            disabled={loading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <Label htmlFor="name">Tên sản phẩm *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="VD: Bánh Galaxy Đổi Màu"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category">Danh mục *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value, isTrending: value === "hot-trend" })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Giá bán (đ) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="750000"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="originalPrice">Giá gốc (đ)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="900000"
                  />
                </div>
              </div>

              {/* Size and Flavor */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="size">Kích cỡ *</Label>
                  <Input
                    id="size"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    placeholder="VD: 20cm"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="flavor">Hương vị *</Label>
                  <Input
                    id="flavor"
                    value={formData.flavor}
                    onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                    placeholder="VD: Socola"
                    required
                  />
                </div>
              </div>

              {/* Stock */}
              <div>
                <Label htmlFor="stock">Số lượng tồn kho *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="100"
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <Label>Hình ảnh sản phẩm * (Tối đa 4 ảnh: 1 chính + 3 phụ)</Label>
                <div className="mt-2 space-y-3">
                  {/* Image Previews Grid */}
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-28 object-cover rounded-lg border-2"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          {index === 0 && (
                            <div className="absolute bottom-1 left-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1 rounded font-semibold">
                              ⭐ Ảnh chính
                            </div>
                          )}
                          {index > 0 && (
                            <div className="absolute bottom-1 left-1 bg-gray-700/80 text-white text-xs px-2 py-0.5 rounded">
                              Ảnh {index}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Button */}
                  {imagePreviews.length < 4 && (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <Upload className="w-6 h-6 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600 font-medium">
                        {imagePreviews.length > 0 ? "Thêm ảnh khác" : "Nhấn để tải ảnh lên"}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        {imagePreviews.length}/4 ảnh - PNG, JPG (Có thể chọn nhiều)
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                  
                  {imagePreviews.length >= 4 && (
                    <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700 font-medium">
                        ✅ Đã đủ 4 ảnh (tối đa)
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        Xóa ảnh nếu muốn thay đổi
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Mô tả sản phẩm *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mô tả chi tiết về sản phẩm..."
                  rows={4}
                  required
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isCustomizable"
                    checked={formData.isCustomizable}
                    onChange={(e) => setFormData({ ...formData, isCustomizable: e.target.checked })}
                    className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                  />
                  <Label htmlFor="isCustomizable" className="cursor-pointer">
                    Có thể tùy chỉnh
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isBestSeller"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                  />
                  <Label htmlFor="isBestSeller" className="cursor-pointer">
                    Sản phẩm bán chạy nhất
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isTrending"
                    checked={formData.isTrending || formData.category === "hot-trend"}
                    onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                    className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500"
                    disabled={formData.category === "hot-trend"}
                  />
                  <Label htmlFor="isTrending" className="cursor-pointer">
                    Sản phẩm Hot Trend 🔥
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang thêm...
                </>
              ) : (
                "Thêm sản phẩm"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
