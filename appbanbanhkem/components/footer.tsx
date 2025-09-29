import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, MessageCircle, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/favicon.ico" alt="Logo" className="w-8 h-8 rounded" />
              <div>
                <h3 className="text-xl font-bold text-pink-400">SweetCake.vn</h3>
              </div>
            </div>
            <p className="text-gray-300">
              Website bán bánh kem trực tuyến hàng đầu Việt Nam. Giao hàng nhanh, chất lượng đảm bảo.
            </p>
            <div className="flex space-x-3">
              <Button
                size="sm"
                variant="outline"
                className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white bg-transparent"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white bg-transparent"
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white bg-transparent"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-pink-400">Danh mục</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  Bánh sinh nhật
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  Bánh cưới
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  Bánh trẻ em
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  Bánh Hot Trend
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  Tùy chỉnh bánh
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-pink-400">Hỗ trợ</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  Hướng dẫn đặt hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  Chính sách giao hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-pink-400">Liên hệ</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-pink-400" />
                <span>1900 1234</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-pink-400" />
                <span>info@sweetcake.vn</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-pink-400" />
                <span>123 Nguyễn Văn A, Q.1, TP.HCM</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium text-pink-400">Đăng ký nhận ưu đãi</h5>
              <div className="flex space-x-2">
                <Input placeholder="Email của bạn" className="bg-gray-800 border-gray-700 text-white" />
                <Button className="bg-pink-500 hover:bg-pink-600">Đăng ký</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SweetCake.vn. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
