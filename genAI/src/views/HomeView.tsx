import React, { useState } from 'react';
import { GarageInfo, AppScreen } from '../types';
import { APP_ASSETS, NEARBY_GARAGES } from '../data/mockData';

interface HomeViewProps {
  onSelectGarage: (garage: GarageInfo) => void;
  onNavigate: (screen: AppScreen) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectGarage, onNavigate }) => {
  const [currentAddress, setCurrentAddress] = useState('234 Nguyễn Trãi, Thanh Xuân, Hà Nội');
  const [vehicleType, setVehicleType] = useState<'car' | 'truck' | 'motorbike'>('car');
  const [selectedFault, setSelectedFault] = useState<string>('battery');
  const [estimateDistance, setEstimateDistance] = useState<number>(5);
  const [filterType, setFilterType] = useState<'all' | 'nearest' | 'topRated'>('all');
  const [isLocating, setIsLocating] = useState(false);

  // Quick fault categories
  const faultCategories = [
    {
      id: 'tire',
      title: 'Thủng / Nổ Lốp',
      desc: 'Vá nấm, thay bánh dự phòng',
      price: 150000,
      icon: 'tire_repair',
      badge: 'Từ 150k',
    },
    {
      id: 'battery',
      title: 'Kích Bình Ắc Quy',
      desc: 'Xe sập nguồn, không đề được',
      price: 200000,
      icon: 'battery_alert',
      badge: 'Từ 200k',
    },
    {
      id: 'engine',
      title: 'Chết Máy / Động Cơ',
      desc: 'Sôi nước két tản nhiệt, báo check',
      price: 250000,
      icon: 'warning',
      badge: 'Từ 250k',
    },
    {
      id: 'fuel',
      title: 'Hết Xăng Khẩn Cấp',
      desc: 'Tiếp 5L xăng A95 tận nơi',
      price: 120000,
      icon: 'local_gas_station',
      badge: 'Từ 120k',
    },
    {
      id: 'tow',
      title: 'Kéo Xe Cứu Hộ',
      desc: 'Xe kẹt số, tai nạn giao thông',
      price: 600000,
      icon: 'rv_hookup',
      badge: 'Từ 600k',
    },
  ];

  // Calculate pricing simulation
  const selectedCat = faultCategories.find((c) => c.id === selectedFault) || faultCategories[1];
  const travelFee = estimateDistance <= 3 ? 0 : (estimateDistance - 3) * 10000;
  const simulatedTotal = selectedCat.price + travelFee;

  const handleGetCurrentLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          setCurrentAddress(`Tọa độ GPS: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)} (Gần Ngã Tư Sở, Hà Nội)`);
        },
        () => {
          setIsLocating(false);
          setCurrentAddress('234 Nguyễn Trãi, Thanh Xuân, Hà Nội (Đã định vị)');
        }
      );
    } else {
      setTimeout(() => {
        setIsLocating(false);
        setCurrentAddress('234 Nguyễn Trãi, Thanh Xuân, Hà Nội (Đã định vị)');
      }, 600);
    }
  };

  const handleStartBookingWithGarage = (garage: GarageInfo) => {
    onSelectGarage(garage);
    onNavigate('booking');
  };

  const filteredGarages = NEARBY_GARAGES.filter((g) => {
    if (filterType === 'nearest') return g.distanceKm < 2.0;
    if (filterType === 'topRated') return g.rating >= 4.9;
    return true;
  });

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Top Live Dispatch Ticker */}
      <div className="bg-[#eff4ff] border-y border-[#dae2fd]/60 py-2.5 px-4 mb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-6 text-xs font-['Space_Grotesk'] text-[#0b1c30]">
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#af101a] animate-ping" />
            <span className="font-bold text-[#af101a]">Đang trực chiến 142 đội xe</span>
          </div>
          <div className="flex items-center gap-2 shrink-0 text-[#5b403d]">
            <span className="material-symbols-outlined text-sm text-[#0b1c30]">satellite_alt</span>
            <span>Cập nhật định vị GPS mỗi 3s</span>
          </div>
          <div className="flex items-center gap-2 shrink-0 text-[#5b403d]">
            <span className="material-symbols-outlined text-sm text-[#0b1c30]">verified_user</span>
            <span>Kỹ thuật viên 100% có chứng chỉ nghề</span>
          </div>
          <div className="flex items-center gap-2 shrink-0 text-[#5b403d]">
            <span className="material-symbols-outlined text-sm text-[#0b1c30]">price_check</span>
            <span>Cam kết không chặt chém, báo giá chuẩn trước khi đi</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        {/* Hero Section */}
        <section className="relative rounded-3xl bg-gradient-to-br from-[#eff4ff] via-[#ffffff] to-[#eff4ff] p-6 sm:p-10 lg:p-12 border border-[#dae2fd]/80 shadow-[0_4px_24px_rgba(11,28,48,0.04)] overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold font-['Space_Grotesk']">
              <span className="material-symbols-outlined text-sm">fmd_good</span>
              ĐIỀU PHỐI CỨU HỘ TOÀN QUỐC
            </div>
            <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0b1c30] tracking-tight leading-[1.15]">
              Cứu Hộ &amp; Sửa Xe Lưu Động <span className="text-[#af101a]">24/7 Tại Chỗ</span>
            </h1>
            <p className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-[#5b403d] leading-relaxed">
              Mạng lưới đội xe phản ứng nhanh và trạm cơ động có mặt trong 15-30 phút. Báo giá tự động, minh bạch chuẩn niêm yết theo km và gói lỗi.
            </p>

            {/* Vehicle Selection Chips */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => setVehicleType('car')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-['Space_Grotesk'] transition-all cursor-pointer ${
                  vehicleType === 'car'
                    ? 'bg-[#0b1c30] text-white shadow-sm'
                    : 'bg-white text-[#5b403d] border border-[#dae2fd] hover:bg-[#eff4ff]'
                }`}
              >
                <span className="material-symbols-outlined text-base">directions_car</span>
                Ô tô con / SUV / 7 chỗ
              </button>
              <button
                onClick={() => setVehicleType('truck')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-['Space_Grotesk'] transition-all cursor-pointer ${
                  vehicleType === 'truck'
                    ? 'bg-[#0b1c30] text-white shadow-sm'
                    : 'bg-white text-[#5b403d] border border-[#dae2fd] hover:bg-[#eff4ff]'
                }`}
              >
                <span className="material-symbols-outlined text-base">local_shipping</span>
                Xe tải nhẹ / Bán tải
              </button>
              <button
                onClick={() => setVehicleType('motorbike')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-['Space_Grotesk'] transition-all cursor-pointer ${
                  vehicleType === 'motorbike'
                    ? 'bg-[#0b1c30] text-white shadow-sm'
                    : 'bg-white text-[#5b403d] border border-[#dae2fd] hover:bg-[#eff4ff]'
                }`}
              >
                <span className="material-symbols-outlined text-base">two_wheeler</span>
                Xe máy / Xe tay ga
              </button>
            </div>

            {/* Location Input Box */}
            <div className="pt-2">
              <div className="bg-white p-2.5 rounded-2xl border border-[#dae2fd] shadow-sm flex flex-col sm:flex-row items-center gap-2">
                <div className="flex items-center gap-2 flex-1 w-full px-3 py-1.5">
                  <span className="material-symbols-outlined text-[#af101a] text-xl">location_on</span>
                  <input
                    type="text"
                    value={currentAddress}
                    onChange={(e) => setCurrentAddress(e.target.value)}
                    placeholder="Nhập địa chỉ hoặc vị trí xe gặp sự cố..."
                    className="w-full text-sm font-['Plus_Jakarta_Sans'] font-medium text-[#0b1c30] bg-transparent focus:outline-none placeholder-[#5b403d]/60"
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleGetCurrentLocation}
                    disabled={isLocating}
                    className="px-3.5 py-2.5 rounded-xl bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dae2fd] text-xs font-bold font-['Space_Grotesk'] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    <span className={`material-symbols-outlined text-base ${isLocating ? 'animate-spin' : ''}`}>
                      my_location
                    </span>
                    <span>{isLocating ? 'Đang định vị...' : 'Vị trí hiện tại'}</span>
                  </button>
                  <button
                    onClick={() => handleStartBookingWithGarage(NEARBY_GARAGES[0])}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#d32f2f] hover:bg-[#af101a] text-white text-xs font-bold font-['Space_Grotesk'] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
                  >
                    <span>Tìm cứu hộ ngay</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Quick Hotspots */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs font-['Plus_Jakarta_Sans'] text-[#5b403d]">
                <span className="font-semibold text-[#0b1c30]">Điểm nóng thường trực:</span>
                {['Ngã Tư Sở', 'Cầu Vĩnh Tuy', 'Đại Lộ Thăng Long', 'Hầm Kim Liên', 'Cầu Nhật Tân'].map((spot) => (
                  <button
                    key={spot}
                    onClick={() => setCurrentAddress(`${spot}, Hà Nội`)}
                    className="px-2.5 py-1 rounded-md bg-white border border-[#dae2fd]/70 hover:border-[#af101a] hover:text-[#af101a] text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    {spot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5 Quick Fault Categories */}
        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#0b1c30]">
                Danh Mục Sự Cố Cứu Hộ Phổ Biến
              </h2>
              <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#5b403d]">
                Chọn đúng tình trạng để hệ thống điều xe chuyên dụng và thiết bị phù hợp nhất
              </p>
            </div>
            <button
              onClick={() => onNavigate('pricing')}
              className="text-xs font-bold font-['Space_Grotesk'] text-[#af101a] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Xem bảng giá chi tiết
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {faultCategories.map((item) => {
              const isSelected = selectedFault === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedFault(item.id)}
                  className={`p-4 rounded-2xl transition-all cursor-pointer border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#ffffff] border-[#af101a] shadow-md ring-2 ring-[#af101a]/15 -translate-y-1'
                      : 'bg-white border-[#dae2fd] hover:border-[#af101a]/40 hover:bg-[#eff4ff]/30'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-[#ffdad6] text-[#af101a]' : 'bg-[#eff4ff] text-[#0b1c30]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-xl">{item.icon}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#0b1c30] font-['Space_Grotesk'] text-[11px] font-bold">
                        {item.badge}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-['Space_Grotesk'] text-sm font-bold text-[#0b1c30]">
                        {item.title}
                      </h3>
                      <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5b403d] mt-1 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[#eff4ff] flex items-center justify-between">
                    <span className="font-['Space_Grotesk'] text-xs font-bold text-[#af101a]">
                      {item.price.toLocaleString('vi-VN')} đ
                    </span>
                    <span className="material-symbols-outlined text-base text-[#af101a]">
                      {isSelected ? 'check_circle' : 'add_circle'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Transparent Pricing Calculator Simulator */}
        <section className="bg-gradient-to-br from-[#ffffff] to-[#eff4ff] p-6 sm:p-8 rounded-3xl border border-[#dae2fd] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dae2fd] text-[#131b2e] font-['Space_Grotesk'] text-xs font-bold">
                <span className="material-symbols-outlined text-sm">calculate</span>
                CÔNG THỨC MINH BẠCH GIÁ 100%
              </div>
              <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#0b1c30]">
                Ước Tính Chi Phí Trước Khi Gọi Thợ
              </h2>
              <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#5b403d] leading-relaxed">
                Chi phí bao gồm <strong className="text-[#0b1c30]">[Giá gói lỗi chuẩn niêm yết]</strong> cộng{' '}
                <strong className="text-[#0b1c30]">[Phí km di chuyển]</strong>. Miễn phí 3 km đầu tiên cho tất cả
                gara đối tác liên kết.
              </p>

              {/* Distance Slider */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs font-['Space_Grotesk'] font-bold text-[#0b1c30]">
                  <span>Khoảng cách từ trạm gần nhất:</span>
                  <span className="text-base text-[#af101a]">{estimateDistance} km</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={estimateDistance}
                  onChange={(e) => setEstimateDistance(Number(e.target.value))}
                  className="w-full h-2 bg-[#dae2fd] rounded-lg appearance-none cursor-pointer accent-[#af101a]"
                />
                <div className="flex justify-between text-[11px] text-[#5b403d] font-['Plus_Jakarta_Sans']">
                  <span>1 km (Gần nhất)</span>
                  <span>Miễn phí 3km đầu</span>
                  <span>25 km (Ngoại thành)</span>
                </div>
              </div>
            </div>

            {/* Ledger breakdown card */}
            <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-sm space-y-3">
              <h3 className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#5b403d]">
                Bảng phân tích chi phí dự kiến
              </h3>

              <div className="space-y-2 text-xs font-['Plus_Jakarta_Sans']">
                <div className="flex justify-between py-1 border-b border-[#eff4ff]">
                  <span className="text-[#5b403d]">{selectedCat.title}</span>
                  <span className="font-bold text-[#0b1c30]">
                    {selectedCat.price.toLocaleString('vi-VN')} đ
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#eff4ff]">
                  <span className="text-[#5b403d]">
                    Phí di chuyển ({estimateDistance} km, miễn phí 3km đầu)
                  </span>
                  <span className="font-bold text-[#0b1c30]">
                    {travelFee === 0 ? '0 đ (Miễn phí)' : `${travelFee.toLocaleString('vi-VN')} đ`}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#eff4ff]">
                  <span className="text-[#5b403d]">Phí trực đêm / Giờ cao điểm</span>
                  <span className="font-bold text-emerald-600">0 đ (Áp dụng ban ngày)</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-['Plus_Jakarta_Sans'] text-[#5b403d]">Tổng ước tính trọn gói</span>
                  <div className="font-['Space_Grotesk'] text-2xl font-extrabold text-[#af101a]">
                    {simulatedTotal.toLocaleString('vi-VN')} đ
                  </div>
                </div>
                <button
                  onClick={() => handleStartBookingWithGarage(NEARBY_GARAGES[0])}
                  className="px-4 py-2.5 rounded-xl bg-[#d32f2f] hover:bg-[#af101a] text-white font-['Space_Grotesk'] text-xs font-bold tracking-wide uppercase transition-colors shadow-sm cursor-pointer"
                >
                  Đặt gói này ngay
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Garages & Radar Map Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#0b1c30]">
                Các Trạm Cứu Hộ Đang Trực Chiến Quanh Bạn
              </h2>
              <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#5b403d]">
                Bán kính 5km - Đội xe trang bị đầy đủ kích bình, máy nén khí, xe sàn trượt
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 bg-[#eff4ff] p-1 rounded-xl">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-['Space_Grotesk'] font-bold transition-all cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-white text-[#0b1c30] shadow-sm'
                    : 'text-[#5b403d] hover:text-[#0b1c30]'
                }`}
              >
                Tất cả (3)
              </button>
              <button
                onClick={() => setFilterType('nearest')}
                className={`px-3 py-1.5 rounded-lg text-xs font-['Space_Grotesk'] font-bold transition-all cursor-pointer ${
                  filterType === 'nearest'
                    ? 'bg-white text-[#0b1c30] shadow-sm'
                    : 'text-[#5b403d] hover:text-[#0b1c30]'
                }`}
              >
                Gần nhất (&lt;2km)
              </button>
              <button
                onClick={() => setFilterType('topRated')}
                className={`px-3 py-1.5 rounded-lg text-xs font-['Space_Grotesk'] font-bold transition-all cursor-pointer ${
                  filterType === 'topRated'
                    ? 'bg-white text-[#0b1c30] shadow-sm'
                    : 'text-[#5b403d] hover:text-[#0b1c30]'
                }`}
              >
                Đánh giá cao 4.9★
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Providers List (Left) */}
            <div className="lg:col-span-7 space-y-4">
              {filteredGarages.map((garage) => (
                <div
                  key={garage.id}
                  className="bg-white rounded-2xl p-5 border border-[#dae2fd] shadow-sm hover:border-[#af101a]/50 hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        alt={garage.name}
                        className="w-16 h-16 rounded-xl object-cover ring-1 ring-slate-100 shrink-0"
                        src={garage.imageUrl}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-['Space_Grotesk'] text-base font-bold text-[#0b1c30]">
                            {garage.name}
                          </h3>
                          {garage.verified && (
                            <span className="material-symbols-outlined text-[#af101a] text-sm" title="Đối tác xác minh chuẩn CarFix">
                              verified
                            </span>
                          )}
                        </div>
                        <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5b403d] mt-0.5 line-clamp-1">
                          {garage.address}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-xs font-['Space_Grotesk']">
                          <span className="flex items-center gap-1 text-amber-600 font-bold">
                            <span className="material-symbols-outlined text-sm leading-none text-amber-500">star</span>
                            {garage.rating}
                          </span>
                          <span className="text-[#5b403d]">({garage.reviewCount} đánh giá)</span>
                          <span className="text-[#5b403d]">•</span>
                          <span className="text-[#af101a] font-bold">{garage.distanceKm} km</span>
                          <span className="text-[#5b403d]">•</span>
                          <span className="text-emerald-700 font-semibold">~{garage.estimatedMinutes} phút tới nơi</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartBookingWithGarage(garage)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#d32f2f] hover:bg-[#af101a] text-white text-xs font-bold font-['Space_Grotesk'] tracking-wider uppercase transition-colors shrink-0 shadow-sm cursor-pointer"
                    >
                      Xem chi tiết &amp; Đặt thợ
                    </button>
                  </div>

                  {/* Feature tags */}
                  <div className="pt-2 border-t border-[#eff4ff] flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {garage.features.map((f, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#0b1c30] text-[11px] font-['Plus_Jakarta_Sans']"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold font-['Space_Grotesk']">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>{garage.mechanicsAvailable} thợ đang sẵn sàng</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Radar Map HUD (Right) */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-[#dae2fd] overflow-hidden shadow-sm sticky top-24">
              <div className="p-4 bg-[#eff4ff] border-b border-[#dae2fd] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#af101a] animate-ping" />
                  <span className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#0b1c30]">
                    Radar Trực Ban SOS (Bán Kính 5KM)
                  </span>
                </div>
                <span className="text-[11px] font-['Space_Grotesk'] text-[#5b403d]">
                  Tần số: 104.5 MHz
                </span>
              </div>

              {/* Map Canvas Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img
                  alt="Radar Map"
                  className="w-full h-full object-cover opacity-85"
                  src={APP_ASSETS.mapRadar}
                />
                {/* Radar sweep overlay */}
                <div className="absolute inset-0 bg-radial from-transparent via-[#af101a]/5 to-transparent pointer-events-none" />

                {/* Simulated Pins */}
                <div className="absolute top-[38%] left-[45%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-[#d32f2f] text-white flex items-center justify-center shadow-lg ring-4 ring-white animate-bounce">
                      <span className="material-symbols-outlined text-sm">home_pin</span>
                    </div>
                    <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0b1c30] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      Xe bạn (234 Nguyễn Trãi)
                    </span>
                  </div>
                </div>

                <div className="absolute top-[28%] left-[65%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                  <div className="relative">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow ring-2 ring-white">
                      <span className="material-symbols-outlined text-xs">local_shipping</span>
                    </div>
                    <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-[#0b1c30] text-[10px] font-bold px-2 py-0.5 rounded shadow border border-slate-200">
                      Gara Thần Tốc (1.8km)
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-[25%] left-[30%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                  <div className="relative">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow ring-2 ring-white">
                      <span className="material-symbols-outlined text-xs">two_wheeler</span>
                    </div>
                    <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-[#0b1c30] text-[10px] font-bold px-2 py-0.5 rounded shadow border border-slate-200">
                      Anh Tuấn 24/7 (2.4km)
                    </span>
                  </div>
                </div>
              </div>

              {/* Map Footer stats */}
              <div className="p-4 bg-white text-xs font-['Plus_Jakarta_Sans'] text-[#5b403d] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#af101a]">shield</span>
                  <span>100% thợ có lý lịch xác minh</span>
                </div>
                <button
                  onClick={() => onNavigate('booking')}
                  className="font-bold text-[#af101a] font-['Space_Grotesk'] hover:underline cursor-pointer"
                >
                  Điều xe ngay &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Commitments Banner */}
        <section className="bg-[#0b1c30] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#af101a] text-white text-xs font-bold font-['Space_Grotesk']">
              CHỨNG NHẬN CARFIX SHIELD
            </div>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-extrabold tracking-tight">
              3 Cam Kết Vàng Giúp Bạn An Tâm Tuyệt Đối Khi Gặp Sự Cố
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#ffdad6]">
                  <span className="material-symbols-outlined text-xl">speed</span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-base font-bold">15-30 Phút Có Mặt</h3>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-white/70 leading-relaxed">
                  Hệ thống phân bổ tự động đến thợ cơ động đang ở gần bạn nhất, di chuyển bằng bán tải và xe máy linh hoạt.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#ffdad6]">
                  <span className="material-symbols-outlined text-xl">receipt_long</span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-base font-bold">Minh Bạch Giá 100%</h3>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-white/70 leading-relaxed">
                  Bảng giá công khai toàn hệ thống, không tự ý nâng giá trong đêm tối hay ngày lễ tết mưa gió.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#ffdad6]">
                  <span className="material-symbols-outlined text-xl">verified</span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-base font-bold">Bảo Hành 30 Ngày</h3>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-white/70 leading-relaxed">
                  Linh kiện ắc quy, vá lốp bảo hành toàn quốc tại bất kỳ gara đối tác thuộc hệ thống CarFix.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
