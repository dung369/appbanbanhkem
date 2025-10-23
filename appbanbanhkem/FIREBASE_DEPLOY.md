# Hướng dẫn Deploy Firebase cho dự án

## Bước 1: Cài đặt Firebase CLI

```powershell
npm install -g firebase-tools
```

## Bước 2: Đăng nhập Firebase

```powershell
firebase login
```

## Bước 3: Deploy Firestore Rules

```powershell
firebase deploy --only firestore:rules
```

## Bước 4: Deploy Firestore Indexes (nếu cần)

```powershell
firebase deploy --only firestore:indexes
```

## Bước 5: Tạo Indexes thủ công (quan trọng!)

Vào Firebase Console > Firestore Database > Indexes và tạo các composite indexes sau:

### Index 1: Products - Best Sellers
- Collection: `products`
- Fields:
  - `isBestSeller` (Ascending)
  - `status` (Ascending)
  - `orders` (Descending)

### Index 2: Products - Hot Trend
- Collection: `products`
- Fields:
  - `isTrending` (Ascending)
  - `status` (Ascending)
  - `createdAt` (Descending)

### Index 3: Products - By Category
- Collection: `products`
- Fields:
  - `category` (Ascending)
  - `status` (Ascending)
  - `createdAt` (Descending)

## Bước 6: Kích hoạt Firebase Storage

1. Vào Firebase Console
2. Chọn Storage
3. Nhấn "Get Started"
4. Chọn location và hoàn tất setup

## Bước 7: Cập nhật Storage Rules

Vào Storage > Rules và thêm:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == "trandaidung9a1@gmail.com";
    }
  }
}
```

## Bước 8: Test chức năng

1. Đăng nhập với email admin: `trandaidung9a1@gmail.com`
2. Vào trang Admin
3. Thêm sản phẩm mẫu
4. Kiểm tra hiển thị trên các trang danh mục

## Lưu ý quan trọng

- Đảm bảo đã tạo đủ các indexes trong Firestore
- Storage phải được kích hoạt để upload ảnh
- Chỉ tài khoản admin mới có thể thêm/xóa/sửa sản phẩm
- Người dùng khác chỉ có thể xem sản phẩm
