"use client"

import { useState, useEffect } from "react"
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { ProductCard } from "@/components/product-card"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Package } from "lucide-react"

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
  createdAt?: any
}

interface ProductListProps {
  category: string
  title: string
  description?: string
}

export function ProductList({ category, title, description }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const loadProducts = async () => {
      // Check if we're on client-side and db is available
      if (typeof window === "undefined" || !db) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        // Simple query without composite index - just get all products and filter in memory
        const q = query(collection(db, "products"))
        const querySnapshot = await getDocs(q)
        
        let productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[]

        // Filter in memory based on category
        if (category === "home") {
          productsData = productsData
            .filter((p) => p.isBestSeller && p.status === "active")
            .sort((a, b) => (b.orders || 0) - (a.orders || 0))
        } else if (category === "hot-trend") {
          productsData = productsData
            .filter((p) => p.isTrending && p.status === "active")
            .sort((a, b) => {
              const timeA = a.createdAt?.toMillis?.() || 0
              const timeB = b.createdAt?.toMillis?.() || 0
              return timeB - timeA
            })
        } else {
          productsData = productsData
            .filter((p) => p.category === category && p.status === "active")
            .sort((a, b) => {
              const timeA = a.createdAt?.toMillis?.() || 0
              const timeB = b.createdAt?.toMillis?.() || 0
              return timeB - timeA
            })
        }

        setProducts(productsData)
      } catch (error) {
        console.error("Error loading products:", error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [category, mounted])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardContent className="p-10 text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-pink-500" />
            <p className="text-gray-600">Đang tải sản phẩm...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        {description && <p className="text-gray-600">{description}</p>}
      </div>

      {products.length === 0 ? (
        <Card>
          <CardContent className="p-16 text-center">
            <Package className="w-20 h-20 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Chưa có sản phẩm</h3>
            <p className="text-gray-600">
              Hiện tại chưa có sản phẩm trong danh mục này. Vui lòng quay lại sau!
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="mb-6 text-sm text-gray-600">
            Hiển thị {products.length} sản phẩm
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
