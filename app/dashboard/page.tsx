"use client";

import { useQuery } from "@tanstack/react-query";
import { adminDashboard } from "@/lib/admin-api";
import { Users, Car, MapPin, Activity } from "lucide-react";

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const response = await adminDashboard.getStats();
      return response.data.data;
    },
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load dashboard statistics</p>
      </div>
    );
  }

  const stats = [
    {
      name: "Total Students",
      value: data?.totalStudents || 0,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      name: "Total Drivers",
      value: data?.totalDrivers || 0,
      icon: Car,
      color: "bg-green-500",
    },
    {
      name: "Total Rides",
      value: data?.totalRides || 0,
      icon: MapPin,
      color: "bg-purple-500",
    },
    {
      name: "Active Rides",
      value: data?.activeRides || 0,
      icon: Activity,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Platform overview and key metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.name}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          Welcome to BoRide Admin
        </h2>
        <p className="text-blue-700">
          Monitor platform activity, manage users, and oversee ride operations
          from this dashboard. Navigate using the sidebar to access detailed
          management pages.
        </p>
      </div>
    </div>
  );
}
