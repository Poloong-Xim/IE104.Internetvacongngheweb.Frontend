import React from 'react';
import { AppScreen } from '../types';

interface PricingCatalogViewProps {
  onNavigate: (screen: AppScreen) => void;
}

export const PricingCatalogView: React.FC<PricingCatalogViewProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#f8f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold font-['Space_Grotesk']">
            MINH BẠCH GIÁ 100% • CHUẨN NIÊM YẾT TOÀN QUỐC
          </div>
          <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-[#0b1c30]">
            Bảng Giá Dịch Vụ Cứu Hộ &amp; Sửa Xe Lưu Động 24/7
          </h1>
          <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#5b403d] leading-relaxed">
            Áp dụng thống nhất cho tất cả Gara đối tác và Kỹ thuật viên liên kết trên toàn quốc. Hoàn tiền 200% nếu phát hiện thợ thu chênh lệch giá niêm yết.
          </p>
        </div>

        {/* Pricing Formula Card */}
        <div className="bg-gradient-to-r from-[#eff4ff] via-white to-[#eff4ff] p-6 rounded-3xl border border-[#dae2fd] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-['Space_Grotesk'] font-bold text-[#af101a] uppercase">
              Công thức thanh toán tiêu chuẩn:
            </span>
            <div className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#0b1c30]">
              Tổng Chi Phí = [Gói Xử Lý Sự Cố] + [Phí Km Di Chuyển] + [Phụ Phí Ca Đêm]
            </div>
            <p className="text-xs font-['Plus_Jakarta_Sans'] text-[#5b403d]">
              * Miễn phí 3 km di chuyển đầu tiên cho mọi cuốc cứu hộ trong bán kính trạm trực ban.
            </p>
          </div>
          <button
            onClick={() => onNavigate('booking')}
            className="px-6 py-3 rounded-2xl bg-[#d32f2f] hover:bg-[#af101a] text-white font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider shrink-0 transition-colors shadow-sm cursor-pointer"
          >
            Đặt Cứu Hộ Ngay
          </button>
        </div>

        {/* 1. Bảng giá gói sự cố tại chỗ */}
        <div className="bg-white rounded-3xl border border-[#dae2fd] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#af101a] flex items-center justify-center font-bold font-['Space_Grotesk']">
              1
            </div>
            <div>
              <h2 className="font-['Space_Grotesk'] text-lg font-bold text-[#0b1c30]">
                Gói Dịch Vụ Cứu Hộ Tại Chỗ (Xe Con, SUV, Bán Tải)
              </h2>
              <p className="text-xs font-['Plus_Jakarta_Sans'] text-[#5b403d]">
                Bao gồm kiểm tra tình trạng ban đầu, công cụ chuyên dụng và biên bản nghiệm thu
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-['Plus_Jakarta_Sans'] text-left">
              <thead className="border-b border-[#dae2fd] text-[#5b403d] font-['Space_Grotesk'] font-bold">
                <tr>
                  <th className="pb-3 w-1/3">Dịch Vụ Cứu Hộ</th>
                  <th className="pb-3 w-1/3">Mô Tả Quy Chuẩn Kỹ Thuật</th>
                  <th className="pb-3 text-right">Đơn Giá Niêm Yết</th>
                  <th className="pb-3 text-center">Bảo Hành</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eff4ff]">
                <tr>
                  <td className="py-4">
                    <strong className="text-[#0b1c30] block text-sm">Kích Bình Ắc Quy 12V</strong>
                    <span className="text-[#5b403d] text-[11px]">Xe 4-7 chỗ, Sedan, CUV, SUV</span>
                  </td>
                  <td className="py-4 text-[#5b403d]">
                    Kích nổ bằng bộ nguồn Booster cao cấp, đo kiểm tra điện áp sạc máy phát Dynamo.
                  </td>
                  <td className="py-4 text-right font-['Space_Grotesk'] text-sm font-bold text-[#af101a]">
                    200.000 đ
                  </td>
                  <td className="py-4 text-center text-emerald-700 font-semibold">Tận nơi</td>
                </tr>

                <tr>
                  <td className="py-4">
                    <strong className="text-[#0b1c30] block text-sm">Kích Bình Ắc Quy 24V</strong>
                    <span className="text-[#5b403d] text-[11px]">Xe tải nhẹ, xe thương mại 16 chỗ</span>
                  </td>
                  <td className="py-4 text-[#5b403d]">
                    Trạm cấp nguồn kép 24V chuyên dụng an toàn cho hệ thống điện tử.
                  </td>
                  <td className="py-4 text-right font-['Space_Grotesk'] text-sm font-bold text-[#af101a]">
                    300.000 đ
                  </td>
                  <td className="py-4 text-center text-emerald-700 font-semibold">Tận nơi</td>
                </tr>

                <tr>
                  <td className="py-4">
                    <strong className="text-[#0b1c30] block text-sm">Vá Lốp Lưu Động (Vá Dùi / Nấm)</strong>
                    <span className="text-[#5b403d] text-[11px]">Bơm lốp điện tử &amp; kiểm tra van</span>
                  </td>
                  <td className="py-4 text-[#5b403d]">
                    Vá kín lỗ thủng đinh vít, bơm khí nén cân áp suất 4 bánh chuẩn theo thông số xe.
                  </td>
                  <td className="py-4 text-right font-['Space_Grotesk'] text-sm font-bold text-[#af101a]">
                    150.000 đ / lỗ
                  </td>
                  <td className="py-4 text-center text-emerald-700 font-semibold">30 ngày</td>
                </tr>

                <tr>
                  <td className="py-4">
                    <strong className="text-[#0b1c30] block text-sm">Thay Bánh Lốp Dự Phòng</strong>
                    <span className="text-[#5b403d] text-[11px]">Siết ốc bằng cần cân lực chuẩn Nm</span>
                  </td>
                  <td className="py-4 text-[#5b403d]">
                    Kích gầm thủy lực nâng xe, tháo lốp hỏng, lắp bánh phụ và siết đúng lực an toàn.
                  </td>
                  <td className="py-4 text-right font-['Space_Grotesk'] text-sm font-bold text-[#af101a]">
                    150.000 đ
                  </td>
                  <td className="py-4 text-center text-emerald-700 font-semibold">An toàn 100%</td>
                </tr>

                <tr>
                  <td className="py-4">
                    <strong className="text-[#0b1c30] block text-sm">Chẩn Đoán Động Cơ OBD-II</strong>
                    <span className="text-[#5b403d] text-[11px]">Xe báo đèn Check Engine, chết máy</span>
                  </td>
                  <td className="py-4 text-[#5b403d]">
                    Dùng máy quét chuyên hãng đọc mã lỗi ECU, kiểm tra rò két nước, dầu nhớt máy.
                  </td>
                  <td className="py-4 text-right font-['Space_Grotesk'] text-sm font-bold text-[#af101a]">
                    250.000 đ
                  </td>
                  <td className="py-4 text-center text-emerald-700 font-semibold">Xuất báo cáo</td>
                </tr>

                <tr>
                  <td className="py-4">
                    <strong className="text-[#0b1c30] block text-sm">Tiếp Xăng / Dầu Khẩn Cấp</strong>
                    <span className="text-[#5b403d] text-[11px]">Can 5 lít xăng Ron 95-V hoặc DO 0.05S</span>
                  </td>
                  <td className="py-4 text-[#5b403d]">
                    Tiếp nhiên liệu tận nơi bằng can tiêu chuẩn chống cháy nổ để xe di chuyển tới trạm.
                  </td>
                  <td className="py-4 text-right font-['Space_Grotesk'] text-sm font-bold text-[#af101a]">
                    120.000 đ + tiền nhiên liệu
                  </td>
                  <td className="py-4 text-center text-emerald-700 font-semibold">Cây xăng PVOil</td>
                </tr>

                <tr>
                  <td className="py-4">
                    <strong className="text-[#0b1c30] block text-sm">Cẩu Kéo Xe Sàn Trượt (Mở Sàn)</strong>
                    <span className="text-[#5b403d] text-[11px]">Xe tai nạn, kẹt số tự động, bó phanh</span>
                  </td>
                  <td className="py-4 text-[#5b403d]">
                    Xe cứu hộ cẩu sàn phẳng hạ chạm đất, tời cáp an toàn không làm trầy xước gầm.
                  </td>
                  <td className="py-4 text-right font-['Space_Grotesk'] text-sm font-bold text-[#af101a]">
                    600.000 đ (Đã gồm 5km đầu)
                  </td>
                  <td className="py-4 text-center text-emerald-700 font-semibold">BH vận chuyển</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Phụ phí & Quy tắc tính km */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-[#dae2fd] p-6 shadow-sm space-y-4">
            <h3 className="font-['Space_Grotesk'] text-base font-bold text-[#0b1c30] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#af101a]">route</span>
              Biểu Phí Di Chuyển Theo Km
            </h3>
            <ul className="space-y-2.5 text-xs font-['Plus_Jakarta_Sans'] text-[#5b403d]">
              <li className="flex justify-between py-1 border-b border-[#eff4ff]">
                <span>Từ 0 đến 3 km đầu tiên:</span>
                <strong className="text-emerald-700">MIỄN PHÍ</strong>
              </li>
              <li className="flex justify-between py-1 border-b border-[#eff4ff]">
                <span>Từ km thứ 4 trở đi (xe máy phản ứng nhanh):</span>
                <strong className="text-[#0b1c30]">8.000 đ / km</strong>
              </li>
              <li className="flex justify-between py-1 border-b border-[#eff4ff]">
                <span>Từ km thứ 4 trở đi (bán tải cứu hộ chuyên dụng):</span>
                <strong className="text-[#0b1c30]">10.000 đ / km</strong>
              </li>
              <li className="flex justify-between py-1 border-b border-[#eff4ff]">
                <span>Xe kéo sàn trượt từ km thứ 6:</span>
                <strong className="text-[#0b1c30]">20.000 đ / km</strong>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl border border-[#dae2fd] p-6 shadow-sm space-y-4">
            <h3 className="font-['Space_Grotesk'] text-base font-bold text-[#0b1c30] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#af101a]">bedtime</span>
              Phụ Phí Ca Đêm &amp; Điều Kiện Đặc Thù
            </h3>
            <ul className="space-y-2.5 text-xs font-['Plus_Jakarta_Sans'] text-[#5b403d]">
              <li className="flex justify-between py-1 border-b border-[#eff4ff]">
                <span>Ban ngày (06:00 - 22:00):</span>
                <strong className="text-emerald-700">0 đ (Giá chuẩn)</strong>
              </li>
              <li className="flex justify-between py-1 border-b border-[#eff4ff]">
                <span>Ca đêm trực chiến (22:00 - 06:00 sáng hôm sau):</span>
                <strong className="text-[#af101a]">+50.000 đ / ca</strong>
              </li>
              <li className="flex justify-between py-1 border-b border-[#eff4ff]">
                <span>Cứu hộ dưới hầm chung cư B2/B3 (trần thấp):</span>
                <strong className="text-[#0b1c30]">+50.000 đ</strong>
              </li>
              <li className="flex justify-between py-1 border-b border-[#eff4ff]">
                <span>Ngày Lễ Tết theo quy định nhà nước:</span>
                <strong className="text-[#0b1c30]">+100.000 đ</strong>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Ắc quy thay mới tham khảo */}
        <div className="bg-white rounded-3xl border border-[#dae2fd] p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#0b1c30]">
                Bảng Giá Ắc Quy Chính Hãng Thay Mới Tận Nơi
              </h2>
              <p className="text-xs font-['Plus_Jakarta_Sans'] text-[#5b403d]">
                Bảo hành 9-12 tháng chính hãng • Thu mua lại bình cũ hỏng từ 150.000 - 300.000 đ
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#dae2fd] text-[#131b2e] text-xs font-bold font-['Space_Grotesk']">
              GS, Varta, AtlasBX, Đồng Nai
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#eff4ff]/60 border border-[#dae2fd] space-y-2">
              <span className="text-xs font-bold text-[#af101a] font-['Space_Grotesk']">Xe hạng A-B (Morning, Vios, City)</span>
              <h3 className="font-['Space_Grotesk'] text-sm font-bold text-[#0b1c30]">GS MF 40B19L (35Ah)</h3>
              <div className="font-['Space_Grotesk'] text-lg font-bold text-[#af101a]">1.150.000 đ</div>
              <p className="text-[11px] text-[#5b403d]">Miễn phí công thay &amp; đo sạc</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#eff4ff]/60 border border-[#dae2fd] space-y-2">
              <span className="text-xs font-bold text-[#af101a] font-['Space_Grotesk']">Xe hạng C-SUV (CX-5, Tucson, Altis)</span>
              <h3 className="font-['Space_Grotesk'] text-sm font-bold text-[#0b1c30]">GS Q85 / 65D23L (65Ah)</h3>
              <div className="font-['Space_Grotesk'] text-lg font-bold text-[#af101a]">1.750.000 đ</div>
              <p className="text-[11px] text-[#5b403d]">Tương thích hệ thống i-Stop</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#eff4ff]/60 border border-[#dae2fd] space-y-2">
              <span className="text-xs font-bold text-[#af101a] font-['Space_Grotesk']">Xe bán tải / SUV 7 chỗ (Ranger, Everest)</span>
              <h3 className="font-['Space_Grotesk'] text-sm font-bold text-[#0b1c30]">Varta Silver Dynamic (75Ah)</h3>
              <div className="font-['Space_Grotesk'] text-lg font-bold text-[#af101a]">2.350.000 đ</div>
              <p className="text-[11px] text-[#5b403d]">Dòng khởi động cực khỏe (CCA 680)</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#eff4ff]/60 border border-[#dae2fd] space-y-2">
              <span className="text-xs font-bold text-[#af101a] font-['Space_Grotesk']">Xe Đức cao cấp (Mercedes, BMW, Audi)</span>
              <h3 className="font-['Space_Grotesk'] text-sm font-bold text-[#0b1c30]">Varta AGM Start-Stop (80Ah)</h3>
              <div className="font-['Space_Grotesk'] text-lg font-bold text-[#af101a]">4.200.000 đ</div>
              <p className="text-[11px] text-[#5b403d]">Cài đặt reset bình bằng máy chẩn đoán</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
