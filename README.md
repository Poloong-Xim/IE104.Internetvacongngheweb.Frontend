# Frontend Design — Nền tảng sửa xe tại chỗ

## 1. Công nghệ
| Dùng | Để làm gì |
| ----- | ----- |
| React + Vite | Viết giao diện |
| React Router | Chuyển trang |
| React Context (có sẵn) | Dữ liệu dùng chung: đăng nhập, vị trí, bộ lọc |
| Axios | Gọi API |
| Leaflet + OpenStreetMap | Bản đồ (miễn phí, không cần key) |
| CSS thuần (`.module.css`) | Giao diện. **Không Tailwind, không thư viện UI** |

## 2. Thư mục
```text

src/
├── api/          gọi API (trang không gọi API trực tiếp)
├── context/      dữ liệu dùng chung
├── hooks/        logic dùng lại (GPS, tự tải lại, chọn ảnh)
├── components/   nút, thẻ, bản đồ, badge...
├── pages/        auth / customer / provider / admin
├── routes/       chặn trang theo quyền
├── constants/    trạng thái đơn, vai trò
├── utils/        định dạng tiền, khoảng cách, thời gian
└── styles/       variables.css (màu, font, khoảng cách)

```

## 3. Danh sách trang
| Vai trò | Trang | Chức năng |
| ------- | ----- | --------- |
| **Chung** | `/login`, `/register` | Đăng nhập; đăng ký (chọn khách hoặc thợ) |
| | `/forgot-password`, `/reset-password` | Quên và đặt lại mật khẩu |
| **Khách** | `/search` | Tìm thợ gần mình |
| | `/providers/:id` | Thông tin thợ, bảng giá, đánh giá |
| | `/providers/:id/book` | Đặt dịch vụ |
| | `/bookings`, `/bookings/:id` | Danh sách đơn; theo dõi, huỷ, đánh giá |
| | `/account` | Sửa thông tin, đăng xuất |
| **Thợ** | `/provider/register` | Nộp hồ sơ |
| | `/provider/application` | Trạng thái hồ sơ (chờ duyệt / bị từ chối) |
| | `/provider` | Bật/tắt nhận đơn, xem đơn mới |
| | `/provider/bookings/:id` | Nhận đơn, cập nhật tiến độ |
| | `/provider/history` | Lịch sử và doanh thu |
| | `/provider/services` | Dịch vụ và giá |
| | `/provider/account` | Xem và sửa hồ sơ thợ, đăng xuất |
| **Admin** | `/admin` | Thống kê |
| | `/admin/providers` | Duyệt / từ chối hồ sơ thợ |
| | `/admin/users` | Khoá / mở khoá tài khoản |
| | `/admin/service-types` | Loại sự cố và giá tham khảo |



## 4. Bố cục
- Khách và thợ (dùng điện thoại): menu dưới đáy màn hình như Grab. Thợ luôn có nút bật/tắt nhận đơn ở trên cùng.
- Admin (dùng máy tính): menu dọc bên trái.
- Đang có đơn thì hiện thanh nhắc trên cùng, ví dụ "Thợ đang đến - Xem đơn".

## 5. Màn hình chính
**Tìm thợ** (/search): màn hình quan trọng nhất.
- Tự lấy GPS; khách không cho phép thì nhập địa chỉ tay hoặc kéo ghim trên bản đồ.
- Lọc theo loại sự cố, bán kính; sắp xếp gần nhất hoặc đánh giá cao.
- Bản đồ ở trên, danh sách thợ ở dưới (tên, sao, khoảng cách, giá ước tính). Bấm ghim thì cuộn tới thợ đó.
Không có thợ thì hiện nút "Mở rộng lên 10km".

## 6. Trạng thái đơn
| Mã | Khách thấy | Thợ thấy | Màu |
| -- | ---------- | -------- | --- |
| `pending` | Chờ thợ xác nhận | Đơn mới | Vàng |
| `accepted` | Thợ đã nhận | Đã nhận | Xanh dương |
| `en_route` | Thợ đang đến | Đang di chuyển | Xanh dương |
| `in_progress` | Đang sửa | Đang sửa | Tím |
| `completed` | Hoàn thành | Hoàn thành | Xanh lá |
| `rejected` | Thợ từ chối | Đã từ chối | Đỏ |
| `cancelled` | Đã huỷ | Đã huỷ | Xám |

**Thông tin thợ** (/providers/:id): tên gara (không có thì hiện tên người), sao, bảng giá, giá ước tính, đánh giá. Nút "Đặt dịch vụ" luôn ở đáy; bị khoá nếu khách ở ngoài bán kính phục vụ.

**Đặt dịch vụ**: loại sự cố*, vị trí*, mô tả*, thông tin xe (gõ tự do), ảnh/video, tóm tắt giá → bấm Xác nhận. Tất cả gửi trong một lần gọi API (POST /bookings).

**Theo dõi đơn**: thanh tiến trình Đã đặt → Thợ đã nhận → Đang đến → Đang sửa → Hoàn thành, tự cập nhật mỗi 10 giây.

- Nút gọi thợ chỉ hiện sau khi thợ nhận đơn.
- Huỷ được khi thợ chưa bắt đầu đi; phải chọn lý do.
- Hoàn thành thì đánh giá 1–5 sao, mỗi đơn chỉ một lần.
- Thợ nộp hồ sơ (4 bước): tên gara (không bắt buộc) → ghim vị trí + bán kính phục vụ → CCCD* và giấy phép kinh doanh → chọn dịch vụ và giá (bỏ trống thì dùng giá chung). Bị từ chối thì hiện lý do và nút "Sửa và nộp lại".

**Thợ nhận đơn**:
Đang bật nhận đơn thì tự kiểm tra đơn mới mỗi 10–15 giây; có đơn thì kêu chuông và hiện thông báo.
Chưa nhận đơn thì chỉ thấy khoảng cách; nhận rồi mới thấy địa chỉ, nút Chỉ đường và nút Gọi khách.
Mỗi bước chỉ có một nút chính: Nhận đơn → Bắt đầu di chuyển → Đã đến – Bắt đầu sửa → Hoàn thành. Từ chối đơn thì phải chọn lý do.

**Hồ sơ thợ** (/provider/account): 3 khối, mỗi khối sửa riêng.

Cá nhân: ảnh, tên, số điện thoại.
Hành nghề: tên gara, vị trí gốc, bán kính; sao chỉ để xem.
Giấy tờ: CCCD, giấy phép. Đổi giấy tờ thì admin phải duyệt lại; trước khi lưu có cảnh báo.

**Admin**:
Duyệt hồ sơ: xem giấy tờ, vị trí; từ chối phải ghi lý do.
Khoá/mở khoá tài khoản (có xác nhận).
Loại sự cố: thêm, sửa; dùng Ẩn/Hiện thay cho xoá.
Thống kê.

## 7. Giá, ảnh và video
- Giá hiện 3 dòng: giá sửa (dạng khoảng, ví dụ 100.000 – 200.000đ) + phí di chuyển = tổng ước tính. Luôn kèm dòng "Giá tham khảo, giá cuối có thể thay đổi tại chỗ".
- Trang đơn hiện giá lúc đặt; sau này đổi giá cũng không ảnh hưởng đơn cũ.
Ảnh ≤ 5MB (tự thu nhỏ trước khi gửi), video ≤ 50MB, tối đa 5 ảnh và 1 video. Có thanh % khi gửi; gửi lỗi thì không mất dữ liệu đã nhập.

## 8. Giao diện và CSS
- `styles/variables.css` khai báo màu, font, khoảng cách. Các file CSS khác dùng lại biến, không gõ thẳng mã màu.
- Mỗi component một file CSS đặt cạnh nó: Button.jsx + Button.module.css.
- Viết cho điện thoại trước, sau đó dùng @media (min-width: 768px) cho máy tính.
- Màu chính cam `#F26B1D`, màu phụ xanh đậm `#1E3A5F`. 
- Font Be Vietnam Pro, chữ 16px, nút cao ít nhất 44px.
- Trạng thái luôn có chữ và icon, không chỉ dùng màu.
- Mọi trang có đủ 4 trạng thái: đang tải / không có dữ liệu / lỗi (có nút Thử lại) / có dữ liệu.


## 9. Làm việc nhóm
```text
xim / phamvu ──PR──► staging ──PR──► main
```
- Mỗi người làm trên nhánh của mình, xong thì mở PR vào staging. Người kia xem rồi mới merge.
Test chung trên staging, ổn rồi mới mở PR vào main. Không ai push thẳng vào main.
Trước khi làm tiếp, kéo staging mới nhất về nhánh mình.
Thứ tự làm: nền tảng + CSS chung (làm trước, merge sớm) → khách → thợ → admin → kiểm tra trên điện thoại.
- Làm sau MVP: chat, thông báo tức thì (WebSocket), theo dõi thợ trên bản đồ, chế độ tối, khiếu nại, thanh toán online.