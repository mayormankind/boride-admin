"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { adminAuth, type Admin } from "@/lib/admin-api";

interface AdminAuthContextValue {
  admin: Admin | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(
  undefined
);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await adminAuth.me();
      if (response.data.success) {
        setAdmin(response.data.data);
      } else {
        setAdmin(null);
        if (pathname !== "/login") {
          router.replace("/login");
        }
      }
    } catch (error) {
      setAdmin(null);
      if (pathname !== "/login") {
        router.replace("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await adminAuth.login(email, password);
    if (response.data.success) {
      setAdmin(response.data.data);
      router.push("/dashboard");
    }
  };

  const logout = async () => {
    try {
      await adminAuth.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setAdmin(null);
      router.replace("/login");
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isLoading,
        isAuthenticated: !!admin,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}
