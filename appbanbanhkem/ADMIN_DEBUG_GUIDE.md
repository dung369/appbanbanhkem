# 🔧 Hướng dẫn Debug và Sửa lỗi Đăng nhập Admin

## ✅ Các lỗi đã được sửa:

### 1. **Logic kiểm tra Admin không đúng**
- ❌ **Trước**: Chỉ kiểm tra `user.email`
- ✅ **Sau**: Kiểm tra cả `user.email` và `token.claims.email`, reload token để đảm bảo có thông tin mới nhất

### 2. **AdminQuickLogin không xử lý lỗi đúng**
- ❌ **Trước**: Luôn redirect ngay cả khi lỗi
- ✅ **Sau**: Chỉ redirect khi đăng nhập thành công, tự động tạo tài khoản nếu chưa tồn tại

### 3. **Thiếu logging và error handling**
- ✅ **Đã thêm**: Console logs chi tiết để debug
- ✅ **Đã thêm**: Xử lý các lỗi Firebase phổ biến với thông báo tiếng Việt

## 🔍 Cách kiểm tra lỗi:

### Bước 1: Mở Developer Console
1. Mở trang web của bạn
2. Nhấn `F12` để mở Developer Console
3. Chuyển sang tab **Console**

### Bước 2: Thử đăng nhập
1. Nhấn nút **"Đăng nhập nhanh Admin"** trên trang `/auth`
2. Xem log trong Console:
   ```
   [AdminQuickLogin] Đang đăng nhập...
   [AdminQuickLogin] Đăng nhập thành công: trandaidung9a1@gmail.com
   [Admin] User email: trandaidung9a1@gmail.com
   [Admin] Token email: trandaidung9a1@gmail.com
   [Admin] Email verified: true/false
   [Admin] Xác nhận admin thành công
   ```

### Bước 3: Kiểm tra Firebase Console
1. Truy cập: https://console.firebase.google.com
2. Chọn project: **webbanhoa-26a60**
3. Vào **Authentication** → **Users**
4. Kiểm tra xem có user `trandaidung9a1@gmail.com` chưa

## 🐛 Các lỗi có thể gặp:

### Lỗi 1: `auth/invalid-credential`
**Nguyên nhân**: Mật khẩu sai hoặc tài khoản chưa tồn tại
**Giải pháp**: 
- Dùng nút "Đăng nhập nhanh Admin" để tự động tạo tài khoản
- Hoặc tạo thủ công trên Firebase Console

### Lỗi 2: `auth/user-not-found`
**Nguyên nhân**: Tài khoản admin chưa được tạo
**Giải pháp**: Code đã được sửa để tự động tạo tài khoản khi nhấn "Đăng nhập nhanh Admin"

### Lỗi 3: `auth/network-request-failed`
**Nguyên nhân**: Không kết nối được Firebase
**Giải pháp**:
1. Kiểm tra internet
2. Kiểm tra Firebase config trong `lib/firebase.ts`
3. Kiểm tra API Key có đúng không

### Lỗi 4: Firestore Rules deny
**Nguyên nhân**: Rules yêu cầu `request.auth.token.email` nhưng token chưa có email
**Giải pháp**: ✅ Đã sửa bằng cách reload token trong code

## 🔐 Thông tin Admin:
- **Email**: `trandaidung9a1@gmail.com`
- **Password**: `Dai1212333`

## 🚀 Cách sử dụng:

### Cách 1: Nút "Đăng nhập nhanh Admin"
1. Vào trang `/auth`
2. Nhấn nút **"Đăng nhập nhanh Admin"** ở góc phải trên
3. Hệ thống sẽ tự động:
   - Đăng nhập nếu tài khoản đã tồn tại
   - Tạo tài khoản mới nếu chưa tồn tại
   - Chuyển đến trang `/admin`

### Cách 2: Form đăng nhập thông thường
1. Vào trang `/auth`
2. Nhập email: `trandaidung9a1@gmail.com`
3. Nhập password: `Dai1212333`
4. Nhấn **"Đăng nhập"**

### Cách 3: Nút "Điền sẵn tài khoản Admin"
1. Vào trang `/auth`
2. Nhấn nút **"Điền sẵn tài khoản Admin"**
3. Thông tin sẽ tự động điền vào form
4. Nhấn **"Đăng nhập"**

## 🛡️ Bảo mật:

### ⚠️ Cảnh báo:
- Mật khẩu admin hiện đang hardcode trong code
- Không nên dùng trong production

### 💡 Khuyến nghị:
1. Tạo tài khoản admin trực tiếp trên Firebase Console
2. Xóa các nút "Đăng nhập nhanh" và "Điền sẵn" khỏi production
3. Dùng biến môi trường để lưu email admin:
   ```typescript
   const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "trandaidung9a1@gmail.com"
   ```

## 📝 Test Checklist:

- [ ] Mở trang `/auth` và kiểm tra có nút "Đăng nhập nhanh Admin" không
- [ ] Nhấn "Đăng nhập nhanh Admin" và xem console logs
- [ ] Kiểm tra có chuyển đến `/admin` không
- [ ] Kiểm tra trang `/admin` có hiển thị dashboard không
- [ ] Kiểm tra Firebase Console có user `trandaidung9a1@gmail.com` chưa
- [ ] Thử đăng xuất và đăng nhập lại bằng form thông thường
- [ ] Thử đăng nhập bằng tài khoản khác (không phải admin) và kiểm tra bị chặn không

## 🔄 Nếu vẫn lỗi:

1. **Xóa cache và cookies**:
   - Nhấn `Ctrl + Shift + Delete`
   - Xóa cookies của localhost

2. **Restart dev server**:
   ```bash
   npm run dev
   ```

3. **Kiểm tra Firebase Rules**:
   - Vào Firebase Console → Firestore Database → Rules
   - Đảm bảo có rule: `request.auth.token.email == "trandaidung9a1@gmail.com"`

4. **Xem Network tab**:
   - Mở Developer Tools → Network
   - Filter: `identitytoolkit`
   - Xem request/response có lỗi gì không

## 📞 Debug Commands:

Chạy trong browser console:
```javascript
// Xem user hiện tại
console.log(firebase.auth().currentUser)

// Xem token
firebase.auth().currentUser?.getIdToken().then(console.log)

// Force refresh token
firebase.auth().currentUser?.getIdToken(true).then(console.log)

// Đăng xuất
firebase.auth().signOut()
```
