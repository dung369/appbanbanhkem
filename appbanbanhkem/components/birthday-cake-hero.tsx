"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/translations";

export function BirthdayCakeHero() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-r from-pink-100 via-purple-50 to-pink-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <Badge className="bg-pink-500 text-white px-4 py-2 text-lg">
            🎂 {t.birthdayCakes.toUpperCase()}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            {t.birthdayCakeCategory}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              {" "}
              {t.heroTitleHighlight}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-500"
            >
              🛒 {t.orderNow}
            </Button>
            <Button size="lg" variant="outline">
              🎨 {t.customNow}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
