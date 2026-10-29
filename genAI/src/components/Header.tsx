import React from 'react';
import { AppScreen } from '../types';
import { APP_ASSETS } from '../data/mockData';

interface HeaderProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  activeOrderCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate, activeOrderCount = 1 }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#ffffff]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#af101a]/20">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-6 lg:gap-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 shrink-0 focus:outline-none text-left cursor-pointer group"
          >
            <img
              alt="CarFix Rescue Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src={APP_ASSETS.logo}
            />
            <span className="font-['Space_Grotesk'] text-lg font-bold uppercase tracking-tight text-[#0b1c30] flex items-center gap-1.5">
              CarFix
              <span className="w-2 h-2 rounded-full bg-[#d32f2f] animate-pulse inline-block" />
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1.5">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3.5 py-2 rounded-lg font-['Space_Grotesk'] text-sm font-semibold transition-all cursor-pointer ${
                currentScreen === 'home'
                  ? 'bg-[#d32f2f] text-white shadow-sm'
                  : 'text-[#5b403d] hover:text-[#0b1c30] hover:bg-[#eff4ff]'
              }`}
            >
              Tìm cứu hộ
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className={`px-3.5 py-2 rounded-lg font-['Space_Grotesk'] text-sm font-semibold transition-all cursor-pointer ${
                currentScreen === 'pricing'
                  ? 'bg-[#d32f2f] text-white shadow-sm'
                  : 'text-[#5b403d] hover:text-[#0b1c30] hover:bg-[#eff4ff]'
              }`}
            >
              Bảng giá tiêu chuẩn
            </button>
            <button
              onClick={() => onNavigate('tracking')}
              className={`relative px-3.5 py-2 rounded-lg font-['Space_Grotesk'] text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                currentScreen === 'tracking'
                  ? 'bg-[#d32f2f] text-white shadow-sm'
                  : 'text-[#5b403d] hover:text-[#0b1c30] hover:bg-[#eff4ff]'
              }`}
            >
              <span>Đơn của tôi</span>
              {activeOrderCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#af101a] inline-block animate-ping" />
              )}
            </button>
            <button
              onClick={() => onNavigate('mechanic')}
              className={`px-3.5 py-2 rounded-lg font-['Space_Grotesk'] text-sm font-semibold transition-all cursor-pointer ${
                currentScreen === 'mechanic'
                  ? 'bg-[#d32f2f] text-white shadow-sm'
                  : 'text-[#5b403d] hover:text-[#0b1c30] hover:bg-[#eff4ff]'
              }`}
            >
              Dành cho Gara / Thợ
            </button>
          </nav>
        </div>

        {/* Right CTA & Account */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Emergency Hotline Button */}
          <a
            className="hidden sm:inline-flex items-center gap-2 bg-[#d32f2f] text-white px-4 py-2 rounded-full font-['Space_Grotesk'] text-sm font-bold shadow-sm hover:bg-[#af101a] transition-colors"
            href="tel:19006868"
          >
            <span className="material-symbols-outlined text-base leading-none text-white">emergency</span>
            <span>Cứu hộ khẩn cấp: 1900 6868</span>
          </a>

          {/* Notification Button */}
          <div className="relative flex items-center">
            <button
              aria-label="Thông báo"
              onClick={() => onNavigate('tracking')}
              className="p-2 rounded-full text-[#5b403d] hover:bg-[#eff4ff] hover:text-[#0b1c30] transition-colors focus:outline-none cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-2xl">notifications</span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#af101a] rounded-full ring-2 ring-white"></span>
            </button>
          </div>

          {/* User Profile */}
          <div
            onClick={() => onNavigate(currentScreen === 'mechanic' ? 'home' : 'mechanic')}
            className="flex items-center gap-3 pl-2 border-l border-[#e4beba]/40 cursor-pointer group"
            title="Nhấn để đổi vai trò Tài xế / Thợ"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#af101a]/20 group-hover:ring-[#af101a] transition-all"
              src={APP_ASSETS.userAvatar}
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="font-['Space_Grotesk'] text-xs font-semibold text-[#0b1c30] leading-tight">
                Nguyễn Văn Tuấn
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#5b403d] leading-tight">
                {currentScreen === 'mechanic' ? 'Kỹ thuật viên KTV' : 'Tài xế / Thành viên'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="xl:hidden flex items-center justify-around border-t border-[#eff4ff] bg-white py-2 px-2">
        <button
          onClick={() => onNavigate('home')}
          className={`flex-1 py-1.5 text-center text-xs font-semibold font-['Space_Grotesk'] rounded ${
            currentScreen === 'home' ? 'text-[#d32f2f] bg-[#fff2f0]' : 'text-[#5b403d]'
          }`}
        >
          Tìm cứu hộ
        </button>
        <button
          onClick={() => onNavigate('booking')}
          className={`flex-1 py-1.5 text-center text-xs font-semibold font-['Space_Grotesk'] rounded ${
            currentScreen === 'booking' ? 'text-[#d32f2f] bg-[#fff2f0]' : 'text-[#5b403d]'
          }`}
        >
          Đặt dịch vụ
        </button>
        <button
          onClick={() => onNavigate('tracking')}
          className={`flex-1 py-1.5 text-center text-xs font-semibold font-['Space_Grotesk'] rounded relative ${
            currentScreen === 'tracking' ? 'text-[#d32f2f] bg-[#fff2f0]' : 'text-[#5b403d]'
          }`}
        >
          Đơn của tôi
          <span className="inline-block w-1.5 h-1.5 bg-[#af101a] rounded-full ml-1"></span>
        </button>
        <button
          onClick={() => onNavigate('mechanic')}
          className={`flex-1 py-1.5 text-center text-xs font-semibold font-['Space_Grotesk'] rounded ${
            currentScreen === 'mechanic' ? 'text-[#d32f2f] bg-[#fff2f0]' : 'text-[#5b403d]'
          }`}
        >
          Gara/Thợ
        </button>
        <button
          onClick={() => onNavigate('pricing')}
          className={`flex-1 py-1.5 text-center text-xs font-semibold font-['Space_Grotesk'] rounded ${
            currentScreen === 'pricing' ? 'text-[#d32f2f] bg-[#fff2f0]' : 'text-[#5b403d]'
          }`}
        >
          Bảng giá
        </button>
      </div>
    </header>
  );
};
