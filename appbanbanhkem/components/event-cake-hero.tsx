"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/translations";

export function EventCakeHero() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-r from-blue-100 via-indigo-50 to-blue-100 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          <Badge className="bg-blue-500 text-white px-4 py-2 text-lg">
            {t.eventCakeHero}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            {t.eventCakeTitle}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
              {" "}
              {t.eventCakeTitleHighlight}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.eventCakeDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-indigo-500"
            >
              {t.orderEventCake}
            </Button>
            <Button size="lg" variant="outline">
              {t.detailedQuote}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
