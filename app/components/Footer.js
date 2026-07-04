import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Accounts", href: "/shop" },
    // { name: "Diamond Top-Up", href: "/topup" },
    { name: "Become Seller", href: "/seller" },
  ];

  const helpLinks = [
    { name: "FAQ", href: "/faq" },
    { name: "How to Buy", href: "/help/buy" },
    { name: "How to Sell", href: "/help/sell" },
    { name: "Payment Methods", href: "/help/payment" },
    { name: "Contact Us", href: "/contact" },
  ];

  
  const legalLinks = [
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Terms & Conditions", href: "/legal/terms" },
    { name: "Refund Policy", href: "/legal/refund-policy" },
    { name: "Cookie Policy", href: "/legal/cookie-policy" },
    { name: "Disclaimer", href: "/legal/disclaimer" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: "📘", href: "#" },
    { name: "WhatsApp", icon: "💬", href: "#" },
    { name: "Instagram", icon: "📷", href: "#" },
    { name: "Twitter", icon: "🐦", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section - Main Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Info - Takes 2 columns on md, 1 on lg */}
          <div className="md:col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">FF</span>
              </div>
              <span className="text-xl font-bold">Lenden<span className="text-yellow-400">FF</span></span>
            </div>
            <p className="text-gray-400 text-sm">
             {` Pakistan's #1 FF Account Marketplace. Buy & sell accounts safely with instant delivery.`}
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm md:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-bold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              {helpLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm md:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm md:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 mt-1">📧</span>
                <div>
                  <p className="font-medium text-sm md:text-base">Email</p>
                  <p className="text-gray-400 text-xs md:text-sm break-words">
                    freefirelenden@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 mt-1">📞</span>
                <div>
                  <p className="font-medium text-sm md:text-base">Phone</p>
                  <p className="text-gray-400 text-sm">03xx-xxxxxxx</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 mt-1">🕐</span>
                <div>
                  <p className="font-medium text-sm md:text-base">Hours</p>
                  <p className="text-gray-400 text-sm">24/7 Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <h4 className="text-center mb-4 md:mb-6 font-medium text-sm md:text-base">
            Accepted Payment Methods
          </h4>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {["JazzCash", "EasyPaisa", "Bank Transfer", "Credit Card", "Debit Card"].map((method) => (
              <div
                key={method}
                className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-800 rounded-lg text-xs md:text-sm text-gray-300"
              >
                {method}
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-xs md:text-sm px-4">
            © {currentYear} LendenFF. All rights reserved. This site is not affiliated with Garena FF.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            🇵🇰 Proudly serving the Pakistani gaming community
          </p>
        </div>
      </div>
    </footer>
  );
}