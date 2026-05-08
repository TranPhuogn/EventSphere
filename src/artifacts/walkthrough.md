# Admin Dashboard & Event Schema Update

Tôi đã hoàn tất toàn bộ yêu cầu xây dựng Admin Dashboard và chuẩn hóa cấu trúc dữ liệu sự kiện cho EventSphere. Dưới đây là tổng hợp những gì đã được thực hiện:

## 1. Unified Event Schema & Store (Cốt lõi)
> [!NOTE]
> Toàn bộ dữ liệu sự kiện tĩnh đã được chuyển sang quản lý tập trung và **reactive** qua file `src/stores/eventStore.js`.

- **Cấu trúc chung (Schema):** Mọi sự kiện giờ đây đều tuân theo một format chuẩn mực:
  - Có các trường chung: `id`, `title`, `slug`, `category`, `description`.
  - Có `dateStart`, `dateEnd` và `location` (dưới dạng object chứa `name`, `city`, `address`).
  - Giá vé được chuyển thành đối tượng `priceRange { min, max }`.
  - Danh sách nghệ sĩ/nhóm/giảng viên được gộp chung vào mảng động `performers`.
  - Trạng thái `status` tự động được tính toán là `upcoming`, `ended`, hoặc `sold-out`.
- **CRUD Operations:** Các hàm `getEvents()`, `addEvent()`, `updateEvent()`, `deleteEvent()` đã được viết và sẵn sàng sử dụng ở bất kỳ đâu trong app.

## 2. Giao diện Admin Dashboard
> [!TIP]
> Bạn có thể truy cập bằng đường dẫn **`/admin`** trên trình duyệt.

- **AdminLayout:** Sử dụng cấu trúc Flexbox hiện đại với `Sidebar` cố định bên trái và `Topbar` ở trên cùng.
- **Sidebar & Topbar:** Sử dụng CSS thuần, tuân thủ bảng màu Dark Mode & Emerald Green đặc trưng của hệ thống (giống Ticketbox). Giao diện tối giản, hiển thị rõ ràng các thẻ điều hướng.
- **Events Management Page (`/admin/events`):**
  - Hiển thị danh sách sự kiện dưới dạng bảng (Table view).
  - Có các nút Hành động (Action buttons): Chỉnh sửa, Xóa sự kiện.
  - Tích hợp thanh công cụ tìm kiếm và lọc sự kiện theo Trạng thái / Danh mục.

## 3. Event Form Modal (Tạo & Chỉnh sửa)
- Xây dựng component `EventFormModal.vue` sử dụng CSS thuần.
- Hiển thị mượt mà với animation.
- Hỗ trợ thêm/xóa linh hoạt (dynamic add/remove) cho danh sách `performers` (Nghệ sĩ).
- Các trường nhập liệu được thiết kế chỉn chu, cho phép nhập min/max price, địa điểm chi tiết, và URL hình ảnh.
- Dữ liệu được lưu ngay lập tức vào state tập trung của Vue (`reactive()`).

## 4. UI Synchronization (Đồng bộ Giao diện Client)
> [!IMPORTANT]
> Giao diện dành cho người dùng cuối đã được cập nhật để đọc dữ liệu từ Schema mới mà không làm vỡ layout.

- **EventCard.vue:** Đã cập nhật để hiển thị `priceRange`, tên nghệ sĩ chính (từ mảng `performers[0]`), và hiển thị badge "Hết Vé" hoặc "Đã Kết Thúc" dựa trên thuộc tính `status`. Nút "Mua vé" cũng tự động khóa lại (disabled) nếu sự kiện không ở trạng thái "upcoming".
- **HomePage & CategoryPage:** Gọi dữ liệu thông qua `getEvents()` của store, tự động tạo Hero banner dựa trên top các sự kiện nổi bật (featured).
- **EventDetailPage:** Gọi thông tin từ Store và hiển thị mô tả cũng như giá vé chuẩn xác theo hệ thống mới.

Bạn hãy thử khởi động server và vào `http://localhost:<port>/admin` để trải nghiệm trực tiếp giao diện và các tính năng thêm/sửa/xóa sự kiện nhé!
