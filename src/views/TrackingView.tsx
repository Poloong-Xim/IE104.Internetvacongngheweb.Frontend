import React, { useState, useEffect } from 'react';
import { RescueOrder, ChatMessage, AppScreen } from '../types';
import { APP_ASSETS, INITIAL_CHAT } from '../data/mockData';

interface TrackingViewProps {
  order: RescueOrder;
  onNavigate: (screen: AppScreen) => void;
  onCancelOrder?: () => void;
}

export const TrackingView: React.FC<TrackingViewProps> = ({
  order,
  onNavigate,
  onCancelOrder,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [inputMsg, setInputMsg] = useState('');
  const [eta, setEta] = useState(7);
  const [speed, setSpeed] = useState(34);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [truckOffset, setTruckOffset] = useState(48); // % along route

  // Simulate truck movement and slight ETA / speed changes
  useEffect(() => {
    const timer = setInterval(() => {
      setTruckOffset((prev) => (prev >= 85 ? 45 : prev + 3));
      setSpeed((prev) => Math.min(42, Math.max(28, prev + (Math.random() > 0.5 ? 2 : -2))));
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'customer',
      senderName: 'Tôi',
      text: inputMsg.trim(),
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMsg('');

    // Simulate mechanic reply after 2 seconds
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `m_${Date.now() + 1}`,
        sender: 'mechanic',
        senderName: order.mechanic.name,
        text: 'Dạ vâng anh, em nhìn thấy cây xăng Petrolimex rồi ạ, em đang xi nhan tấp vào lề đường ngay đây!',
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 2000);
  };

  const steps = [
    { num: 1, title: 'Đã đặt đơn', time: '08:35' },
    { num: 2, title: 'Gara xác nhận', time: '08:37' },
    { num: 3, title: 'Thợ đang di chuyển', time: '08:40 (Hiện tại)' },
    { num: 4, title: 'Sửa tại chỗ', time: 'Dự kiến' },
    { num: 5, title: 'Nghiệm thu', time: 'Hoàn tất' },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#f8f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-6">
        {/* Top Command Status Bar */}
        <div className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold font-['Space_Grotesk'] uppercase">
                MÃ CỨU HỘ: #{order.orderId}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-[#af101a] font-['Space_Grotesk']">
                <span className="w-2 h-2 rounded-full bg-[#af101a] animate-ping" />
                THỢ ĐANG DI CHUYỂN TỚI BẠN
              </span>
            </div>
            <h1 className="font-['Space_Grotesk'] text-lg sm:text-xl font-bold text-[#0b1c30]">
              {order.carModel} • {order.faultType}
            </h1>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5b403d] flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#af101a]">fmd_good</span>
              {order.incidentLocation}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#eff4ff] p-3 rounded-xl border border-[#dae2fd] shrink-0">
            <div className="text-right">
              <span className="text-[11px] font-['Plus_Jakarta_Sans'] text-[#5b403d] block">
                Thời gian dự kiến có mặt
              </span>
              <span className="font-['Space_Grotesk'] text-2xl font-extrabold text-[#af101a]">
                ~{eta} phút
              </span>
            </div>
            <div className="w-px h-8 bg-[#dae2fd]"></div>
            <div className="text-right">
              <span className="text-[11px] font-['Plus_Jakarta_Sans'] text-[#5b403d] block">
                Khoảng cách còn lại
              </span>
              <span className="font-['Space_Grotesk'] text-lg font-bold text-[#0b1c30]">
                1.1 km
              </span>
            </div>
          </div>
        </div>

        {/* 5-Step Visual Stepper */}
        <div className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-sm overflow-x-auto">
          <div className="min-w-[600px] flex items-center justify-between relative">
            {/* Connecting Bar */}
            <div className="absolute top-4 left-6 right-6 h-1 bg-[#eff4ff] -z-0">
              <div className="h-full bg-[#af101a] w-[50%] transition-all duration-500"></div>
            </div>

            {steps.map((st) => {
              const isDone = st.num < 3;
              const isActive = st.num === 3;
              return (
                <div key={st.num} className="relative z-10 flex flex-col items-center text-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-['Space_Grotesk'] text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : isActive
                        ? 'bg-[#d32f2f] text-white ring-4 ring-[#ffdad6] shadow-sm animate-pulse'
                        : 'bg-[#eff4ff] text-[#5b403d] border border-[#dae2fd]'
                    }`}
                  >
                    {isDone ? (
                      <span className="material-symbols-outlined text-sm">check</span>
                    ) : (
                      st.num
                    )}
                  </div>
                  <span
                    className={`font-['Space_Grotesk'] text-xs font-bold mt-2 ${
                      isActive ? 'text-[#af101a]' : isDone ? 'text-[#0b1c30]' : 'text-[#5b403d]'
                    }`}
                  >
                    {st.title}
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#5b403d] mt-0.5">
                    {st.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Live Map Telemetry & Mechanic Profile */}
          <div className="lg:col-span-8 space-y-6">
            {/* Map Frame with Interactive Animated Overlay */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] overflow-hidden shadow-sm">
              <div className="p-3.5 bg-[#eff4ff] border-b border-[#dae2fd] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-['Space_Grotesk'] text-xs font-bold text-[#0b1c30] uppercase">
                    Định Vị Vệ Tinh Thời Gian Thực (GPS Telemetry)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-['Space_Grotesk'] text-[#5b403d]">
                  <span>Vận tốc: <strong className="text-[#0b1c30]">{speed} km/h</strong></span>
                  <span>•</span>
                  <span>Tín hiệu: <strong className="text-emerald-700">Mạnh (4G)</strong></span>
                </div>
              </div>

              {/* Map Canvas */}
              <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                <img
                  alt="Live Route Map"
                  className="w-full h-full object-cover opacity-90"
                  src={APP_ASSETS.mapRoute}
                />

                {/* Simulated Moving Truck Marker */}
                <div
                  className="absolute top-[48%] -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 group cursor-pointer"
                  style={{ left: `${truckOffset}%` }}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#d32f2f] text-white flex items-center justify-center shadow-2xl ring-4 ring-white">
                      <span className="material-symbols-outlined text-lg">local_shipping</span>
                    </div>
                    <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0b1c30] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      {order.mechanic.vehiclePlate} ({speed} km/h)
                    </span>
                  </div>
                </div>

                {/* Incident Destination Pin */}
                <div className="absolute top-[52%] left-[88%] -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg ring-4 ring-white animate-bounce">
                      <span className="material-symbols-outlined text-base">fmd_good</span>
                    </div>
                    <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-[#0b1c30] text-[10px] font-bold px-2 py-0.5 rounded shadow border border-slate-200">
                      Điểm dừng của bạn
                    </span>
                  </div>
                </div>

                {/* Live Floating HUD readout */}
                <div className="absolute bottom-3 left-3 bg-[#0b1c30]/90 backdrop-blur-md text-white px-3.5 py-2 rounded-xl text-xs font-['Space_Grotesk'] space-y-0.5 border border-white/10 shadow-lg">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Lưu thông thuận lợi (Nguyễn Trãi thông thoáng)
                  </div>
                  <div className="text-white/80 text-[11px]">
                    Tọa độ: 20.9984° N, 105.8012° E • Cập nhật mỗi 3s
                  </div>
                </div>
              </div>
            </div>

            {/* Mechanic Dossier Profile Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#dae2fd] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    alt={order.mechanic.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#af101a]/20"
                    src={order.mechanic.avatarUrl}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-['Space_Grotesk'] text-lg font-bold text-[#0b1c30]">
                        {order.mechanic.name}
                      </h2>
                      <span className="px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#0b1c30] font-['Space_Grotesk'] text-[11px] font-bold">
                        {order.mechanic.level}
                      </span>
                    </div>
                    <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5b403d] mt-0.5">
                      Đơn vị: <strong>{order.garage.name}</strong>
                    </p>
                    <div className="flex items-center gap-3 text-xs font-['Space_Grotesk'] text-[#5b403d] mt-1">
                      <span className="flex items-center gap-1 text-amber-600 font-bold">
                        <span className="material-symbols-outlined text-sm text-amber-500">star</span>
                        {order.mechanic.rating}
                      </span>
                      <span>•</span>
                      <span>{order.mechanic.completedRescues} lượt cứu hộ thành công</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setShowPhoneModal(true)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-['Space_Grotesk'] text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">call</span>
                    <span>Gọi trực tiếp</span>
                  </button>
                  <a
                    href="#chat-section"
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dae2fd] font-['Space_Grotesk'] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    <span>Nhắn tin</span>
                  </a>
                </div>
              </div>

              {/* Equipment & Vehicle details */}
              <div className="pt-3 border-t border-[#eff4ff] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-['Plus_Jakarta_Sans']">
                <div className="p-3 rounded-xl bg-[#eff4ff]/60 border border-[#dae2fd]/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-base text-[#af101a]">directions_car</span>
                  <div>
                    <span className="text-[#5b403d] block text-[10px]">Phương tiện di chuyển:</span>
                    <span className="font-bold text-[#0b1c30]">
                      {order.mechanic.vehicleName} ({order.mechanic.vehiclePlate})
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#eff4ff]/60 border border-[#dae2fd]/60 flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-base text-[#af101a]">home_repair_service</span>
                  <div>
                    <span className="text-[#5b403d] block text-[10px]">Trang thiết bị chuyên dụng:</span>
                    <span className="font-bold text-[#0b1c30]">{order.mechanic.equipment}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Encrypted Chat & Order Ledger */}
          <div className="lg:col-span-4 space-y-6" id="chat-section">
            {/* Live Chat Box */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] shadow-sm flex flex-col h-[420px]">
              <div className="p-3.5 bg-[#eff4ff] border-b border-[#dae2fd] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-['Space_Grotesk'] text-xs font-bold text-[#0b1c30]">
                    Kênh Liên Lạc Trực Tiếp (Mã Hóa 256-bit)
                  </span>
                </div>
                <span className="text-[10px] font-['Space_Grotesk'] text-[#5b403d]">KTV online</span>
              </div>

              {/* Messages scroll area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map((m) => {
                  const isMe = m.sender === 'customer';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <span className="text-[10px] font-['Space_Grotesk'] text-[#5b403d] mb-0.5">
                        {m.senderName} • {m.time}
                      </span>
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-xs font-['Plus_Jakarta_Sans'] leading-relaxed ${
                          isMe
                            ? 'bg-[#af101a] text-white rounded-tr-none'
                            : 'bg-[#eff4ff] text-[#0b1c30] rounded-tl-none border border-[#dae2fd]/70'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-[#eff4ff] flex gap-2">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Gửi tin nhắn cho KTV..."
                  className="flex-1 text-xs font-['Plus_Jakarta_Sans'] px-3 py-2.5 rounded-xl border border-[#dae2fd] bg-[#f8f9ff] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#af101a]/20"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2.5 rounded-xl bg-[#d32f2f] hover:bg-[#af101a] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">send</span>
                </button>
              </form>
            </div>

            {/* Service & Cost Ledger Summary */}
            <div className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-sm space-y-3">
              <h3 className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#5b403d]">
                Bảng Kê Chi Phí Dịch Vụ
              </h3>

              <div className="space-y-2 text-xs font-['Plus_Jakarta_Sans']">
                <div className="flex justify-between py-1 border-b border-[#eff4ff]">
                  <span className="text-[#5b403d]">{order.faultType}</span>
                  <span className="font-bold text-[#0b1c30]">
                    {order.selectedFaultPrice.toLocaleString('vi-VN')} đ
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#eff4ff]">
                  <span className="text-[#5b403d]">Phí di chuyển (1.8 km)</span>
                  <span className="font-bold text-emerald-700">0 đ (Miễn phí &lt;3km)</span>
                </div>
                {order.addonsPrice > 0 && (
                  <div className="flex justify-between py-1 border-b border-[#eff4ff]">
                    <span className="text-[#5b403d]">Dịch vụ bổ trợ</span>
                    <span className="font-bold text-[#0b1c30]">
                      {order.addonsPrice.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-['Plus_Jakarta_Sans'] text-[#5b403d]">Tổng thanh toán</span>
                  <div className="font-['Space_Grotesk'] text-xl font-bold text-[#af101a]">
                    {order.totalCost.toLocaleString('vi-VN')} VNĐ
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#eff4ff] text-[11px] font-['Space_Grotesk'] font-bold text-[#0b1c30]">
                  {order.paymentMethod === 'cash' ? 'Tiền mặt khi xong' : 'VietQR'}
                </span>
              </div>

              {/* Cancellation trigger */}
              <div className="pt-3 border-t border-[#eff4ff] flex justify-between items-center">
                <span className="text-[11px] text-[#5b403d] font-['Plus_Jakarta_Sans']">
                  Xe đã tự nổ được?
                </span>
                <button
                  type="button"
                  onClick={() => setShowCancelModal(true)}
                  className="text-xs font-['Space_Grotesk'] font-bold text-red-600 hover:underline cursor-pointer"
                >
                  Hủy yêu cầu cứu hộ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Phone Call Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 border border-[#dae2fd] shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <span className="material-symbols-outlined text-3xl animate-bounce">phone_in_talk</span>
            </div>
            <div>
              <span className="text-xs font-['Space_Grotesk'] text-[#5b403d]">Đang gọi Kỹ thuật viên...</span>
              <h2 className="font-['Space_Grotesk'] text-lg font-bold text-[#0b1c30]">
                {order.mechanic.name}
              </h2>
              <p className="font-['Space_Grotesk'] text-sm font-bold text-[#af101a] mt-1">
                {order.mechanic.phone}
              </p>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5b403d]">
              Cuộc gọi được bảo mật qua tổng đài CarFix Masking để đảm bảo an toàn thông tin cá nhân.
            </p>
            <div className="space-y-2 pt-2">
              <a
                href={`tel:${order.mechanic.phone}`}
                className="w-full py-3 rounded-xl bg-emerald-600 text-white font-['Space_Grotesk'] text-xs font-bold block transition-colors"
              >
                Mở ứng dụng gọi điện
              </a>
              <button
                onClick={() => setShowPhoneModal(false)}
                className="w-full py-2.5 rounded-xl text-xs font-['Space_Grotesk'] font-bold text-[#5b403d] hover:text-[#0b1c30]"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#dae2fd] shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-2xl">warning</span>
              </div>
              <div>
                <h2 className="font-['Space_Grotesk'] text-base font-bold text-[#0b1c30]">
                  Xác Nhận Hủy Đơn Cứu Hộ #{order.orderId}?
                </h2>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5b403d]">
                  KTV {order.mechanic.name} hiện chỉ còn cách bạn khoảng 1.1 km.
                </p>
              </div>
            </div>

            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5b403d] bg-[#eff4ff] p-3 rounded-xl leading-relaxed">
              Theo chính sách CarFix Shield, hủy đơn miễn phí trong vòng 5 phút sau khi đặt. Hiện tại bạn có thể hủy hoàn toàn miễn phí.
            </p>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 rounded-xl border border-[#dae2fd] text-xs font-['Space_Grotesk'] font-bold text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
              >
                Tiếp tục chờ thợ
              </button>
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  if (onCancelOrder) onCancelOrder();
                  onNavigate('home');
                }}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-['Space_Grotesk'] font-bold transition-colors"
              >
                Đồng ý hủy đơn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
