"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/translations";

export function SnackHero() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-r from-orange-100 via-yellow-50 to-orange-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <Badge className="bg-orange-500 text-white px-4 py-2 text-lg">
            {t.snackHero}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            {t.snackTitle}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              {" "}
              {t.snackTitleHighlight}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.snackDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-yellow-500"
            >
              {t.shopSnacks}
            </Button>
            <Button size="lg" variant="outline">
              {t.viewMenu}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
