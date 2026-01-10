"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Instagram,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useTranslation } from "@/lib/translations";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/favicon.ico" alt="Logo" className="w-8 h-8 rounded" />
              <div>
                <h3 className="text-xl font-bold text-pink-400">
                  SweetCake.vn
                </h3>
              </div>
            </div>
            <p className="text-gray-300">{t.footerAboutDesc}</p>
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
            <h4 className="text-lg font-semibold text-pink-400">
              {t.footerCategories}
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a
                  href="/banh-sinh-nhat"
                  className="hover:text-pink-400 transition-colors"
                >
                  {t.birthdayCakes}
                </a>
              </li>
              <li>
                <a
                  href="/banh-cuoi"
                  className="hover:text-pink-400 transition-colors"
                >
                  {t.weddingCakes}
                </a>
              </li>
              <li>
                <a
                  href="/banh-tre-em"
                  className="hover:text-pink-400 transition-colors"
                >
                  {t.kidsCakes}
                </a>
              </li>
              <li>
                <a
                  href="/hot-trend"
                  className="hover:text-pink-400 transition-colors"
                >
                  {t.hotTrend}
                </a>
              </li>
              <li>
                <a
                  href="/tuy-chinh-banh"
                  className="hover:text-pink-400 transition-colors"
                >
                  {t.customDesign}
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-pink-400">
              {t.footerSupport}
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  {t.faq}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  {t.shippingPolicy}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  {t.returnPolicy}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  {t.privacyPolicy}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-400 transition-colors">
                  {t.footerContact}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-pink-400">
              {t.footerContact}
            </h4>
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
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{t.footerCopyright}</p>
        </div>
      </div>
    </footer>
  );
}
