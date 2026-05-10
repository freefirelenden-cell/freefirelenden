"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserProfile from "./UserProfile";
import { useAuth } from "../context/AuthProvider";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const pathname = usePathname();
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Fetch pending orders count for seller
  useEffect(() => {
    if (user?._id && (user?.role === "seller" || user?.role === "admin")) {
      fetchPendingOrdersCount();
    }
  }, [user]);

  const fetchPendingOrdersCount = async () => {
    try {
      const res = await fetch(`/api/orders?sellerId=${user._id}&paymentStatus=pending`);
      const data = await res.json();
      if (data.success) {
        const pendingCount = data.orders?.filter(
          order => order.payment?.status === "pending" || order.status === "pending"
        ).length || 0;
        setPendingOrdersCount(pendingCount);
      }
    } catch (error) {
      console.error("Error fetching pending orders:", error);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    // { name: "Top-Up", href: "/topup" },
  ];

  // ✅ Seller specific links with badge
  const sellerLinks = [
    { name: "Dashboard", href: "/seller", badge: false },
    { name: "Verify Payments", href: "/seller/verify-payments", badge: pendingOrdersCount > 0, badgeCount: pendingOrdersCount },
    { name: "My Accounts", href: "/seller/my-accounts", badge: false },
    { name: "Add Account", href: "/seller/add-account", badge: false },
  ];

  // ✅ Admin specific links
  const adminLinks = [
    { name: "Admin Dashboard", href: "/admin", badge: false },
    { name: "Verify Payments", href: "/admin/verify-payments", badge: pendingOrdersCount > 0, badgeCount: pendingOrdersCount },
    { name: "Seller Requests", href: "/admin/seller-requests", badge: false },
    { name: "All Orders", href: "/admin/all-orders", badge: false },
  ];

  const isSeller = user?.role === "seller";
  const isAdmin = user?.role === "admin";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-white font-bold text-xl">
                <Image src="/logo.png" height={50} width={50} alt="LendenFF Logo" />
              </span>
              <span className="text-xl font-bold text-gray-900">Lenden<span className="text-yellow-500">FF</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Common nav links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium transition-colors ${pathname === link.href
                  ? "text-yellow-600"
                  : "text-gray-700 hover:text-yellow-500"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Seller specific links */}
            {isSeller && sellerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium transition-colors relative ${pathname === link.href
                  ? "text-yellow-600"
                  : "text-gray-700 hover:text-yellow-500"
                }`}
              >
                {link.name}
                {link.badge && link.badgeCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {link.badgeCount > 9 ? "9+" : link.badgeCount}
                  </span>
                )}
              </Link>
            ))}

            {/* Admin specific links */}
            {isAdmin && adminLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium transition-colors relative ${pathname === link.href
                  ? "text-yellow-600"
                  : "text-gray-700 hover:text-yellow-500"
                }`}
              >
                {link.name}
                {link.badge && link.badgeCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {link.badgeCount > 9 ? "9+" : link.badgeCount}
                  </span>
                )}
              </Link>
            ))}

            {/* Become Seller - only for non-sellers */}
            {(!user && user?.role === "user" || user?.role === "buyer") && (
              <Link
                href="/become-seller"
                className={`font-medium transition-colors ${pathname === "/become-seller"
                  ? "text-yellow-600"
                  : "text-gray-700 hover:text-yellow-500"
                }`}
              >
                Become Seller
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <UserProfile />
          </div>

          {/* Mobile menu button */}
          <div className="flex gap-3 md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-yellow-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <div className="flex md:hidden">
              <UserProfile />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            {/* Common nav links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-medium ${pathname === link.href
                  ? "bg-yellow-50 text-yellow-600"
                  : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Seller specific mobile links */}
            {isSeller && sellerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-medium relative ${pathname === link.href
                  ? "bg-yellow-50 text-yellow-600"
                  : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.name}
                {link.badge && link.badgeCount > 0 && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white">
                    {link.badgeCount}
                  </span>
                )}
              </Link>
            ))}

            {/* Admin specific mobile links */}
            {isAdmin && adminLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-medium relative ${pathname === link.href
                  ? "bg-yellow-50 text-yellow-600"
                  : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.name}
                {link.badge && link.badgeCount > 0 && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-500 text-white">
                    {link.badgeCount}
                  </span>
                )}
              </Link>
            ))}

            {/* Become Seller mobile link */}
            {(!user || user?.role === "user" || user?.role === "buyer") && (
              <Link
                href="/become-seller"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg font-medium ${pathname === "/become-seller"
                  ? "bg-yellow-50 text-yellow-600"
                  : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Become Seller
              </Link>
            )}

            <div className="pt-3 space-y-2 border-t">
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}