# EventSphere 🎉

Nền tảng mua bán vé sự kiện trực tuyến tại Việt Nam, xây dựng bằng React (frontend), Vue 3 (frontend dự phòng) và ASP.NET Core 9.0 (backend API).

---

## Danh sách tất cả các chức năng hiện có

### 1. Backend API (ASP.NET Core 9.0 – `EventSphere.API/`)

#### Quản lý Sự kiện (`/api/events`)
| Endpoint | Phương thức | Mô tả |
|----------|-------------|-------|
| `/api/events` | GET | Lấy tất cả sự kiện, nhóm theo danh mục (5 danh mục) |
| `/api/events/all` | GET | Lấy danh sách phẳng tất cả sự kiện |
| `/api/events/{category}` | GET | Lấy sự kiện theo danh mục (concerts, arts, sports, experiences, workshops) |
| `/api/events/detail/{id}` | GET | Lấy chi tiết một sự kiện theo ID |
| `/api/events/search?q=` | GET | Tìm kiếm sự kiện theo tên, nghệ sĩ, địa điểm (≥2 ký tự, trả về tối đa 5 kết quả) |

#### Quản lý Đặt vé (`/api/bookings`)
| Endpoint | Phương thức | Mô tả |
|----------|-------------|-------|
| `/api/bookings` | POST | Tạo đơn đặt vé mới (có xác thực, sinh mã đặt vé tự động) |
| `/api/bookings` | GET | Lấy danh sách tất cả đơn đặt vé |

**Chi tiết đặt vé:**
- Ba hạng vé: Standard (500.000đ VND), VIP (1.200.000đ VND), SVIP (2.500.000đ VND)
- Chọn số lượng vé: 1–8
- Sinh mã đặt vé duy nhất: `ES-{8 ký tự hex}`
- Tính tổng tiền: `đơn giá × số lượng`
- Xác thực thông tin: Họ tên, Email, Số điện thoại bắt buộc
- Phương thức thanh toán: MoMo, VNPay, ZaloPay, Credit Card

---

### 2. Dữ liệu Sự kiện (31 sự kiện, 5 danh mục)

#### 🎵 Concerts (6 sự kiện)
- Sơn Tùng M-TP Live Concert 2025
- EDM Storm Festival
- Indie Nights Vol. 7
- Mỹ Tâm Acoustic Night
- Jazz Under the Stars
- Rock in Saigon 2025

#### 🎭 Arts & Theatre (6 sự kiện)
- The Phantom of the Opera
- Truyện Kiều – Vở Kịch
- Modern Dance: Fragments
- Hamlet – Shakespeare Reimagined
- AO Show – Làng Phố
- Water Puppet Show

#### ⚽ Sports (5 sự kiện)
- V.League: HCMC FC vs. Hà Nội FC
- Vietnam Open Tennis 2025
- Saigon Heat vs. Thang Long Warriors
- Hanoi Marathon 2025
- VBA All-Star Game 2025

#### 🧭 Experiences (5 sự kiện)
- Mekong Delta Sunset Cruise
- Ha Long Bay Overnight Kayak
- Saigon by Night Vespa Tour
- Hội An Lantern Making Class
- Phú Quốc Snorkeling Expedition

#### 📚 Workshops (5 sự kiện)
- React Advanced Patterns 2025
- Watercolour for Beginners
- Vietnamese Cooking Masterclass
- Digital Marketing Bootcamp
- Coffee Tasting & Brewing

---

### 3. Giao diện Người dùng – React (`src/`)

#### Các trang (Pages)
| Trang | Mô tả |
|-------|-------|
| **HomePage** | Carousel sự kiện nổi bật, sự kiện thịnh hành, các mục danh mục, banner quảng cáo |
| **ConcertsPage** | Danh sách sự kiện âm nhạc / ca nhạc |
| **ArtsPage** | Danh sách sự kiện nghệ thuật & sân khấu |
| **SportsPage** | Danh sách sự kiện thể thao |
| **ExperiencesPage** | Danh sách sự kiện trải nghiệm |
| **WorkshopsPage** | Danh sách hội thảo / khóa học |
| **EventDetailPage** | Chi tiết đầy đủ sự kiện kèm nút đặt vé |
| **MyTicketsPage** | Xem vé đã mua cùng thông tin đặt chỗ |
| **ProfilePage** | Thông tin hồ sơ và cài đặt người dùng |
| **OrganizerPage** | Trung tâm quản lý sự kiện của người tổ chức |
| **CreateEventPage** | Biểu mẫu tạo sự kiện mới |

#### Các thành phần (Components)
| Component | Mô tả |
|-----------|-------|
| **Header** | Logo, thanh tìm kiếm, nút tạo sự kiện, huy hiệu vé, menu người dùng |
| **Navigation** | Thanh điều hướng danh mục với biểu tượng emoji |
| **EventCard** | Hiển thị ảnh, tiêu đề, ngày, địa điểm, giá, tình trạng chỗ, huy hiệu cấp độ |
| **BookingModal** | Quy trình đặt vé 4 bước (xem chi tiết bên dưới) |
| **SlotsBadge** | Hiển thị số chỗ còn lại, cảnh báo khi ≤5 chỗ |
| **LevelBadge** | Huy hiệu cấp độ kỹ năng (Beginner / Intermediate / Advanced) |
| **Toast** | Thông báo xác nhận đặt vé |
| **Footer** | Thông tin công ty, liên kết, bản quyền |

#### Quy trình Đặt vé (BookingModal – 4 bước)
1. **Bước 1** – Chọn hạng vé (Standard / VIP / SVIP) và số lượng
2. **Bước 2** – Nhập thông tin cá nhân (Họ tên, Email, Số điện thoại)
3. **Bước 3** – Chọn phương thức thanh toán (MoMo / VNPay / ZaloPay / Credit Card)
4. **Bước 4** – Xác nhận đặt vé cùng mã đặt chỗ

#### Các tương tác người dùng
- Tìm kiếm sự kiện theo tên, nghệ sĩ hoặc địa điểm (thời gian thực)
- Duyệt sự kiện nổi bật / thịnh hành
- Lọc sự kiện theo danh mục
- Xem thông tin chi tiết sự kiện
- Thực hiện đặt vé nhiều bước
- Chọn hạng vé và phương thức thanh toán
- Xem lịch sử vé đã mua
- Menu hồ sơ người dùng với tùy chọn đăng xuất

---

### 4. Giao diện Người dùng – Vue 3 (`eventsphere-client/`)

#### Các trang & định tuyến (11 routes)
Tương tự với phần React, bao gồm: HomePage, ConcertsPage, ArtsPage, SportsPage, ExperiencesPage, WorkshopsPage, EventDetailPage, MyTicketsPage, ProfilePage, OrganizerPage, CreateEventPage.

#### Quản lý trạng thái (`stores/eventStore.js`)
| Hàm / Thuộc tính | Mô tả |
|------------------|-------|
| `selectedEvent` | Sự kiện đang được chọn |
| `tickets` | Danh sách vé đã đặt |
| `isBookingOpen` | Trạng thái hiển thị modal đặt vé |
| `toast` | Thông báo toast hiện tại |
| `selectEvent(event)` | Chọn sự kiện để xem / đặt vé |
| `openBooking()` | Mở modal đặt vé |
| `closeBooking()` | Đóng modal đặt vé |
| `addTicket(ticket)` | Thêm vé vào danh sách |
| `clearToast()` | Xóa thông báo toast |

#### Các thành phần Vue
- **EventCard.vue** – Thẻ hiển thị sự kiện
- **BookingModal.vue** – Modal đặt vé 4 bước
- **ToastNotification.vue** – Thông báo xác nhận
- **LevelBadge.vue** – Huy hiệu cấp độ kỹ năng
- **SlotsBadge.vue** – Huy hiệu số chỗ còn lại

---

## Công nghệ sử dụng

| Thành phần | Công nghệ |
|------------|-----------|
| Backend API | ASP.NET Core 9.0 (C#) |
| Frontend chính | React 19.2 + Vite 7.3 |
| Frontend dự phòng | Vue 3.5 + Vue Router 4.6 + Vite 7.3 |
| Build tool | Vite |
| Linting | ESLint |

---

## Hướng dẫn cài đặt & chạy

### Backend
```bash
cd EventSphere.API
dotnet restore
dotnet run
# API chạy tại: http://localhost:5268
```

### Frontend React
```bash
# Tại thư mục gốc
npm install
npm run dev      # Dev server tại http://localhost:5173
npm run build    # Build production
npm run lint     # Kiểm tra code style
```

### Frontend Vue
```bash
cd eventsphere-client
npm install
npm run dev      # Dev server tại http://localhost:5173
npm run build    # Build production
```
