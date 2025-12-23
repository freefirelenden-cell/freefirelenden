"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthProvider";
import { getAccountsOrders } from "@/lib/apiClient";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (isLoading || !user) return;
    async function load() {
      try {
        const res = await getAccountsOrders(user.id);
        setOrders(res.orders)
      } catch (error) {
        console.error(error, "order getting error")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user, isLoading])


 

  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  const handleUpdateStatus = async (orderId, newStatus) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOrders(prev => prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      setLoading(false);
      alert(`Order marked as ${newStatus}`);
    }, 800);
  };

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
    totalEarnings: orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.price, 0)
  };

  if (loading && orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading orders...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account Orders</h1>
        <p className="text-gray-600 mt-2">Manage orders for your listed accounts</p>
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
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-gray-600">Pending</div>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-purple-600">PKR {stats.totalEarnings.toLocaleString()}</div>
          <div className="text-gray-600">Total Earnings</div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white border rounded-xl p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            All Orders ({stats.total})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-lg ${filter === "completed" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            Completed ({stats.completed})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg ${filter === "pending" ? "bg-yellow-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setFilter("processing")}
            className={`px-4 py-2 rounded-lg ${filter === "processing" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            Processing ({orders.filter(o => o.status === 'processing').length})
          </button>
          <button
            onClick={() => setFilter("cancelled")}
            className={`px-4 py-2 rounded-lg ${filter === "cancelled" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            Cancelled ({orders.filter(o => o.status === 'cancelled').length})
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-bold mb-2">No orders found</h3>
            <p className="text-gray-600">
              {filter === "all"
                ? "You haven't received any orders yet."
                : `No ${filter} orders found.`}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buyer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
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
                      <div className="text-sm text-gray-500">{order.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{order.buyer}</div>
                      <div className="text-sm text-gray-500">{order.buyerPhone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-blue-600">PKR {order.price.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">After 5% commission: PKR {(order.price * 0.95).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{order.deliveryTime}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        {order.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'processing')}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
                            >
                              Start Processing
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
                            >
                              Cancel Order
                            </button>
                          </>
                        )}

                        {order.status === 'processing' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'completed')}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200"
                          >
                            Mark as Delivered
                          </button>
                        )}

                        <Link
                          href={`/seller/orders/${order.id}`}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 text-center"
                        >
                          View Details
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delivery Instructions */}
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <h3 className="font-bold text-blue-800 mb-2">🚚 Delivery Process</h3>
        <ol className="text-sm text-blue-700 space-y-2">
          <li>1. When order is received, contact buyer via provided phone number</li>
          <li>2. Share account credentials securely (use WhatsApp for sensitive info)</li>
          <li>3. Transfer Gmail account to buyer's email</li>
          <li>4. Mark order as "Processing" while transfer is in progress</li>
          <li>5. Once buyer confirms receipt, mark as "Completed"</li>
          <li>6. You'll receive payment within 24 hours after completion</li>
        </ol>
      </div>
    </div>
  );
}