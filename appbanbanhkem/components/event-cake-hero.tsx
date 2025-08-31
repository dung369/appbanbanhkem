import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function EventCakeHero() {
  return (
    <section className="bg-gradient-to-r from-blue-100 via-indigo-50 to-blue-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <Badge className="bg-blue-500 text-white px-4 py-2 text-lg">🎉 BÁNH SỰ KIỆN</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Bánh sự kiện
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
              {" "}
              đặc biệt
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kỷ niệm những dịp quan trọng với bánh kem được thiết kế riêng cho từng sự kiện: khai trương, tốt nghiệp,
            thôi nôi, lễ hội...
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-500">
              🎊 Đặt bánh sự kiện
            </Button>
            <Button size="lg" variant="outline">
              📋 Báo giá chi tiết
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
