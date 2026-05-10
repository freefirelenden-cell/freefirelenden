"use client";

import Link from "next/link";
import { useState } from "react";


export default function HowToBuyPage() {
  const [activeStep, setActiveStep] = useState(1);
     const CALL_NUMBER = process.env.NEXT_PUBLIC_CALL_NUMBER;
    const MESSAGE_NUMBER = process.env.NEXT_PUBLIC_MESSAGE_NUMBER;

  const steps = [
    {
      number: 1,
      title: "Browse Accounts",
      description: "Explore verified Free Fire accounts",
      details: "Visit our shop page and use filters to find accounts by rank, price, KDR, level, and other stats. View detailed profiles with images and statistics.",
      icon: "🔍",
      tips: [
        "Use filters to narrow down options",
        "Read account descriptions carefully",
        "Check seller ratings and reviews",
        "Compare multiple accounts"
      ]
    },
    {
      number: 2,
      title: "Select Account",
      description: "Choose your preferred account",
      details: "Click on any account to view full details including stats, screenshots, seller information, and delivery time. Make sure the account matches your requirements.",
      icon: "✅",
      tips: [
        "Verify account stats match description",
        "Check seller response time",
        "Read previous buyer reviews",
        "Ensure price fits your budget"
      ]
    },
    {
      number: 3,
      title: "Make Payment",
      description: "Secure payment process",
      details: "Click 'Buy Now' and choose your preferred payment method (JazzCash, EasyPaisa, Bank Transfer, or Card). Your payment is secured and will only be released after you receive the account.",
      icon: "💳",
      tips: [
        "Keep payment receipt screenshot",
        "Use secure payment methods",
        "Never share OTP with anyone",
        "Contact support if payment fails"
      ]
    },
    {
      number: 4,
      title: "Receive Account",
      description: "Instant delivery within minutes",
      details: "After successful payment, you'll receive account credentials within 5-15 minutes via email and WhatsApp. You'll get the Gmail account credentials for full ownership transfer.",
      icon: "⚡",
      tips: [
        "Check email and WhatsApp immediately",
        "Change Gmail password first",
        "Enable 2-factor authentication",
        "Remove linked devices"
      ]
    },
    {
      number: 5,
      title: "Secure Account",
      description: "Protect your new account",
      details: "Immediately change all passwords, enable 2FA, update recovery information, and remove any linked devices. This ensures complete ownership and security.",
      icon: "🛡️",
      tips: [
        "Change Gmail password immediately",
        "Enable Google 2FA",
        "Update recovery email/phone",
        "Remove old linked devices"
      ]
    },
    {
      number: 6,
      title: "Enjoy & Support",
      description: "Start playing and get support",
      details: "Start playing Free Fire with your new account! If you face any issues, contact our 24/7 support team. Remember to rate your seller experience.",
      icon: "🎮",
      tips: [
        "Rate seller after purchase",
        "Contact support for any issues",
        "Enjoy your new account!",
        "Share your experience with friends"
      ]
    }
  ];

  const safetyTips = [
    {
      title: "Account Security",
      tips: [
        "Always change Gmail password immediately",
        "Enable 2-factor authentication",
        "Remove all linked devices from account",
        "Update recovery information"
      ]
    },
    {
      title: "Payment Safety",
      tips: [
        "Use official JazzCash/EasyPaisa apps only",
        "Never share OTP or PIN with anyone",
        "Keep payment receipts safe",
        "Verify payment confirmation"
      ]
    },
    {
      title: "Buyer Protection",
      tips: [
        "You have 24-hour refund guarantee",
        "Accounts are verified before listing",
        "All sellers are CNIC verified",
        "Platform mediation for disputes"
      ]
    }
  ];

  const quickStats = [
    { label: "Average Delivery Time", value: "8 minutes", icon: "⚡" },
    { label: "Buyer Protection", value: "24 hours", icon: "🛡️" },
    { label: "Verified Sellers", value: "100%", icon: "✅" },
    { label: "Success Rate", value: "99.8%", icon: "📈" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How to Buy FF Accounts</h1>
            <p className="text-xl text-green-100 max-w-3xl">
              {`Complete guide to safely purchase FF accounts on Pakistan's most trusted marketplace`}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {quickStats.map((stat, index) => (
              <div key={index} className="bg-white border rounded-xl p-6 text-center shadow-sm">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Step-by-Step Guide */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Step-by-Step Buying Guide</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Follow these simple steps to safely purchase your FF account
              </p>
            </div>

            {/* Step Navigation */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-2">
                {steps.map((step) => (
                  <button
                    key={step.number}
                    onClick={() => setActiveStep(step.number)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                      activeStep === step.number
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <span className="text-lg">{step.icon}</span>
                    Step {step.number}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Step Details */}
            <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold">
                    {steps[activeStep - 1].number}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{steps[activeStep - 1].title}</h3>
                    <p className="text-gray-600">{steps[activeStep - 1].description}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-bold text-gray-900 mb-4">Details:</h4>
                  <p className="text-gray-700 text-lg">{steps[activeStep - 1].details}</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-4">Important Tips:</h4>
                  <ul className="space-y-3">
                    {steps[activeStep - 1].tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-500 text-xl mt-0.5">✓</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Step Navigation */}
                <div className="flex justify-between mt-12 pt-8 border-t">
                  <button
                    onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                    disabled={activeStep === 1}
                    className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 ${
                      activeStep === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ← Previous Step
                  </button>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Step {activeStep} of {steps.length}</div>
                  </div>
                  
                  <button
                    onClick={() => setActiveStep(prev => Math.min(steps.length, prev + 1))}
                    disabled={activeStep === steps.length}
                    className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 ${
                      activeStep === steps.length
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Safety & Security Tips</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Important safety measures every buyer should follow
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {safetyTips.map((section, index) => (
                <div key={index} className="bg-white border rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{section.title}</h3>
                  <ul className="space-y-4">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-3">
                        <span className="text-blue-500 text-xl">🔒</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Common Questions */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Buyer Questions</h2>
            </div>

            <div className="bg-white border rounded-2xl p-8">
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Q: How do I know the account is genuine?</h4>
                  <p className="text-gray-700">All accounts are verified by our team before listing. We check stats, screenshots, and seller credibility. You also get 24-hour buyer protection.</p>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{`Q: What if I don't receive the account?`}</h4>
                  <p className="text-gray-700">{`Contact support immediately. We'll track your order and ensure delivery. If undelivered, you get a full refund within 1 hour.`}</p>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Q: Can I change the account email?</h4>
                  <p className="text-gray-700">Yes! You receive the full Gmail account. You can change the email password immediately and update all account information.</p>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Q: What payment methods are available?</h4>
                  <p className="text-gray-700">We accept JazzCash, EasyPaisa, Bank Transfer, and Credit/Debit cards. All payments are secure and encrypted.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Buy Your First Account?</h3>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied Pakistani Free Fire players who trust FreeFireLenden
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-gray-100 shadow-lg"
            >
              🛒 Browse Available Accounts
            </Link>
          </div>

          {/* Support Section */}
          <div className="mt-12 p-8 bg-blue-50 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help Buying?</h3>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Our support team is available 24/7 to guide you through the buying process
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`https://wa.me/923001234567${MESSAGE_NUMBER}`}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium"
              >
                💬 WhatsApp Assistance
              </a>
              <a
                href={`tel:${CALL_NUMBER}`}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium"
              >
                📞 Call for Help
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}