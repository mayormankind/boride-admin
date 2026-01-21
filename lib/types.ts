// ========== TYPES ==========
export interface Admin {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin: string | null;
}

export interface Student {
  _id: string;
  fullName: string;
  email: string;
  matricNo: string;
  phoneNo: string | null;
  isVerified: boolean;
  walletBalance: number;
  createdAt: string;
}

export interface Driver {
  _id: string;
  fullName: string;
  email: string;
  phoneNo: string;
  isVerified: boolean;
  isAvailable: boolean;
  vehicleInfo: {
    make: string | null;
    model: string | null;
    plateNumber: string | null;
    color: string | null;
    year: number | null;
  };
  rating: number;
  totalRides: number;
  createdAt: string;
}

export interface Ride {
  _id: string;
  student: {
    _id: string;
    fullName: string;
    phoneNo: string;
    email: string;
  } | null;
  driver: {
    _id: string;
    fullName: string;
    phoneNo: string;
    vehicleInfo: {
      make: string | null;
      model: string | null;
      plateNumber: string | null;
    };
  } | null;
  pickupLocation: {
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  dropoffLocation: {
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  fare: number;
  paymentMethod: "Cash" | "Wallet";
  status: string;
  createdAt: string;
  startTime: string | null;
  endTime: string | null;
}

export interface DashboardStats {
  totalStudents: number;
  totalDrivers: number;
  totalRides: number;
  activeRides: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    pagination: Pagination;
    [key: string]: T[] | Pagination;
  };
}
