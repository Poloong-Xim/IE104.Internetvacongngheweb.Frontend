export type AppScreen = 'home' | 'booking' | 'tracking' | 'mechanic' | 'pricing';

export interface GarageInfo {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  estimatedMinutes: number;
  mechanicsAvailable: number;
  address: string;
  phone: string;
  imageUrl: string;
  verified: boolean;
  features: string[];
}

export interface FaultOption {
  id: string;
  title: string;
  description: string;
  priceText: string;
  basePrice: number;
  icon: string;
  category: 'battery' | 'tire' | 'overheat' | 'tow' | 'fuel' | 'custom' | string;
  isCustom?: boolean;
}

export interface AddonService {
  id: string;
  title: string;
  price: number;
  included: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'mechanic' | 'customer';
  senderName: string;
  text: string;
  time: string;
}

export interface RescueOrder {
  orderId: string;
  createdAt: string;
  statusStep: 1 | 2 | 3 | 4 | 5;
  garage: GarageInfo;
  mechanic: {
    name: string;
    level: string;
    rating: number;
    completedRescues: number;
    phone: string;
    vehicleName: string;
    vehiclePlate: string;
    equipment: string;
    avatarUrl: string;
  };
  carModel: string;
  carPlate: string;
  incidentLocation: string;
  locationNote: string;
  faultDesc: string;
  faultType: string;
  selectedFaultPrice: number;
  addonsPrice: number;
  travelDistanceKm: number;
  travelFee: number;
  totalCost: number;
  paymentMethod: 'cash' | 'vietqr';
  etaMinutes: number;
}
