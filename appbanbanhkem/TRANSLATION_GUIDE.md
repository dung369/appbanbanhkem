# 🌍 Hướng Dẫn Sử Dụng Hệ Thống Đa Ngôn Ngữ (i18n)

## ✅ Đã Hoàn Thành

Hệ thống đa ngôn ngữ đã được tích hợp vào ứng dụng với:

- ✅ **3 ngôn ngữ**: Tiếng Việt, English, 中文 (Chinese)
- ✅ **Translation system**: `lib/translations.ts`
- ✅ **Hook sử dụng**: `useTranslation()`
- ✅ **Đã áp dụng vào**:
  - Header (menu, search, buttons)
  - Settings Panel (toàn bộ)

## 🎯 Cách Sử Dụng

### 1. Import translation hook vào component

```typescript
import { useTranslation } from "@/lib/translations";

export function MyComponent() {
  const { t, language } = useTranslation();

  return (
    <div>
      <h1>{t.myAccount}</h1>
      <p>{t.managePersonalInfo}</p>
    </div>
  );
}
```

### 2. Thêm translation mới

Mở file `lib/translations.ts` và thêm key mới vào cả 3 ngôn ngữ:

```typescript
export const translations = {
  vi: {
    myNewKey: "Văn bản tiếng Việt",
    // ... các key khác
  },
  en: {
    myNewKey: "English text",
    // ... other keys
  },
  zh: {
    myNewKey: "中文文本",
    // ... 其他键
  },
};
```

### 3. Đổi ngôn ngữ

User có thể đổi ngôn ngữ qua:

1. Vào **Settings** (icon ⚙️)
2. Chọn **Ngôn ngữ / Language**
3. Chọn ngôn ngữ mong muốn
4. Trang sẽ tự động reload và hiển thị ngôn ngữ mới

## 📋 Các Translation Key Hiện Có

### Header & Navigation

- `search`: Placeholder cho search box
- `hello`: Lời chào
- `logout`: Nút đăng xuất
- `settings`: Cài đặt
- `home`, `birthdayCakes`, `weddingCakes`, etc.

### Settings Panel

- `myAccount`: Tài khoản của tôi
- `address`: Địa chỉ
- `notifications`: Thông báo
- `language`: Ngôn ngữ
- `about`: Giới thiệu
- `deleteAccount`: Xóa tài khoản

### Common

- `back`, `save`, `cancel`, `confirm`, `edit`, `delete`

### Banner

- `freeShipping`: Banner miễn phí ship

## 🔄 Cách Hoạt Động

1. **localStorage**: Ngôn ngữ được lưu trong `localStorage` với key `app_language`
2. **Hook**: `useTranslation()` đọc từ localStorage và trả về object translation
3. **Auto Reload**: Khi đổi ngôn ngữ, trang tự động reload sau 300ms
4. **Default**: Mặc định là Tiếng Việt (`vi`)

## 📝 TODO - Cần Thêm Translation

Các component sau cần được thêm translation:

### Chưa áp dụng:

- [ ] Hero section (trang chủ)
- [ ] Product cards
- [ ] Footer
- [ ] Services section
- [ ] Category pages (bánh sinh nhật, bánh cưới...)
- [ ] Product detail page
- [ ] Cart page
- [ ] Checkout
- [ ] Admin dashboard
- [ ] Chat widget
- [ ] Digital card designer
- [ ] Custom cake designer

### Cách thêm vào component khác:

1. Import `useTranslation`
2. Destructure `t` từ hook
3. Thay text cứng bằng `{t.keyName}`
4. Thêm key mới vào `translations.ts` nếu chưa có

**Ví dụ:**

```typescript
// TRƯỚC
<h1>Bánh sinh nhật</h1>;

// SAU
const { t } = useTranslation();
<h1>{t.birthdayCakes}</h1>;
```

## 💡 Tips

1. **Kiểm tra lỗi**: Sau khi thêm translation, test cả 3 ngôn ngữ
2. **Consistency**: Giữ tên key nhất quán (camelCase)
3. **Context**: Tên key nên mô tả rõ nội dung
4. **Fallback**: Nếu key không tồn tại, sẽ hiển thị undefined

## 🐛 Debug

Nếu translation không hoạt động:

1. Kiểm tra localStorage: `localStorage.getItem('app_language')`
2. Kiểm tra console có lỗi không
3. Reload lại trang (Ctrl + R hoặc F5)
4. Clear localStorage và thử lại

## 🚀 Mở Rộng

Để thêm ngôn ngữ mới (ví dụ: Nhật, Hàn...):

1. Thêm type mới: `export type Language = 'vi' | 'en' | 'zh' | 'ja' | 'ko';`
2. Thêm object translation mới vào `translations`
3. Thêm button chọn ngôn ngữ trong Settings Panel

---

**Note**: Hiện tại chỉ Header và Settings Panel được áp dụng translation. Cần áp dụng dần vào các component khác để hoàn thiện hệ thống đa ngôn ngữ cho toàn bộ website.
