"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  Palette,
  Type,
  ImageIcon,
  Save,
  ShoppingCart,
} from "lucide-react";
import { useTranslation } from "@/lib/translations";

export function CustomCakeDesigner() {
  const { t } = useTranslation();
  const [selectedShape, setSelectedShape] = useState("round");
  const [selectedSize, setSelectedSize] = useState("20cm");
  const [selectedFlavor, setSelectedFlavor] = useState("vanilla");
  const [selectedColor, setSelectedColor] = useState("#ff69b4");
  const [customText, setCustomText] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(450000);

  const shapes = [
    { id: "round", name: "Tròn", price: 0 },
    { id: "square", name: "Vuông", price: 20000 },
    { id: "heart", name: "Trái tim", price: 50000 },
    { id: "star", name: "Ngôi sao", price: 80000 },
    { id: "custom", name: "Tùy chỉnh", price: 150000 },
  ];

  const sizes = [
    { id: "15cm", name: "15cm (4-6 người)", price: 0 },
    { id: "18cm", name: "18cm (6-8 người)", price: 50000 },
    { id: "20cm", name: "20cm (8-10 người)", price: 100000 },
    { id: "25cm", name: "25cm (12-15 người)", price: 200000 },
    { id: "30cm", name: "30cm (20-25 người)", price: 350000 },
  ];

  const flavors = [
    { id: "vanilla", name: "Vanilla", price: 0 },
    { id: "chocolate", name: "Chocolate", price: 20000 },
    { id: "strawberry", name: "Dâu tây", price: 30000 },
    { id: "matcha", name: "Trà xanh", price: 40000 },
    { id: "tiramisu", name: "Tiramisu", price: 60000 },
    { id: "red-velvet", name: "Red Velvet", price: 50000 },
  ];

  const colors = [
    "#ff69b4",
    "#ff1493",
    "#dc143c",
    "#ff4500",
    "#ffa500",
    "#ffff00",
    "#9acd32",
    "#00ff00",
    "#00ffff",
    "#1e90ff",
    "#0000ff",
    "#8a2be2",
    "#9400d3",
    "#ff00ff",
    "#ffffff",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 text-lg mb-4">
          🎨 {t.customCakeDesignTitle}
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t.customCakeDesignHeading}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            {" "}
            {t.customCakeDesignHighlight}
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t.customCakeDesignDesc}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Design Panel */}
        <div className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">{t.tabBasic}</TabsTrigger>
              <TabsTrigger value="design">{t.tabDesign}</TabsTrigger>
              <TabsTrigger value="text">{t.tabText}</TabsTrigger>
              <TabsTrigger value="image">{t.tabImage}</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    {t.basicInfo}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Shape Selection */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      {t.cakeShape}
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {shapes.map((shape) => (
                        <Button
                          key={shape.id}
                          variant={
                            selectedShape === shape.id ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedShape(shape.id)}
                          className="flex flex-col h-auto py-3"
                        >
                          <span className="text-lg mb-1">
                            {shape.id === "round" && "⭕"}
                            {shape.id === "square" && "⬜"}
                            {shape.id === "heart" && "💖"}
                            {shape.id === "star" && "⭐"}
                            {shape.id === "custom" && "🎨"}
                          </span>
                          <span className="text-xs">{shape.name}</span>
                          {shape.price > 0 && (
                            <span className="text-xs text-gray-500">
                              +{shape.price.toLocaleString()}đ
                            </span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      {t.cakeSize}
                    </Label>
                    <Select
                      value={selectedSize}
                      onValueChange={setSelectedSize}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size.id} value={size.id}>
                            {size.name}{" "}
                            {size.price > 0 &&
                              `(+${size.price.toLocaleString()}đ)`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Flavor Selection */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      {t.cakeFlavor}
                    </Label>
                    <Select
                      value={selectedFlavor}
                      onValueChange={setSelectedFlavor}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {flavors.map((flavor) => (
                          <SelectItem key={flavor.id} value={flavor.id}>
                            {flavor.name}{" "}
                            {flavor.price > 0 &&
                              `(+${flavor.price.toLocaleString()}đ)`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="design" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    {t.colorAndDecor}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      {t.mainColor}
                    </Label>
                    <div className="grid grid-cols-5 gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          className={`w-10 h-10 rounded-full border-2 ${
                            selectedColor === color
                              ? "border-gray-800"
                              : "border-gray-300"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColor(color)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      {t.decorStyle}
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        {t.decorFresh}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t.decorSparkle}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t.decorRibbon}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t.decorFruit}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="text" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Type className="w-5 h-5 mr-2" />
                    {t.textOnCake}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label
                      htmlFor="custom-text"
                      className="text-sm font-medium mb-2 block"
                    >
                      {t.textContent}
                    </Label>
                    <Textarea
                      id="custom-text"
                      placeholder={t.textPlaceholder}
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">{t.textNote}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      {t.fontStyle}
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        {t.fontHandwriting}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t.fontArt}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t.fontSparkle}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t.font3D}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="image" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ImageIcon className="w-5 h-5 mr-2" />
                    {t.personalImage}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">{t.uploadImage}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      {t.uploadSupport}
                    </p>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      {t.chooseFile}
                    </Button>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-3 block">
                      {t.imagePosition}
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        {t.posCenter}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t.posCorner}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t.posFull}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t.posCustom}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      💡 <strong>Lưu ý:</strong> {t.imageNote}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview & Order */}
        <div className="space-y-6">
          {/* Cake Preview */}
          <Card>
            <CardHeader>
              <CardTitle>{t.previewCake}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <div
                  className="w-48 h-48 rounded-full flex items-center justify-center text-6xl"
                  style={{ backgroundColor: selectedColor }}
                >
                  🎂
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="font-medium">
                  Bánh {shapes.find((s) => s.id === selectedShape)?.name}{" "}
                  {selectedSize}
                </p>
                <p className="text-sm text-gray-600">
                  {t.cakeFlavor}:{" "}
                  {flavors.find((f) => f.id === selectedFlavor)?.name}
                </p>
                {customText && (
                  <p className="text-sm text-pink-600 italic">"{customText}"</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Price Summary */}
          <Card>
            <CardHeader>
              <CardTitle>{t.priceDetails}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>{t.basicCake}</span>
                <span>450.000đ</span>
              </div>
              <div className="flex justify-between">
                <span>
                  {t.cakeShape} (
                  {shapes.find((s) => s.id === selectedShape)?.name})
                </span>
                <span>
                  +
                  {shapes
                    .find((s) => s.id === selectedShape)
                    ?.price.toLocaleString()}
                  đ
                </span>
              </div>
              <div className="flex justify-between">
                <span>
                  {t.cakeSize} ({selectedSize})
                </span>
                <span>
                  +
                  {sizes
                    .find((s) => s.id === selectedSize)
                    ?.price.toLocaleString()}
                  đ
                </span>
              </div>
              <div className="flex justify-between">
                <span>
                  {t.cakeFlavor} (
                  {flavors.find((f) => f.id === selectedFlavor)?.name})
                </span>
                <span>
                  +
                  {flavors
                    .find((f) => f.id === selectedFlavor)
                    ?.price.toLocaleString()}
                  đ
                </span>
              </div>
              {customText && (
                <div className="flex justify-between">
                  <span>Viết chữ</span>
                  <span>+30.000đ</span>
                </div>
              )}
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>{t.totalPrice}</span>
                <span className="text-pink-600">
                  {estimatedPrice.toLocaleString()}đ
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 h-12">
              <ShoppingCart className="w-5 h-5 mr-2" />
              {t.addCakeToCart}
            </Button>
            <Button variant="outline" className="w-full h-12 bg-transparent">
              <Save className="w-5 h-5 mr-2" />
              {t.saveDesign}
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              {t.consultExpert}
            </Button>
          </div>

          {/* Additional Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>{t.makingTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>{t.freeDelivery}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>{t.qualityGuarantee}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>{t.returnSupport}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
