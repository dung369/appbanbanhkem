"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { MessageCircle, Send, Smile } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SiteChatFab() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Ẩn ở khu vực admin
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat panel */}
      {open && (
        <div className="mb-3 w-[360px] max-w-[90vw] rounded-xl shadow-2xl border overflow-hidden bg-white">
          <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <div className="font-semibold">Chat với cửa hàng</div>
            </div>
            <div className="text-xs flex items-center gap-2">
              <span>Đang hoạt động</span>
              <span className="inline-block w-2 h-2 bg-green-300 rounded-full"></span>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-b from-rose-50 to-white flex items-center justify-center text-rose-400">
            <div className="text-center">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-80" />
              <div className="font-medium">Chưa có tin nhắn</div>
              <div className="text-sm opacity-80">Bắt đầu cuộc trò chuyện bằng cách nhập tin nhắn bên dưới</div>
            </div>
          </div>
          <div className="border-t p-3 flex items-center gap-2 bg-white">
            <Button variant="ghost" size="icon" className="bg-transparent">
              <Smile className="w-5 h-5 text-rose-400" />
            </Button>
            <Input
              placeholder="Nhập tin nhắn..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Button
              size="icon"
              className="bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500"
              onClick={() => setMessage("")}
            >
              <Send className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-2 rounded-full shadow-xl px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white hover:from-pink-600 hover:to-rose-500 focus:outline-none"
        aria-label="Chat với cửa hàng"
      >
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
          <MessageCircle className="w-5 h-5" />
        </span>
        <span className="font-medium">Chat với cửa hàng</span>
      </button>
    </div>
  );
}
