import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthForm } from "@/components/auth-form"

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AuthForm />
      <Footer />
    </div>
  )
}
