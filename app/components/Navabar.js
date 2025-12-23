"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserProfile from "./UserProfile";
import { useAuth } from "../context/AuthProvider";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    // { name: "Top-Up", href: "/topup" },
    { name: "Sell Account", href: "/seller/add-account" },
    { name: "Become Seller", href: "/become-seller" },
    { name: "Orders", href: "/orders" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">FF</span>
              </div>
              <span className="text-xl font-bold text-gray-900">FreeFire<span className="text-yellow-500">Lenden</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              if ((user?.role == "user" || user?.role == "buyer" || !user) && link.href == "/orders") return
              if ((user?.role == "user" || user?.role == "buyer" || !user) && link.href == "/seller/add-account") return
              if ((user?.role == "seller" || user?.role == "admin") && link.href == "/become-seller") return

              return (
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
              )
            })}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <UserProfile />
            {/* <button className="p-2 text-gray-600 hover:text-yellow-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button> */}
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
            {navLinks.map((link) => {
              if ((user?.role == "user" || user?.role == "buyer" || !user) && link.href == "/orders") return
              if ((user?.role == "user" || user?.role == "buyer" || !user) && link.href == "/seller/add-account") return
              if ((user?.role == "seller" || user?.role == "admin") && link.href == "/become-seller") return

              return (
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
              )
            })}
            <div className="pt-3 space-y-2 border-t">
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}