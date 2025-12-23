"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminSellersPage() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSellers([
        {
          id: "1",
          name: "Ahmed Raza",
          shopName: "Pro FF Accounts",
          phone: "0300-1234567",
          email: "ahmed@example.com",
          status: "verified",
          rating: 4.8,
          totalSales: 42,
          totalEarnings: 125000,
          joinDate: "2023-11-15",
          sellingType: "both",
          paymentMethod: "JazzCash"
        },
        {
          id: "2",
          name: "Sara Khan",
          shopName: "Elite Diamonds",
          phone: "0312-7654321",
          email: "sara@example.com",
          status: "verified",
          rating: 4.9,
          totalSales: 28,
          totalEarnings: 84000,
          joinDate: "2023-12-01",
          sellingType: "topup",
          paymentMethod: "EasyPaisa"
        },
        {
          id: "3",
          name: "Bilal Ahmed",
          shopName: "FF Account Store",
          phone: "0333-9876543",
          email: "bilal@example.com",
          status: "pending",
          rating: 0,
          totalSales: 0,
          totalEarnings: 0,
          joinDate: "2024-01-10",
          sellingType: "account",
          paymentMethod: "Bank Transfer"
        },
        {
          id: "4",
          name: "Usman Ali",
          shopName: "Premium Top-Ups",
          phone: "0301-1122334",
          email: "usman@example.com",
          status: "suspended",
          rating: 3.2,
          totalSales: 15,
          totalEarnings: 32000,
          joinDate: "2023-10-05",
          sellingType: "topup",
          paymentMethod: "EasyPaisa",
          suspensionReason: "Multiple complaints"
        },
        {
          id: "5",
          name: "Fatima Noor",
          shopName: "Gaming Hub",
          phone: "0345-5566778",
          email: "fatima@example.com",
          status: "verified",
          rating: 4.5,
          totalSales: 35,
          totalEarnings: 98000,
          joinDate: "2023-11-20",
          sellingType: "both",
          paymentMethod: "JazzCash"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredSellers = sellers.filter(seller => {
    if (filter !== "all" && seller.status !== filter) return false;
    if (search && !seller.name.toLowerCase().includes(search.toLowerCase()) && 
        !seller.shopName.toLowerCase().includes(search.toLowerCase()) &&
        !seller.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleStatusChange = async (sellerId, newStatus) => {
    // Simulate API call
    setSellers(prev => prev.map(seller => 
      seller.id === sellerId ? { ...seller, status: newStatus } : seller
    ));
    alert(`Seller status changed to ${newStatus}`);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSellingTypeBadge = (type) => {
    switch(type) {
      case 'account': return { text: 'Accounts', color: 'bg-blue-100 text-blue-800' };
      case 'topup': return { text: 'Top-Ups', color: 'bg-purple-100 text-purple-800' };
      case 'both': return { text: 'Both', color: 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800' };
      default: return { text: type, color: 'bg-gray-100 text-gray-800' };
    }
  };

  const stats = {
    total: sellers.length,
    verified: sellers.filter(s => s.status === 'verified').length,
    pending: sellers.filter(s => s.status === 'pending').length,
    suspended: sellers.filter(s => s.status === 'suspended').length,
    totalEarnings: sellers.reduce((sum, s) => sum + s.totalEarnings, 0),
    platformCommission: sellers.reduce((sum, s) => sum + (s.totalEarnings * 0.05), 0)
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
        <p className="mt-4 text-gray-600">Loading sellers...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sellers Management</h1>
            <p className="text-gray-600 mt-2">Manage all verified sellers on the platform</p>
          </div>
          <Link
            href="/admin/seller-requests"
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 font-medium"
          >
            View Requests ({sellers.filter(s => s.status === 'pending').length})
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-gray-600">Total Sellers</div>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
          <div className="text-gray-600">Verified</div>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-gray-600">Pending</div>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-red-600">{stats.suspended}</div>
          <div className="text-gray-600">Suspended</div>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="text-2xl font-bold text-green-700">PKR {stats.totalEarnings.toLocaleString()}</div>
          <div className="text-green-600">Total Seller Earnings</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="text-2xl font-bold text-blue-700">PKR {stats.platformCommission.toLocaleString()}</div>
          <div className="text-blue-600">Platform Commission (5%)</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search sellers by name, shop, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="all">All Sellers</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Sellers Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seller</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Services</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sales & Earnings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSellers.map((seller) => (
                <tr key={seller.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{seller.name}</div>
                      <div className="text-sm text-gray-500">{seller.shopName}</div>
                      <div className="text-xs text-gray-400">Joined: {seller.joinDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{seller.phone}</div>
                    <div className="text-sm text-gray-500">{seller.email}</div>
                    <div className="text-xs text-gray-400">{seller.paymentMethod}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSellingTypeBadge(seller.sellingType).color}`}>
                      {getSellingTypeBadge(seller.sellingType).text}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 font-medium">{seller.rating || 'N/A'}</span>
                      <span className="ml-2 text-sm text-gray-500">({seller.totalSales} sales)</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{seller.totalSales} sales</div>
                    <div className="text-sm text-green-600">PKR {seller.totalEarnings.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(seller.status)}`}>
                      {seller.status}
                    </span>
                    {seller.suspensionReason && (
                      <div className="text-xs text-red-600 mt-1">{seller.suspensionReason}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200">
                        View Profile
                      </button>
                      <select
                        value={seller.status}
                        onChange={(e) => handleStatusChange(seller.id, e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                      >
                        <option value="verified">Verified</option>
                        <option value="pending">Pending</option>
                        <option value="suspended">Suspend</option>
                      </select>
                      <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                        Send Message
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSellers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🏪</div>
            <h3 className="text-xl font-bold mb-2">No sellers found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
        <h3 className="font-bold mb-4">Seller Management Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold mb-2 text-green-600">Verified Sellers</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• CNIC verified</li>
              <li>• Bank account confirmed</li>
              <li>• Rating 4.0+ required</li>
              <li>• Fast response time</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold mb-2 text-yellow-600">Pending Approval</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Review within 24 hours</li>
              <li>• Check documents carefully</li>
              <li>• Verify contact information</li>
              <li>• Assess selling capability</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold mb-2 text-red-600">Suspension Reasons</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Multiple complaints</li>
              <li>• Late deliveries</li>
              <li>• Fake accounts</li>
              <li>• Policy violations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}