"use client";

import { useState, useEffect } from "react";

export default function AdminAllTopupsPage() {
  const [topups, setTopups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTopups([
        {
          id: "TOP001",
          playerId: "1234567890",
          server: "Pakistan",
          diamonds: 1000,
          price: 1200,
          status: "completed",
          buyer: "Ali Ahmed",
          seller: "Diamond Seller",
          date: "2024-01-15",
          paymentMethod: "JazzCash",
          completionTime: "10 minutes",
          commission: 36
        },
        {
          id: "TOP002",
          playerId: "9876543210",
          server: "Pakistan",
          diamonds: 500,
          price: 600,
          status: "pending",
          buyer: "Sara Khan",
          seller: "Quick Top-Up",
          date: "2024-01-14",
          paymentMethod: "EasyPaisa",
          completionTime: "Pending",
          commission: 18
        },
        {
          id: "TOP003",
          playerId: "1122334455",
          server: "Pakistan",
          diamonds: 2000,
          price: 2400,
          status: "processing",
          buyer: "Bilal Raza",
          seller: "Premium Top-Ups",
          date: "2024-01-13",
          paymentMethod: "Bank Transfer",
          completionTime: "Processing",
          commission: 72
        },
        {
          id: "TOP004",
          playerId: "6677889900",
          server: "Pakistan",
          diamonds: 100,
          price: 120,
          status: "cancelled",
          buyer: "Usman Ali",
          seller: "Fast Diamonds",
          date: "2024-01-12",
          paymentMethod: "JazzCash",
          completionTime: "N/A",
          commission: 0
        },
        {
          id: "TOP005",
          playerId: "5544332211",
          server: "Pakistan",
          diamonds: 5000,
          price: 6000,
          status: "completed",
          buyer: "Fatima Noor",
          seller: "Elite Diamonds",
          date: "2024-01-11",
          paymentMethod: "EasyPaisa",
          completionTime: "15 minutes",
          commission: 180
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredTopups = topups.filter(topup => {
    if (filter !== "all" && topup.status !== filter) return false;
    if (search && !topup.id.includes(search) && 
        !topup.playerId.includes(search) &&
        !topup.buyer.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: topups.length,
    completed: topups.filter(t => t.status === 'completed').length,
    pending: topups.filter(t => t.status === 'pending').length,
    totalRevenue: topups.reduce((sum, t) => sum + t.price, 0),
    totalCommission: topups.reduce((sum, t) => sum + t.commission, 0),
    totalDiamonds: topups.reduce((sum, t) => sum + t.diamonds, 0),
    avgCompletionTime: topups.filter(t => t.status === 'completed').length > 0 
      ? Math.round(topups.filter(t => t.status === 'completed').reduce((sum, t) => {
          const time = parseInt(t.completionTime);
          return sum + (isNaN(time) ? 0 : time);
        }, 0) / topups.filter(t => t.status === 'completed').length)
      : 0
  };

  const handleStatusChange = async (topupId, newStatus) => {
    // Simulate API call
    setTopups(prev => prev.map(topup => 
      topup.id === topupId ? { 
        ...topup, 
        status: newStatus,
        ...(newStatus === 'completed' ? { completionTime: '5 minutes' } : {})
      } : topup
    ));
    alert(`Top-up ${topupId} status changed to ${newStatus}`);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
        <p className="mt-4 text-gray-600">Loading top-up orders...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Top-Up Orders</h1>
        <p className="text-gray-600 mt-2">Manage and monitor all diamond recharge orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
          <div className="text-gray-600">Total Orders</div>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-gray-600">Completed</div>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-blue-600">💎 {stats.totalDiamonds.toLocaleString()}</div>
          <div className="text-gray-600">Total Diamonds</div>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-yellow-600">{stats.avgCompletionTime} min</div>
          <div className="text-gray-600">Avg. Completion Time</div>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-gray-600">Total Revenue</div>
            <div className="text-3xl font-bold text-purple-600">PKR {stats.totalRevenue.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Platform Commission (3%)</div>
            <div className="text-3xl font-bold text-pink-600">PKR {stats.totalCommission.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Seller Earnings</div>
            <div className="text-3xl font-bold text-green-600">PKR {(stats.totalRevenue - stats.totalCommission).toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by Order ID, Player ID, or Buyer..."
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
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Topups Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Player ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Diamonds</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buyer/Seller</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTopups.map((topup) => (
                <tr key={topup.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{topup.id}</div>
                    <div className="text-sm text-gray-500">{topup.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-mono text-gray-900">{topup.playerId}</div>
                    <div className="text-sm text-gray-500">{topup.server}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">💎</span>
                      <div>
                        <div className="font-bold">{topup.diamonds.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">diamonds</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-purple-600">PKR {topup.price.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">
                      Commission: PKR {topup.commission}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(topup.status)}`}>
                        {topup.status}
                      </span>
                      <select
                        value={topup.status}
                        onChange={(e) => handleStatusChange(topup.id, e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-1 text-xs"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm">
                        <span className="text-gray-600">Buyer: </span>
                        <span className="font-medium">{topup.buyer}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Seller: </span>
                        <span className="font-medium">{topup.seller}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{topup.completionTime}</div>
                    <div className="text-xs text-gray-500">{topup.paymentMethod}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200">
                        View
                      </button>
                      <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200">
                        Contact
                      </button>
                      <button className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200">
                        Refund
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTopups.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">💎</div>
            <h3 className="text-xl font-bold mb-2">No top-up orders found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-bold mb-4">Diamond Packages</h3>
          <div className="space-y-4">
            {[
              { diamonds: 100, price: 120, orders: topups.filter(t => t.diamonds === 100).length },
              { diamonds: 500, price: 600, orders: topups.filter(t => t.diamonds === 500).length },
              { diamonds: 1000, price: 1200, orders: topups.filter(t => t.diamonds === 1000).length },
              { diamonds: 2000, price: 2400, orders: topups.filter(t => t.diamonds === 2000).length },
              { diamonds: 5000, price: 6000, orders: topups.filter(t => t.diamonds === 5000).length }
            ].map((pkg) => (
              <div key={pkg.diamonds} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span>💎</span>
                  <span>{pkg.diamonds.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">PKR {pkg.price}</div>
                  <div className="text-xs text-gray-500">{pkg.orders} orders</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-bold mb-4">Top-Up Performance</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Success Rate</span>
              <span className="font-bold text-green-600">
                {stats.completed}/{stats.total} ({Math.round((stats.completed/stats.total)*100)}%)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Avg. Completion Time</span>
              <span className="font-bold">{stats.avgCompletionTime} min</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Pending Orders</span>
              <span className="font-bold text-yellow-600">{stats.pending}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Cancellation Rate</span>
              <span className="font-bold text-red-600">
                {topups.filter(t => t.status === 'cancelled').length}/{stats.total} ({Math.round((topups.filter(t => t.status === 'cancelled').length/stats.total)*100)}%)
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-bold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200">
              Generate Top-Up Report
            </button>
            <button className="w-full px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
              Notify Pending Orders
            </button>
            <button className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
              Manage Disputes
            </button>
            <button className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
              View Seller Performance
            </button>
          </div>
        </div>
      </div>

      {/* Platform Notice */}
      <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
        <h3 className="font-bold text-yellow-800 mb-2">⚠️ Platform Notice</h3>
        <div className="text-sm text-yellow-700">
          Top-up orders are automatically assigned to available sellers. Ensure all sellers have sufficient 
          diamond inventory and respond within 15 minutes. Monitor completion times to maintain platform reputation.
        </div>
      </div>
    </div>
  );
}