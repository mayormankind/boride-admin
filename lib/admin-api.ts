//lib/admin-api.ts
import axios from "axios";
import { Admin, DashboardStats, Driver, PaginatedResponse, Ride, Student } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Create axios instance for admin API
const adminApi = axios.create({
  baseURL: `${API_BASE_URL}/admin`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to handle errors globally
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthToken();
      // Redirect to login on unauthorized
      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/login"
      ) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

let storedToken: string | null = null;

export const setAuthToken = (token: string) => {
  storedToken = token;
  if (typeof window !== "undefined") {
    localStorage.setItem("admin_token", token);
  }
};

export const getAuthToken = () => {
  if (!storedToken && typeof window !== "undefined") {
    storedToken = localStorage.getItem("admin_token");
  }
  return storedToken;
};

export const clearAuthToken = () => {
  storedToken = null;
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_token");
  }
};

// Request interceptor to add token
adminApi.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========== AUTH API ==========
export const adminAuth = {
  login: async (email: string, password: string) => {
    const response = await adminApi.post<{
      success: boolean;
      data: Admin;
      token?: string;
    }>("/auth/login", {
      email,
      password,
    });
    if (response.data.token) {
      setAuthToken(response.data.token);
    }
    return response;
  },

  me: () => adminApi.get<{ success: boolean; data: Admin }>("/auth/me"),

  logout: () => adminApi.post<{ success: boolean }>("/auth/logout"),
};

// ========== DASHBOARD API ==========
export const adminDashboard = {
  getStats: () =>
    adminApi.get<{ success: boolean; data: DashboardStats }>(
      "/dashboard/stats"
    ),
};

// ========== STUDENTS API ==========
export const adminStudents = {
  getAll: (page = 1, limit = 20) =>
    adminApi.get<PaginatedResponse<Student>>("/students", {
      params: { page, limit },
    }),

  updateStatus: (id: string, isVerified: boolean) =>
    adminApi.patch<{ success: boolean; data: Student }>(
      `/students/${id}/status`,
      { isVerified }
    ),
};

// ========== DRIVERS API ==========
export const adminDrivers = {
  getAll: (page = 1, limit = 20) =>
    adminApi.get<PaginatedResponse<Driver>>("/drivers", {
      params: { page, limit },
    }),

  updateStatus: (id: string, isVerified: boolean) =>
    adminApi.patch<{ success: boolean; data: Driver }>(
      `/drivers/${id}/status`,
      { isVerified }
    ),
};

// ========== RIDES API ==========
export const adminRides = {
  getAll: (page = 1, limit = 20) =>
    adminApi.get<PaginatedResponse<Ride>>("/rides", {
      params: { page, limit },
    }),
};

export default adminApi;
