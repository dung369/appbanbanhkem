import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthForm } from "@/components/auth-form"
import { AdminQuickLogin } from "@/components/admin-quick-login"

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4">
        <div className="flex justify-end mt-4">
          <AdminQuickLogin />
        </div>
      </div>
      <AuthForm />
      <Footer />
    </div>
  )
}
