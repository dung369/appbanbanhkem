"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/translations";

export function HotTrendHero() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-r from-red-100 via-pink-50 to-red-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 text-lg animate-pulse">
            {t.hotTrendHero}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            {t.hotTrendTitle}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
              {" "}
              {t.hotTrendTitleHighlight}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.hotTrendDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-500 to-pink-500 animate-pulse"
            >
              {t.seeHotCakes}
            </Button>
            <Button size="lg" variant="outline">
              {t.followTrend}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
