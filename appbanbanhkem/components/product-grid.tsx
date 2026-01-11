"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { useTranslation } from "@/lib/translations";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  orders: number;
  image: string;
  category: string;
  size: string;
  flavor: string;
  isCustomizable: boolean;
  trending?: boolean;
}

interface ProductGridProps {
  products?: Product[];
}

export function ProductGrid({ products = [] }: ProductGridProps) {
  const { t, language } = useTranslation();
  const router = useRouter();

  const handleViewDetail = (productId: number) => {
    router.push(`/san-pham/${productId}`);
  };

  return (
    <div className="space-y-6">
      {/* Sort and View Options */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            {language === "vi"
              ? `Hiển thị ${products.length} sản phẩm`
              : language === "en"
              ? `Showing ${products.length} products`
              : `显示 ${products.length} 产品`}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {language === "vi"
              ? "Sắp xếp:"
              : language === "en"
              ? "Sort:"
              : "排序："}
          </span>
          <Button variant="outline" size="sm">
            {t.newest}
          </Button>
          <Button variant="outline" size="sm">
            {language === "vi"
              ? "Giá thấp"
              : language === "en"
              ? "Low Price"
              : "低价"}
          </Button>
          <Button variant="outline" size="sm">
            {language === "vi"
              ? "Bán chạy"
              : language === "en"
              ? "Best Selling"
              : "畅销"}
          </Button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border rounded-lg bg-gray-50 text-center">
          <img
            src="/placeholder.svg"
            alt="No products"
            className="w-20 h-20 opacity-40 mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {t.noProducts}
          </h3>
          <p className="text-sm text-gray-600">{t.noProductsDesc}</p>
        </div>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.trending && (
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                      🔥 Hot
                    </Badge>
                  )}
                  {product.isCustomizable && (
                    <Badge className="absolute top-3 right-3 bg-blue-500 text-white">
                      🎨 {t.customizable}
                    </Badge>
                  )}

                  {/* Hover Actions */}
                  <d  onClick={() => handleViewDetail(product.id)}
                    iv className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {product.category}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Kích cỡ: {product.size}</span>
                      <span>Vị: {product.flavor}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">
                        {product.orders} đã bán
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-pink-600">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Thêm vào giỏ
                      </Button
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetail(product.id)}
                      
                      <Button variant="outline" size="sm">
                        Chi tiết
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
  );
}
