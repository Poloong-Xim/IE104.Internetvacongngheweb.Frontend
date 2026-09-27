import React, { useState } from 'react';
import { GarageInfo, RescueOrder, AppScreen, FaultOption } from '../types';
import { APP_ASSETS, FAULT_OPTIONS } from '../data/mockData';

// Gợi ý các sự cố ô tô phát sinh thực tế
const SUGGESTED_CUSTOM_ISSUES = [
  {
    title: 'Quên chìa khóa trong xe / Kẹt khóa cửa',
    desc: 'Mở khóa cửa ô tô không trầy xước ron kính, dụng cụ bơm khí chuyên dụng',
    price: 200000,
    icon: 'key',
  },
  {
    title: 'Bó kẹt phanh / Rò rỉ dầu phanh',
    desc: 'Kiểm tra kẹp phanh piston, xả air dầu phanh hoặc mở má phanh bó cứng',
    price: 200000,
    icon: 'car_repair',
  },
  {
    title: 'Cháy cầu chì / Chập mất điện táp-lô',
    desc: 'Đo thông mạch, tìm điểm ngắn mạch và thay thế cầu chì tổng an toàn',
    price: 150000,
    icon: 'electrical_services',
  },
  {
    title: 'Rách ống nước / Rò rỉ két làm mát',
    desc: 'Bọc vá khẩn cấp đường ống mềm giải nhiệt, bổ sung nước mát hạ nhiệt',
    price: 250000,
    icon: 'water_drop',
  },
  {
    title: 'Kẹt cần số tự động / Đứt dây số',
    desc: 'Mở lẫy Shift Lock khẩn cấp, kiểm tra cơ cấu cáp chuyển số',
    price: 250000,
    icon: 'tune',
  },
  {
    title: 'Gãy gạt mưa / Kẹt mô-tơ khi mưa to',
    desc: 'Xử lý mô-tơ gạt nước mưa hoặc thay tạm thanh gạt để tiếp tục lộ trình',
    price: 120000,
    icon: 'thunderstorm',
  },
];

const AVAILABLE_ICONS = [
  { id: 'build_circle', label: 'Cơ khí' },
  { id: 'key', label: 'Khóa xe' },
  { id: 'car_repair', label: 'Sửa xe' },
  { id: 'electrical_services', label: 'Điện xe' },
  { id: 'water_drop', label: 'Dung dịch' },
  { id: 'tune', label: 'Hộp số' },
  { id: 'thunderstorm', label: 'Gạt mưa' },
  { id: 'warning', label: 'Cảnh báo' },
  { id: 'oil_barrel', label: 'Dầu nhớt' },
  { id: 'emergency', label: 'Khẩn cấp' },
];

interface BookingViewProps {
  selectedGarage: GarageInfo;
  onConfirmOrder: (order: RescueOrder) => void;
  onNavigate: (screen: AppScreen) => void;
  onBackToHome: () => void;
}

export const BookingView: React.FC<BookingViewProps> = ({
  selectedGarage,
  onConfirmOrder,
  onNavigate,
  onBackToHome,
}) => {
  // Fault list with custom items capability
  const [faultList, setFaultList] = useState<FaultOption[]>(FAULT_OPTIONS);
  const [selectedFaultId, setSelectedFaultId] = useState<string>('battery');

  // Custom issue modal / form state
  const [showAddCustomModal, setShowAddCustomModal] = useState<boolean>(false);
  const [editingFaultId, setEditingFaultId] = useState<string | null>(null);
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customDesc, setCustomDesc] = useState<string>('');
  const [customPrice, setCustomPrice] = useState<number>(150000);
  const [customIcon, setCustomIcon] = useState<string>('build_circle');
  const [customError, setCustomError] = useState<string>('');

  const [addonEcu, setAddonEcu] = useState<boolean>(false);
  const [addonTireAir, setAddonTireAir] = useState<boolean>(true);
  const [carModel, setCarModel] = useState<string>('Mazda CX-5 2022 (2.0L SkyActiv)');
  const [carPlate, setCarPlate] = useState<string>('30H - 869.24');
  const [locationAddress, setLocationAddress] = useState<string>(
    '234 Nguyễn Trãi, Phường Thanh Xuân Trung, Thanh Xuân, Hà Nội'
  );
  const [locationNote, setLocationNote] = useState<string>(
    'Cạnh cây xăng Petrolimex số 34, xe đỗ làn khẩn cấp bật đèn hazard'
  );
  const [symptomText, setSymptomText] = useState<string>(
    'Xe đỗ qua đêm sáng nay bấm đề kêu tạch tạch không nổ, đèn táp-lô nhấp nháy yếu, còi xe kêu rất bé, nghi ngờ hết điện bình ắc quy hoàn toàn.'
  );
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'vietqr'>('cash');
  const [attachedPhotos, setAttachedPhotos] = useState<string[]>([
    APP_ASSETS.dashboardFault,
    APP_ASSETS.engineBay,
  ]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [generatedOrder, setGeneratedOrder] = useState<RescueOrder | null>(null);

  // Calculate pricing from dynamic faultList
  const currentFault = faultList.find((f) => f.id === selectedFaultId) || faultList[0];
  const faultPrice = currentFault.basePrice;
  const addonsTotal = addonEcu ? 50000 : 0;
  const travelFee = 0; // 1.8km is within 3km free policy
  const grandTotal = faultPrice + addonsTotal + travelFee;

  // Custom fault handlers
  const handleOpenAddCustomModal = (faultToEdit?: FaultOption) => {
    setCustomError('');
    if (faultToEdit && faultToEdit.isCustom) {
      setEditingFaultId(faultToEdit.id);
      setCustomTitle(faultToEdit.title);
      setCustomDesc(faultToEdit.description);
      setCustomPrice(faultToEdit.basePrice);
      setCustomIcon(faultToEdit.icon);
    } else {
      setEditingFaultId(null);
      setCustomTitle('');
      setCustomDesc('');
      setCustomPrice(150000);
      setCustomIcon('build_circle');
    }
    setShowAddCustomModal(true);
  };

  const handleSelectSuggestion = (sug: typeof SUGGESTED_CUSTOM_ISSUES[0]) => {
    setCustomTitle(sug.title);
    setCustomDesc(sug.desc);
    setCustomPrice(sug.price);
    setCustomIcon(sug.icon);
    setCustomError('');
  };

  const handleSaveCustomFault = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customTitle.trim()) {
      setCustomError('Vui lòng nhập tên vấn đề / sự cố xe bạn gặp phải.');
      return;
    }

    if (editingFaultId) {
      // Update existing custom fault
      setFaultList((prev) =>
        prev.map((item) =>
          item.id === editingFaultId
            ? {
                ...item,
                title: customTitle.trim(),
                description:
                  customDesc.trim() || 'Sự cố đặc thù theo yêu cầu trực tiếp của chủ phương tiện',
                priceText: `Dự toán: ${customPrice.toLocaleString('vi-VN')} đ`,
                basePrice: customPrice > 0 ? customPrice : 150000,
                icon: customIcon || 'build_circle',
              }
            : item
        )
      );
      setSelectedFaultId(editingFaultId);
    } else {
      // Create new custom fault
      const newId = `custom-issue-${Date.now()}`;
      const newFault: FaultOption = {
        id: newId,
        title: customTitle.trim(),
        description:
          customDesc.trim() || 'Sự cố đặc thù theo yêu cầu trực tiếp của chủ phương tiện',
        priceText: `Dự toán: ${customPrice.toLocaleString('vi-VN')} đ`,
        basePrice: customPrice > 0 ? customPrice : 150000,
        icon: customIcon || 'build_circle',
        category: 'custom',
        isCustom: true,
      };

      setFaultList((prev) => [...prev, newFault]);
      setSelectedFaultId(newId);

      // Auto update symptom description if using default battery text
      if (
        symptomText.includes('hết điện bình ắc quy hoàn toàn') ||
        symptomText.trim() === ''
      ) {
        setSymptomText(
          `Sự cố xe: ${customTitle.trim()}. ${customDesc.trim() ? customDesc.trim() : 'Yêu cầu thợ mang đồ nghề kiểm tra trực tiếp.'}`
        );
      }
    }

    setShowAddCustomModal(false);
  };

  const handleDeleteCustomFault = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFaultList((prev) => prev.filter((item) => item.id !== id));
    if (selectedFaultId === id) {
      setSelectedFaultId(FAULT_OPTIONS[0].id);
    }
  };

  const handleAddPhoto = () => {
    // Simulate user uploading a photo
    const newPhotos = [...attachedPhotos, APP_ASSETS.jobBattery];
    setAttachedPhotos(newPhotos);
  };

  const handleRemovePhoto = (index: number) => {
    setAttachedPhotos(attachedPhotos.filter((_, i) => i !== index));
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData: RescueOrder = {
      orderId: `CF-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: 'Vừa xong',
      statusStep: 3, // In-route for immediate interactive demo
      garage: selectedGarage,
      mechanic: {
        name: 'Trần Tuấn Anh',
        level: 'Kỹ thuật viên Bậc 4/7',
        rating: 4.9,
        completedRescues: 410,
        phone: '0988 123 456',
        vehicleName: 'Bán tải Ford Ranger cứu hộ',
        vehiclePlate: '29C-889.12',
        equipment: 'Trạm kích bình 12V/24V & Bộ nén vá lốp',
        avatarUrl: APP_ASSETS.userAvatar,
      },
      carModel,
      carPlate,
      incidentLocation: locationAddress,
      locationNote,
      faultDesc: symptomText,
      faultType: currentFault.title,
      selectedFaultPrice: faultPrice,
      addonsPrice: addonsTotal,
      travelDistanceKm: selectedGarage.distanceKm,
      travelFee,
      totalCost: grandTotal,
      paymentMethod,
      etaMinutes: selectedGarage.estimatedMinutes,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setGeneratedOrder(orderData);
      setShowSuccessModal(true);
    }, 800);
  };

  const handleProceedToTracking = () => {
    if (generatedOrder) {
      onConfirmOrder(generatedOrder);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#f8f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
        {/* Breadcrumb & Header */}
        <div className="space-y-2">
          <nav className="flex items-center gap-2 text-xs font-['Space_Grotesk'] text-[#5b403d]">
            <button
              onClick={onBackToHome}
              className="hover:text-[#af101a] transition-colors cursor-pointer"
            >
              Trang chủ
            </button>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <button
              onClick={onBackToHome}
              className="hover:text-[#af101a] transition-colors cursor-pointer"
            >
              Chọn gara cứu hộ
            </button>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="font-bold text-[#0b1c30]">Đặt dịch vụ &amp; Dự toán chi phí</span>
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
              Yêu Cầu Cứu Hộ &amp; Khảo Sát Minh Bạch Chi Phí
            </h1>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#dae2fd] text-[#131b2e] text-xs font-bold font-['Space_Grotesk']">
              <span className="material-symbols-outlined text-base text-[#af101a]">verified_user</span>
              BẢO VỆ CARFIX SHIELD
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmitBooking}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* Selected Garage Dossier */}
              <div className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    alt={selectedGarage.name}
                    className="w-14 h-14 rounded-xl object-cover ring-1 ring-slate-100"
                    src={selectedGarage.imageUrl}
                  />
                  <div>
                    <span className="text-[11px] font-['Space_Grotesk'] font-bold text-[#af101a] uppercase">
                      Trạm tiếp nhận trực tiếp
                    </span>
                    <h2 className="font-['Space_Grotesk'] text-base font-bold text-[#0b1c30]">
                      {selectedGarage.name}
                    </h2>
                    <div className="flex items-center gap-3 text-xs font-['Space_Grotesk'] text-[#5b403d] mt-0.5">
                      <span className="flex items-center gap-1 text-amber-600 font-bold">
                        <span className="material-symbols-outlined text-sm text-amber-500">star</span>
                        {selectedGarage.rating}
                      </span>
                      <span>•</span>
                      <span className="text-[#af101a] font-bold">{selectedGarage.distanceKm} km</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-semibold">
                        Dự kiến có mặt sau ~{selectedGarage.estimatedMinutes} phút
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onBackToHome}
                  className="px-3 py-1.5 rounded-xl border border-[#dae2fd] text-xs font-bold font-['Space_Grotesk'] text-[#5b403d] hover:text-[#0b1c30] hover:bg-[#eff4ff] transition-colors cursor-pointer self-start sm:self-center"
                >
                  Đổi gara khác
                </button>
              </div>

              {/* Step 1: Vấn đề / Sự cố */}
              <div className="bg-white p-6 rounded-2xl border border-[#dae2fd] shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#af101a] text-white flex items-center justify-center font-['Space_Grotesk'] text-xs font-bold shrink-0">
                      1
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-['Space_Grotesk'] text-base font-bold text-[#0b1c30]">
                          Vấn Đề / Sự Cố Cần Cứu Hộ
                        </h2>
                        <span className="text-[11px] font-['Space_Grotesk'] text-[#5b403d] bg-[#eff4ff] px-2 py-0.5 rounded font-bold">
                          Bắt buộc
                        </span>
                      </div>
                      <p className="text-xs font-['Plus_Jakarta_Sans'] text-[#5b403d] mt-0.5">
                        Chọn sự cố có sẵn hoặc thêm vấn đề riêng của xe bạn
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenAddCustomModal()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#eff4ff] hover:bg-[#dae2fd] text-[#af101a] font-['Space_Grotesk'] text-xs font-bold transition-all border border-[#dae2fd] cursor-pointer shadow-xs shrink-0 self-start sm:self-auto group"
                  >
                    <span className="material-symbols-outlined text-base group-hover:scale-110 transition-transform">
                      add_circle
                    </span>
                    <span>+ Thêm vấn đề khác</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {faultList.map((f) => {
                    const isSelected = selectedFaultId === f.id;
                    return (
                      <div
                        key={f.id}
                        onClick={() => setSelectedFaultId(f.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between relative ${
                          isSelected
                            ? 'bg-[#ffffff] border-[#af101a] ring-2 ring-[#af101a]/15 shadow-sm'
                            : 'bg-white border-[#dae2fd] hover:border-[#af101a]/40 hover:bg-[#eff4ff]/20'
                        }`}
                      >
                        <div>
                          {f.isCustom && (
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-['Space_Grotesk'] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1">
                                <span className="material-symbols-outlined text-xs">edit_note</span>
                                Vấn đề tùy chỉnh
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  title="Chỉnh sửa vấn đề này"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenAddCustomModal(f);
                                  }}
                                  className="w-6 h-6 rounded-md hover:bg-slate-100 text-[#5b403d] hover:text-[#0b1c30] flex items-center justify-center transition-colors cursor-pointer"
                                >
                                  <span className="material-symbols-outlined text-sm">edit</span>
                                </button>
                                <button
                                  type="button"
                                  title="Xóa vấn đề này"
                                  onClick={(e) => handleDeleteCustomFault(f.id, e)}
                                  className="w-6 h-6 rounded-md hover:bg-rose-100 text-[#5b403d] hover:text-[#af101a] flex items-center justify-center transition-colors cursor-pointer"
                                >
                                  <span className="material-symbols-outlined text-sm">delete</span>
                                </button>
                              </div>
                            </div>
                          )}

                          <div className="flex items-start gap-3">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                isSelected ? 'bg-[#ffdad6] text-[#af101a]' : 'bg-[#eff4ff] text-[#0b1c30]'
                              }`}
                            >
                              <span className="material-symbols-outlined text-lg">{f.icon}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-['Space_Grotesk'] text-sm font-bold text-[#0b1c30] leading-snug">
                                {f.title}
                              </h3>
                              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5b403d] mt-1 leading-relaxed">
                                {f.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 mt-3 border-t border-[#eff4ff] flex items-center justify-between text-xs">
                          <div>
                            <span className="font-['Space_Grotesk'] font-bold text-[#af101a]">
                              {f.basePrice.toLocaleString('vi-VN')} đ
                            </span>
                            {f.isCustom && (
                              <span className="text-[10px] text-[#5b403d] block font-['Plus_Jakarta_Sans']">
                                (Dự toán tạm tính)
                              </span>
                            )}
                          </div>
                          <span className="material-symbols-outlined text-base text-[#af101a]">
                            {isSelected ? 'radio_button_checked' : 'radio_button_unchecked'}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Dedicated Card: + Thêm vấn đề khác */}
                  <div
                    onClick={() => handleOpenAddCustomModal()}
                    className="p-4 rounded-xl border-2 border-dashed border-[#dae2fd] hover:border-[#af101a] bg-[#f8f9ff] hover:bg-[#fff2f0]/60 cursor-pointer transition-all flex flex-col justify-between group min-h-[120px]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-[#eff4ff] text-[#af101a] group-hover:bg-[#ffdad6] group-hover:scale-105 transition-all">
                        <span className="material-symbols-outlined text-lg">add_circle</span>
                      </div>
                      <div>
                        <h3 className="font-['Space_Grotesk'] text-sm font-bold text-[#0b1c30] group-hover:text-[#af101a] leading-snug flex items-center gap-1.5">
                          <span>+ Thêm Vấn Đề Khác</span>
                          <span className="px-1.5 py-0.2 rounded bg-[#ffdad6] text-[#af101a] text-[10px] font-bold">
                            Mới
                          </span>
                        </h3>
                        <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5b403d] mt-1 leading-relaxed">
                          Không có lỗi trong danh mục? Nhấn để tự nhập sự cố cụ thể của xe bạn
                        </p>
                      </div>
                    </div>
                    <div className="pt-3 mt-2 border-t border-[#dae2fd]/60 flex items-center justify-between text-xs">
                      <span className="font-['Space_Grotesk'] font-medium text-[#5b403d] group-hover:text-[#af101a]">
                        Tự nhập mô tả &amp; dự toán
                      </span>
                      <span className="text-[#af101a] font-bold flex items-center gap-0.5 text-xs font-['Space_Grotesk']">
                        Nhập sự cố
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Callout if current selection is custom */}
                {currentFault.isCustom && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs animate-in fade-in">
                    <span className="material-symbols-outlined text-amber-700 text-lg shrink-0">
                      info
                    </span>
                    <div className="flex-1">
                      <div className="font-['Space_Grotesk'] font-bold text-amber-900">
                        Đang chọn sự cố tùy chỉnh: "{currentFault.title}"
                      </div>
                      <p className="font-['Plus_Jakarta_Sans'] text-amber-800 mt-0.5 leading-relaxed">
                        Kỹ thuật viên của <strong>{selectedGarage.name}</strong> sẽ gọi điện trực tiếp sau 30 giây để xác nhận tình trạng và chuẩn bị đúng linh kiện / dụng cụ thay thế.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleOpenAddCustomModal(currentFault)}
                      className="px-2.5 py-1 rounded-lg bg-amber-200/80 hover:bg-amber-300 text-amber-950 font-['Space_Grotesk'] font-bold text-[11px] shrink-0 cursor-pointer transition-colors"
                    >
                      Sửa sự cố
                    </button>
                  </div>
                )}

                {/* Dịch vụ cộng thêm */}
                <div className="pt-3 border-t border-[#eff4ff] space-y-2">
                  <span className="font-['Space_Grotesk'] text-xs font-bold text-[#0b1c30] uppercase tracking-wider">
                    Dịch vụ bổ trợ đi kèm:
                  </span>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-3 rounded-xl border border-[#dae2fd] bg-[#f8f9ff] cursor-pointer hover:bg-white transition-colors">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={addonTireAir}
                          onChange={(e) => setAddonTireAir(e.target.checked)}
                          className="w-4 h-4 accent-[#af101a] rounded cursor-pointer"
                        />
                        <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#0b1c30] font-medium">
                          Bơm lốp điện tử &amp; cân áp suất 4 bánh bằng khí nén
                        </span>
                      </div>
                      <span className="text-xs font-['Space_Grotesk'] font-bold text-emerald-700">
                        Miễn phí đi kèm
                      </span>
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl border border-[#dae2fd] bg-[#f8f9ff] cursor-pointer hover:bg-white transition-colors">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={addonEcu}
                          onChange={(e) => setAddonEcu(e.target.checked)}
                          className="w-4 h-4 accent-[#af101a] rounded cursor-pointer"
                        />
                        <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#0b1c30] font-medium">
                          Quét mã lỗi chẩn đoán hộp điều khiển ECU qua cổng OBD-II
                        </span>
                      </div>
                      <span className="text-xs font-['Space_Grotesk'] font-bold text-[#af101a]">
                        +50.000 đ
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Step 2: Thông tin xe & Vị trí */}
              <div className="bg-white p-6 rounded-2xl border border-[#dae2fd] shadow-sm space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#af101a] text-white flex items-center justify-center font-['Space_Grotesk'] text-xs font-bold">
                    2
                  </span>
                  <h2 className="font-['Space_Grotesk'] text-base font-bold text-[#0b1c30]">
                    Thông Tin Phương Tiện &amp; Vị Trí Hiện Tại
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-['Space_Grotesk'] font-bold text-[#0b1c30] mb-1">
                      Hãng xe &amp; Dòng xe
                    </label>
                    <input
                      type="text"
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      required
                      placeholder="VD: Mazda CX-5 2022..."
                      className="w-full text-xs font-['Plus_Jakarta_Sans'] p-3 rounded-xl border border-[#dae2fd] bg-[#f8f9ff] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#af101a]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-['Space_Grotesk'] font-bold text-[#0b1c30] mb-1">
                      Biển kiểm soát
                    </label>
                    <input
                      type="text"
                      value={carPlate}
                      onChange={(e) => setCarPlate(e.target.value)}
                      required
                      placeholder="VD: 30H - 869.24"
                      className="w-full text-xs font-['Space_Grotesk'] font-bold uppercase p-3 rounded-xl border border-[#dae2fd] bg-[#f8f9ff] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#af101a]/20 text-[#af101a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-['Space_Grotesk'] font-bold text-[#0b1c30] mb-1">
                    Địa chỉ xảy ra sự cố (Tự động lấy qua định vị)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={locationAddress}
                      onChange={(e) => setLocationAddress(e.target.value)}
                      required
                      className="w-full text-xs font-['Plus_Jakarta_Sans'] p-3 pr-10 rounded-xl border border-[#dae2fd] bg-[#f8f9ff] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#af101a]/20"
                    />
                    <span className="material-symbols-outlined text-lg text-[#af101a] absolute right-3 top-3">
                      pin_drop
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-['Space_Grotesk'] font-bold text-[#0b1c30] mb-1">
                    Ghi chú chi tiết điểm đỗ (Cột mốc, làn đường)
                  </label>
                  <input
                    type="text"
                    value={locationNote}
                    onChange={(e) => setLocationNote(e.target.value)}
                    placeholder="VD: Cạnh cây xăng Petrolimex số 34, đỗ sát lề đường..."
                    className="w-full text-xs font-['Plus_Jakarta_Sans'] p-3 rounded-xl border border-[#dae2fd] bg-[#f8f9ff] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#af101a]/20"
                  />
                </div>
              </div>

              {/* Step 3: Triệu chứng & Hình ảnh */}
              <div className="bg-white p-6 rounded-2xl border border-[#dae2fd] shadow-sm space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#af101a] text-white flex items-center justify-center font-['Space_Grotesk'] text-xs font-bold">
                    3
                  </span>
                  <h2 className="font-['Space_Grotesk'] text-base font-bold text-[#0b1c30]">
                    Mô Tả Tình Trạng &amp; Hình Ảnh Hiện Trường
                  </h2>
                </div>

                <div>
                  <label className="block text-xs font-['Space_Grotesk'] font-bold text-[#0b1c30] mb-1">
                    Mô tả triệu chứng cụ thể
                  </label>
                  <textarea
                    rows={3}
                    value={symptomText}
                    onChange={(e) => setSymptomText(e.target.value)}
                    placeholder="Mô tả hiện tượng xe (tiếng kêu, mùi khét, đèn cảnh báo táp-lô)..."
                    className="w-full text-xs font-['Plus_Jakarta_Sans'] p-3 rounded-xl border border-[#dae2fd] bg-[#f8f9ff] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#af101a]/20 resize-none leading-relaxed"
                  />
                </div>

                {/* Attached Images */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-['Space_Grotesk']">
                    <span className="font-bold text-[#0b1c30]">
                      Ảnh hiện trường đính kèm ({attachedPhotos.length}/4)
                    </span>
                    <span className="text-[#5b403d]">Giúp KTV chuẩn bị đúng dụng cụ</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {attachedPhotos.map((photo, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#dae2fd] group">
                        <img alt={`Scene ${idx}`} src={photo} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(idx)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-xs">close</span>
                        </button>
                      </div>
                    ))}

                    {attachedPhotos.length < 4 && (
                      <button
                        type="button"
                        onClick={handleAddPhoto}
                        className="w-20 h-20 rounded-xl border-2 border-dashed border-[#dae2fd] hover:border-[#af101a] text-[#5b403d] hover:text-[#af101a] flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer bg-[#eff4ff]/30"
                      >
                        <span className="material-symbols-outlined text-xl">add_a_photo</span>
                        <span className="text-[10px] font-['Space_Grotesk'] font-bold">Thêm ảnh</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Cost Ledger & Dispatch CTA */}
            <div className="lg:col-span-5 space-y-6 sticky top-24">
              {/* Route Map Telemetry preview */}
              <div className="bg-white rounded-2xl border border-[#dae2fd] overflow-hidden shadow-sm">
                <div className="p-3.5 bg-[#eff4ff] border-b border-[#dae2fd] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-['Space_Grotesk'] text-xs font-bold text-[#0b1c30]">
                      Lộ Trình Tiếp Cận Dự Kiến
                    </span>
                  </div>
                  <span className="text-xs font-['Space_Grotesk'] font-bold text-[#af101a]">
                    ~{selectedGarage.estimatedMinutes} phút
                  </span>
                </div>
                <div className="relative aspect-[16/9] w-full bg-slate-900">
                  <img
                    alt="Map route preview"
                    className="w-full h-full object-cover opacity-90"
                    src={APP_ASSETS.mapRoute}
                  />
                  <div className="absolute top-3 left-3 bg-[#0b1c30]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-['Space_Grotesk']">
                    <span className="text-[#ffdad6] font-bold">Xe cứu hộ #04</span> đang ở cách 1.8km
                  </div>
                </div>
              </div>

              {/* Price Calculation Ledger */}
              <div className="bg-white p-6 rounded-2xl border border-[#dae2fd] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
                  <h2 className="font-['Space_Grotesk'] text-base font-bold text-[#0b1c30]">
                    Dự Toán Chi Phí Minh Bạch
                  </h2>
                  <span className="text-[11px] font-['Space_Grotesk'] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                    Chuẩn niêm yết
                  </span>
                </div>

                <div className="space-y-2.5 text-xs font-['Plus_Jakarta_Sans']">
                  <div className="flex justify-between items-center">
                    <span className="text-[#5b403d]">{currentFault.title}</span>
                    <span className="font-bold text-[#0b1c30]">
                      {faultPrice.toLocaleString('vi-VN')} đ
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#5b403d]">Phí di chuyển cơ động (1.8 km)</span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                        Free &lt;3km
                      </span>
                    </div>
                    <span className="font-bold text-[#0b1c30]">0 đ</span>
                  </div>

                  {addonEcu && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#5b403d]">Quét mã lỗi OBD-II ECU</span>
                      <span className="font-bold text-[#0b1c30]">50.000 đ</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-[#5b403d]">Phụ phí trực ban đêm / mưa gió</span>
                    <span className="font-bold text-emerald-600">0 đ (Ban ngày)</span>
                  </div>
                </div>

                {/* Total banner */}
                <div className="pt-4 border-t border-[#dae2fd] flex items-end justify-between">
                  <div>
                    <span className="text-xs font-['Plus_Jakarta_Sans'] text-[#5b403d]">
                      Tổng thanh toán trọn gói
                    </span>
                    <div className="font-['Space_Grotesk'] text-3xl font-extrabold text-[#af101a]">
                      {grandTotal.toLocaleString('vi-VN')}{' '}
                      <span className="text-base font-normal text-[#5b403d]">VNĐ</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#5b403d] font-['Space_Grotesk']">Đã gồm VAT</span>
                </div>

                {/* Payment method selector */}
                <div className="pt-2 space-y-2">
                  <span className="block text-xs font-['Space_Grotesk'] font-bold text-[#0b1c30]">
                    Phương thức thanh toán:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-2.5 rounded-xl border text-xs font-['Space_Grotesk'] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                        paymentMethod === 'cash'
                          ? 'border-[#af101a] bg-[#ffdad6]/30 text-[#af101a]'
                          : 'border-[#dae2fd] text-[#5b403d]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">payments</span>
                      Tiền mặt khi xong
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('vietqr')}
                      className={`p-2.5 rounded-xl border text-xs font-['Space_Grotesk'] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                        paymentMethod === 'vietqr'
                          ? 'border-[#af101a] bg-[#ffdad6]/30 text-[#af101a]'
                          : 'border-[#dae2fd] text-[#5b403d]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">qr_code_scanner</span>
                      Quét VietQR 24/7
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-[#d32f2f] hover:bg-[#af101a] text-white font-['Space_Grotesk'] text-sm font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                      <span>ĐANG ĐIỀU PHỐI XE...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg">emergency_share</span>
                      <span>XÁC NHẬN GỬI YÊU CẦU CỨU HỘ</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] font-['Plus_Jakarta_Sans'] text-[#5b403d] text-center leading-relaxed">
                  Cam kết không tự ý thu thêm phụ phí ngoài bảng kê. Kỹ thuật viên lập phiếu nghiệm thu có chữ ký trước khi thanh toán.
                </p>
              </div>

              {/* Emergency Hotline widget */}
              <div className="bg-[#eff4ff] p-4 rounded-2xl border border-[#dae2fd] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#d32f2f] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">phone_in_talk</span>
                  </div>
                  <div>
                    <h3 className="font-['Space_Grotesk'] text-xs font-bold text-[#0b1c30]">
                      Cần tư vấn kỹ thuật ngay?
                    </h3>
                    <p className="text-xs font-['Space_Grotesk'] font-bold text-[#af101a]">
                      Hotline cứu hộ: 1900 6868
                    </p>
                  </div>
                </div>
                <a
                  href="tel:19006868"
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#dae2fd] text-xs font-['Space_Grotesk'] font-bold text-[#0b1c30] hover:text-[#af101a]"
                >
                  Gọi ngay
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Modal: Thêm / Chỉnh Sửa Vấn Đề Khác */}
      {showAddCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-[#dae2fd] max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#eff4ff]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#af101a] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">
                    {editingFaultId ? 'edit_note' : 'add_circle'}
                  </span>
                </div>
                <div>
                  <h2 className="font-['Space_Grotesk'] text-base sm:text-lg font-bold text-[#0b1c30]">
                    {editingFaultId ? 'Chỉnh Sửa Vấn Đề Tùy Chỉnh' : 'Thêm Vấn Đề / Sự Cố Cứu Hộ Khác'}
                  </h2>
                  <p className="text-xs font-['Plus_Jakarta_Sans'] text-[#5b403d]">
                    Nhập sự cố hoặc chọn nhanh gợi ý thường gặp bên dưới
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddCustomModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#5b403d] hover:text-[#0b1c30] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="space-y-2">
              <span className="text-xs font-['Space_Grotesk'] font-bold text-[#0b1c30] uppercase tracking-wider block">
                Gợi ý nhanh các sự cố thường gặp:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_CUSTOM_ISSUES.map((sug) => (
                  <button
                    key={sug.title}
                    type="button"
                    onClick={() => handleSelectSuggestion(sug)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-['Plus_Jakarta_Sans'] text-left border transition-all cursor-pointer flex items-center gap-1.5 ${
                      customTitle === sug.title
                        ? 'bg-[#0b1c30] text-white border-[#0b1c30]'
                        : 'bg-[#eff4ff]/60 border-[#dae2fd] text-[#0b1c30] hover:bg-[#dae2fd]/50 hover:border-[#af101a]/40'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm shrink-0">{sug.icon}</span>
                    <span>{sug.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Issue Form */}
            <form onSubmit={handleSaveCustomFault} className="space-y-4">
              {customError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-['Plus_Jakarta_Sans'] flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  <span>{customError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-['Space_Grotesk'] font-bold text-[#0b1c30] mb-1">
                  Tên vấn đề / sự cố <span className="text-[#af101a]">*</span>
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => {
                    setCustomTitle(e.target.value);
                    if (customError) setCustomError('');
                  }}
                  placeholder="VD: Quên chìa khóa trong xe, kẹt khóa cửa..."
                  className="w-full text-xs font-['Plus_Jakarta_Sans'] p-3 rounded-xl border border-[#dae2fd] bg-[#f8f9ff] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#af101a]/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-['Space_Grotesk'] font-bold text-[#0b1c30] mb-1">
                  Mô tả ngắn hiện trạng &amp; dụng cụ cần chuẩn bị
                </label>
                <textarea
                  rows={2}
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  placeholder="VD: Xe bị quên chìa khóa trong khoang lái, cần dụng cụ bơm khí và que gạt mở chốt an toàn..."
                  className="w-full text-xs font-['Plus_Jakarta_Sans'] p-3 rounded-xl border border-[#dae2fd] bg-[#f8f9ff] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#af101a]/20 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-['Space_Grotesk'] font-bold text-[#0b1c30] mb-1">
                    Dự toán chi phí tạm tính (VNĐ)
                  </label>
                  <input
                    type="number"
                    step="10000"
                    min="50000"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(Number(e.target.value))}
                    className="w-full text-xs font-['Space_Grotesk'] font-bold p-3 rounded-xl border border-[#dae2fd] bg-[#f8f9ff] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#af101a]/20 text-[#af101a]"
                  />
                  <span className="text-[10px] text-[#5b403d] font-['Plus_Jakarta_Sans'] mt-1 block">
                    Đã gồm công thợ đến kiểm tra tận nơi
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-['Space_Grotesk'] font-bold text-[#0b1c30] mb-1">
                    Chọn biểu tượng đại diện
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {AVAILABLE_ICONS.slice(0, 10).map((iconObj) => (
                      <button
                        key={iconObj.id}
                        type="button"
                        onClick={() => setCustomIcon(iconObj.id)}
                        className={`p-2 rounded-lg border flex flex-col items-center justify-center transition-all cursor-pointer ${
                          customIcon === iconObj.id
                            ? 'bg-[#ffdad6] text-[#af101a] border-[#af101a]'
                            : 'bg-[#f8f9ff] text-[#5b403d] border-[#dae2fd] hover:bg-white'
                        }`}
                        title={iconObj.label}
                      >
                        <span className="material-symbols-outlined text-base">{iconObj.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#eff4ff]">
                <button
                  type="button"
                  onClick={() => setShowAddCustomModal(false)}
                  className="flex-1 py-3 rounded-xl border border-[#dae2fd] text-xs font-bold font-['Space_Grotesk'] text-[#5b403d] hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#d32f2f] hover:bg-[#af101a] text-white text-xs font-bold font-['Space_Grotesk'] uppercase tracking-wider transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">check</span>
                  <span>{editingFaultId ? 'Lưu Thay Đổi' : 'Lưu & Chọn Vấn Đề Này'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success / Dispatch Confirmation Modal */}
      {showSuccessModal && generatedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#dae2fd] text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-['Space_Grotesk'] font-bold text-[#af101a] tracking-wider uppercase">
                MÃ ĐƠN CỨU HỘ: #{generatedOrder.orderId}
              </span>
              <h2 className="font-['Space_Grotesk'] text-xl font-bold text-[#0b1c30]">
                Đã Tiếp Nhận &amp; Điều Đội Cứu Hộ!
              </h2>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5b403d] leading-relaxed">
                Kỹ thuật viên <strong>{generatedOrder.mechanic.name}</strong> ({generatedOrder.mechanic.vehiclePlate}) từ{' '}
                <strong>{selectedGarage.name}</strong> đã xuất phát và dự kiến đến sau <strong>~{selectedGarage.estimatedMinutes} phút</strong>.
              </p>
            </div>

            <div className="bg-[#eff4ff] p-4 rounded-2xl text-left space-y-2 text-xs font-['Plus_Jakarta_Sans']">
              <div className="flex justify-between">
                <span className="text-[#5b403d]">Phương tiện:</span>
                <span className="font-bold text-[#0b1c30]">{generatedOrder.carModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5b403d]">Biển số:</span>
                <span className="font-bold text-[#af101a] font-['Space_Grotesk']">{generatedOrder.carPlate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5b403d]">Chi phí tạm tính:</span>
                <span className="font-bold text-[#af101a] font-['Space_Grotesk']">
                  {grandTotal.toLocaleString('vi-VN')} đ
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={handleProceedToTracking}
                className="w-full py-3.5 rounded-xl bg-[#d32f2f] hover:bg-[#af101a] text-white font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <span>Theo dõi lộ trình di chuyển ngay</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  onNavigate('home');
                }}
                className="w-full py-2.5 rounded-xl text-xs font-['Space_Grotesk'] font-bold text-[#5b403d] hover:text-[#0b1c30] transition-colors cursor-pointer"
              >
                Về trang chủ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
