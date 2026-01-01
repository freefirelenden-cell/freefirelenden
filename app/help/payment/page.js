"use client";

import { useState } from "react";


export default function PaymentMethodsPage() {
  const [selectedMethod, setSelectedMethod] = useState("jazzcash");
       const CALL_NUMBER = process.env.NEXT_PUBLIC_CALL_NUMBER;
    const MESSAGE_NUMBER = process.env.NEXT_PUBLIC_MESSAGE_NUMBER;
    const EASYPAISA_NUMBER = process.env.NEXT_PUBLIC_EASYPAISA_NUMBER;
    const JAZZCASH_NUMBER = process.env.NEXT_PUBLIC_JAZZCASH_NUMBER;



  const paymentMethods = [
    {
      id: "jazzcash",
      name: "JazzCash",
      icon: "📱",
      description: "Mobile wallet payment via JazzCash",
      colors: "from-red-500 to-red-600",
      steps: [
        "Go to JazzCash App or dial *786#",
        "Select 'Send Money' option",
        "Enter FreeFireLenden JazzCash number",
        "Enter exact payment amount",
        "Add reference: Order ID",
        "Enter PIN to complete payment"
      ],
      fees: "No additional fees",
      processingTime: "Instant",
      limits: "Daily limit: PKR 50,000",
      contact: "JazzCash Helpline: 4444",
      tips: [
        "Keep JazzCash app updated",
        "Save payment receipt screenshot",
        "Use secure PIN",
        "Verify JazzCash number before sending"
      ]
    },
    {
      id: "easypaisa",
      name: "EasyPaisa",
      icon: "💳",
      description: "Mobile wallet payment via EasyPaisa",
      colors: "from-green-500 to-green-600",
      steps: [
        "Open EasyPaisa App or dial *786#",
        "Select 'Money Transfer'",
        "Enter FreeFireLenden EasyPaisa number",
        "Input payment amount",
        "Add reference with Order ID",
        "Confirm with PIN"
      ],
      fees: "No additional fees",
      processingTime: "Instant",
      limits: "Daily limit: PKR 50,000",
      contact: "EasyPaisa Helpline: 3737",
      tips: [
        "Verify recipient before sending",
        "Save transaction ID",
        "Check EasyPaisa balance first",
        "Use app for better tracking"
      ]
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: "🏦",
      description: "Direct bank transfer",
      colors: "from-blue-500 to-blue-600",
      steps: [
        "Log in to your bank's internet banking",
        "Select 'Funds Transfer'",
        "Enter FreeFireLenden bank account details",
        "Input exact payment amount",
        "Add Order ID in payment reference",
        "Confirm and complete transfer"
      ],
      fees: "Bank charges may apply",
      processingTime: "1-3 hours",
      limits: "Depends on your bank limits",
      contact: "Your bank's customer service",
      tips: [
        "Double-check account details",
        "Save transaction slip/screenshot",
        "Use correct payment reference",
        "Check transfer confirmation"
      ]
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: "💳",
      description: "Secure card payment",
      colors: "from-purple-500 to-purple-600",
      steps: [
        "Select 'Card Payment' at checkout",
        "Enter card details securely",
        "Verify through 3D Secure",
        "Enter OTP received on phone",
        "Confirm payment",
        "Save payment confirmation"
      ],
      fees: "2% processing fee",
      processingTime: "Instant",
      limits: "Card issuer limits apply",
      contact: "Your card issuer",
      tips: [
        "Use cards with 3D Secure enabled",
        "Keep card statement handy",
        "Monitor for unauthorized transactions",
        "Save payment confirmation email"
      ]
    }
  ];

  const safetyTips = [
    {
      title: "Payment Security",
      tips: [
        "Never share your PIN, OTP, or password with anyone",
        "Only use official banking/mobile wallet apps",
        "Verify recipient details before sending money",
        "Keep payment receipts and transaction IDs safe"
      ]
    },
    {
      title: "Fraud Prevention",
      tips: [
        "Beware of fake support numbers",
        "Don't make payments to personal numbers",
        "Verify FreeFireLenden official numbers",
        "Report suspicious payment requests immediately"
      ]
    },
    {
      title: "Payment Verification",
      tips: [
        "Always save payment confirmation",
        "Take screenshots of successful payments",
        "Check your balance after payment",
        "Contact support if payment doesn't reflect"
      ]
    }
  ];

  const commonIssues = [
    {
      issue: "Payment failed but amount deducted",
      solution: "Contact your bank/mobile wallet provider. Amount will be refunded within 24 hours."
    },
    {
      issue: "Payment not reflecting in order",
      solution: "Share payment proof with our support team via WhatsApp. We'll verify manually."
    },
    {
      issue: "Wrong amount sent",
      solution: "Contact support immediately with payment details. We'll process refund or adjust order."
    },
    {
      issue: "Transaction limit exceeded",
      solution: "Use alternative payment method or contact your bank to increase limits."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Payment Methods</h1>
            <p className="text-xl text-green-100 max-w-3xl">
              Secure payment options available for Pakistani Free Fire players
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Payment Methods Selector */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Payment Method</h2>
              <p className="text-gray-600">Select a payment method to view detailed instructions</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex flex-col items-center p-4 rounded-xl border transition-all ${
                    selectedMethod === method.id
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="text-3xl mb-2">{method.icon}</div>
                  <div className="font-bold text-gray-900">{method.name}</div>
                  <div className="text-xs text-gray-500 text-center mt-1">
                    {selectedMethod === method.id ? "✓ Selected" : "Click to select"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Method Details */}
          {paymentMethods.find(m => m.id === selectedMethod) && (() => {
            const method = paymentMethods.find(m => m.id === selectedMethod);
            
            return (
              <div className="mb-16">
                <div className="bg-gradient-to-r rounded-2xl overflow-hidden mb-8">
                  <div className={`${method.colors} text-white p-8`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-5xl">{method.icon}</div>
                      <div>
                        <h3 className="text-3xl font-bold">{method.name}</h3>
                        <p className="text-white/90">{method.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Column - Steps */}
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-6">Payment Steps</h4>
                        <div className="space-y-4">
                          {method.steps.map((step, index) => (
                            <div key={index} className="flex items-start gap-4">
                              <div className="w-8 h-8 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                {index + 1}
                              </div>
                              <div className="text-gray-700">{step}</div>
                            </div>
                          ))}
                        </div>

                        {/* Tips */}
                        <div className="mt-8">
                          <h4 className="font-bold text-gray-900 mb-4">Important Tips</h4>
                          <ul className="space-y-2">
                            {method.tips.map((tip, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-500 text-xl">💡</span>
                                <span className="text-gray-700">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right Column - Info */}
                      <div>
                        <div className="bg-gray-50 rounded-xl p-6 mb-6">
                          <h4 className="font-bold text-gray-900 mb-4">Payment Details</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Processing Time:</span>
                              <span className="font-medium">{method.processingTime}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Transaction Fees:</span>
                              <span className="font-medium">{method.fees}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Daily Limit:</span>
                              <span className="font-medium">{method.limits}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Customer Support:</span>
                              <span className="font-medium">{method.contact}</span>
                            </div>
                          </div>
                        </div>

                        {/* Our Details */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                          <h4 className="font-bold text-gray-900 mb-4">LendenFF Payment Details</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="text-sm text-gray-600">JazzCash Number</div>
                              <div className="font-bold text-gray-900">{JAZZCASH_NUMBER}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">EasyPaisa Number</div>
                              <div className="font-bold text-gray-900">{EASYPAISA_NUMBER}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Bank Account</div>
                              <div className="font-bold text-gray-900">Provided at checkout</div>
                            </div>
                            <div className="pt-3 border-t">
                              <div className="text-sm text-gray-600">Payment Reference</div>
                              <div className="font-medium text-gray-900">Always include your Order ID</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Safety & Security */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Safety & Security</h2>
              <p className="text-gray-600">Important safety measures for secure payments</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {safetyTips.map((section, index) => (
                <div key={index} className="bg-white border rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{section.title}</h3>
                  <ul className="space-y-4">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">🛡️</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Common Issues */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Payment Issues & Solutions</h2>
            </div>

            <div className="bg-white border rounded-2xl p-8">
              <div className="space-y-6">
                {commonIssues.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">{item.issue}</h4>
                      <p className="text-gray-700">{item.solution}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                <h4 className="font-bold text-gray-900 mb-2">⚠️ Important Notice</h4>
                <p className="text-gray-700">
                  Never make payments to personal numbers not listed on our official website. 
                  Always verify payment details with our support team if unsure.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Security Features */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Payment Security Features</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="font-bold text-gray-900 mb-2">SSL Encryption</h3>
                <p className="text-gray-600">All payments secured with 256-bit SSL encryption</p>
              </div>
              
              <div className="bg-white border rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="font-bold text-gray-900 mb-2">Secure Gateways</h3>
                <p className="text-gray-600">PCI-DSS compliant payment gateways</p>
              </div>
              
              <div className="bg-white border rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="font-bold text-gray-900 mb-2">Escrow Protection</h3>
                <p className="text-gray-600">Funds held securely until delivery confirmed</p>
              </div>
              
              <div className="bg-white border rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="font-bold text-gray-900 mb-2">OTP Verification</h3>
                <p className="text-gray-600">Two-factor authentication for sensitive operations</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Make a Secure Payment?</h3>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Browse our verified accounts and experience safe, secure payments
            </p>
            <a
              href="/shop"
              className="inline-block px-8 py-3 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-gray-100 shadow-lg"
            >
              🛒 Browse Accounts & Pay Securely
            </a>
          </div>

          {/* Support Section */}
          <div className="mt-12 p-8 bg-yellow-50 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Payment Support</h3>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Need help with payment? Contact our payment support team
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`https://wa.me/${MESSAGE_NUMBER}`}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium"
              >
                💬 WhatsApp Payment Support
              </a>
              <a
                href={`tel:${CALL_NUMBER}`}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium"
              >
                📞 Call Payment Support
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}