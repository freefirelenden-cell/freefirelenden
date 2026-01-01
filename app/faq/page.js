"use client";

import { useState } from "react";


export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [expandedItems, setExpandedItems] = useState({});
  const CALL_NUMBER = process.env.NEXT_PUBLIC_CALL_NUMBER;
  const MESSAGE_NUMBER = process.env.NEXT_PUBLIC_MESSAGE_NUMBER;
  const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;



  const faqCategories = [
    { id: "general", name: "General", icon: "❓" },
    { id: "buying", name: "Buying", icon: "🛒" },
    { id: "selling", name: "Selling", icon: "💰" },
    { id: "payment", name: "Payment", icon: "💳" },
    { id: "safety", name: "Safety", icon: "🛡️" },
    { id: "account", name: "Account", icon: "👤" }
  ];

  const faqItems = {
    general: [
      {
        question: "What is LendenFF?",
        answer: "LendenFF is Pakistan's #1 Free Fire account marketplace. We connect buyers and sellers for secure Free Fire account trading and diamond top-up services."
      },
      {
        question: "Is it legal to buy/sell Free Fire accounts in Pakistan?",
        answer: "Yes, buying and selling Free Fire accounts is completely legal in Pakistan. We operate within Pakistani laws and provide a secure platform for transactions."
      },
      {
        question: "How do I contact customer support?",
        answer: "You can contact our 24/7 customer support via WhatsApp (0300-FFLENDEN), phone call, or email at support@LendenFF.pk. We're available in Urdu and English."
      },
      {
        question: "What are your operating hours?",
        answer: "We operate 24/7, including weekends and holidays. Our customer support is always available to assist you."
      },
      {
        question: "Where is LendenFF based?",
        answer: "We are based in Pakistan and serve Free Fire players across the country. Our offices are in Lahore, Karachi, and Islamabad."
      }
    ],
    buying: [
      {
        question: "How do I buy a Free Fire account?",
        answer: "1. Browse accounts on our shop page\n2. Select an account that matches your requirements\n3. Click 'Buy Now' and complete payment\n4. Receive account credentials within 5-15 minutes\n5. Change email password immediately for security"
      },
      {
        question: "How quickly will I get the account after payment?",
        answer: "Most accounts are delivered within 5-15 minutes after successful payment. For premium accounts, it may take up to 1 hour maximum."
      },
      {
        question: "What is Gmail secure transfer?",
        answer: "We transfer the entire Gmail account to you, not just the Free Fire account. This ensures the original owner cannot recover or 'pull back' the account. You get 100% ownership."
      },
      {
        question: "Can I test the account before buying?",
        answer: "For security reasons, you cannot test accounts before purchase. However, we provide detailed screenshots, stats, and offer 24-hour buyer protection if the account doesn't match the description."
      },
      {
        question: "What if the account gets banned after purchase?",
        answer: "We provide 7-day protection against bans for issues unrelated to your gameplay. If the account gets banned due to previous owner violations, we'll provide a replacement or refund."
      }
    ],
    selling: [
      {
        question: "How do I become a seller?",
        answer: "1. Click 'Become a Seller' in the navigation\n2. Fill out the application form\n3. Provide required documents (CNIC)\n4. Get verified within 24-48 hours\n5. Start listing and selling accounts"
      },
      {
        question: "What documents do I need to become a seller?",
        answer: "You need a valid Pakistani CNIC (front and back photos), active Pakistani phone number, and a bank account or mobile wallet (JazzCash/EasyPaisa) for payments."
      },
      {
        question: "How much commission do you charge?",
        answer: "We charge 5% commission on account sales and 3% commission on diamond top-ups. Minimum commission is PKR 50 per transaction."
      },
      {
        question: "How and when do I get paid?",
        answer: "Payments are processed weekly every Monday. You'll receive payments in your registered JazzCash, EasyPaisa, or bank account."
      },
      {
        question: "Can I sell both accounts and top-ups?",
        answer: "Yes! When registering as a seller, you can choose to sell accounts only, top-ups only, or both services."
      }
    ],
    payment: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major Pakistani payment methods: JazzCash, EasyPaisa, Bank Transfer, and Credit/Debit cards. All payments are secured and encrypted."
      },
      {
        question: "Is it safe to pay on LendenFF?",
        answer: "Yes! All payments are processed through secure payment gateways. We never store your payment details. Your money is held securely until you receive the account."
      },
      {
        question: "Can I pay via Cash on Delivery?",
        answer: "Currently, we don't offer Cash on Delivery for online purchases. All transactions must be completed online for security and tracking purposes."
      },
      {
        question: "What if my payment fails?",
        answer: "If payment fails, the amount will be refunded to your account within 24 hours. Contact our support team if you don't receive the refund."
      },
      {
        question: "Do you offer refunds?",
        answer: "Yes, we offer 24-hour buyer protection. If the account doesn't match the description or has issues, you can request a full refund within 24 hours of purchase."
      }
    ],
    safety: [
      {
        question: "How do you ensure seller authenticity?",
        answer: "All sellers go through strict verification including CNIC verification, phone verification, and background checks. We also have a rating system and customer reviews."
      },
      {
        question: "What is your scam protection policy?",
        answer: "We have 0% scam guarantee. All transactions are monitored, and we mediate any disputes. Sellers are held accountable for accurate listings."
      },
      {
        question: "How do you protect buyer information?",
        answer: "We use SSL encryption for all data transmission. Your personal information is never shared with sellers without your consent."
      },
      {
        question: "What should I do after receiving an account?",
        answer: "1. Immediately change the Gmail account password\n2. Enable 2-factor authentication\n3. Update recovery information\n4. Remove any linked devices\n5. Change Free Fire account password"
      },
      {
        question: "What if a seller tries to recover the account?",
        answer: "With Gmail secure transfer, the seller cannot recover the account. We also monitor for such activities and permanently ban sellers who attempt account recovery."
      }
    ],
    account: [
      {
        question: "Do I need to create an account to buy?",
        answer: "Yes, you need to create a free account to make purchases. This helps us track your orders and provide better customer support."
      },
      {
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on the login page. You'll receive a password reset link via email or SMS to your registered phone number."
      },
      {
        question: "Can I have multiple accounts?",
        answer: "No, each user can only have one account. Multiple accounts are against our terms of service and may result in suspension."
      },
      {
        question: "How do I update my profile information?",
        answer: "Go to 'My Profile' in your account dashboard. You can update your contact information, payment methods, and other details there."
      },
      {
        question: "What happens if my account gets hacked?",
        answer: "Immediately contact our support team. We'll help you secure your account and investigate the issue. Enable 2FA for better security."
      }
    ]
  };

  const toggleFAQ = (category, index) => {
    const key = `${category}-${index}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Find answers to common questions about buying, selling, and using LendenFF
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for questions..."
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="absolute right-3 top-3 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                Search
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Content */}
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {faqCategories.find(c => c.id === activeCategory)?.name} Questions
              </h2>
              <p className="text-gray-600">
                Find answers to your {activeCategory} questions
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {faqItems[activeCategory].map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm transition-shadow"
                >
                  <button
                    onClick={() => toggleFAQ(activeCategory, index)}
                    className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50"
                  >
                    <span className="text-lg font-medium pr-8">{item.question}</span>
                    <span className="text-blue-600 text-2xl">
                      {expandedItems[`${activeCategory}-${index}`] ? '−' : '+'}
                    </span>
                  </button>

                  {expandedItems[`${activeCategory}-${index}`] && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t">
                        <p className="text-gray-700 whitespace-pre-line">{item.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Still Have Questions */}
            <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl text-center">
              <div className="text-5xl mb-6">❓</div>
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our support team is here to help!
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={`https://wa.me/${MESSAGE_NUMBER}`}
                  className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium"
                >
                  💬 WhatsApp Support
                </a>
                <a
                  href={`tel:${CALL_NUMBER}`}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium"
                >
                  📞 Call Support
                </a>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="px-8 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 font-medium"
                >
                  📧 Email Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}