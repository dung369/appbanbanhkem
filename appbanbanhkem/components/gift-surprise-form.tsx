"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gift, Heart, SmileIcon as Surprise, User } from "lucide-react";
import { useTranslation } from "@/lib/translations";

export function GiftSurpriseForm() {
  const { t } = useTranslation();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState("specific");
  const [giftData, setGiftData] = useState({
    // Thông tin người tặng
    senderName: "",
    senderPhone: "",
    senderEmail: "",

    // Thông tin người nhận
    recipientName: "",
    recipientPhone: "",
    recipientAddress: "",

    // Thông tin quà tặng
    occasionType: "",
    deliveryDate: "",
    deliveryTime: "",
    surpriseMessage: "",
    specialInstructions: "",

    // Tùy chọn đặc biệt
    hideIdentity: false,
    callBeforeDelivery: true,
    takePhoto: true,
    sendConfirmation: true,
  });

  const occasions = [
    {
      value: "birthday",
      label: `🎂 ${t.occasionBirthday2}`,
      color: "bg-pink-100 text-pink-800",
    },
    {
      value: "anniversary",
      label: `💕 ${t.occasionAnniversary2}`,
      color: "bg-red-100 text-red-800",
    },
    {
      value: "congratulation",
      label: `🎉 ${t.occasionCongratulation2}`,
      color: "bg-green-100 text-green-800",
    },
    {
      value: "apology",
      label: `🙏 ${t.occasionApology2}`,
      color: "bg-blue-100 text-blue-800",
    },
    {
      value: "surprise",
      label: `✨ ${t.occasionSurprise}`,
      color: "bg-purple-100 text-purple-800",
    },
    {
      value: "valentine",
      label: `💝 ${t.occasionValentine}`,
      color: "bg-rose-100 text-rose-800",
    },
    {
      value: "graduation",
      label: `🎓 ${t.occasionGraduation}`,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "other",
      label: `🎁 ${t.occasionOther}`,
      color: "bg-gray-100 text-gray-800",
    },
  ];

  const timeSlots = [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "18:00 - 20:00",
    "20:00 - 22:00",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 text-lg mb-4 animate-bounce">
          🎁 {t.giftSurpriseBadge}
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t.giftSurpriseHeading}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            {" "}
            {t.giftSurpriseHighlight}
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t.giftSurpriseDesc}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form chính */}
        <div className="lg:col-span-2 space-y-6">
          {/* Thông tin người tặng */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-pink-500" />
                {t.senderInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="senderName">{t.yourName}</Label>
                  <Input
                    id="senderName"
                    placeholder="Nguyễn Văn A"
                    value={giftData.senderName}
                    onChange={(e) =>
                      setGiftData({ ...giftData, senderName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="senderPhone">{t.phoneNumber}</Label>
                  <Input
                    id="senderPhone"
                    placeholder="0901234567"
                    value={giftData.senderPhone}
                    onChange={(e) =>
                      setGiftData({ ...giftData, senderPhone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="senderEmail">{t.emailForConfirm}</Label>
                <Input
                  id="senderEmail"
                  type="email"
                  placeholder="your@email.com"
                  value={giftData.senderEmail}
                  onChange={(e) =>
                    setGiftData({ ...giftData, senderEmail: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Thông tin người nhận */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="w-5 h-5 mr-2 text-purple-500" />
                {t.recipientInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="recipientName">{t.recipientNameLabel}</Label>
                  <Input
                    id="recipientName"
                    placeholder="Trần Thị B"
                    value={giftData.recipientName}
                    onChange={(e) =>
                      setGiftData({
                        ...giftData,
                        recipientName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="recipientPhone">
                    {t.recipientPhoneLabel}
                  </Label>
                  <Input
                    id="recipientPhone"
                    placeholder="0987654321"
                    value={giftData.recipientPhone}
                    onChange={(e) =>
                      setGiftData({
                        ...giftData,
                        recipientPhone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="recipientAddress">{t.deliveryAddress}</Label>
                <Textarea
                  id="recipientAddress"
                  placeholder="123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM"
                  value={giftData.recipientAddress}
                  onChange={(e) =>
                    setGiftData({
                      ...giftData,
                      recipientAddress: e.target.value,
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Chi tiết quà tặng */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Surprise className="w-5 h-5 mr-2 text-orange-500" />
                {t.giftDetails}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-3 block">{t.giftOccasion}</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {occasions.map((occasion) => (
                    <Button
                      key={occasion.value}
                      variant={
                        giftData.occasionType === occasion.value
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      className="h-auto p-3 flex flex-col items-center space-y-1 bg-transparent"
                      onClick={() =>
                        setGiftData({
                          ...giftData,
                          occasionType: occasion.value,
                        })
                      }
                    >
                      <span className="text-lg">
                        {occasion.label.split(" ")[0]}
                      </span>
                      <span className="text-xs">
                        {occasion.label.split(" ").slice(1).join(" ")}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deliveryDate">{t.deliveryDateLabel}</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={giftData.deliveryDate}
                    onChange={(e) =>
                      setGiftData({ ...giftData, deliveryDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>{t.deliveryTimeSlot}</Label>
                  <Select
                    value={giftData.deliveryTime}
                    onValueChange={(value) =>
                      setGiftData({ ...giftData, deliveryTime: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t.selectTimeSlot} />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="surpriseMessage">
                  {t.surpriseMessageLabel}
                </Label>
                <Textarea
                  id="surpriseMessage"
                  placeholder={t.surpriseMessagePlaceholder}
                  value={giftData.surpriseMessage}
                  onChange={(e) =>
                    setGiftData({
                      ...giftData,
                      surpriseMessage: e.target.value,
                    })
                  }
                  className="min-h-[100px]"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {t.surpriseMessageNote}
                </p>
              </div>

              <div>
                <Label htmlFor="specialInstructions">{t.specialRequests}</Label>
                <Textarea
                  id="specialInstructions"
                  placeholder={t.specialRequestsPlaceholder}
                  value={giftData.specialInstructions}
                  onChange={(e) =>
                    setGiftData({
                      ...giftData,
                      specialInstructions: e.target.value,
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Tùy chọn đặc biệt */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                {t.specialOptions}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-pink-50 rounded-lg">
                  <Checkbox
                    id="hideIdentity"
                    checked={giftData.hideIdentity}
                    onCheckedChange={(checked) =>
                      setGiftData({ ...giftData, hideIdentity: !!checked })
                    }
                  />
                  <div>
                    <Label
                      htmlFor="hideIdentity"
                      className="font-medium text-pink-800"
                    >
                      {t.hideIdentityOption}
                    </Label>
                    <p className="text-sm text-pink-600">
                      {t.hideIdentityDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Checkbox
                    id="callBeforeDelivery"
                    checked={giftData.callBeforeDelivery}
                    onCheckedChange={(checked) =>
                      setGiftData({
                        ...giftData,
                        callBeforeDelivery: !!checked,
                      })
                    }
                  />
                  <div>
                    <Label
                      htmlFor="callBeforeDelivery"
                      className="font-medium text-blue-800"
                    >
                      {t.callBeforeOption}
                    </Label>
                    <p className="text-sm text-blue-600">{t.callBeforeDesc}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <Checkbox
                    id="takePhoto"
                    checked={giftData.takePhoto}
                    onCheckedChange={(checked) =>
                      setGiftData({ ...giftData, takePhoto: !!checked })
                    }
                  />
                  <div>
                    <Label
                      htmlFor="takePhoto"
                      className="font-medium text-green-800"
                    >
                      {t.takePhotoOption}
                    </Label>
                    <p className="text-sm text-green-600">{t.takePhotoDesc}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Checkbox
                    id="sendConfirmation"
                    checked={giftData.sendConfirmation}
                    onCheckedChange={(checked) =>
                      setGiftData({ ...giftData, sendConfirmation: !!checked })
                    }
                  />
                  <div>
                    <Label
                      htmlFor="sendConfirmation"
                      className="font-medium text-purple-800"
                    >
                      {t.emailConfirmOption}
                    </Label>
                    <p className="text-sm text-purple-600">
                      {t.emailConfirmDesc}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tóm tắt đơn hàng */}
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>{t.giftSummary}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{t.sender}</span>
                  <span className="font-medium">
                    {giftData.senderName || t.notEntered}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t.recipient}</span>
                  <span className="font-medium">
                    {giftData.recipientName || t.notEntered}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t.occasion}</span>
                  <span className="font-medium">
                    {occasions.find((o) => o.value === giftData.occasionType)
                      ?.label || t.notSelected}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t.deliveryDate}</span>
                  <span className="font-medium">
                    {giftData.deliveryDate || t.notSelected}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t.deliveryTime}</span>
                  <span className="font-medium">
                    {giftData.deliveryTime || t.notSelected}
                  </span>
                </div>
              </div>

              {giftData.hideIdentity && (
                <div className="bg-pink-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-pink-600">🕵️</span>
                    <span className="text-sm font-medium text-pink-800">
                      {t.anonymousDelivery}
                    </span>
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>{t.giftServiceFee}</span>
                  <span className="text-green-600">50.000đ</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {t.giftServiceNote}
                </p>
              </div>

              <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                <Gift className="w-5 h-5 mr-2" />
                {t.continueSelectCake}
              </Button>
            </CardContent>
          </Card>

          {/* Hướng dẫn */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t.howItWorks}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">1.</span>
                <span>{t.step1}</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">2.</span>
                <span>{t.step2}</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">3.</span>
                <span>{t.step3}</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500 font-bold">4.</span>
                <span>{t.step4}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
