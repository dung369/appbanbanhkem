"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export function AdminQuickLogin() {
  const [loading, setLoading] = useState(false);
  const email = "trandaidung9a1@gmail.com";
  const password = "Dai1212333";

  const handleClick = async () => {
    setLoading(true);
    try {
      console.log("[AdminQuickLogin] Đang đăng nhập...");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("[AdminQuickLogin] Đăng nhập thành công:", userCredential.user.email);
      
      // Chỉ redirect khi đăng nhập thành công
      if (typeof window !== "undefined") {
        window.location.href = "/admin";
      }
    } catch (e: any) {
      console.error("[AdminQuickLogin] Lỗi đăng nhập:", e.code, e.message);
      
      // Nếu user chưa tồn tại, tạo tài khoản mới
      if (e?.code === "auth/user-not-found" || e?.code === "auth/invalid-credential") {
        try {
          console.log("[AdminQuickLogin] Tạo tài khoản admin mới...");
          const newUser = await createUserWithEmailAndPassword(auth, email, password);
          console.log("[AdminQuickLogin] Tạo tài khoản thành công:", newUser.user.email);
          
          if (typeof window !== "undefined") {
            window.location.href = "/admin";
          }
        } catch (createError: any) {
          console.error("[AdminQuickLogin] Lỗi tạo tài khoản:", createError.code, createError.message);
          alert(`Lỗi tạo tài khoản: ${createError.message}`);
        }
      } else {
        alert(`Lỗi đăng nhập: ${e.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      className="bg-transparent" 
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "Đang xử lý..." : "Đăng nhập nhanh Admin"}
    </Button>
  );
}
