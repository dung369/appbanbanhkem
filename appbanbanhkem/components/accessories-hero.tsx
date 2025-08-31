import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function AccessoriesHero() {
  return (
    <section className="bg-gradient-to-r from-yellow-100 via-orange-50 to-yellow-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <Badge className="bg-orange-500 text-white px-4 py-2 text-lg">🎈 PHỤ KIỆN SINH NHẬT</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Phụ kiện
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              {" "}
              trang trí
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hoàn thiện bữa tiệc sinh nhật với bộ sưu tập phụ kiện đa dạng: nến, dao cắt bánh, trang trí, quà tặng và
            nhiều hơn nữa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500">
              🛍️ Mua phụ kiện ngay
            </Button>
            <Button size="lg" variant="outline">
              🎁 Combo tiết kiệm
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
