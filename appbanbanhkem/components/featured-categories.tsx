"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/translations";

export function FeaturedCategories() {
  const { t } = useTranslation();

  const categories = [
    {
      title: t.birthdayCakeCategory,
      description: t.birthdayCakeCategoryDesc,
      icon: "🎂",
      color: "from-pink-400 to-pink-600",
    },
    {
      title: t.weddingCakeCategory,
      description: t.weddingCakeCategoryDesc,
      icon: "💒",
      color: "from-purple-400 to-purple-600",
    },
    {
      title: t.kidsCakeCategory,
      description: t.kidsCakeCategoryDesc,
      icon: "🧸",
      color: "from-blue-400 to-blue-600",
    },
    {
      title: t.customCakes,
      description: t.customCakeCategoryDesc,
      icon: "🎉",
      color: "from-green-400 to-green-600",
    },
    {
      title: t.customCakeCategory,
      description: t.customCakeCategoryDesc,
      icon: "🎨",
      color: "from-orange-400 to-orange-600",
    },
    {
      title: t.customDesign,
      description: t.customCakeCategoryDesc,
      icon: "🌿",
      color: "from-teal-400 to-teal-600",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t.categoriesTitle}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập bánh kem đa dạng, phù hợp với mọi dịp đặc biệt
            trong cuộc sống
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <CardContent className="p-6">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:bg-pink-50 group-hover:border-pink-300 bg-transparent"
                >
                  {t.viewMore} →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
