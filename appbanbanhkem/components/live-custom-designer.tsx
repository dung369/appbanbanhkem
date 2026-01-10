"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Palette, Sparkles, Star, ShoppingCart, RotateCcw } from "lucide-react";
import { useTranslation } from "@/lib/translations";

interface CakeLayer {
  id: string;
  color: string;
  flavor: string;
  size: number;
}

interface Topping {
  id: string;
  name: string;
  icon: string;
  price: number;
  position: { x: number; y: number };
}

export function LiveCustomDesigner() {
  const { t } = useTranslation();
  const [layers, setLayers] = useState<CakeLayer[]>([
    { id: "base", color: "#FFB6C1", flavor: "vanilla", size: 100 },
    { id: "middle", color: "#FFC0CB", flavor: "strawberry", size: 80 },
    { id: "top", color: "#FFE4E1", flavor: "cream", size: 60 },
  ]);

  const [toppings, setToppings] = useState<Topping[]>([]);
  const [selectedLayer, setSelectedLayer] = useState("base");
  const [totalPrice, setTotalPrice] = useState(450000);

  const availableToppings = [
    { id: "strawberry", name: "Dâu tây", icon: "🍓", price: 15000 },
    { id: "cherry", name: "Cherry", icon: "🍒", price: 12000 },
    { id: "flower", name: "Hoa kem", icon: "🌸", price: 20000 },
    { id: "star", name: "Ngôi sao", icon: "⭐", price: 8000 },
    { id: "heart", name: "Trái tim", icon: "💖", price: 10000 },
    { id: "candle", name: "Nến", icon: "🕯️", price: 5000 },
    { id: "chocolate", name: "Chocolate", icon: "🍫", price: 18000 },
    { id: "cookie", name: "Cookie", icon: "🍪", price: 12000 },
  ];

  const colors = [
    { name: "Hồng nhạt", value: "#FFB6C1" },
    { name: "Hồng đậm", value: "#FF69B4" },
    { name: "Trắng kem", value: "#FFF8DC" },
    { name: "Chocolate", value: "#D2691E" },
    { name: "Xanh mint", value: "#98FB98" },
    { name: "Tím lavender", value: "#E6E6FA" },
    { name: "Vàng vanilla", value: "#F0E68C" },
    { name: "Đỏ velvet", value: "#DC143C" },
  ];

  const addTopping = (topping: (typeof availableToppings)[0]) => {
    const newTopping: Topping = {
      ...topping,
      position: {
        x: Math.random() * 200 + 50,
        y: Math.random() * 200 + 50,
      },
    };
    setToppings([...toppings, newTopping]);
    setTotalPrice(totalPrice + topping.price);
  };

  const removeTopping = (toppingId: string) => {
    const topping = toppings.find((t) => t.id === toppingId);
    if (topping) {
      setToppings(toppings.filter((t) => t.id !== toppingId));
      const originalTopping = availableToppings.find(
        (t) => t.id === topping.id
      );
      if (originalTopping) {
        setTotalPrice(totalPrice - originalTopping.price);
      }
    }
  };

  const updateLayerColor = (layerId: string, color: string) => {
    setLayers(
      layers.map((layer) =>
        layer.id === layerId ? { ...layer, color } : layer
      )
    );
  };

  const updateLayerSize = (layerId: string, size: number) => {
    setLayers(
      layers.map((layer) => (layer.id === layerId ? { ...layer, size } : layer))
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-lg mb-4 animate-pulse">
          ✨ {t.liveCustomBadge}
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t.liveCustomHeading}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            {" "}
            {t.liveCustomHighlight}
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t.liveCustomDesc2}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Live Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                {t.livePreview}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                {/* Cake Layers */}
                <div className="relative">
                  {layers.map((layer, index) => (
                    <div
                      key={layer.id}
                      className={`absolute rounded-full border-4 border-white shadow-lg cursor-pointer transition-all duration-300 ${
                        selectedLayer === layer.id
                          ? "ring-4 ring-purple-400"
                          : ""
                      }`}
                      style={{
                        width: `${layer.size}px`,
                        height: `${layer.size * 0.3}px`,
                        backgroundColor: layer.color,
                        bottom: `${index * 25}px`,
                        left: `50%`,
                        transform: "translateX(-50%)",
                        zIndex: layers.length - index,
                      }}
                      onClick={() => setSelectedLayer(layer.id)}
                    />
                  ))}

                  {/* Toppings */}
                  {toppings.map((topping, index) => (
                    <div
                      key={`${topping.id}-${index}`}
                      className="absolute text-2xl cursor-pointer hover:scale-110 transition-transform animate-bounce"
                      style={{
                        left: `${topping.position.x}px`,
                        top: `${topping.position.y}px`,
                        zIndex: 100,
                      }}
                      onClick={() => removeTopping(`${topping.id}-${index}`)}
                      title={`Click để xóa ${topping.name}`}
                    >
                      {topping.icon}
                    </div>
                  ))}
                </div>

                {/* Sparkle Effects */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-yellow-400 animate-ping"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    >
                      ✨
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 mb-2">{t.clickToReset}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setToppings([]);
                    setTotalPrice(450000);
                  }}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {t.resetTopping}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Price Display */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">{t.totalPrice}</h3>
                <div className="text-3xl font-bold text-green-600 mb-4">
                  {totalPrice.toLocaleString()}đ
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {t.addToCartButton}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Price Display */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">{t.totalPrice}</h3>
                <div className="text-3xl font-bold text-green-600 mb-4">
                  {totalPrice.toLocaleString()}đ
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {t.addToCartButton}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Layer Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                {t.editLayers}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t.currentLayer}
                </label>
                <Select value={selectedLayer} onValueChange={setSelectedLayer}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="base">{t.layerBase}</SelectItem>
                    <SelectItem value="middle">Tầng giữa</SelectItem>
                    <SelectItem value="top">Tầng trên (nhỏ nhất)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">
                  {t.layerColor}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-purple-400 transition-colors"
                      style={{ backgroundColor: color.value }}
                      onClick={() =>
                        updateLayerColor(selectedLayer, color.value)
                      }
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">
                  {t.layerSize}:{" "}
                  {layers.find((l) => l.id === selectedLayer)?.size}px
                </label>
                <Slider
                  value={[
                    layers.find((l) => l.id === selectedLayer)?.size || 100,
                  ]}
                  onValueChange={([value]) =>
                    updateLayerSize(selectedLayer, value)
                  }
                  max={
                    selectedLayer === "base"
                      ? 120
                      : selectedLayer === "middle"
                      ? 100
                      : 80
                  }
                  min={
                    selectedLayer === "base"
                      ? 80
                      : selectedLayer === "middle"
                      ? 60
                      : 40
                  }
                  step={5}
                />
              </div>
            </CardContent>
          </Card>

          {/* Toppings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                {t.addTopping}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {availableToppings.map((topping) => (
                  <Button
                    key={topping.id}
                    variant="outline"
                    className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-purple-50 bg-transparent"
                    onClick={() => addTopping(topping)}
                  >
                    <span className="text-2xl">{topping.icon}</span>
                    <div className="text-center">
                      <div className="text-sm font-medium">{topping.name}</div>
                      <div className="text-xs text-gray-500">
                        +{topping.price.toLocaleString()}đ
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                {t.toppingNote}
              </div>
            </CardContent>
          </Card>

          {/* Current Toppings */}
          {toppings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Topping đã chọn ({toppings.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {toppings.map((topping, index) => (
                    <div
                      key={`${topping.id}-${index}`}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div className="flex items-center space-x-2">
                        <span>{topping.icon}</span>
                        <span className="text-sm">{topping.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">
                          {topping.price.toLocaleString()}đ
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            removeTopping(`${topping.id}-${index}`)
                          }
                          className="h-6 w-6 p-0 text-red-500 bg-transparent"
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
