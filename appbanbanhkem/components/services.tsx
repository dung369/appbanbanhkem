import { Card, CardContent } from "@/components/ui/card"
import { Truck, Clock, Palette, MessageCircle, MapPin, Gift } from "lucide-react"

const services = [
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Giao hàng toàn quốc",
    description: "Ship lạnh giữ bánh nguyên vẹn, giao hẹn giờ",
    color: "text-blue-600",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Theo dõi đơn hàng",
    description: "Cập nhật trạng thái: Đang làm - Đang giao - Hoàn tất",
    color: "text-green-600",
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Tùy chỉnh bánh riêng",
    description: "Thiết kế online, chọn màu, ghi chữ, upload ảnh",
    color: "text-purple-600",
  },
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: "Chat tư vấn 24/7",
    description: "Hỗ trợ qua Zalo, Messenger nhanh chóng",
    color: "text-pink-600",
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Định vị Google Maps",
    description: "Chấm vị trí chính xác để giao đến từng ngõ ngách",
    color: "text-red-600",
  },
  {
    icon: <Gift className="w-8 h-8" />,
    title: "Combo quà tặng",
    description: "Tặng kèm nến, dao cắt bánh, thiệp miễn phí",
    color: "text-orange-600",
  },
]

export function Services() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Dịch vụ đặc biệt</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cam kết mang đến trải nghiệm mua sắm tuyệt vời với các dịch vụ chuyên nghiệp
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className={`${service.color} mb-4 flex justify-center group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
