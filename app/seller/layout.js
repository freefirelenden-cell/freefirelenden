"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SellerLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/seller", icon: "📊" },
    { name: "Add Account", href: "/seller/add-account", icon: "➕" },
    { name: "My Accounts", href: "/seller/my-accounts", icon: "🎮" },
    { name: "Account Orders", href: "/seller/orders", icon: "📦" },
    // { name: "Top-Up Orders", href: "/seller/topup-orders", icon: "💎" },
    // { name: "Profile", href: "/seller/profile", icon: "👤" },
    // { name: "Earnings", href: "/seller/earnings", icon: "💰" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/seller" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="font-bold text-gray-900">Seller Dashboard</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Right Side */}
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <div className="font-medium">John Doe</div>
                <div className="text-sm text-green-600">⭐ 4.8 Rating</div>
              </div>
              <Link
                href="/shop"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Browse Shop
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex">
          {/* Sidebar - Desktop */}
          <div className="hidden md:block w-64 pr-6">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      pathname === item.href
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t">
                <div className="px-4 py-3 bg-yellow-50 rounded-lg">
                  <div className="text-sm font-medium text-yellow-800">Earnings This Month</div>
                  <div className="text-2xl font-bold text-yellow-900">PKR 25,400</div>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <span>🏠</span>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
              <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold">Menu</span>
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="text-gray-500"
                    >
                      ✕
                    </button>
                  </div>
                  <nav className="space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                          pathname === item.href
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-xl">{item.icon}</span>
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}