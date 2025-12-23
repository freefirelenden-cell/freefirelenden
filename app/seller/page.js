"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllAccounts } from "@/lib/apiClient";
import { useAuth } from "../context/AuthProvider";

export default function SellerDashboard() {
  const [stats, setStats] = useState({
    totalAccounts: 0,
    activeAccounts: 0,
    totalSales: 0,
    pendingOrders: 0,
    totalEarnings: 0,
    thisMonthEarnings: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!user || isLoading) return;

    async function load() {
      try {
        const { accounts } = await getAllAccounts(user.id);

        const totalAccounts = accounts.length;

        const activeAccounts = accounts.filter(
          acc => acc.status === "approved"
        ).length;

        const pendingOrders = accounts.filter(
          acc => acc.status === "pending"
        ).length;

        // 👉 abhi sales / earnings ka data nahi hai
        const totalSales = 0;
        const totalEarnings = 0;
        const thisMonthEarnings = 0;

        setStats({
          totalAccounts,
          activeAccounts,
          pendingOrders,
          totalSales,
          totalEarnings,
          thisMonthEarnings
        });
     

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user, isLoading]);



  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
        <p className="text-gray-600 mt-2">Here's your seller dashboard overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-2xl font-bold text-blue-700">{stats.totalAccounts}</div>
              <div className="text-sm text-blue-600">Total Accounts</div>
            </div>
            <div className="text-3xl">🎮</div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-600">
              {stats.activeAccounts} active • {stats.totalAccounts - stats.activeAccounts} pending
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-2xl font-bold text-green-700">{stats.totalSales}</div>
              <div className="text-sm text-green-600">Total Sales</div>
            </div>
            <div className="text-3xl">💰</div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-600">{stats.pendingOrders} pending orders</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-2xl font-bold text-yellow-700">PKR {stats.thisMonthEarnings.toLocaleString()}</div>
              <div className="text-sm text-yellow-600">This Month Earnings</div>
            </div>
            <div className="text-3xl">📈</div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-600">PKR {stats.totalEarnings.toLocaleString()} total earnings</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/seller/add-account"
            className="bg-white border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 p-6 rounded-xl text-center transition-colors"
          >
            <div className="text-3xl mb-2">➕</div>
            <div className="font-medium">Add New Account</div>
          </Link>

          <Link
            href="/seller/my-accounts"
            className="bg-white border border-gray-200 hover:border-green-500 hover:bg-green-50 p-6 rounded-xl text-center transition-colors"
          >
            <div className="text-3xl mb-2">📝</div>
            <div className="font-medium">Manage Accounts</div>
          </Link>

          <Link
            href="/seller/orders"
            className="bg-white border border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 p-6 rounded-xl text-center transition-colors"
          >
            <div className="text-3xl mb-2">📦</div>
            <div className="font-medium">View Orders</div>
          </Link>

          <Link
            href="/seller/profile"
            className="bg-white border border-gray-200 hover:border-purple-500 hover:bg-purple-50 p-6 rounded-xl text-center transition-colors"
          >
            <div className="text-3xl mb-2">⚙️</div>
            <div className="font-medium">Profile Settings</div>
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <Link
            href="/seller/orders"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View All →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buyer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{order.account}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.buyer}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    PKR {order.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        <h3 className="text-lg font-bold mb-4">💡 Tips to Sell More</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            Add high-quality images of your account for better visibility
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            Keep your account descriptions detailed and honest
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            Respond quickly to buyer inquiries to increase sales
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            Price your accounts competitively based on rank and features
          </li>
        </ul>
      </div>
    </div>
  );
}