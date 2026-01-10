"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Eye, Heart, Package, Award } from "lucide-react";
import { useTranslation } from "@/lib/translations";

interface Snack {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  orders: number;
  image: string;
  category: string;
  description: string;
  weight: string;
  origin: string;
  isOrganic?: boolean;
  isImported?: boolean;
  isBestSeller?: boolean;
}

export function SnackGrid() {
  const { t, language } = useTranslation();
  const [snacks] = useState<Snack[]>([]);

  return (
    <div className="space-y-6">
      {/* Sort and View Options */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            {language === "vi"
              ? `Hiển thị ${snacks.length} sản phẩm`
              : language === "en"
              ? `Showing ${snacks.length} products`
              : `显示 ${snacks.length} 产品`}
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
            {language === "vi"
              ? "Bán chạy"
              : language === "en"
              ? "Best Selling"
              : "畅销"}
          </Button>
          <Button variant="outline" size="sm">
            {language === "vi"
              ? "Giá thấp"
              : language === "en"
              ? "Low Price"
              : "低价"}
          </Button>
          <Button variant="outline" size="sm">
            {t.bestRating}
          </Button>
        </div>
      </div>

      {snacks.length === 0 ? (
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {snacks.map((snack) => (
            <Card
              key={snack.id}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={snack.image || "/placeholder.svg"}
                  alt={snack.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 space-y-2">
                  {snack.isBestSeller && (
                    <Badge className="bg-orange-500 text-white">
                      🏆{" "}
                      {language === "vi"
                        ? "Bán chạy"
                        : language === "en"
                        ? "Best Selling"
                        : "畅销"}
                    </Badge>
                  )}
                  {snack.isOrganic && (
                    <Badge className="bg-green-500 text-white">
                      🌱{" "}
                      {language === "vi"
                        ? "Hữu cơ"
                        : language === "en"
                        ? "Organic"
                        : "有机"}
                    </Badge>
                  )}
                  {snack.isImported && (
                    <Badge className="bg-blue-500 text-white">
                      🌍{" "}
                      {language === "vi"
                        ? "Nhập khẩu"
                        : language === "en"
                        ? "Imported"
                        : "进口"}
                    </Badge>
                  )}
                  {snack.originalPrice && (
                    <Badge className="bg-red-500 text-white">
                      -
                      {Math.round(
                        (1 - snack.price / snack.originalPrice) * 100
                      )}
                      %
                    </Badge>
                  )}
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  <Button size="sm" variant="secondary" className="bg-white/90">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/90">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <Badge variant="outline" className="text-xs mb-2">
                      {snack.category}
                    </Badge>
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                      {snack.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {snack.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Package className="w-4 h-4" />
                      <span>{snack.weight}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span>{snack.origin}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">
                        {snack.rating}
                      </span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">
                      {snack.orders} đã bán
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-orange-600">
                        {snack.price.toLocaleString()}đ
                      </span>
                      {snack.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {snack.originalPrice.toLocaleString()}đ
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Thêm vào giỏ
                    </Button>
                    <Button variant="outline" size="sm">
                      Chi tiết
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Placeholder: special categories can be added later by Admin */}

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-8">
        <Button variant="outline" size="sm">
          Trước
        </Button>
        <Button size="sm" className="bg-orange-500 text-white">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          Sau
        </Button>
      </div>
    </div>
  );
}
