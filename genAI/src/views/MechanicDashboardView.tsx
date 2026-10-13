import React, { useState, useEffect } from 'react';
import { APP_ASSETS } from '../data/mockData';
import { AppScreen } from '../types';

interface MechanicDashboardViewProps {
  onNavigate: (screen: AppScreen) => void;
}

export const MechanicDashboardView: React.FC<MechanicDashboardViewProps> = ({ onNavigate }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [dispatchRadius, setDispatchRadius] = useState(8);
  const [countdown, setCountdown] = useState(28);
  const [hasEmergencyJob, setHasEmergencyJob] = useState(true);
  const [acceptedEmergency, setAcceptedEmergency] = useState(false);
  const [activeJobCompleted, setActiveJobCompleted] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [walletBalance, setWalletBalance] = useState(14820000);

  // Animated countdown for incoming job
  useEffect(() => {
    if (!hasEmergencyJob || acceptedEmergency) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Reset countdown for demo simulation
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [hasEmergencyJob, acceptedEmergency]);

  const handleAcceptJob = () => {
    setAcceptedEmergency(true);
    setTimeout(() => {
      alert('ĐÃ TIẾP NHẬN ĐƠN CỨU HỘ!\nHệ thống đã gửi tọa độ GPS và số điện thoại khách hàng cho bạn.');
    }, 100);
  };

  const handleRejectJob = () => {
    setHasEmergencyJob(false);
  };

  const handleCompleteActiveJob = () => {
    setActiveJobCompleted(true);
    setWalletBalance((prev) => prev + 350000);
  };

  const handleConfirmWithdraw = () => {
    setWithdrawSuccess(true);
    setTimeout(() => {
      setWalletBalance(820000);
      setShowWithdrawModal(false);
      setWithdrawSuccess(false);
    }, 1200);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#f8f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
        {/* Partner Garage Header Banner */}
        <div className="bg-white p-6 rounded-3xl border border-[#dae2fd] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                alt="Mechanic Partner"
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#af101a]/30"
                src={APP_ASSETS.mechanicPartner}
              />
              <span
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ring-2 ring-white ${
                  isOnline ? 'bg-emerald-500' : 'bg-slate-400'
                }`}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-['Space_Grotesk'] text-xl font-bold text-[#0b1c30]">
                  Gara Ô Tô Thần Tốc (Trực Ban Cơ Động)
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#0b1c30] text-[11px] font-['Space_Grotesk'] font-bold">
                  KTV: Nguyễn Văn Tuấn (PRO-8821)
                </span>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5b403d] mt-1">
                Trụ sở: 88 Khuất Duy Tiến, Thanh Xuân, Hà Nội • Đội cứu hộ: 4 xe bán tải &amp; mô tô
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Radius slider */}
            <div className="bg-[#eff4ff] px-4 py-2 rounded-2xl border border-[#dae2fd] flex items-center gap-3">
              <div className="text-left">
                <span className="text-[10px] font-['Plus_Jakarta_Sans'] text-[#5b403d] block">
                  Bán kính quét đơn:
                </span>
                <span className="font-['Space_Grotesk'] text-xs font-bold text-[#0b1c30]">
                  {dispatchRadius} km
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="20"
                value={dispatchRadius}
                onChange={(e) => setDispatchRadius(Number(e.target.value))}
                className="w-24 h-1.5 bg-[#dae2fd] rounded-lg appearance-none cursor-pointer accent-[#af101a]"
              />
            </div>

            {/* Online Toggle Switch */}
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-5 py-2.5 rounded-2xl font-['Space_Grotesk'] text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                isOnline
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isOnline ? 'bg-white animate-pulse' : 'bg-slate-500'
                }`}
              />
              <span>{isOnline ? 'ĐANG BẬT TRỰC BAN (ONLINE)' : 'TẠM NGHỈ (OFFLINE)'}</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-[#5b403d]">
              <span className="text-xs font-['Plus_Jakarta_Sans']">Đã hoàn thành hôm nay</span>
              <span className="material-symbols-outlined text-lg text-emerald-600">task_alt</span>
            </div>
            <div className="font-['Space_Grotesk'] text-2xl font-bold text-[#0b1c30]">
              {activeJobCompleted ? 9 : 8} ca
            </div>
            <span className="text-[11px] font-['Plus_Jakarta_Sans'] text-emerald-700 font-medium">
              +2 ca so với ngày hôm qua
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-[#5b403d]">
              <span className="text-xs font-['Plus_Jakarta_Sans']">Doanh thu tạm tính</span>
              <span className="material-symbols-outlined text-lg text-[#af101a]">monetization_on</span>
            </div>
            <div className="font-['Space_Grotesk'] text-2xl font-bold text-[#af101a]">
              {(activeJobCompleted ? 4000000 : 3650000).toLocaleString('vi-VN')} đ
            </div>
            <span className="text-[11px] font-['Plus_Jakarta_Sans'] text-[#5b403d]">
              Đã khấu trừ chiết khấu hệ thống 10%
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-[#5b403d]">
              <span className="text-xs font-['Plus_Jakarta_Sans']">Tỷ lệ nhận nhanh</span>
              <span className="material-symbols-outlined text-lg text-blue-600">bolt</span>
            </div>
            <div className="font-['Space_Grotesk'] text-2xl font-bold text-[#0b1c30]">98.4%</div>
            <span className="text-[11px] font-['Plus_Jakarta_Sans'] text-[#5b403d]">
              Thời gian phản ứng TB: 18 giây
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-[#5b403d]">
              <span className="text-xs font-['Plus_Jakarta_Sans']">Đánh giá dịch vụ</span>
              <span className="material-symbols-outlined text-lg text-amber-500">star</span>
            </div>
            <div className="font-['Space_Grotesk'] text-2xl font-bold text-amber-600">4.95 ★</div>
            <span className="text-[11px] font-['Plus_Jakarta_Sans'] text-[#5b403d]">
              Từ 340 lượt đánh giá khách hàng
            </span>
          </div>
        </div>

        {/* SOS Incoming Emergency Job Alert Banner */}
        {hasEmergencyJob && !acceptedEmergency && (
          <div className="bg-gradient-to-br from-[#ffffff] via-[#fff2f0] to-[#ffdad6]/40 p-6 sm:p-8 rounded-3xl border-2 border-[#af101a] shadow-lg space-y-6 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-[#af101a] animate-ping" />
                <span className="font-['Space_Grotesk'] text-xs font-extrabold uppercase tracking-widest text-[#93000a] bg-[#ffdad6] px-3 py-1 rounded-full">
                  CỨU HỘ KHẨN CẤP PHÁT TÍN HIỆU (CÁCH 1.8 KM)
                </span>
              </div>
              <div className="flex items-center gap-2 font-['Space_Grotesk'] text-xs font-bold text-[#af101a]">
                <span className="material-symbols-outlined text-base">timer</span>
                <span>Tự động chuyển thợ khác sau: <strong>{countdown}s</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Job info */}
              <div className="lg:col-span-8 space-y-4">
                <div>
                  <h2 className="font-['Space_Grotesk'] text-xl font-bold text-[#0b1c30]">
                    Kia Seltos 2021 Premium (1.4L Turbo) • 30F - 928.14
                  </h2>
                  <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5b403d] mt-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-[#af101a]">location_on</span>
                    <strong>188 Nguyễn Tuân, Nhân Chính, Thanh Xuân, Hà Nội</strong> (Cách xưởng 1.8 km)
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#dae2fd] text-xs font-['Plus_Jakarta_Sans'] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#5b403d]">Khách hàng: <strong>Trần Hoàng Nam</strong></span>
                    <span className="text-[#5b403d]">SĐT: <strong>0982 *** 456 (Đã xác minh)</strong></span>
                  </div>
                  <div className="text-[#0b1c30]">
                    <strong>Sự cố:</strong> Bình ắc quy yếu, đề không nổ tại hầm chung cư B6A (cần mang trạm kích bình xách tay hoặc bình thay thế GS 55Ah).
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#eff4ff]">
                    <span className="font-['Space_Grotesk'] font-bold text-[#af101a]">
                      Gói niêm yết: 200.000 đ
                    </span>
                    <span className="text-emerald-700 font-semibold">Thu tiền mặt trực tiếp</span>
                  </div>
                </div>

                {/* Scene Photos Attached */}
                <div className="space-y-2">
                  <span className="text-xs font-['Space_Grotesk'] font-bold text-[#0b1c30]">
                    Ảnh hiện trường do khách hàng chụp:
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="relative w-28 h-20 rounded-xl overflow-hidden border border-[#dae2fd] group cursor-pointer">
                      <img alt="Taplo" className="w-full h-full object-cover" src={APP_ASSETS.jobTaplo} />
                      <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] px-1 rounded">
                        Đèn táp-lô
                      </span>
                    </div>
                    <div className="relative w-28 h-20 rounded-xl overflow-hidden border border-[#dae2fd] group cursor-pointer">
                      <img alt="Battery" className="w-full h-full object-cover" src={APP_ASSETS.jobBattery} />
                      <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] px-1 rounded">
                        Cọc bình
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="lg:col-span-4 flex flex-col gap-3 justify-center h-full pt-4">
                <button
                  onClick={handleAcceptJob}
                  className="w-full py-4 rounded-2xl bg-[#d32f2f] hover:bg-[#af101a] text-white font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  <span>TIẾP NHẬN CỨU HỘ NGAY</span>
                </button>
                <button
                  onClick={handleRejectJob}
                  className="w-full py-3 rounded-2xl bg-white border border-[#dae2fd] text-[#5b403d] hover:text-[#0b1c30] hover:bg-[#eff4ff] font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Bỏ qua cuốc này
                </button>
                <span className="text-[11px] text-center text-[#5b403d] font-['Plus_Jakarta_Sans']">
                  Nhận đơn sẽ điều hướng GPS đến xe khách hàng ngay lập tức
                </span>
              </div>
            </div>
          </div>
        )}

        {acceptedEmergency && (
          <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-3xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-emerald-700 text-3xl">check_circle</span>
              <div>
                <h3 className="font-['Space_Grotesk'] text-base font-bold text-emerald-900">
                  Đã tiếp nhận cuốc cứu hộ #CF-1889!
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-emerald-700">
                  Đang mở điều hướng tới 188 Nguyễn Tuân (Kia Seltos 30F-928.14). Khách hàng đã được thông báo bạn đang tới.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('tracking')}
              className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-['Space_Grotesk'] font-bold cursor-pointer"
            >
              Xem lộ trình di chuyển
            </button>
          </div>
        )}

        {/* Main 2-Column: Active Jobs & Wallet/Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Active & Recent Jobs (Left 8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Active Job in Progress */}
            <div className="bg-white p-6 rounded-2xl border border-[#dae2fd] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                  <h2 className="font-['Space_Grotesk'] text-base font-bold text-[#0b1c30]">
                    Đơn Cứu Hộ Đang Xử Lý Tại Hiện Trường
                  </h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-['Space_Grotesk'] font-bold">
                  {activeJobCompleted ? 'Đã hoàn tất' : 'Đang xử lý'}
                </span>
              </div>

              {!activeJobCompleted ? (
                <div className="p-4 rounded-xl bg-[#eff4ff]/50 border border-[#dae2fd] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-['Space_Grotesk'] text-sm font-bold text-[#0b1c30]">
                        Toyota Camry 2.5Q • 30E - 441.92
                      </h3>
                      <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5b403d]">
                        Vị trí: Chân cầu vượt Ngã Tư Sở, Đống Đa, Hà Nội
                      </p>
                    </div>
                    <span className="font-['Space_Grotesk'] text-base font-bold text-[#af101a]">
                      350.000 đ
                    </span>
                  </div>

                  <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5b403d] leading-relaxed">
                    Sự cố: Thay bánh lốp phụ và cân lực siết ốc 5 tắc-kê. KTV đã đến nơi lúc 08:15.
                  </p>

                  <div className="pt-2 border-t border-[#dae2fd]/60 flex items-center justify-between">
                    <span className="text-[11px] text-[#5b403d] font-['Space_Grotesk']">
                      Khách hàng: Anh Vũ Đình Hải (0903 *** 122)
                    </span>
                    <button
                      onClick={handleCompleteActiveJob}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-['Space_Grotesk'] text-xs font-bold transition-colors cursor-pointer"
                    >
                      Báo Đã Xong &amp; Nghiệm Thu
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-['Plus_Jakarta_Sans']">
                  Đơn Toyota Camry 30E-441.92 đã hoàn tất nghiệm thu và cộng <strong>+350.000 đ</strong> vào ví gara.
                </div>
              )}
            </div>

            {/* Recent Completed Jobs Table */}
            <div className="bg-white p-6 rounded-2xl border border-[#dae2fd] shadow-sm space-y-4">
              <h2 className="font-['Space_Grotesk'] text-base font-bold text-[#0b1c30]">
                Lịch Sử Cứu Hộ Gần Đây
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-['Plus_Jakarta_Sans'] text-left">
                  <thead className="border-b border-[#eff4ff] text-[#5b403d] font-['Space_Grotesk'] font-bold">
                    <tr>
                      <th className="pb-3">Mã đơn</th>
                      <th className="pb-3">Khách &amp; Xe</th>
                      <th className="pb-3">Sự cố</th>
                      <th className="pb-3">Chi phí</th>
                      <th className="pb-3">Đánh giá</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eff4ff]">
                    <tr>
                      <td className="py-3 font-['Space_Grotesk'] font-bold text-[#af101a]">#CF-8841</td>
                      <td className="py-3">Honda CR-V (30A-992.12)</td>
                      <td className="py-3">Kích bình ắc quy</td>
                      <td className="py-3 font-bold">200.000 đ</td>
                      <td className="py-3 text-amber-600 font-bold">5.0 ★</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-['Space_Grotesk'] font-bold text-[#af101a]">#CF-8835</td>
                      <td className="py-3">Hyundai SantaFe (30G-115.42)</td>
                      <td className="py-3">Vá lốp nấm lưu động</td>
                      <td className="py-3 font-bold">150.000 đ</td>
                      <td className="py-3 text-amber-600 font-bold">5.0 ★</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-['Space_Grotesk'] font-bold text-[#af101a]">#CF-8820</td>
                      <td className="py-3">Ford Ranger (29C-554.89)</td>
                      <td className="py-3">Cứu hộ chết máy két nước</td>
                      <td className="py-3 font-bold">450.000 đ</td>
                      <td className="py-3 text-amber-600 font-bold">4.9 ★</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Wallet & Gara Price Editor */}
          <div className="lg:col-span-4 space-y-6">
            {/* Wallet Balance Card */}
            <div className="bg-[#0b1c30] text-white p-6 rounded-2xl shadow-sm space-y-4">
              <span className="text-xs font-['Space_Grotesk'] text-white/70 block uppercase tracking-wider">
                Ví Doanh Thu Gara
              </span>
              <div className="font-['Space_Grotesk'] text-3xl font-extrabold text-[#ffdad6]">
                {walletBalance.toLocaleString('vi-VN')}{' '}
                <span className="text-base font-normal text-white/70">VNĐ</span>
              </div>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-white/70">
                Tài khoản thụ hưởng: MB Bank - Nguyễn Văn Tuấn (STK: 0888686888)
              </p>
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="w-full py-3 rounded-xl bg-[#d32f2f] hover:bg-[#af101a] text-white font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Rút Tiền Về Ngân Hàng
              </button>
            </div>

            {/* Garage Price Catalog Settings */}
            <div className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#eff4ff]">
                <h3 className="font-['Space_Grotesk'] text-xs font-bold text-[#0b1c30] uppercase">
                  Bảng Dịch Vụ Gara Niêm Yết
                </h3>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  Đã duyệt CarFix
                </span>
              </div>

              <div className="space-y-2 text-xs font-['Plus_Jakarta_Sans']">
                <div className="flex justify-between items-center py-1">
                  <span>Kích bình ắc quy 12V/24V</span>
                  <span className="font-bold text-[#0b1c30]">200.000 đ</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>Vá lốp nấm lưu động</span>
                  <span className="font-bold text-[#0b1c30]">150.000 đ</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>Quét mã chẩn đoán OBD-II</span>
                  <span className="font-bold text-[#0b1c30]">50.000 đ</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>Cẩu kéo xe sàn trượt</span>
                  <span className="font-bold text-[#0b1c30]">600.000 đ</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('pricing')}
                className="w-full py-2 rounded-xl bg-[#eff4ff] text-[#0b1c30] font-['Space_Grotesk'] text-xs font-bold hover:bg-[#dae2fd] transition-colors cursor-pointer mt-2"
              >
                Xem quy chuẩn niêm yết toàn quốc
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payout Withdrawal Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 border border-[#dae2fd] shadow-2xl">
            <h2 className="font-['Space_Grotesk'] text-base font-bold text-[#0b1c30]">
              Rút Doanh Thu Về Ngân Hàng
            </h2>
            <div className="bg-[#eff4ff] p-3 rounded-xl text-xs font-['Plus_Jakarta_Sans'] space-y-1">
              <div className="flex justify-between">
                <span className="text-[#5b403d]">Số tiền rút:</span>
                <span className="font-bold text-[#af101a] font-['Space_Grotesk']">14.000.000 VNĐ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5b403d]">Ngân hàng:</span>
                <span className="font-bold text-[#0b1c30]">MB Bank</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5b403d]">Chủ tài khoản:</span>
                <span className="font-bold text-[#0b1c30]">NGUYEN VAN TUAN</span>
              </div>
            </div>

            {withdrawSuccess ? (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-xl text-center">
                Lệnh chuyển khoản thành công qua cổng Napas 247!
              </div>
            ) : (
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#dae2fd] text-xs font-['Space_Grotesk'] font-bold text-[#5b403d]"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmWithdraw}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-['Space_Grotesk'] font-bold"
                >
                  Xác nhận rút
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
