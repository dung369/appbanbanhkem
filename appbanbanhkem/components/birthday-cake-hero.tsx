import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function BirthdayCakeHero() {
  return (
    <section className="bg-gradient-to-r from-pink-100 via-purple-50 to-pink-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <Badge className="bg-pink-500 text-white px-4 py-2 text-lg">🎂 BÁNH SINH NHẬT</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Bánh sinh nhật
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              {" "}
              đặc biệt
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tạo nên những khoảnh khắc đáng nhớ với bộ sưu tập bánh sinh nhật đa dạng, từ thiết kế cổ điển đến hiện đại,
            có thể tùy chỉnh theo ý thích
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500">
              🛒 Đặt bánh ngay
            </Button>
            <Button size="lg" variant="outline">
              🎨 Tùy chỉnh bánh riêng
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
