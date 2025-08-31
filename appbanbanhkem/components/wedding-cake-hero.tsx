import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function WeddingCakeHero() {
  return (
    <section className="bg-gradient-to-r from-rose-100 via-pink-50 to-rose-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <Badge className="bg-rose-500 text-white px-4 py-2 text-lg">💒 BÁNH CƯỚI</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Bánh cưới
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
              {" "}
              sang trọng
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Làm cho ngày cưới của bạn thêm ngọt ngào với những chiếc bánh cưới tinh tế, lãng mạn và đầy ý nghĩa. Thiết
            kế theo yêu cầu riêng
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-rose-500 to-pink-500">
              💕 Xem bánh cưới
            </Button>
            <Button size="lg" variant="outline">
              📞 Tư vấn miễn phí
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
