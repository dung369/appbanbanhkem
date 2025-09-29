"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export function AdminQuickLogin() {
  const email = "trandaidung9a1@gmail.com";
  const password = "Dai1212333";

  const handleClick = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      if (e?.code === "auth/user-not-found") {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } finally {
      if (typeof window !== "undefined") window.location.href = "/admin";
    }
  };

  return (
    <Button variant="outline" className="bg-transparent" onClick={handleClick}>
      Đăng nhập nhanh Admin
    </Button>
  );
}
