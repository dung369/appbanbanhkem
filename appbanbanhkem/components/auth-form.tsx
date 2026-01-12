"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Mail, Lock, User, Phone, Calendar, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Login state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  // Register state
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    receiveNews: false,
  })

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      console.log("[AuthForm] Đang đăng nhập với email:", loginData.email)
      const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      console.log("[AuthForm] Đăng nhập thành công:", userCredential.user.email)
      
      // Reload user để có thông tin mới nhất
      await userCredential.user.reload()
      
      // Kiểm tra nếu là admin thì chuyển đến trang admin, không thì về trang chủ
      if (userCredential.user.email === "trandaidung9a1@gmail.com") {
        console.log("[AuthForm] Chuyển hướng đến /admin")
        router.push("/admin")
      } else {
        console.log("[AuthForm] Chuyển hướng đến /")
        router.push("/")
      }
    } catch (err: any) {
      console.error("[AuthForm] Lỗi đăng nhập:", err.code, err.message)
      let errorMessage = "Đăng nhập thất bại"
      
      // Xử lý các lỗi Firebase phổ biến
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        errorMessage = "Email hoặc mật khẩu không chính xác"
      } else if (err.code === "auth/user-not-found") {
        errorMessage = "Tài khoản không tồn tại"
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Email không hợp lệ"
      } else if (err.code === "auth/network-request-failed") {
        errorMessage = "Lỗi kết nối mạng, vui lòng thử lại"
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (registerData.password !== registerData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp")
      return
    }
    setLoading(true)
    try {
      const cred = await createUserWithEmailAndPassword(auth, registerData.email, registerData.password)
      if (registerData.fullName) {
        await updateProfile(cred.user, { displayName: registerData.fullName })
      }
      // User thường sau khi đăng ký sẽ về trang chủ
      router.push("/")
    } catch (err: any) {
      setError(err?.message || "Đăng ký thất bại")
    } finally {
      setLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    // Reset forms when switching
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{isLogin ? "Đăng nhập" : "Đăng ký"}</h1>
          <p className="text-gray-600">
            {isLogin ? "Chào mừng bạn quay trở lại SweetCake!" : "Tạo tài khoản để trải nghiệm SweetCake!"}
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="text-center">{isLogin ? "Đăng nhập tài khoản" : "Tạo tài khoản mới"}</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded">
                {error}
              </div>
            )}
            {/* Login Form */}
            {isLogin && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="login-password">Mật khẩu</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={loginData.rememberMe}
                      onCheckedChange={(checked) => setLoginData({ ...loginData, rememberMe: !!checked })}
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Ghi nhớ đăng nhập
                    </Label>
                  </div>
                  <Link href="/quen-mat-khau" className="text-sm text-pink-600 hover:text-pink-700">
                    Quên mật khẩu?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : "Đăng nhập"}
                </Button>

                {/* Nút điền nhanh thông tin admin (không lưu mật khẩu) */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setLoginData({ email: "trandaidung9a1@gmail.com", password: "Dai1212333", rememberMe: false })}
                >
                  Điền sẵn tài khoản Admin
                </Button>
              </form>
            )}

            {/* Register Form */}
            {!isLogin && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="register-name">Họ và tên</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={registerData.fullName}
                      onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="register-phone">Số điện thoại</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="register-phone"
                      type="tel"
                      placeholder="0901234567"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="register-birthday">Ngày sinh</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-birthday"
                        type="date"
                        value={registerData.birthday}
                        onChange={(e) => setRegisterData({ ...registerData, birthday: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Giới tính</Label>
                    <Select
                      value={registerData.gender}
                      onValueChange={(value) => setRegisterData({ ...registerData, gender: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Nam</SelectItem>
                        <SelectItem value="female">Nữ</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="register-password">Mật khẩu</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Tối thiểu 8 ký tự, bao gồm chữ và số</p>
                </div>

                <div>
                  <Label htmlFor="register-confirm-password">Xác nhận mật khẩu</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="register-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agree-terms"
                      checked={registerData.agreeTerms}
                      onCheckedChange={(checked) => setRegisterData({ ...registerData, agreeTerms: !!checked })}
                      required
                    />
                    <Label htmlFor="agree-terms" className="text-sm leading-5">
                      Tôi đồng ý với{" "}
                      <Link href="/dieu-khoan" className="text-pink-600 hover:text-pink-700">
                        Điều khoản sử dụng
                      </Link>{" "}
                      và{" "}
                      <Link href="/chinh-sach" className="text-pink-600 hover:text-pink-700">
                        Chính sách bảo mật
                      </Link>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="receive-news"
                      checked={registerData.receiveNews}
                      onCheckedChange={(checked) => setRegisterData({ ...registerData, receiveNews: !!checked })}
                    />
                    <Label htmlFor="receive-news" className="text-sm">
                      Nhận thông tin khuyến mãi và tin tức mới nhất
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  disabled={!registerData.agreeTerms || loading}
                >
                  {loading ? "Đang xử lý..." : "Đăng ký tài khoản"}
                </Button>
              </form>
            )}

            {/* Social Login */}
            <div className="mt-6">
              <Separator className="my-4" />
              <div className="text-center">
                <span className="text-sm text-gray-600">Hoặc {isLogin ? "đăng nhập" : "đăng ký"} với</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <Button variant="outline" className="bg-transparent">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="bg-transparent">
                  <svg className="w-4 h-4 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>

            {/* Toggle Mode */}
            <div className="text-center mt-6">
              <span className="text-sm text-gray-600">
                {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
                <button
                  onClick={toggleMode}
                  className="text-pink-600 hover:text-pink-700 font-medium inline-flex items-center transition-colors"
                >
                  {isLogin ? "Đăng ký ngay" : "Đăng nhập ngay"}
                  {isLogin ? <ArrowRight className="w-4 h-4 ml-1" /> : <ArrowLeft className="w-4 h-4 ml-1" />}
                </button>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Benefits for Login / Welcome Offer for Register */}
        {isLogin ? (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4 text-center">Lợi ích khi đăng nhập</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Theo dõi đơn hàng dễ dàng</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Lưu địa chỉ giao hàng</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Nhận ưu đãi độc quyền</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Tích điểm thành viên</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50">
            <CardContent className="pt-6 text-center">
              <h3 className="font-semibold mb-2">🎉 Ưu đãi chào mừng</h3>
              <p className="text-sm text-gray-600 mb-4">
                Đăng ký ngay để nhận <strong>mã giảm giá 15%</strong> cho đơn hàng đầu tiên!
              </p>
              <div className="bg-white p-3 rounded-lg border-2 border-dashed border-pink-300">
                <span className="font-bold text-pink-600">WELCOME15</span>
              </div>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-green-600">🎂</span>
                  <span>Miễn phí tư vấn thiết kế bánh</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-green-600">🚚</span>
                  <span>Ưu tiên giao hàng nhanh</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-green-600">🎁</span>
                  <span>Quà tặng sinh nhật hàng năm</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
