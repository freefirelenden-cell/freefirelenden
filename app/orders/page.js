"use client";

import { useState, useEffect } from "react";
import Link from "next/link";


export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [topups, setTopups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("accounts");

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      // Account orders
      setOrders([
        {
          id: "ORD001",
          account: "Diamond Tier FF Account",
          price: 3500,
          status: "delivered",
          date: "2024-01-15",
          seller: "Ahmed Raza",
          deliveryTime: "5 minutes",
          rating: 5,
          canRate: true
        },
        {
          id: "ORD002",
          account: "Heroic Season 28 Account",
          price: 5200,
          status: "processing",
          date: "2024-01-14",
          seller: "Sara Khan",
          deliveryTime: "Pending",
          rating: null,
          canRate: false
        },
        {
          id: "ORD003",
          account: "Platinum VIP Account",
          price: 2500,
          status: "cancelled",
          date: "2024-01-13",
          seller: "Bilal Raza",
          deliveryTime: "N/A",
          rating: null,
          canRate: false
        },
        {
          id: "ORD004",
          account: "Gold Rank Account",
          price: 1800,
          status: "delivered",
          date: "2024-01-12",
          seller: "Usman Ali",
          deliveryTime: "8 minutes",
          rating: 4,
          canRate: false
        }
      ]);

      // Top-up orders
      setTopups([
        {
          id: "TOP001",
          playerId: "1234567890",
          diamonds: 1000,
          price: 1200,
          status: "completed",
          date: "2024-01-15",
          seller: "Diamond Seller",
          completionTime: "10 minutes",
          rating: 5
        },
        {
          id: "TOP002",
          playerId: "9876543210",
          diamonds: 500,
          price: 600,
          status: "pending",
          date: "2024-01-14",
          seller: "Quick Top-Up",
          completionTime: "Pending",
          rating: null
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const handleRateOrder = (orderId, rating) => {
    // Simulate API call
    alert(`Rating submitted: ${rating} stars for order ${orderId}`);
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, rating, canRate: false } : order
    ));
  };

  const handleCancelOrder = (orderId) => {
    if (confirm("Are you sure you want to cancel this order?")) {
      // Simulate API call
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      ));
      alert("Order cancelled successfully");
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered':
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'delivered': return 'Delivered';
      case 'completed': return 'Completed';
      case 'processing': return 'Processing';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const stats = {
    totalOrders: orders.length + topups.length,
    completedOrders: orders.filter(o => o.status === 'delivered').length + 
                    topups.filter(t => t.status === 'completed').length,
    totalSpent: [...orders, ...topups].reduce((sum, item) => sum + item.price, 0)
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
              <p className="mt-4 text-gray-600">Loading your orders...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">My Orders</h1>
            <p className="text-blue-100">Track and manage all your purchases</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="text-2xl font-bold text-blue-600">{stats.totalOrders}</div>
              <div className="text-gray-600">Total Orders</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="text-2xl font-bold text-green-600">{stats.completedOrders}</div>
              <div className="text-gray-600">Completed</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="text-2xl font-bold text-purple-600">PKR {stats.totalSpent.toLocaleString()}</div>
              <div className="text-gray-600">Total Spent</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border mb-6">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab("accounts")}
                className={`flex-1 px-6 py-4 font-medium ${activeTab === "accounts" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"}`}
              >
                Account Orders ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab("topups")}
                className={`flex-1 px-6 py-4 font-medium ${activeTab === "topups" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"}`}
              >
                Top-Up Orders ({topups.length})
              </button>
            </div>

            {/* Orders Content */}
            <div className="p-6">
              {activeTab === "accounts" ? (
                orders.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">📦</div>
                    <h3 className="text-xl font-bold mb-2">No account orders yet</h3>
                    <p className="text-gray-600 mb-6">You haven't purchased any accounts yet.</p>
                    <Link
                      href="/shop"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Browse Accounts
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-xl p-6 hover:shadow-sm transition-shadow">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{order.account}</h3>
                            <div className="flex items-center gap-4 mt-2">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                              <span className="text-gray-600">Order #{order.id}</span>
                              <span className="text-gray-600">{order.date}</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">PKR {order.price.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">Delivery: {order.deliveryTime}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-sm text-gray-500">Seller</div>
                            <div className="font-medium">{order.seller}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-sm text-gray-500">Order Date</div>
                            <div className="font-medium">{order.date}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-sm text-gray-500">Delivery Time</div>
                            <div className="font-medium">{order.deliveryTime}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-sm text-gray-500">Rating</div>
                            <div className="flex items-center">
                              {order.rating ? (
                                <>
                                  {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < order.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                      ★
                                    </span>
                                  ))}
                                  <span className="ml-2">({order.rating}/5)</span>
                                </>
                              ) : (
                                <span className="text-gray-500">Not rated</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium">
                            View Details
                          </button>
                          
                          {order.status === 'processing' && (
                            <button
                              onClick={() => handleCancelOrder(order.id)}
                              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium"
                            >
                              Cancel Order
                            </button>
                          )}
                          
                          {order.status === 'delivered' && order.canRate && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Rate this order:</span>
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <button
                                  key={rating}
                                  onClick={() => handleRateOrder(order.id, rating)}
                                  className="text-2xl hover:text-yellow-400"
                                >
                                  ★
                                </button>
                              ))}
                            </div>
                          )}
                          
                          {order.status === 'delivered' && (
                            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-medium">
                              Download Invoice
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* Top-Up Orders */
                topups.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">💎</div>
                    <h3 className="text-xl font-bold mb-2">No top-up orders yet</h3>
                    <p className="text-gray-600 mb-6">You haven't purchased any diamond top-ups yet.</p>
                    <Link
                      href="/topup"
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Buy Diamonds
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {topups.map((topup) => (
                      <div key={topup.id} className="border rounded-xl p-6 hover:shadow-sm transition-shadow">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">
                              💎 {topup.diamonds.toLocaleString()} Diamonds Top-Up
                            </h3>
                            <div className="flex items-center gap-4 mt-2">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(topup.status)}`}>
                                {getStatusText(topup.status)}
                              </span>
                              <span className="text-gray-600">Order #{topup.id}</span>
                              <span className="text-gray-600">{topup.date}</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-purple-600">PKR {topup.price.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">Time: {topup.completionTime}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-sm text-gray-500">Player ID</div>
                            <div className="font-mono font-medium">{topup.playerId}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-sm text-gray-500">Seller</div>
                            <div className="font-medium">{topup.seller}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-sm text-gray-500">Status</div>
                            <div className="font-medium">{getStatusText(topup.status)}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-sm text-gray-500">Rating</div>
                            <div className="flex items-center">
                              {topup.rating ? (
                                <>
                                  {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < topup.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                      ★
                                    </span>
                                  ))}
                                  <span className="ml-2">({topup.rating}/5)</span>
                                </>
                              ) : (
                                <span className="text-gray-500">Not rated</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium">
                            View Details
                          </button>
                          
                          {topup.status === 'pending' && (
                            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium">
                              Cancel Order
                            </button>
                          )}
                          
                          {topup.status === 'completed' && (
                            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-medium">
                              Download Receipt
                            </button>
                          )}
                          
                          <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 text-sm font-medium">
                            Contact Support
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Need Help with Your Orders?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold mb-2">📞 Contact Support</h4>
                <p className="text-sm text-gray-600">Call us at 0300-FFLENDEN for quick assistance</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold mb-2">💬 WhatsApp Support</h4>
                <p className="text-sm text-gray-600">Message us on WhatsApp for instant help</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold mb-2">📧 Email Support</h4>
                <p className="text-sm text-gray-600">Email us at support@freefirelenden.pk</p>
              </div>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="mt-8 text-center">
            <Link
              href={activeTab === "accounts" ? "/shop" : "/topup"}
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-bold"
            >
              {activeTab === "accounts" ? "Continue Shopping" : "Buy More Diamonds"}
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}