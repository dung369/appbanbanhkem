import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const categories = [
  {
    title: "Bánh sinh nhật",
    description: "Đa dạng mẫu mã, tùy chỉnh theo ý thích",
    icon: "🎂",
    color: "from-pink-400 to-pink-600",
  },
  {
    title: "Bánh cưới",
    description: "Sang trọng, lãng mạn cho ngày trọng đại",
    icon: "💒",
    color: "from-purple-400 to-purple-600",
  },
  {
    title: "Bánh trẻ em",
    description: "Nhân vật hoạt hình, màu sắc bắt mắt",
    icon: "🧸",
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "Bánh sự kiện",
    description: "Khai trương, sinh nhật công ty, lễ hội",
    icon: "🎉",
    color: "from-green-400 to-green-600",
  },
  {
    title: "Bánh tùy chỉnh",
    description: "Thiết kế riêng, in ảnh cá nhân",
    icon: "🎨",
    color: "from-orange-400 to-orange-600",
  },
  {
    title: "Bánh ít đường",
    description: "Dành cho người ăn kiêng, tiểu đường",
    icon: "🌿",
    color: "from-teal-400 to-teal-600",
  },
]

export function FeaturedCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Danh mục nổi bật</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập bánh kem đa dạng, phù hợp với mọi dịp đặc biệt trong cuộc sống
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardContent className="p-6">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-pink-50 group-hover:border-pink-300 bg-transparent"
                >
                  Xem thêm →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
