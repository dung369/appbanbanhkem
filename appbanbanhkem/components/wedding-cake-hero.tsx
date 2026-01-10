"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/translations";

export function WeddingCakeHero() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-r from-rose-100 via-pink-50 to-rose-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <Badge className="bg-rose-500 text-white px-4 py-2 text-lg">
            {t.weddingCakeHero}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            {t.weddingCakeTitle}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">
              {" "}
              {t.weddingCakeTitleHighlight}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.weddingCakeDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-rose-500 to-pink-500"
            >
              {t.viewWeddingCakes}
            </Button>
            <Button size="lg" variant="outline">
              {t.freeConsultation}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
