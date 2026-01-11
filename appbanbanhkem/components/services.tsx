"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Truck,
  Clock,
  Palette,
  MessageCircle,
  MapPin,
  Gift,
} from "lucide-react";
import { useTranslation } from "@/lib/translations";

export function Services() {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: t.freeShippingTitle,
      description: t.freeShippingDesc,
      color: "text-blue-600",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t.trackOrderTitle,
      description: t.trackOrderDesc,
      color: "text-green-600",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: t.customCakeTitle,
      description: t.customCakeDesc,
      color: "text-purple-600",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: t.liveSupportTitle,
      description: t.liveSupportDesc,
      color: "text-pink-600",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: t.storeLocationTitle,
      description: t.storeLocationDesc,
      color: "text-red-600",
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: t.freeGiftTitle,
      description: t.freeGiftDesc,
      color: "text-orange-600",
    },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t.servicesTitle}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Cam kết mang đến trải nghiệm mua sắm tuyệt vời với các dịch vụ
            chuyên nghiệp
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md"
            >
              <CardContent className="p-4 sm:p-6 text-center">
                <div
                  className={`${service.color} mb-3 sm:mb-4 flex justify-center group-hover:scale-110 transition-transform`}
                >
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
