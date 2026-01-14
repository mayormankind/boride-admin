"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminRides, type Ride } from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin } from "lucide-react";
import { format } from "date-fns";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-blue-100 text-blue-800",
  ongoing: "bg-purple-100 text-purple-800",
  completion_requested: "bg-orange-100 text-orange-800",
  completed: "bg-green-100 text-green-800",
  disputed: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-800",
};

export default function RidesPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["rides", page],
    queryFn: async () => {
      const response = await adminRides.getAll(page, 20);
      return response.data.data;
    },
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load rides</p>
      </div>
    );
  }

  const rides = (data?.rides as Ride[]) || [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Rides</h1>
        <p className="text-gray-600 mt-1">
          Monitor all ride activity on the platform
        </p>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <p className="text-sm text-gray-600">
          Total Rides:{" "}
          <span className="font-semibold text-gray-900">
            {pagination?.total || 0}
          </span>
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fare
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rides.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No rides found
                  </td>
                </tr>
              ) : (
                rides.map((ride) => (
                  <tr key={ride._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {ride.student ? (
                        <div>
                          <div className="font-medium text-gray-900">
                            {ride.student.fullName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {ride.student.phoneNo}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">No student</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {ride.driver ? (
                        <div>
                          <div className="font-medium text-gray-900">
                            {ride.driver.fullName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {ride.driver.phoneNo}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="flex items-start gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                          <span className="text-gray-900 line-clamp-1">
                            {ride.pickupLocation.address}
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-sm mt-1">
                          <MapPin className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                          <span className="text-gray-900 line-clamp-1">
                            {ride.dropoffLocation.address}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₦{ride.fare.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          ride.paymentMethod === "Wallet"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {ride.paymentMethod}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[
                            ride.status as keyof typeof statusColors
                          ] || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {ride.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(ride.createdAt), "MMM dd, HH:mm")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.pages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= pagination.pages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
