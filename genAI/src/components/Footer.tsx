import React from 'react';
import { APP_ASSETS } from '../data/mockData';
import { AppScreen } from '../types';

interface FooterProps {
  onNavigate?: (screen: AppScreen) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#eff4ff] border-t border-[#e4beba]/30 pt-12 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
          {/* Column 1: Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                alt="CarFix Rescue Logo"
                className="h-7 w-auto object-contain"
                src={APP_ASSETS.logo}
              />
              <span className="font-['Space_Grotesk'] text-lg font-bold uppercase text-[#0b1c30] tracking-tight">
                CarFix 24/7
              </span>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5b403d] leading-relaxed">
              Hệ thống điều phối cứu hộ và dịch vụ cơ động ô tô, xe máy tận nơi hàng đầu Việt Nam. Hỗ trợ ngay tức thì trong vòng 15-30 phút.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dae2fd] text-[#131b2e] font-['Space_Grotesk'] text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#af101a] animate-ping"></span>
              Tổng đài túc trực 24/7/365
            </div>
          </div>

          {/* Column 2: Regions */}
          <div className="space-y-3">
            <h3 className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider text-[#0b1c30]">
              Khu Vực Phủ Sóng
            </h3>
            <ul className="space-y-2 font-['Plus_Jakarta_Sans'] text-xs text-[#5b403d]">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d32f2f]" /> Hà Nội (Nội thành &amp; Cao tốc vành đai)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d32f2f]" /> TP. Hồ Chí Minh (Toàn thành &amp; cửa ngõ)
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d32f2f]" /> Đà Nẵng &amp; Miền Trung
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d32f2f]" /> Cần Thơ &amp; Tây Nam Bộ
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d32f2f]" /> Hải Phòng &amp; Duyên hải Đông Bắc
              </li>
            </ul>
          </div>

          {/* Column 3: Commitments */}
          <div className="space-y-3">
            <h3 className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider text-[#0b1c30]">
              Cam Kết Dịch Vụ
            </h3>
            <ul className="space-y-2 font-['Plus_Jakarta_Sans'] text-xs text-[#5b403d]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#af101a]">verified</span>
                Minh bạch giá niêm yết 100%
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#af101a]">timer</span>
                Kỹ thuật viên đến nhanh 15-30 phút
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#af101a]">security</span>
                Bảo hành linh kiện &amp; cứu hộ chính hãng
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#af101a]">receipt_long</span>
                Xuất hóa đơn VAT tức thì
              </li>
            </ul>
          </div>

          {/* Column 4: Links */}
          <div className="space-y-3">
            <h3 className="font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider text-[#0b1c30]">
              Quy Định &amp; Hỗ Trợ
            </h3>
            <div className="flex flex-col space-y-2 font-['Plus_Jakarta_Sans'] text-xs text-[#5b403d]">
              <button
                onClick={() => onNavigate?.('pricing')}
                className="text-left hover:text-[#af101a] transition-colors cursor-pointer"
              >
                Chính sách minh bạch giá
              </button>
              <button
                onClick={() => onNavigate?.('pricing')}
                className="text-left hover:text-[#af101a] transition-colors cursor-pointer"
              >
                Điều khoản sử dụng dịch vụ
              </button>
              <button
                onClick={() => onNavigate?.('mechanic')}
                className="text-left hover:text-[#af101a] transition-colors cursor-pointer"
              >
                Quy chế đối tác Gara &amp; KTV
              </button>
              <a
                href="tel:19006868"
                className="hover:text-[#af101a] transition-colors text-left font-semibold text-[#af101a]"
              >
                Liên hệ trợ giúp khẩn: 1900 6868
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#e4beba]/30 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5b403d]">
            © 2024 CarFix Rescue Platform. Giữ toàn quyền bản quyền công nghệ cứu hộ di động.
          </p>
          <p className="font-['Space_Grotesk'] text-sm text-[#af101a] font-bold">
            Hotline: 1900 6868 (Miễn phí cước cuộc gọi cứu hộ)
          </p>
        </div>
      </div>
    </footer>
  );
};
