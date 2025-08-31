import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

interface CategoryFiltersProps {
  category: "birthday" | "wedding" | "event" | "kids" | "hottrend" | "accessories" | "beverages" | "snacks"
}

export function CategoryFilters({ category }: CategoryFiltersProps) {
  const getFilters = () => {
    switch (category) {
      case "birthday":
        return {
          categories: ["Bánh hoa", "Bánh nhiều tầng", "Bánh trái cây", "Bánh đặc biệt", "Bánh trà xanh"],
          sizes: ["Tròn 15cm", "Tròn 18cm", "Tròn 20cm", "Tròn 22cm", "Vuông 25cm"],
          flavors: ["Vanilla", "Chocolate", "Dâu tây", "Red Velvet", "Tiramisu", "Matcha"],
        }
      case "wedding":
        return {
          categories: ["Bánh 2 tầng", "Bánh 3 tầng", "Bánh 4 tầng", "Bánh đơn giản", "Bánh hoa tươi"],
          sizes: ["2 tầng", "3 tầng", "4 tầng", "5 tầng"],
          flavors: ["Vanilla", "Chocolate", "Red Velvet", "Lemon", "Strawberry", "Fruit"],
        }
      case "event":
        return {
          categories: ["Bánh khai trương", "Bánh tốt nghiệp", "Bánh thôi nôi", "Bánh lễ hội"],
          sizes: ["Tròn 20cm", "Tròn 25cm", "Vuông 30x40cm", "Tròn 22cm"],
          flavors: ["Vanilla", "Chocolate", "Strawberry", "Lotus"],
        }
      case "kids":
        return {
          categories: ["Nhân vật hoạt hình", "Công chúa", "Siêu anh hùng", "Xe cộ", "Pony", "Pokemon"],
          sizes: ["Tròn 15cm", "Tròn 18cm", "Tròn 20cm", "Hình đặc biệt"],
          flavors: ["Vanilla", "Chocolate", "Strawberry", "Blueberry", "Rainbow", "Lemon"],
        }
      case "hottrend":
        return {
          categories: ["Viral TikTok", "Phim hot", "Đồ uống", "Game", "K-pop", "K-style"],
          sizes: ["Tròn 15cm", "Tròn 18cm", "Tròn 20cm", "Hình đặc biệt"],
          flavors: ["Chocolate", "Red Velvet", "Taro", "Vanilla", "Purple Yam", "Matcha"],
        }
      case "accessories":
        return {
          categories: [
            "Nến sinh nhật",
            "Dụng cụ",
            "Trang trí",
            "Combo",
            "Phụ kiện",
            "Hộp quà",
            "Thiệp",
            "Trang trí bánh",
          ],
          sizes: ["Nhỏ", "Vừa", "Lớn", "Set"],
          flavors: [], // Không cần flavors cho phụ kiện
        }
      case "beverages":
        return {
          categories: ["Trà sữa", "Cà phê", "Smoothie", "Nước ép", "Trà trái cây", "Trà", "Sinh tố"],
          sizes: ["M", "L", "XL"],
          flavors: ["Nguyên chất", "Ngọt", "Ít đường", "Không đường"],
        }
      case "snacks":
        return {
          categories: ["Bánh quy", "Chocolate", "Hạt rang", "Kẹo", "Bánh tráng", "Snack", "Mứt"],
          sizes: ["Nhỏ (100-200g)", "Vừa (200-400g)", "Lớn (400g+)"],
          flavors: ["Ngọt", "Mặn", "Cay", "Chua", "Đắng"],
        }
      default:
        return { categories: [], sizes: [], flavors: [] }
    }
  }

  const filters = getFilters()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bộ lọc sản phẩm</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Khoảng giá</Label>
            <Slider defaultValue={[200000, 1000000]} max={2000000} min={100000} step={50000} className="mb-3" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>100.000đ</span>
              <span>2.000.000đ</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Loại bánh</Label>
            <div className="space-y-2">
              {filters.categories.map((cat, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`cat-${index}`} />
                  <Label htmlFor={`cat-${index}`} className="text-sm">
                    {cat}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Kích cỡ</Label>
            <div className="space-y-2">
              {filters.sizes.map((size, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`size-${index}`} />
                  <Label htmlFor={`size-${index}`} className="text-sm">
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Flavors */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Hương vị</Label>
            <div className="space-y-2">
              {filters.flavors.map((flavor, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`flavor-${index}`} />
                  <Label htmlFor={`flavor-${index}`} className="text-sm">
                    {flavor}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Special Options */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Tùy chọn đặc biệt</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="customizable" />
                <Label htmlFor="customizable" className="text-sm">
                  Có thể tùy chỉnh
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="sugar-free" />
                <Label htmlFor="sugar-free" className="text-sm">
                  Ít đường
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="egg-free" />
                <Label htmlFor="egg-free" className="text-sm">
                  Không trứng
                </Label>
              </div>
            </div>
          </div>

          <Button className="w-full bg-pink-500 hover:bg-pink-600">Áp dụng bộ lọc</Button>
        </CardContent>
      </Card>

      {/* Quick Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lọc nhanh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-pink-50">
              Giá rẻ
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-pink-50">
              Bán chạy
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-pink-50">
              Mới nhất
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-pink-50">
              Đánh giá cao
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
