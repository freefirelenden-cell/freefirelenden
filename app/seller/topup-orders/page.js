"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function TopupOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders([
        {
          id: "TOP001",
          playerId: "1234567890",
          server: "Pakistan",
          diamonds: 1000,
          price: 1200,
          status: "pending",
          buyer: "Ali Ahmed",
          buyerPhone: "0300-1234567",
          date: "2024-01-15",
          paymentMethod: "JazzCash"
        },
        {
          id: "TOP002",
          playerId: "9876543210",
          server: "Pakistan",
          diamonds: 500,
          price: 600,
          status: "completed",
          buyer: "Sara Khan",
          buyerPhone: "0312-7654321",
          date: "2024-01-14",
          paymentMethod: "EasyPaisa",
          completionTime: "10 minutes"
        },
        {
          id: "TOP003",
          playerId: "1122334455",
          server: "Pakistan",
          diamonds: 2000,
          price: 2400,
          status: "processing",
          buyer: "Bilal Raza",
          buyerPhone: "0333-9876543",
          date: "2024-01-13",
          paymentMethod: "Bank Transfer",
          completionTime: "Processing"
        },
        {
          id: "TOP004",
          playerId: "6677889900",
          server: "Pakistan",
          diamonds: 100,
          price: 120,
          status: "cancelled",
          buyer: "Usman Ali",
          buyerPhone: "0301-1122334",
          date: "2024-01-12",
          paymentMethod: "JazzCash"
        },
        {
          id: "TOP005",
          playerId: "5544332211",
          server: "Pakistan",
          diamonds: 5000,
          price: 6000,
          status: "pending",
          buyer: "Fatima Noor",
          buyerPhone: "0345-5566778",
          date: "2024-01-11",
          paymentMethod: "EasyPaisa"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  const handleUpdateStatus = async (orderId, newStatus) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { 
          ...order, 
          status: newStatus,
          ...(newStatus === 'completed' ? { completionTime: '5 minutes' } : {})
        } : order
      ));
      setLoading(false);
      alert(`Order marked as ${newStatus}`);
    }, 800);
  };

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
    totalEarnings: orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.price, 0)
  };

  if (loading && orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading top-up orders...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Diamond Top-Up Orders</h1>
        <p className="text-gray-600 mt-2">Manage Free Fire diamond recharge orders</p>
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
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-gray-600">Pending</div>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-blue-600">PKR {stats.totalEarnings.toLocaleString()}</div>
          <div className="text-gray-600">Total Earnings</div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white border rounded-xl p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg ${filter === "all" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
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
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">💎</div>
            <h3 className="text-xl font-bold mb-2">No top-up orders found</h3>
            <p className="text-gray-600">
              {filter === "all" 
                ? "You haven't received any top-up orders yet." 
                : `No ${filter} top-up orders found.`}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Player ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Diamonds</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buyer</th>
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
                      <div className="font-mono text-gray-900">{order.playerId}</div>
                      <div className="text-sm text-gray-500">{order.server}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">💎</span>
                        <div>
                          <div className="font-bold">{order.diamonds.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">diamonds</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-purple-600">PKR {order.price.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{order.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      {order.completionTime && (
                        <div className="text-xs text-gray-500 mt-1">{order.completionTime}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{order.buyer}</div>
                      <div className="text-sm text-gray-500">{order.buyerPhone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        {order.status === 'pending' && (
                          <>
                            <Link
                              href={`/seller/topup-orders/${order.id}`}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 text-center"
                            >
                              Approve & Process
                            </Link>
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        
                        {order.status === 'processing' && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, 'completed')}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200"
                          >
                            Mark as Completed
                          </button>
                        )}
                        
                        <Link
                          href={`/seller/topup-orders/${order.id}`}
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

      {/* Top-Up Process Info */}
      <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl">
        <h3 className="font-bold text-purple-800 mb-4">⚡ How to Process Top-Up Orders</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl mb-2">1️⃣</div>
            <h4 className="font-bold mb-2">Verify Order</h4>
            <p className="text-sm text-gray-600">Check Player ID and diamond amount in order details</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl mb-2">2️⃣</div>
            <h4 className="font-bold mb-2">Recharge Diamonds</h4>
            <p className="text-sm text-gray-600">Use your diamond source to recharge player's account</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl mb-2">3️⃣</div>
            <h4 className="font-bold mb-2">Confirm & Update</h4>
            <p className="text-sm text-gray-600">Mark as completed once diamonds are delivered</p>
          </div>
        </div>
      </div>
    </div>
  );
}