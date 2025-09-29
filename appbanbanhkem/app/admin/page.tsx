"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { AdminDashboard } from "@/components/admin-dashboard"

const ADMIN_EMAIL = "trandaidung9a1@gmail.com"

export default function AdminPage() {
  const [status, setStatus] = useState<"loading" | "guest" | "admin" | "user">("loading")
  const router = useRouter()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setStatus("guest")
        router.replace("/auth")
        return
      }
      if (user.email === ADMIN_EMAIL) {
        setStatus("admin")
      } else {
        setStatus("user")
      }
    })
    return () => unsub()
  }, [router])

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Đang kiểm tra phiên đăng nhập…</div>
  }

  if (status === "user") {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-6">
        <div>
          <p className="text-lg font-semibold text-gray-800">Bạn không có quyền truy cập trang quản trị</p>
          <p className="text-gray-500 mt-2">Vui lòng đăng xuất và đăng nhập bằng tài khoản Admin.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminDashboard />
    </div>
  )
}
