"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalUsers: 1245,
        totalSellers: 156,
        pendingRequests: 8,
        totalOrders: 5400,
        todayRevenue: 42800,
        totalRevenue: 1256000,
        pendingOrders: 12,
        completedOrders: 5388
      });

      setRecentActivity([
        {
          id: 1,
          user: "Ahmed Raza",
          action: "New seller application",
          time: "5 minutes ago",
          type: "seller_request"
        },
        {
          id: 2,
          user: "Sara Khan",
          action: "Account order completed",
          time: "15 minutes ago",
          type: "order_completed"
        },
        {
          id: 3,
          user: "Bilal Ahmed",
          action: "Top-up order pending",
          time: "30 minutes ago",
          type: "order_pending"
        },
        {
          id: 4,
          user: "Usman Ali",
          action: "Account reported",
          time: "1 hour ago",
          type: "report"
        },
        {
          id: 5,
          user: "Fatima Noor",
          action: "New user registered",
          time: "2 hours ago",
          type: "user_registered"
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getActivityIcon = (type) => {
    switch(type) {
      case 'seller_request': return '📝';
      case 'order_completed': return '✅';
      case 'order_pending': return '⏳';
      case 'report': return '⚠️';
      case 'user_registered': return '👤';
      default: return '📌';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
        <p className="mt-4 text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your marketplace</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-2xl font-bold text-blue-700">{stats.totalUsers}</div>
              <div className="text-sm text-blue-600">Total Users</div>
            </div>
            <div className="text-3xl">👥</div>
          </div>
          <div className="mt-4">
            <Link href="/admin/users" className="text-sm text-blue-600 hover:text-blue-800">
              View all users →
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-2xl font-bold text-green-700">{stats.totalSellers}</div>
              <div className="text-sm text-green-600">Verified Sellers</div>
            </div>
            <div className="text-3xl">🏪</div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-green-600">
              {stats.pendingRequests} pending requests
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-2xl font-bold text-purple-700">{stats.totalOrders}</div>
              <div className="text-sm text-purple-600">Total Orders</div>
            </div>
            <div className="text-3xl">📦</div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-purple-600">
              {stats.pendingOrders} pending • {stats.completedOrders} completed
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-2xl font-bold text-red-700">PKR {stats.todayRevenue?.toLocaleString()}</div>
              <div className="text-sm text-red-600">Today's Revenue</div>
            </div>
            <div className="text-3xl">💰</div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-red-600">
              Total: PKR {stats.totalRevenue?.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/seller-requests"
            className="bg-white border-2 border-dashed border-gray-300 hover:border-red-500 hover:bg-red-50 p-6 rounded-xl text-center transition-colors"
          >
            <div className="text-3xl mb-2">📝</div>
            <div className="font-medium">Review Requests</div>
            <div className="text-sm text-gray-600 mt-1">{stats.pendingRequests} pending</div>
          </Link>
          
          <Link
            href="/admin/sellers"
            className="bg-white border border-gray-200 hover:border-green-500 hover:bg-green-50 p-6 rounded-xl text-center transition-colors"
          >
            <div className="text-3xl mb-2">🏪</div>
            <div className="font-medium">Manage Sellers</div>
            <div className="text-sm text-gray-600 mt-1">{stats.totalSellers} sellers</div>
          </Link>
          
          <Link
            href="/admin/all-orders"
            className="bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 p-6 rounded-xl text-center transition-colors"
          >
            <div className="text-3xl mb-2">📦</div>
            <div className="font-medium">View Orders</div>
            <div className="text-sm text-gray-600 mt-1">{stats.pendingOrders} pending</div>
          </Link>
          
          <Link
            href="/admin/reports"
            className="bg-white border border-gray-200 hover:border-purple-500 hover:bg-purple-50 p-6 rounded-xl text-center transition-colors"
          >
            <div className="text-3xl mb-2">📈</div>
            <div className="font-medium">Reports</div>
            <div className="text-sm text-gray-600 mt-1">View analytics</div>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Activity</h2>
            <Link
              href="/admin/activity"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View all →
            </Link>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 bg-white rounded-lg">
                  <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <div className="font-medium">{activity.user}</div>
                    <div className="text-sm text-gray-600">{activity.action}</div>
                  </div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div>
          <h2 className="text-xl font-bold mb-6">Revenue Overview</h2>
          <div className="bg-white border rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="text-2xl font-bold text-green-600">PKR {stats.todayRevenue?.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Today's Revenue</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">PKR {stats.totalRevenue?.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
            </div>
            
            {/* Simple Bar Chart */}
            <div className="space-y-4">
              {[
                { day: 'Mon', amount: 35000, percent: 70 },
                { day: 'Tue', amount: 42000, percent: 84 },
                { day: 'Wed', amount: 38000, percent: 76 },
                { day: 'Thu', amount: 45000, percent: 90 },
                { day: 'Fri', amount: 52000, percent: 100 },
                { day: 'Sat', amount: 48000, percent: 96 },
                { day: 'Sun', amount: 42800, percent: 86 }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 text-sm text-gray-600">{item.day}</div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-16 text-right text-sm font-medium">
                    PKR {item.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="mt-8 p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl">
        <h3 className="text-lg font-bold mb-4">System Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Website</span>
            </div>
            <div className="text-sm text-gray-300 mt-1">Operational</div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>API</span>
            </div>
            <div className="text-sm text-gray-300 mt-1">Running</div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Database</span>
            </div>
            <div className="text-sm text-gray-300 mt-1">Connected</div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>Payments</span>
            </div>
            <div className="text-sm text-gray-300 mt-1">Processing</div>
          </div>
        </div>
      </div>
    </div>
  );
}