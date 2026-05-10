"use client";

import { useState, useEffect } from "react";

export default function AdminAllOrdersPage() {
  const COMMISSION_PAR_ACCOUNT = parseFloat(process.env.NEXT_PUBLIC_COMMISSION_PAR_ACCOUNT);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: ""
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/orders");
        const data = await res.json();

        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);



  const filteredOrders = orders.filter(order => {
    if (filter !== "all" && order.status !== filter) return false;

    if (search) {
      const text = search.toLowerCase();

      if (
        !order._id.toLowerCase().includes(text) &&
        !order.buyer?.name?.toLowerCase().includes(text) &&
        !order.seller?.name?.toLowerCase().includes(text)
      ) return false;
    }

    if (dateRange.start && new Date(order.createdAt) < new Date(dateRange.start)) return false;
    if (dateRange.end && new Date(order.createdAt) > new Date(dateRange.end)) return false;

    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
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
    totalRevenue: orders.reduce((sum, o) => sum + (o.price || 0), 0),
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      let endpoint = "";

      if (newStatus === "processing") {
        endpoint = `/api/orders/${orderId}/pay`;
      } else if (newStatus === "completed") {
        endpoint = `/api/orders/${orderId}/deliver`;
      }

      if (!endpoint) return;

      const res = await fetch(endpoint, {
        method: "PATCH",
      });

      const data = await res.json();

      if (data.success) {
        fetchOrders(); // refresh
      } else {
        alert("Failed to update");
      }

    } catch (err) {
      console.error(err);
    }
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
            <div className="text-sm text-gray-600">Platform Commission (${COMMISSION_PAR_ACCOUNT}%)</div>
            {/* <div className="text-3xl font-bold text-green-600">PKR {stats.totalCommission.toLocaleString()}</div> */}
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
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{order._id}</div>
                    <div className="text-sm text-gray-500">{order.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{order.accountId._id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm">
                        <span className="text-gray-600">Buyer: </span>
                        <span className="font-medium">{order.buyer?.name}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Seller: </span>
                        <span className="font-medium">{order.seller?.name}</span>
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
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
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
                    {order.payment?.status}
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