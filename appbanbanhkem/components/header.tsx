"use client";

import {
  ShoppingCart,
  Search,
  User,
  Heart,
  MapPin,
  ChevronDown,
  Gamepad2,
  Sparkles,
  Gift,
  Mail,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MiniGameWheel } from "@/components/mini-game-wheel";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, type User as FirebaseUser } from "firebase/auth";

export function Header() {
  const [showSpecialFeatures, setShowSpecialFeatures] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top bar */}
      <div className="bg-pink-50 py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-pink-700">
            🎂 Miễn phí giao hàng cho đơn từ 500k - Giao hàng toàn quốc 🚚
          </p>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <img src="/favicon.ico" alt="Logo" className="w-10 h-10 rounded" />
              <div>
                <h1 className="text-2xl font-bold text-pink-600">SweetCake</h1>
                <p className="text-xs text-gray-500">Bánh kem</p>
              </div>
            </div>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm bánh sinh nhật, bánh cưới..."
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/dia-chi">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1"
              >
                <MapPin className="w-4 h-4" />
                <span className="hidden md:inline">Địa chỉ</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4" />
            </Button>
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="hidden md:inline text-sm text-gray-700">
                  Xin chào, {user.displayName || user.email?.split("@")[0]}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={async () => {
                    await signOut(auth);
                    router.refresh();
                  }}
                >
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4" />
                </Button>
              </Link>
            )}
            <Link href="/gio-hang">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-4 h-4" />
                {/* Show count badge only when > 0 */}
                {/* 0 by default until real cart logic is wired */}
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 border-t pt-4">
          <div className="flex items-center justify-center space-x-8">
            <Link href="/">
              <Button variant="ghost" className="text-pink-600 font-medium">
                Trang chủ
              </Button>
            </Link>
            <Link href="/banh-sinh-nhat">
              <Button variant="ghost">Bánh sinh nhật</Button>
            </Link>
            <Link href="/banh-cuoi">
              <Button variant="ghost">Bánh cưới</Button>
            </Link>
            <Link href="/banh-su-kien">
              <Button variant="ghost">Bánh sự kiện</Button>
            </Link>
            <Link href="/banh-tre-em">
              <Button variant="ghost">Bánh trẻ em</Button>
            </Link>
            <Link href="/hot-trend">
              <Button
                variant="ghost"
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white"
              >
                🔥 Hot Trend
              </Button>
            </Link>
            <Link href="/tuy-chinh-banh">
              <Button variant="ghost">Tùy chỉnh bánh</Button>
            </Link>
            <Link href="/phu-kien">
              <Button variant="ghost">Phụ kiện</Button>
            </Link>

            {/* Special Features Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center space-x-1"
                onClick={() => setShowSpecialFeatures(!showSpecialFeatures)}
              >
                <Sparkles className="w-4 h-4" />
                <span>Tính năng đặc biệt</span>
                <ChevronDown className="w-4 h-4" />
              </Button>

              {showSpecialFeatures && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border z-50 py-2">
                  <Link href="/live-custom">
                    <div className="px-4 py-3 hover:bg-purple-50 cursor-pointer flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Live Custom Bánh
                        </div>
                        <div className="text-sm text-gray-500">
                          Thiết kế bánh trực tiếp
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/tang-qua">
                    <div className="px-4 py-3 hover:bg-pink-50 cursor-pointer flex items-center space-x-3">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                        <Gift className="w-4 h-4 text-pink-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Tặng quà bất ngờ
                        </div>
                        <div className="text-sm text-gray-500">
                          Giao hàng bí mật
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/thiep-dien-tu">
                    <div className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Mail className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Thiệp điện tử
                        </div>
                        <div className="text-sm text-gray-500">
                          Thiết kế thiệp online
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/do-uong">
                    <div className="px-4 py-3 hover:bg-cyan-50 cursor-pointer flex items-center space-x-3">
                      <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                        <span className="text-cyan-600">🥤</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Đồ uống tươi mát
                        </div>
                        <div className="text-sm text-gray-500">
                          Trà sữa, cà phê, nước ép
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/do-an-vat">
                    <div className="px-4 py-3 hover:bg-orange-50 cursor-pointer flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600">🍿</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Đồ ăn vặt ngon
                        </div>
                        <div className="text-sm text-gray-500">
                          Bánh quy, kẹo, hạt rang
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div
                    className="px-4 py-3 hover:bg-yellow-50 cursor-pointer flex items-center space-x-3"
                    onClick={() => {
                      setShowMiniGame(true);
                      setShowSpecialFeatures(false);
                    }}
                  >
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Gamepad2 className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        Vòng quay may mắn
                      </div>
                      <div className="text-sm text-gray-500">
                        Nhận ưu đãi đặc biệt
                      </div>
                    </div>
                  </div>

                  <div className="border-t mt-2 pt-2">
                    <div className="px-4 py-2 text-center">
                      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                        <Zap className="w-3 h-3 mr-1" />
                        Flash Sale đang diễn ra!
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Mini Game Wheel */}
      <MiniGameWheel
        isOpen={showMiniGame}
        onClose={() => setShowMiniGame(false)}
      />

      {/* Click outside to close dropdown - Fixed z-index */}
      {showSpecialFeatures && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSpecialFeatures(false)}
        />
      )}
    </header>
  );
}
