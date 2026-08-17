export type ComponentCategory = 
  | 'cpu'
  | 'cooler'
  | 'motherboard'
  | 'ram'
  | 'gpu'
  | 'storage'
  | 'psu'
  | 'case';

export type SocketType = 'AM5' | 'AM4' | 'LGA1700' | 'LGA1851';
export type DDRGen = 'DDR4' | 'DDR5';
export type FormFactor = 'E-ATX' | 'ATX' | 'Micro-ATX' | 'Mini-ITX';

export interface HardwareComponent {
  id: string;
  name: string;
  category: ComponentCategory;
  brand: string;
  price: number;
  image: string;
  tier: 'budget' | 'mid' | 'high' | 'enthusiast';
  wattage: number; // Consumption for CPU/GPU, Output capacity for PSU, base draw for others
  specs: {
    socket?: SocketType;
    supportedSockets?: SocketType[];
    ddrGen?: DDRGen;
    formFactor?: FormFactor;
    supportedFormFactors?: FormFactor[];
    psuWattage?: number;
    ramSpeed?: string;
    ramCapacity?: string;
    vram?: string;
    storageType?: 'NVMe SSD' | 'SATA SSD';
    capacity?: string;
    cores?: string;
    clockSpeed?: string;
    modular?: boolean;
    efficiencyRating?: '80+ Bronze' | '80+ Gold' | '80+ Platinum' | '80+ Titanium';
  };
  description: string;
}

export type SelectedParts = {
  [K in ComponentCategory]?: HardwareComponent | null;
};

export interface IncompatibilityDetail {
  category: ComponentCategory;
  relatedCategory?: ComponentCategory;
  message: string;
  severity: 'error' | 'warning';
}

export interface CompatibilityReport {
  isCompatible: boolean;
  totalWattage: number;
  psuCapacity: number;
  totalPrice: number;
  errors: IncompatibilityDetail[];
  warnings: IncompatibilityDetail[];
  categoryStatus: Record<ComponentCategory, {
    selected: boolean;
    isCompatible: boolean;
    reason?: string;
  }>;
}

export interface PresetBuild {
  id: string;
  name: string;
  tagline: string;
  description: string;
  estimatedPrice: number;
  targetResolution: '1080p' | '1440p' | '4K' | 'Workstation';
  category: 'Gaming / Streaming' | 'Content Creation' | 'Engineering Works' | 'Data Science and others';
  parts: SelectedParts;
  badge: string;
  image?: string;
  tier?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: 'error' | 'warning' | 'info' | 'success';
}

export interface FilterState {
  searchQuery: string;
  maxPrice: number;
  minPrice: number;
  selectedBrand: string;
  selectedTier: string;
  hideIncompatible: boolean;
}
