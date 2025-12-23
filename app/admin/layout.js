"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "Users", href: "/admin/users", icon: "👥" },
    { name: "Sellers", href: "/admin/sellers", icon: "🏪" },
    { name: "Account Orders", href: "/admin/all-orders", icon: "📦" },
    { name: "Top-Up Orders", href: "/admin/all-topups", icon: "💎" },
    { name: "Seller Requests", href: "/admin/seller-requests", icon: "📝" },
    { name: "Reports", href: "/admin/reports", icon: "📈" },
    { name: "Settings", href: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link href="/admin" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="font-bold">A</span>
                </div>
                <span className="font-bold">Admin Panel</span>
              </Link>
            </div>

            {/* Admin Info */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <div className="font-medium">Admin User</div>
                <div className="text-sm text-gray-300">Super Admin</div>
              </div>
              <Link
                href="/"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm"
              >
                View Site
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
                        ? 'bg-red-50 text-red-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t">
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-600">Today's Stats</div>
                  <div className="text-xl font-bold">PKR 42,800</div>
                  <div className="text-xs text-gray-500">Revenue</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="px-4 py-3 bg-red-50 text-red-700 rounded-lg">
                  <div className="font-medium">⚠️ 5 Pending Requests</div>
                  <div className="text-sm">3 new seller applications</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
              <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold">Admin Menu</span>
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
                            ? 'bg-red-50 text-red-600'
                            : 'text-gray-700 hover:bg-gray-50'
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