"use client";

import { useState, useEffect } from "react";

export default function AdminAllOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: ""
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders([
        {
          id: "ORD001",
          account: "Diamond Tier FF Account",
          buyer: "Ali Ahmed",
          seller: "Ahmed Raza",
          price: 3500,
          status: "completed",
          date: "2024-01-15",
          paymentMethod: "JazzCash",
          deliveryTime: "5 minutes",
          commission: 175
        },
        {
          id: "ORD002",
          account: "Heroic Season 28 Account",
          buyer: "Sara Khan",
          seller: "Sara Khan",
          price: 5200,
          status: "pending",
          date: "2024-01-14",
          paymentMethod: "EasyPaisa",
          deliveryTime: "Pending",
          commission: 260
        },
        {
          id: "ORD003",
          account: "Platinum VIP Account",
          buyer: "Bilal Raza",
          seller: "Bilal Ahmed",
          price: 2500,
          status: "processing",
          date: "2024-01-13",
          paymentMethod: "Bank Transfer",
          deliveryTime: "15 minutes",
          commission: 125
        },
        {
          id: "ORD004",
          account: "Gold Rank Account",
          buyer: "Usman Ali",
          seller: "Usman Ali",
          price: 1800,
          status: "completed",
          date: "2024-01-12",
          paymentMethod: "JazzCash",
          deliveryTime: "8 minutes",
          commission: 90
        },
        {
          id: "ORD005",
          account: "Silver Starter Account",
          buyer: "Fatima Noor",
          seller: "Fatima Noor",
          price: 1200,
          status: "cancelled",
          date: "2024-01-11",
          paymentMethod: "EasyPaisa",
          deliveryTime: "N/A",
          commission: 0
        },
        {
          id: "ORD006",
          account: "Diamond II Account",
          buyer: "Ahmed Raza",
          seller: "Pro FF Accounts",
          price: 4500,
          status: "completed",
          date: "2024-01-10",
          paymentMethod: "Bank Transfer",
          deliveryTime: "12 minutes",
          commission: 225
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredOrders = orders.filter(order => {
    if (filter !== "all" && order.status !== filter) return false;
    if (search && !order.id.includes(search) && 
        !order.account.toLowerCase().includes(search.toLowerCase()) &&
        !order.buyer.toLowerCase().includes(search.toLowerCase())) return false;
    
    if (dateRange.start && new Date(order.date) < new Date(dateRange.start)) return false;
    if (dateRange.end && new Date(order.date) > new Date(dateRange.end)) return false;
    
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
    total: orders.length,
    completed: orders.filter(o => o.status === 'completed').length,
    pending: orders.filter(o => o.status === 'pending').length,
    totalRevenue: orders.reduce((sum, o) => sum + o.price, 0),
    totalCommission: orders.reduce((sum, o) => sum + o.commission, 0),
    avgDeliveryTime: orders.filter(o => o.status === 'completed').length > 0 
      ? Math.round(orders.filter(o => o.status === 'completed').reduce((sum, o) => {
          const time = parseInt(o.deliveryTime);
          return sum + (isNaN(time) ? 0 : time);
        }, 0) / orders.filter(o => o.status === 'completed').length)
      : 0
  };

  const handleStatusChange = async (orderId, newStatus) => {
    // Simulate API call
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    alert(`Order ${orderId} status changed to ${newStatus}`);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
        <p className="mt-4 text-gray-600">Loading orders...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Account Orders</h1>
        <p className="text-gray-600 mt-2">Manage and monitor all account sales orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-gray-600">Total Orders</div>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-gray-600">Completed</div>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-purple-600">PKR {stats.totalRevenue.toLocaleString()}</div>
          <div className="text-gray-600">Total Revenue</div>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-yellow-600">{stats.avgDeliveryTime} min</div>
          <div className="text-gray-600">Avg. Delivery Time</div>
        </div>
      </div>

      {/* Commission Stats */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-600">Platform Commission (5%)</div>
            <div className="text-3xl font-bold text-green-600">PKR {stats.totalCommission.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Seller Earnings</div>
            <div className="text-3xl font-bold text-blue-600">PKR {(stats.totalRevenue - stats.totalCommission).toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search by Order ID, Account, or Buyer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Export Orders
            </button>
          </div>
        </div>
        
        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <button
              onClick={() => setDateRange({ start: "", end: "" })}
              className="w-full mt-6 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Clear Dates
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buyer/Seller</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{order.id}</div>
                    <div className="text-sm text-gray-500">{order.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{order.account}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm">
                        <span className="text-gray-600">Buyer: </span>
                        <span className="font-medium">{order.buyer}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Seller: </span>
                        <span className="font-medium">{order.seller}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-blue-600">PKR {order.price.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">
                      Commission: PKR {order.commission}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
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
                    <div className="text-sm">{order.paymentMethod}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{order.deliveryTime}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200">
                        View
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200">
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

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-2">No orders found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-bold mb-4">Order Status Summary</h3>
          <div className="space-y-3">
            {[
              { status: 'Completed', count: stats.completed, color: 'bg-green-500' },
              { status: 'Processing', count: orders.filter(o => o.status === 'processing').length, color: 'bg-blue-500' },
              { status: 'Pending', count: stats.pending, color: 'bg-yellow-500' },
              { status: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length, color: 'bg-red-500' }
            ].map((item) => (
              <div key={item.status} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span>{item.status}</span>
                </div>
                <span className="font-bold">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-bold mb-4">Payment Methods</h3>
          <div className="space-y-3">
            {[
              { method: 'JazzCash', count: orders.filter(o => o.paymentMethod === 'JazzCash').length },
              { method: 'EasyPaisa', count: orders.filter(o => o.paymentMethod === 'EasyPaisa').length },
              { method: 'Bank Transfer', count: orders.filter(o => o.paymentMethod === 'Bank Transfer').length }
            ].map((item) => (
              <div key={item.method} className="flex items-center justify-between">
                <span>{item.method}</span>
                <span className="font-bold">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-bold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
              Generate Sales Report
            </button>
            <button className="w-full px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
              Send Bulk Notifications
            </button>
            <button className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
              View Disputes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}