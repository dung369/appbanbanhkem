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
  Settings,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MiniGameWheel } from "@/components/mini-game-wheel";
import { SettingsPanel } from "@/components/settings-panel";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signOut,
  type User as FirebaseUser,
} from "firebase/auth";
import { useTranslation } from "@/lib/translations";

export function Header() {
  const { t, mounted } = useTranslation();
  const [showSpecialFeatures, setShowSpecialFeatures] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileMenu]);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-pink-50 py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs sm:text-sm text-pink-700 min-h-[20px]">
            {mounted ? t.freeShipping : "🚚 Miễn phí giao hàng cho đơn từ 500k"}
          </p>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm"
            className="lg:hidden p-2"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-1 sm:space-x-2 cursor-pointer">
              <img
                src="/favicon.ico"
                alt="Logo"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl sm:text-2xl font-bold text-pink-600">SweetCake</h1>
                <p className="text-xs text-gray-500">Bánh kem</p>
              </div>
            </div>
          </Link>

          {/* Search bar - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={t.search}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex p-2">
              <Heart className="w-4 h-4" />
            </Button>
            {user ? (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="hidden lg:inline text-sm text-gray-700 max-w-[100px] truncate">
                  {t.hello}, {user.displayName || user.email?.split("@")[0]}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs sm:text-sm px-2 sm:px-3"
                  onClick={async () => {
                    await signOut(auth);
                    router.refresh();
                  }}
                >
                  <span className="hidden sm:inline">{t.logout}</span>
                  <span className="sm:hidden">Đăng xuất</span>
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button variant="ghost" size="sm" className="p-2">
                  <User className="w-4 h-4" />
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex p-2"
              onClick={() => setShowSettings(true)}
              title={t.settings}
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Link href="/gio-hang">
              <Button variant="ghost" size="sm" className="relative p-2">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Search - Below header on mobile */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={t.search}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div>

        {/* Desktop Navigation - Hidden on mobile/tablet */}
        <nav className="hidden lg:block mt-4 border-t pt-4">
          <div className="flex items-center justify-center space-x-4 xl:space-x-8 flex-wrap">
            <Link href="/">
              <Button variant="ghost" className="text-pink-600 font-medium text-sm">
                {t.home}
              </Button>
            </Link>
            <Link href="/banh-sinh-nhat">
              <Button variant="ghost" className="text-sm">{t.birthdayCakes}</Button>
            </Link>
            <Link href="/banh-cuoi">
              <Button variant="ghost" className="text-sm">{t.weddingCakes}</Button>
            </Link>
            <Link href="/banh-su-kien">
              <Button variant="ghost" className="text-sm">{t.customCakes}</Button>
            </Link>
            <Link href="/banh-tre-em">
              <Button variant="ghost" className="text-sm">{t.kidsCakes}</Button>
            </Link>
            <Link href="/hot-trend">
              <Button
                variant="ghost"
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm"
              >
                🔥 {t.hotTrend}
              </Button>
            </Link>
            <Link href="/tuy-chinh-banh">
              <Button variant="ghost" className="text-sm">{t.customDesign}</Button>
            </Link>
            <Link href="/phu-kien">
              <Button variant="ghost" className="text-sm">{t.accessories}</Button>
            </Link>

            {/* Special Features Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center space-x-1 text-sm"
                onClick={() => setShowSpecialFeatures(!showSpecialFeatures)}
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.specialFeatures}</span>
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
                        <div className="font-medium text-gray-900 text-sm">
                          {t.liveCustomTitle}
                        </div>
                        <div className="text-xs text-gray-500">
                          {t.liveCustomDesc}
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
                        <div className="font-medium text-gray-900 text-sm">
                          {t.giftSurpriseTitle}
                        </div>
                        <div className="text-xs text-gray-500">
                          {t.giftSurpriseMenuDesc}
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
                        <div className="font-medium text-gray-900 text-sm">
                          {t.digitalCardTitle}
                        </div>
                        <div className="text-xs text-gray-500">
                          {t.digitalCardDesc}
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
                        <div className="font-medium text-gray-900 text-sm">
                          {t.beverageMenuTitle}
                        </div>
                        <div className="text-xs text-gray-500">
                          {t.beverageMenuDesc}
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
                        <div className="font-medium text-gray-900 text-sm">
                          {t.snackMenuTitle}
                        </div>
                        <div className="text-xs text-gray-500">
                          {t.snackMenuDesc}
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
                      <div className="font-medium text-gray-900 text-sm">
                        {t.luckyWheelTitle}
                      </div>
                      <div className="text-xs text-gray-500">
                        {t.luckyWheelDesc}
                      </div>
                    </div>
                  </div>

                  <div className="border-t mt-2 pt-2">
                    <div className="px-4 py-2 text-center">
                      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse text-xs">
                        <Zap className="w-3 h-3 mr-1" />
                        {t.flashSaleActive}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setShowMobileMenu(false)}
          />
          
          {/* Slide-in Menu */}
          <div className="fixed left-0 top-0 bottom-0 w-[280px] bg-white z-50 lg:hidden overflow-y-auto">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold text-pink-600">Menu</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowMobileMenu(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Menu Items */}
            <nav className="p-4 space-y-2">
              <Link href="/" onClick={() => setShowMobileMenu(false)}>
                <div className="py-3 px-4 hover:bg-pink-50 rounded-lg text-pink-600 font-medium">
                  {t.home}
                </div>
              </Link>
              
              <Link href="/banh-sinh-nhat" onClick={() => setShowMobileMenu(false)}>
                <div className="py-3 px-4 hover:bg-gray-50 rounded-lg">
                  🎂 {t.birthdayCakes}
                </div>
              </Link>
              
              <Link href="/banh-cuoi" onClick={() => setShowMobileMenu(false)}>
                <div className="py-3 px-4 hover:bg-gray-50 rounded-lg">
                  💒 {t.weddingCakes}
                </div>
              </Link>
              
              <Link href="/banh-su-kien" onClick={() => setShowMobileMenu(false)}>
                <div className="py-3 px-4 hover:bg-gray-50 rounded-lg">
                  🎉 {t.customCakes}
                </div>
              </Link>
              
              <Link href="/banh-tre-em" onClick={() => setShowMobileMenu(false)}>
                <div className="py-3 px-4 hover:bg-gray-50 rounded-lg">
                  🧸 {t.kidsCakes}
                </div>
              </Link>
              
              <Link href="/hot-trend" onClick={() => setShowMobileMenu(false)}>
                <div className="py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium">
                  🔥 {t.hotTrend}
                </div>
              </Link>
              
              <Link href="/tuy-chinh-banh" onClick={() => setShowMobileMenu(false)}>
                <div className="py-3 px-4 hover:bg-gray-50 rounded-lg">
                  🎨 {t.customDesign}
                </div>
              </Link>
              
              <Link href="/phu-kien" onClick={() => setShowMobileMenu(false)}>
                <div className="py-3 px-4 hover:bg-gray-50 rounded-lg">
                  🎁 {t.accessories}
                </div>
              </Link>

              {/* Special Features in Mobile */}
              <div className="border-t pt-2 mt-2">
                <div className="text-xs font-semibold text-gray-500 px-4 mb-2">
                  Tính năng đặc biệt
                </div>
                
                <Link href="/live-custom" onClick={() => setShowMobileMenu(false)}>
                  <div className="py-3 px-4 hover:bg-purple-50 rounded-lg flex items-center space-x-3">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium text-sm">{t.liveCustomTitle}</div>
                    </div>
                  </div>
                </Link>
                
                <Link href="/tang-qua" onClick={() => setShowMobileMenu(false)}>
                  <div className="py-3 px-4 hover:bg-pink-50 rounded-lg flex items-center space-x-3">
                    <Gift className="w-5 h-5 text-pink-600" />
                    <div>
                      <div className="font-medium text-sm">{t.giftSurpriseTitle}</div>
                    </div>
                  </div>
                </Link>
                
                <Link href="/thiep-dien-tu" onClick={() => setShowMobileMenu(false)}>
                  <div className="py-3 px-4 hover:bg-blue-50 rounded-lg flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-sm">{t.digitalCardTitle}</div>
                    </div>
                  </div>
                </Link>
                
                <Link href="/do-uong" onClick={() => setShowMobileMenu(false)}>
                  <div className="py-3 px-4 hover:bg-cyan-50 rounded-lg flex items-center space-x-3">
                    <span className="text-xl">🥤</span>
                    <div>
                      <div className="font-medium text-sm">{t.beverageMenuTitle}</div>
                    </div>
                  </div>
                </Link>
                
                <Link href="/do-an-vat" onClick={() => setShowMobileMenu(false)}>
                  <div className="py-3 px-4 hover:bg-orange-50 rounded-lg flex items-center space-x-3">
                    <span className="text-xl">🍿</span>
                    <div>
                      <div className="font-medium text-sm">{t.snackMenuTitle}</div>
                    </div>
                  </div>
                </Link>

                <div
                  className="py-3 px-4 hover:bg-yellow-50 rounded-lg flex items-center space-x-3 cursor-pointer"
                  onClick={() => {
                    setShowMiniGame(true);
                    setShowMobileMenu(false);
                  }}
                >
                  <Gamepad2 className="w-5 h-5 text-yellow-600" />
                  <div>
                    <div className="font-medium text-sm">{t.luckyWheelTitle}</div>
                  </div>
                </div>
              </div>

              {/* Settings in Mobile */}
              <div className="border-t pt-2 mt-2">
                <div
                  className="py-3 px-4 hover:bg-gray-50 rounded-lg flex items-center space-x-3 cursor-pointer"
                  onClick={() => {
                    setShowSettings(true);
                    setShowMobileMenu(false);
                  }}
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-sm">{t.settings}</div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* Mini Game Wheel */}
      <MiniGameWheel
        isOpen={showMiniGame}
        onClose={() => setShowMiniGame(false)}
      />

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        user={user}
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
