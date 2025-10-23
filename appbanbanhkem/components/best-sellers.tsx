"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Loader2 } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  rating: number
  orders: number
  imageUrl: string
  isBestSeller?: boolean
  status?: string
}

export function BestSellers() {
  const [bestSellers, setBestSellers] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const loadBestSellers = async () => {
      // Check if we're on client-side and db is available
      if (typeof window === "undefined" || !db) {
        setLoading(false)
        return
      }

      try {
        // Simple query without composite index
        const q = query(collection(db, "products"))
        const querySnapshot = await getDocs(q)
        
        // Filter and sort in memory
        const products = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Product[]
        
        const bestSellers = products
          .filter((p) => p.isBestSeller && p.status === "active")
          .sort((a, b) => (b.orders || 0) - (a.orders || 0))
          .slice(0, 8)
        
        setBestSellers(bestSellers)
      } catch (error) {
        console.error("Error loading best sellers:", error)
        setBestSellers([])
      } finally {
        setLoading(false)
      }
    }

    loadBestSellers()
  }, [mounted])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-pink-500" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-yellow-500 text-white px-4 py-2 text-lg mb-4">⭐ BÁN CHẠY NHẤT</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Những chiếc bánh được yêu thích nhất</h2>
        </div>

        {bestSellers.length === 0 ? (
          <div className="border rounded-lg bg-white py-12 text-center text-gray-600">
            Chưa có sản phẩm bán chạy. Sản phẩm sẽ hiển thị khi Admin thêm vào.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((cake, index) => (
            <Card key={cake.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => router.push(`/san-pham/${cake.id}`)}>
              <div className="relative">
                <img
                  src={cake.imageUrl || "/placeholder.svg"}
                  alt={cake.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 left-2 bg-yellow-500 text-white text-xs">#{index + 1}</Badge>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{cake.name}</h3>

                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium ml-1">{cake.rating}</span>
                  <span className="text-gray-400 mx-2">•</span>
                  <span className="text-sm text-gray-600">{cake.orders} đã bán</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-pink-600">{cake.price.toLocaleString()}đ</span>
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        )}
      </div>
    </section>
  )
}
