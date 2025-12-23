"use client";

import { useState, useEffect } from "react";
import AccountCard from "./components/AccountCard";
import Button from "./components/Button";
import { getAllAccounts } from "@/lib/apiClient";
import { useRouter } from "next/navigation";
import LoadingSpiner from "./components/ui/LoadingSpiner";

export default function Home() {
  const router = useRouter();
  const [featuredAccounts, setFeaturedAccounts] = useState([]);
  const [stats, setStats] = useState({
    totalAccounts: 1250,
    totalTransactions: 5400,
    happyCustomers: 3200,
    verifiedSellers: 150
  });
  const [activeFAQ, setActiveFAQ] = useState(0);
  const [testimonials] = useState([
    {
      name: "Ahmed Raza",
      city: "Lahore",
      text: "Bought a Diamond account, got delivery in 5 minutes! Super safe.",
      rating: 5
    },
    {
      name: "Sara Khan",
      city: "Karachi",
      text: "Sold my old account within 2 hours. Payment was instant!",
      rating: 5
    },
    {
      name: "Bilal Ahmed",
      city: "Islamabad",
      text: "Best platform for Free Fire in Pakistan. No scams, genuine sellers.",
      rating: 4
    },
    {
      name: "Usman Ali",
      city: "Rawalpindi",
      text: "Customer support helped me when I had payment issues. Highly recommended!",
      rating: 5
    }
  ]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [counters, setCounters] = useState({
    accounts: 0,
    transactions: 0,
    customers: 0,
    sellers: 0
  });
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await getAllAccounts();
        setFeaturedAccounts(res.accounts);
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    };
    fetchData();

    // Animate counters
    const interval = 50;
    const steps = 20;

    const animateCounter = (target, setter) => {
      let current = 0;
      const increment = target / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setter(prev => ({
          ...prev,
          [target === stats.totalAccounts ? 'accounts' :
            target === stats.totalTransactions ? 'transactions' :
              target === stats.happyCustomers ? 'customers' : 'sellers']: Math.floor(current)
        }));
      }, interval);
    };

    animateCounter(stats.totalAccounts, setCounters);
    animateCounter(stats.totalTransactions, setCounters);
    animateCounter(stats.happyCustomers, setCounters);
    animateCounter(stats.verifiedSellers, setCounters);

    // Auto rotate testimonials
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(testimonialInterval);
  }, []);

  const faqItems = [
    {
      question: "Is buying Free Fire accounts legal in Pakistan?",
      answer: "Yes, buying and selling Free Fire accounts is completely legal in Pakistan. We operate within Pakistan's digital commerce laws and provide secure transactions for gamers."
    },
    {
      question: "How do I know the seller is genuine?",
      answer: "Every seller on FreeFireLenden goes through strict verification process including ID verification and previous transaction history. We also have a rating system and customer reviews for transparency."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major Pakistani payment methods: JazzCash, EasyPaisa, Bank Transfer, and Credit/Debit cards. All payments are secured through our payment gateway."
    },
    {
      question: "How quickly will I get the account after payment?",
      answer: "Most accounts are delivered within 5-15 minutes after successful payment. For premium accounts with complex transfers, it may take up to 1 hour maximum."
    },
    {
      question: "Can I get my money back if I'm not satisfied?",
      answer: "We offer 24-hour buyer protection. If the account doesn't match the description or has issues, you can request a refund within 24 hours of purchase."
    },
    {
      question: "What is Gmail secure transfer?",
      answer: "This is our proprietary secure transfer method where we transfer the entire Gmail account to you, ensuring the original owner cannot recover it. This prevents 'pulling back' scams common in account trading."
    },
    {
      question: "How much commission do you charge sellers?",
      answer: "We charge only 5% commission on successful sales, which is the lowest in Pakistan. No hidden fees or charges."
    },
    {
      question: "Can I sell multiple accounts?",
      answer: "Yes! Verified sellers can list unlimited accounts. We provide dashboard tools to manage all your listings efficiently."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const ranks = [
    { name: "Bronze", color: "bg-amber-900", priceRange: "500 - 1,500 PKR" },
    { name: "Silver", color: "bg-gray-400", priceRange: "1,500 - 2,500 PKR" },
    { name: "Gold", color: "bg-yellow-500", priceRange: "2,500 - 3,500 PKR" },
    { name: "Platinum", color: "bg-blue-400", priceRange: "3,500 - 4,500 PKR" },
    { name: "Diamond", color: "bg-purple-500", priceRange: "4,500 - 6,000 PKR" },
    { name: "Heroic", color: "bg-red-500", priceRange: "6,000 - 9,000 PKR" },
    { name: "Grandmaster", color: "bg-pink-500", priceRange: "9,000+ PKR" }
  ];

  const cities = [
    "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad",
    "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala"
  ];


  return (
    <main className="bg-white text-gray-900 overflow-hidden ">
      {/* =========================================================
          SECTION 1 — HERO SECTION
      ========================================================== */}
      <section className="relative w-full h-max flex items-center justify-center ">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-white to-blue-100"></div>

        <div className="absolute w-[600px] h-[600px] rounded-full bg-yellow-300/20 blur-3xl top-[-150px] left-[-150px]" />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-blue-300/20 blur-3xl bottom-[-150px] right-[-150px]" />

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
            🇵🇰 Pakistan's #1 Free Fire Marketplace
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight drop-shadow-sm">
            FreeFire<span className="text-yellow-500">Lenden</span>
          </h1>

          <p className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">
            <span className="text-blue-600">Buy & Sell</span> Free Fire Accounts Securely
          </p>

          <p className="text-gray-700 text-lg md:text-xl mt-6 max-w-2xl mx-auto">
            Pakistan's most trusted platform for Free Fire account trading.
            <span className="text-blue-600 font-semibold"> Verified sellers</span>,
            <span className="text-green-600 font-semibold"> instant delivery</span>, and
            <span className="text-red-600 font-semibold"> 100% scam protection</span>.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              text="🎮 Browse Accounts"
              onClick={() => router.push("/shop")}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            />
            <Button
              text="💰 Start Selling"
              className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            />
            <Button
              text="⚡ Top-Up Diamonds"
              className="bg-purple-600 hover:bg-purple-500 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            />
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{counters.accounts}+</div>
              <div className="text-gray-600 text-sm">Accounts Listed</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
              <div className="text-2xl font-bold text-green-600">{counters.transactions}+</div>
              <div className="text-gray-600 text-sm">Successful Deals</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
              <div className="text-2xl font-bold text-yellow-600">{counters.customers}+</div>
              <div className="text-gray-600 text-sm">Happy Players</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
              <div className="text-2xl font-bold text-red-600">{counters.sellers}+</div>
              <div className="text-gray-600 text-sm">Verified Sellers</div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-8">
            Trusted by 5000+ Free Fire Players across Pakistan • Fastest Delivery • 24/7 Support
          </p>
        </div>

        <div className="absolute bottom-10 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* =========================================================
          SECTION 2 — FEATURE HIGHLIGHTS
      ========================================================== */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Why <span className="text-yellow-600">Choose</span> FreeFireLenden?
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              The safest and fastest way to buy/sell Free Fire accounts in Pakistan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Verified Sellers Only</h3>
              <p className="text-gray-600">
                Every seller is manually verified with CNIC and phone number. No anonymous sellers allowed.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Instant Delivery</h3>
              <p className="text-gray-600">
                Get account credentials within 5-15 minutes after payment. Fastest delivery in Pakistan.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Gmail Secure Transfer</h3>
              <p className="text-gray-600">
                Full Gmail account transfer ensures the seller cannot recover or pull back the account.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl">💯</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">24-Hour Buyer Protection</h3>
              <p className="text-gray-600">
                Full refund if account doesn't match description. We mediate all disputes fairly.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              🎉 Limited Time Offer for Pakistani Sellers!
            </h3>
            <p className="text-white text-lg">
              First 50 verified sellers get <span className="font-bold">0% commission</span> for 1 month!
            </p>
            <Button
              text="Join as Seller →"
              className="mt-6 bg-white text-orange-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 3 — TOP SELLING ACCOUNTS
      ========================================================== */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-6 py-2 rounded-full text-sm font-semibold mb-4">
              <span className="animate-ping absolute h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
              🔥 TRENDING IN PAKISTAN
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Top Selling Free Fire Accounts
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              Most popular accounts bought by Pakistani players this week
            </p>
          </div>

          {loading ? (<LoadingSpiner />) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredAccounts != 0 && featuredAccounts && (
                featuredAccounts.map((account, index) => (
                  <div key={index} className="group">
                    <AccountCard {...account} />
                  </div>
                ))
              )}
            </div>
          )}

          <div className="mt-12 text-center">
            <Button
              text="View All 1250+ Accounts →"
              onClick={() => router.push("/shop")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
            />
          </div>

          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center mb-10">
              Account Prices by Rank in Pakistan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
              {ranks.map((rank, index) => (
                <div
                  key={rank.name}
                  className={`${rank.color} text-white p-6 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl font-bold mb-2">{rank.name}</div>
                  <div className="text-sm opacity-90">{rank.priceRange}</div>
                  <div className="mt-4 text-xs opacity-75">
                    {index === 6 ? "Highest Tier" : `${index + 1}00+ sold`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 4 — HOW IT WORKS
      ========================================================== */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              How <span className="text-yellow-600">FreeFireLenden</span> Works?
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              3 Simple Steps to Get Your Dream Free Fire Account
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-xl border h-full">
                <div className="text-5xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold mb-4">Browse & Select</h3>
                <p className="text-gray-600 mb-6">
                  Choose from hundreds of verified accounts. Filter by rank, price, KDR, and other stats.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    View detailed account stats
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    See seller ratings & reviews
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Compare multiple accounts
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-xl border h-full">
                <div className="text-5xl mb-6">💳</div>
                <h3 className="text-2xl font-bold mb-4">Secure Payment</h3>
                <p className="text-gray-600 mb-6">
                  Pay using your preferred Pakistani payment method. Your money is held securely until delivery.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm">JazzCash</span>
                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded-lg text-sm">EasyPaisa</span>
                  <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-lg text-sm">Bank Transfer</span>
                  <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg text-sm">Credit Card</span>
                </div>
                <p className="text-sm text-gray-500">
                  All payments are encrypted and secured
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-xl border h-full">
                <div className="text-5xl mb-6">🎮</div>
                <h3 className="text-2xl font-bold mb-4">Instant Delivery</h3>
                <p className="text-gray-600 mb-6">
                  Receive account credentials instantly. Full Gmail transfer ensures 100% ownership.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Account details in 5-15 mins
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Gmail account transfer
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    24-hour buyer protection
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">
                  Live Support for Pakistani Players
                </h3>
                <p className="text-gray-700 mb-6">
                  Our customer support team is available 24/7 to assist you in Urdu and English.
                  Whether you need help with payment, account transfer, or have any questions,
                  we're here to help!
                </p>
                <div className="flex items-center gap-4">
                  <Button
                    text="WhatsApp Support"
                    className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-semibold"
                  />
                  <Button
                    text="Call Now"
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold"
                  />
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <div className="font-bold">24/7 Support Numbers</div>
                    <div className="text-blue-600 font-semibold">0300-1234567</div>
                    <div className="text-blue-600 font-semibold">0312-7654321</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Karachi Support</span>
                    <span className="font-semibold">021-12345678</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Lahore Support</span>
                    <span className="font-semibold">042-12345678</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>WhatsApp</span>
                    <span className="font-semibold">0300-FFLENDEN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 5 — BECOME A SELLER
      ========================================================== */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Become a Verified Seller
            </h2>
            <p className="text-blue-200 mt-4 text-lg max-w-3xl mx-auto">
              Join Pakistan's most trusted Free Fire marketplace and start earning today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
              <div className="text-3xl mb-6">💰</div>
              <h3 className="text-2xl font-bold mb-4">Earn Money</h3>
              <p className="text-blue-100">
                Sell your unused Free Fire accounts and earn instant cash.
                Average sellers earn 15,000-50,000 PKR per month.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
              <div className="text-3xl mb-6">🛡️</div>
              <h3 className="text-2xl font-bold mb-4">Safe Transactions</h3>
              <p className="text-blue-100">
                We handle payments and protect you from chargebacks.
                Get paid instantly after successful transfer.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
              <div className="text-3xl mb-6">📈</div>
              <h3 className="text-2xl font-bold mb-4">Grow Your Business</h3>
              <p className="text-blue-100">
                Access to thousands of buyers across Pakistan.
                Premium seller features and marketing support.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            text="Start Selling Now →"
            className="bg-white text-blue-600 px-12 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 hover:shadow-xl transition-all"
          />
          <p className="text-blue-200 mt-6">
            Verification takes less than 24 hours • 5% commission only • Weekly payments
          </p>
        </div>

        <div className="mt-20 bg-white/10 backdrop-blur-sm rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Top Cities for Sellers in Pakistan
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {cities.map((city) => (
              <div key={city} className="bg-white/5 p-4 rounded-xl text-center hover:bg-white/10 transition-colors">
                <div className="font-semibold">{city}</div>
                <div className="text-sm text-blue-200 mt-1">50+ sellers</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 6 — TESTIMONIALS
      ========================================================== */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              What Pakistani Players Say
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              Real reviews from our Free Fire community
            </p>
          </div>

          <div className="relative h-[400px] overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-50 to-orange-50 p-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full p-8 transition-opacity duration-500 ${index === currentTestimonial ? 'opacity-100' : 'opacity-0'
                  }`}
              >
                <div className="max-w-3xl mx-auto text-center">
                  <div className="text-5xl mb-6">"</div>
                  <p className="text-2xl md:text-3xl font-medium text-gray-800 mb-8">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-2xl ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="font-bold text-xl">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.city}</div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentTestimonial
                    ? 'bg-yellow-500 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🚀</span>
                </div>
                <div>
                  <div className="font-bold text-lg">Fastest Delivery</div>
                  <div className="text-gray-600">Average 8 minutes</div>
                </div>
              </div>
              <p className="text-gray-700">
                "Got my Diamond account in 5 minutes flat! Faster than any other service in Pakistan."
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">💯</span>
                </div>
                <div>
                  <div className="font-bold text-lg">100% Secure</div>
                  <div className="text-gray-600">No scam guarantee</div>
                </div>
              </div>
              <p className="text-gray-700">
                "Previously got scammed twice on Facebook. FreeFireLenden's verification saved me!"
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">⭐</span>
                </div>
                <div>
                  <div className="font-bold text-lg">Best Support</div>
                  <div className="text-gray-600">24/7 Urdu support</div>
                </div>
              </div>
              <p className="text-gray-700">
                "Their WhatsApp support helped me at 3 AM when I had payment issues. Amazing service!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 7 — FAQ
      ========================================================== */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              Everything you need to know about FreeFireLenden
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-semibold pr-4">{item.question}</span>
                  <span className="text-gray-400 text-xl">
                    {activeFAQ === index ? '−' : '+'}
                  </span>
                </button>
                {activeFAQ === index && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t">
                      <p className="text-gray-700">{item.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Still have questions? We're here to help!
            </p>
            <Button
              text="Contact Support →"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 8 — FINAL CTA
      ========================================================== */}
      <section className="py-20 px-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Level Up?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join thousands of Pakistani Free Fire players who trust FreeFireLenden
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button
              text="🎮 Browse All Accounts"
              onClick={() => router.push("/shop")}
              className="bg-white text-orange-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 hover:shadow-2xl transition-all"
            />
            <Button
              text="💰 Become a Seller"
              className="bg-black/20 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-black/30 hover:shadow-2xl transition-all"
            />
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6">
              FreeFireLenden in Numbers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold">5000+</div>
                <div className="text-sm opacity-90">Pakistani Players</div>
              </div>
              <div>
                <div className="text-3xl font-bold">5400+</div>
                <div className="text-sm opacity-90">Successful Deals</div>
              </div>
              <div>
                <div className="text-3xl font-bold">1250+</div>
                <div className="text-sm opacity-90">Accounts Listed</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm opacity-90">Urdu Support</div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-lg font-semibold mb-4">
              🇵🇰 Proudly Serving Pakistan Since 2023
            </p>
            <p className="opacity-90">
              FreeFireLenden is Pakistan's first and largest dedicated Free Fire marketplace.
              We're committed to providing safe, fast, and reliable services to the Pakistani gaming community.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}