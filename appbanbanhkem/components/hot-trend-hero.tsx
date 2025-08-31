import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HotTrendHero() {
  return (
    <section className="bg-gradient-to-r from-red-100 via-pink-50 to-red-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 text-lg animate-pulse">
            🔥 HOT TREND
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Bánh đang
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500"> "viral"</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cập nhật những mẫu bánh hot nhất trên mạng xã hội, được giới trẻ yêu thích và chia sẻ nhiều nhất hiện tại
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-red-500 to-pink-500 animate-pulse">
              🔥 Đặt bánh viral
            </Button>
            <Button size="lg" variant="outline">
              📱 Xem trên TikTok
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
