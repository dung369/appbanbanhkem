"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/translations";

export function KidsCakeHero() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-r from-yellow-100 via-orange-50 to-yellow-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <Badge className="bg-orange-500 text-white px-4 py-2 text-lg">
            {t.kidsCakeHero}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            {t.kidsCakeTitle}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              {" "}
              {t.kidsCakeTitleHighlight}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.kidsCakeDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-yellow-500"
            >
              {t.chooseKidsCake}
            </Button>
            <Button size="lg" variant="outline">
              {t.designCharacter}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
