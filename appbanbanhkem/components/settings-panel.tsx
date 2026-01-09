"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  X,
  User,
  MapPin,
  Bell,
  Globe,
  Info,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Edit,
  ChevronRight,
  Plus,
  Home,
  Building,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { type User as FirebaseUser } from "firebase/auth";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  user: FirebaseUser | null;
}

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  type: "home" | "office" | "other";
  isDefault: boolean;
}

type SettingsSection =
  | "main"
  | "account"
  | "addresses"
  | "add-address"
  | "edit-address"
  | "notifications"
  | "language"
  | "about"
  | "delete-account";

export function SettingsPanel({ isOpen, onClose, user }: SettingsPanelProps) {
  const [currentSection, setCurrentSection] = useState<SettingsSection>("main");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [language, setLanguage] = useState("vi");
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
  });
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    type: "home" as "home" | "office" | "other"
  });

  const cities = ["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Hải Phòng", "Biên Hòa", "Nha Trang", "Huế"];

  // Load addresses from localStorage (same as address-manager)
  useEffect(() => {
    if (user) {
      const savedAddresses = localStorage.getItem(`addresses_${user.uid}`);
      if (savedAddresses) {
        setAddresses(JSON.parse(savedAddresses));
      }
    }
  }, [user]);

  // Save addresses to localStorage whenever they change
  useEffect(() => {
    if (user && addresses.length > 0) {
      localStorage.setItem(`addresses_${user.uid}`, JSON.stringify(addresses));
    }
  }, [addresses, user]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("app_language") || "vi";
    setLanguage(savedLanguage);
  }, []);

  const saveAddress = () => {
    if (!user) {
      alert("Vui lòng đăng nhập để thêm địa chỉ");
      return;
    }

    if (!formData.name || !formData.phone || !formData.address || !formData.city) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (editingAddress) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id 
          ? { ...formData, id: editingAddress.id, isDefault: editingAddress.isDefault }
          : addr
      ));
    } else {
      // Add new address
      const newAddress: Address = {
        ...formData,
        id: Date.now().toString(),
        isDefault: addresses.length === 0 // First address is default
      };
      setAddresses([...addresses, newAddress]);
    }

    // Reset form
    setFormData({
      name: "",
      phone: "",
      address: "",
      ward: "",
      district: "",
      city: "",
      type: "home"
    });
    setEditingAddress(null);
    setCurrentSection("addresses");
  };

  const deleteAddress = (id: string) => {
    if (confirm("Bạn có chắc muốn xóa địa chỉ này?")) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const startEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      name: address.name,
      phone: address.phone,
      address: address.address,
      ward: address.ward,
      district: address.district,
      city: address.city,
      type: address.type
    });
    setCurrentSection("edit-address");
  };

  const cancelAddressForm = () => {
    setFormData({
      name: "",
      phone: "",
      address: "",
      ward: "",
      district: "",
      city: "",
      type: "home"
    });
    setEditingAddress(null);
    setCurrentSection("addresses");
  };

  if (!isOpen) return null;

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "home":
        return "Nhà riêng";
      case "office":
        return "Văn phòng";
      default:
        return "Khác";
    }
  };

  const renderMainMenu = () => (
    <div className="space-y-2">
      <button
        onClick={() => setCurrentSection("account")}
        className="w-full p-4 hover:bg-gray-50 rounded-lg flex items-center justify-between transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-pink-600" />
          </div>
          <div className="text-left">
            <div className="font-medium text-gray-900">Tài khoản của tôi</div>
            <div className="text-sm text-gray-500">Quản lý thông tin cá nhân</div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>

      <button
        onClick={() => setCurrentSection("addresses")}
        className="w-full p-4 hover:bg-gray-50 rounded-lg flex items-center justify-between transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-left">
            <div className="font-medium text-gray-900">Địa chỉ</div>
            <div className="text-sm text-gray-500">
              {addresses.length > 0 ? `${addresses.length} địa chỉ` : "Chưa có địa chỉ"}
            </div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>

      <button
        onClick={() => setCurrentSection("notifications")}
        className="w-full p-4 hover:bg-gray-50 rounded-lg flex items-center justify-between transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-left">
            <div className="font-medium text-gray-900">Cài đặt Thông báo</div>
            <div className="text-sm text-gray-500">Quản lý thông báo nhận được</div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>

      <button
        onClick={() => setCurrentSection("language")}
        className="w-full p-4 hover:bg-gray-50 rounded-lg flex items-center justify-between transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Globe className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-left">
            <div className="font-medium text-gray-900">Ngôn ngữ / Language</div>
            <div className="text-sm text-gray-500">
              {language === "vi" ? "Tiếng Việt" : language === "en" ? "English" : "中文"}
            </div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>

      <Separator className="my-4" />

      <button
        onClick={() => setCurrentSection("about")}
        className="w-full p-4 hover:bg-gray-50 rounded-lg flex items-center justify-between transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
            <Info className="w-5 h-5 text-cyan-600" />
          </div>
          <div className="text-left">
            <div className="font-medium text-gray-900">Giới thiệu</div>
            <div className="text-sm text-gray-500">Về SweetCake</div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>

      <button
        onClick={() => setCurrentSection("delete-account")}
        className="w-full p-4 hover:bg-red-50 rounded-lg flex items-center justify-between transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-red-600" />
          </div>
          <div className="text-left">
            <div className="font-medium text-red-600">Yêu cầu hủy tài khoản</div>
            <div className="text-sm text-gray-500">Xóa vĩnh viễn tài khoản</div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  );

  const renderAccountSection = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
          <User className="w-10 h-10 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {user?.displayName || "Người dùng"}
          </h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label className="text-gray-600">Email</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">{user?.email}</span>
              {user?.emailVerified && (
                <Badge className="bg-green-100 text-green-800 text-xs">Đã xác thực</Badge>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-gray-600">Số điện thoại</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">{user?.phoneNumber || "Chưa cập nhật"}</span>
            </div>
          </div>

          <Separator />

          <div>
            <Label className="text-gray-600">Ngày tạo tài khoản</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">
                {user?.metadata.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString("vi-VN")
                  : "N/A"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full bg-pink-500 hover:bg-pink-600">
        <Edit className="w-4 h-4 mr-2" />
        Chỉnh sửa thông tin
      </Button>
    </div>
  );

  const renderAddressesSection = () => (
    <div className="space-y-4">
      <Button 
        className="w-full bg-pink-500 hover:bg-pink-600"
        onClick={() => setCurrentSection("add-address")}
      >
        <Plus className="w-4 h-4 mr-2" />
        Thêm địa chỉ mới
      </Button>

      {addresses.length === 0 ? (
        <Card className="text-center py-8">
          <CardContent>
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-700 mb-2">Chưa có địa chỉ giao hàng</h3>
            <p className="text-sm text-gray-500">
              Hãy thêm địa chỉ để tiện lợi khi đặt hàng
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {addresses.map((address) => (
            <Card key={address.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{getTypeLabel(address.type)}</span>
                    {address.isDefault && (
                      <Badge className="bg-green-100 text-green-800 text-xs">Mặc định</Badge>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => startEdit(address)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => deleteAddress(address.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-gray-900">{address.name}</div>
                  <div className="text-sm text-gray-600">{address.phone}</div>
                  <div className="text-sm text-gray-600">
                    {address.address}, {address.ward}, {address.district}, {address.city}
                  </div>
                </div>
                {!address.isDefault && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3 w-full"
                    onClick={() => setDefaultAddress(address.id)}
                  >
                    Đặt làm mặc định
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );

  const renderAddressForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Họ tên</Label>
          <Input 
            id="name" 
            placeholder="Nguyễn Văn A" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input 
            id="phone" 
            placeholder="0901234567" 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">Địa chỉ cụ thể</Label>
        <Textarea 
          id="address" 
          placeholder="Số nhà, tên đường..." 
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          rows={3}
        />
      </div>

      <div>
        <Label>Tỉnh/Thành phố</Label>
        <Select 
          value={formData.city}
          onValueChange={(value) => setFormData({...formData, city: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn tỉnh/thành phố" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Quận/Huyện</Label>
          <Select 
            value={formData.district}
            onValueChange={(value) => setFormData({...formData, district: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn quận/huyện" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quan-1">Quận 1</SelectItem>
              <SelectItem value="quan-2">Quận 2</SelectItem>
              <SelectItem value="quan-3">Quận 3</SelectItem>
              <SelectItem value="quan-4">Quận 4</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Phường/Xã</Label>
          <Select 
            value={formData.ward}
            onValueChange={(value) => setFormData({...formData, ward: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn phường/xã" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phuong-ben-nghe">Phường Bến Nghé</SelectItem>
              <SelectItem value="phuong-ben-thanh">Phường Bến Thành</SelectItem>
              <SelectItem value="phuong-co-giang">Phường Cô Giang</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Loại địa chỉ</Label>
        <Select 
          value={formData.type}
          onValueChange={(value: "home" | "office" | "other") => setFormData({...formData, type: value})}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="home">
              <div className="flex items-center">
                <Home className="w-4 h-4 mr-2" />
                Nhà riêng
              </div>
            </SelectItem>
            <SelectItem value="office">
              <div className="flex items-center">
                <Building className="w-4 h-4 mr-2" />
                Văn phòng
              </div>
            </SelectItem>
            <SelectItem value="other">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Khác
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex space-x-2 pt-4">
        <Button
          className="flex-1 bg-pink-500 hover:bg-pink-600"
          onClick={saveAddress}
        >
          {editingAddress ? "Cập nhật" : "Thêm địa chỉ"}
        </Button>
        <Button
          variant="outline"
          onClick={cancelAddressForm}
        >
          Hủy
        </Button>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Cập nhật đơn hàng</div>
              <div className="text-sm text-gray-500">Nhận thông báo về trạng thái đơn hàng</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.orderUpdates}
                onChange={(e) =>
                  setNotificationSettings({ ...notificationSettings, orderUpdates: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
            </label>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Khuyến mãi & Ưu đãi</div>
              <div className="text-sm text-gray-500">Nhận thông báo về chương trình khuyến mãi</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.promotions}
                onChange={(e) =>
                  setNotificationSettings({ ...notificationSettings, promotions: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
            </label>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Bản tin</div>
              <div className="text-sm text-gray-500">Nhận email về sản phẩm mới và tin tức</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.newsletter}
                onChange={(e) =>
                  setNotificationSettings({ ...notificationSettings, newsletter: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
            </label>
          </div>
        </CardContent>
      </Card>

      <Button
        className="w-full bg-pink-500 hover:bg-pink-600"
        onClick={() => {
          localStorage.setItem("notification_settings", JSON.stringify(notificationSettings));
          alert("Đã lưu cài đặt thông báo!");
        }}
      >
        Lưu thay đổi
      </Button>
    </div>
  );

  const renderLanguageSection = () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 mb-4">Chọn ngôn ngữ hiển thị cho website</p>

      <button
        onClick={() => {
          setLanguage("vi");
          localStorage.setItem("app_language", "vi");
        }}
        className={`w-full p-4 rounded-lg border-2 transition-all ${
          language === "vi"
            ? "border-pink-500 bg-pink-50"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🇻🇳</span>
            <div className="text-left">
              <div className="font-medium text-gray-900">Tiếng Việt</div>
              <div className="text-sm text-gray-500">Vietnamese</div>
            </div>
          </div>
          {language === "vi" && (
            <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>
      </button>

      <button
        onClick={() => {
          setLanguage("en");
          localStorage.setItem("app_language", "en");
        }}
        className={`w-full p-4 rounded-lg border-2 transition-all ${
          language === "en"
            ? "border-pink-500 bg-pink-50"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🇬🇧</span>
            <div className="text-left">
              <div className="font-medium text-gray-900">English</div>
              <div className="text-sm text-gray-500">Tiếng Anh</div>
            </div>
          </div>
          {language === "en" && (
            <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>
      </button>

      <button
        onClick={() => {
          setLanguage("zh");
          localStorage.setItem("app_language", "zh");
        }}
        className={`w-full p-4 rounded-lg border-2 transition-all ${
          language === "zh"
            ? "border-pink-500 bg-pink-50"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🇨🇳</span>
            <div className="text-left">
              <div className="font-medium text-gray-900">中文</div>
              <div className="text-sm text-gray-500">Chinese</div>
            </div>
          </div>
          {language === "zh" && (
            <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>
      </button>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-gray-700">
          💡 <strong>Lưu ý:</strong> Sau khi đổi ngôn ngữ, trang web sẽ tự động cập nhật.
        </p>
      </div>
    </div>
  );

  const renderAboutSection = () => (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🎂</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">SweetCake</h3>
            <p className="text-sm text-gray-500">Phiên bản 1.0.0</p>
          </div>

          <Separator />

          <div className="space-y-3">
            <div>
              <div className="font-medium text-gray-900">Về chúng tôi</div>
              <p className="text-sm text-gray-600 mt-1">
                SweetCake là nền tảng đặt bánh online hàng đầu Việt Nam, mang đến những chiếc
                bánh tươi ngon, được làm thủ công với tình yêu và sự tận tâm.
              </p>
            </div>

            <Separator />

            <div>
              <div className="font-medium text-gray-900">Liên hệ</div>
              <div className="space-y-2 mt-2 text-sm text-gray-600">
                <div>📞 Hotline: 1900 1234</div>
                <div>📧 Email: support@sweetcake.vn</div>
                <div>📍 Địa chỉ: 123 Nguyễn Huệ, Q.1, TP.HCM</div>
              </div>
            </div>

            <Separator />

            <div>
              <div className="font-medium text-gray-900">Theo dõi chúng tôi</div>
              <div className="flex space-x-3 mt-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <span className="mr-1">📘</span> Facebook
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <span className="mr-1">📷</span> Instagram
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <span className="mr-1">🎵</span> TikTok
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-gray-500">
        © 2024 SweetCake. All rights reserved.
      </div>
    </div>
  );

  const renderDeleteAccountSection = () => (
    <div className="space-y-4">
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-red-600 mb-2">Xóa tài khoản vĩnh viễn</h3>
            <p className="text-sm text-gray-700">
              Bạn chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="text-sm space-y-2 text-gray-700">
              <p className="font-medium">Khi xóa tài khoản, bạn sẽ mất:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Tất cả thông tin cá nhân</li>
                <li>Lịch sử đơn hàng</li>
                <li>Điểm tích lũy và ưu đãi</li>
                <li>Địa chỉ giao hàng đã lưu</li>
              </ul>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-red-500 text-red-600 hover:bg-red-100 bg-white"
            onClick={() => {
              if (
                confirm(
                  "Bạn có chắc chắn muốn gửi yêu cầu xóa tài khoản? Chúng tôi sẽ liên hệ với bạn trong 24h để xác nhận."
                )
              ) {
                alert(
                  "Yêu cầu của bạn đã được ghi nhận. Chúng tôi sẽ liên hệ với bạn qua email trong vòng 24 giờ."
                );
                onClose();
              }
            }}
          >
            Gửi yêu cầu xóa tài khoản
          </Button>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full bg-transparent" onClick={() => setCurrentSection("main")}>
        Quay lại
      </Button>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Settings Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">
              {currentSection === "main" && "Thiết lập tài khoản"}
              {currentSection === "account" && "Tài khoản của tôi"}
              {currentSection === "addresses" && "Địa chỉ"}
              {currentSection === "add-address" && "Thêm địa chỉ mới"}
              {currentSection === "edit-address" && "Chỉnh sửa địa chỉ"}
              {currentSection === "notifications" && "Cài đặt Thông báo"}
              {currentSection === "language" && "Ngôn ngữ / Language"}
              {currentSection === "about" && "Giới thiệu"}
              {currentSection === "delete-account" && "Yêu cầu hủy tài khoản"}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {currentSection !== "main" && (
            <button
              onClick={() => setCurrentSection("main")}
              className="text-sm text-white opacity-90 hover:opacity-100 flex items-center"
            >
              ← Quay lại
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentSection === "main" && renderMainMenu()}
          {currentSection === "account" && renderAccountSection()}
          {currentSection === "addresses" && renderAddressesSection()}
          {(currentSection === "add-address" || currentSection === "edit-address") && renderAddressForm()}
          {currentSection === "notifications" && renderNotificationsSection()}
          {currentSection === "language" && renderLanguageSection()}
          {currentSection === "about" && renderAboutSection()}
          {currentSection === "delete-account" && renderDeleteAccountSection()}
        </div>
      </div>
    </>
  );
}
