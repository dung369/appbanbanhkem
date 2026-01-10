"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/translations";

interface CardTemplate {
  id: string;
  name: string;
  category: string;
  preview: string;
  background: string;
  textColor: string;
  accentColor: string;
}

export function DigitalCardDesigner() {
  const { t } = useTranslation();
  const [selectedTemplate, setSelectedTemplate] =
    useState<string>("birthday-1");
  const [cardData, setCardData] = useState({
    recipientName: "",
    senderName: "",
    message: "",
    occasion: "birthday",
    font: "elegant",
    textSize: "medium",
  });

  const templates: CardTemplate[] = [
    {
      id: "birthday-1",
      name: "Sinh nhật hoa hồng",
      category: "birthday",
      preview: "🌹🎂",
      background: "linear-gradient(135deg, #FFB6C1, #FFC0CB)",
      textColor: "#8B0000",
      accentColor: "#FF69B4",
    },
    {
      id: "birthday-2",
      name: "Sinh nhật vui vẻ",
      category: "birthday",
      preview: "🎉🎈",
      background: "linear-gradient(135deg, #FFE4B5, #FFFF00)",
      textColor: "#FF4500",
      accentColor: "#FFA500",
    },
    {
      id: "love-1",
      name: "Tình yêu lãng mạn",
      category: "love",
      preview: "💕💖",
      background: "linear-gradient(135deg, #FF1493, #DC143C)",
      textColor: "#FFFFFF",
      accentColor: "#FFB6C1",
    },
    {
      id: "congratulation-1",
      name: "Chúc mừng thành công",
      category: "congratulation",
      preview: "🎊🏆",
      background: "linear-gradient(135deg, #32CD32, #228B22)",
      textColor: "#FFFFFF",
      accentColor: "#90EE90",
    },
    {
      id: "thank-you-1",
      name: "Cảm ơn chân thành",
      category: "thank-you",
      preview: "🙏💐",
      background: "linear-gradient(135deg, #E6E6FA, #DDA0DD)",
      textColor: "#4B0082",
      accentColor: "#DA70D6",
    },
    {
      id: "apology-1",
      name: "Xin lỗi chân thành",
      category: "apology",
      preview: "😔🌸",
      background: "linear-gradient(135deg, #F0F8FF, #B0E0E6)",
      textColor: "#4682B4",
      accentColor: "#87CEEB",
    },
  ];

  const occasions = [
    { value: "birthday", label: "🎂 Sinh nhật" },
    { value: "love", label: "💕 Tình yêu" },
    { value: "congratulation", label: "🎉 Chúc mừng" },
    { value: "thank-you", label: "🙏 Cảm ơn" },
    { value: "apology", label: "😔 Xin lỗi" },
    { value: "anniversary", label: "💒 Kỷ niệm" },
  ];

  const fonts = [
    { value: "elegant", label: "Thanh lịch", style: "font-serif" },
    { value: "modern", label: "Hiện đại", style: "font-sans" },
    { value: "playful", label: "Vui tươi", style: "font-mono" },
    { value: "romantic", label: "Lãng mạn", style: "font-serif italic" },
  ];

  const currentTemplate =
    templates.find((t) => t.id === selectedTemplate) || templates[0];
  const filteredTemplates = templates.filter(
    (t) => t.category === cardData.occasion
  );

  const generatePreviewCard = () => {
    return (
      <div
        className="w-full h-96 rounded-lg p-6 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-lg"
        style={{
          background: currentTemplate.background,
          color: currentTemplate.textColor,
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 text-4xl">
            {currentTemplate.preview.split("")[0]}
          </div>
          <div className="absolute top-4 right-4 text-4xl">
            {currentTemplate.preview.split("")[1]}
          </div>
          <div className="absolute bottom-4 left-4 text-4xl">
            {currentTemplate.preview.split("")[1]}
          </div>
          <div className="absolute bottom-4 right-4 text-4xl">
            {currentTemplate.preview.split("")[0]}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-4">
          <div className="text-4xl mb-4">{currentTemplate.preview}</div>

          {cardData.recipientName && (
            <h2
              className={`text-2xl font-bold ${
                fonts.find((f) => f.value === cardData.font)?.style
              }`}
            >
              Gửi {cardData.recipientName}
            </h2>
          )}

          {cardData.message && (
            <div
              className={`text-lg leading-relaxed max-w-xs ${
                fonts.find((f) => f.value === cardData.font)?.style
              }`}
              style={{
                fontSize:
                  cardData.textSize === "small"
                    ? "14px"
                    : cardData.textSize === "large"
                    ? "20px"
                    : "16px",
              }}
            >
              {cardData.message}
            </div>
          )}

          {cardData.senderName && (
            <div
              className={`text-lg font-semibold ${
                fonts.find((f) => f.value === cardData.font)?.style
              }`}
            >
              Từ {cardData.senderName}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎨 {t.digitalCardBadge}
          </h1>
          <p className="text-gray-600">{t.digitalCardDesc2}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Design Panel */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {t.customizeCard}
            </h2>

            <div className="space-y-6">
              {/* Template Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.chooseTemplate}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {filteredTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedTemplate === template.id
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <div className="text-2xl mb-2">{template.preview}</div>
                      <div className="text-sm font-medium text-gray-700">
                        {template.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasion Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t.occasionType}
                </label>
                <select
                  value={cardData.occasion}
                  onChange={(e) =>
                    setCardData({ ...cardData, occasion: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {occasions.map((occasion) => (
                    <option key={occasion.value} value={occasion.value}>
                      {occasion.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.recipientName}
                  </label>
                  <input
                    type="text"
                    value={cardData.recipientName}
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        recipientName: e.target.value,
                      })
                    }
                    placeholder={t.recipientPlaceholder}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.messageText}
                  </label>
                  <textarea
                    value={cardData.message}
                    onChange={(e) =>
                      setCardData({ ...cardData, message: e.target.value })
                    }
                    placeholder={t.messagePlaceholder}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.senderName}
                  </label>
                  <input
                    type="text"
                    value={cardData.senderName}
                    onChange={(e) =>
                      setCardData({ ...cardData, senderName: e.target.value })
                    }
                    placeholder={t.senderPlaceholder}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Font Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {t.cardFont}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {fonts.map((font) => (
                      <button
                        key={font.value}
                        onClick={() =>
                          setCardData({ ...cardData, font: font.value })
                        }
                        className={`p-3 rounded-lg border-2 transition-all ${
                          cardData.font === font.value
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      >
                        <div className={`${font.style} text-sm`}>
                          {font.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Text Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {t.textSizeLabel}
                  </label>
                  <div className="flex space-x-3">
                    {["small", "medium", "large"].map((size) => (
                      <button
                        key={size}
                        onClick={() =>
                          setCardData({ ...cardData, textSize: size })
                        }
                        className={`px-4 py-2 rounded-lg border-2 transition-all ${
                          cardData.textSize === size
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      >
                        {size === "small"
                          ? t.sizeSmall
                          : size === "medium"
                          ? t.sizeMedium
                          : t.sizeLarge}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {t.cardPreview}
            </h2>
            {generatePreviewCard()}

            <div className="mt-6 space-y-3">
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all">
                {t.saveCard}
              </button>
              <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all">
                {t.sendCard}
              </button>
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all">
                {t.printCard}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
