"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";


export default function CheckoutFailedPage() {
  const router = useRouter();

  const retryPayment = () => router.push("/checkout?retry=true");

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Error Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-red-600">✗</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Payment Failed</h1>
            <p className="text-gray-600 text-lg">
              We couldn't process your payment. Please try again.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Error Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                <h2 className="text-2xl font-bold mb-6">What went wrong?</h2>
                
                <div className="space-y-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="font-bold text-red-800 mb-4">Possible Issues:</h3>
                    <ul className="text-red-700 space-y-2">
                      <li>• Insufficient balance in your account</li>
                      <li>• Payment method not supported</li>
                      <li>• Network connectivity issues</li>
                      <li>• Payment gateway timeout</li>
                      <li>• Incorrect payment details</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold mb-4">Try these solutions:</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600">1</span>
                        </div>
                        <div>
                          <div className="font-medium">Check Account Balance</div>
                          <div className="text-gray-600">
                            Ensure you have sufficient funds in your JazzCash/EasyPaisa account
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600">2</span>
                        </div>
                        <div>
                          <div className="font-medium">Verify Payment Details</div>
                          <div className="text-gray-600">
                            Double-check your payment account number and credentials
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600">3</span>
                        </div>
                        <div>
                          <div className="font-medium">Try Different Payment Method</div>
                          <div className="text-gray-600">
                            Use JazzCash instead of EasyPaisa or vice versa
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600">4</span>
                        </div>
                        <div>
                          <div className="font-medium">Contact Support</div>
                          <div className="text-gray-600">
                            Our support team is available 24/7 to help you
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="font-bold mb-6">What would you like to do?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={retryPayment}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    🔄 Retry Payment
                  </button>
                  <Link
                    href="/shop"
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-center"
                  >
                    🛒 Continue Shopping
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium text-center"
                  >
                    🆘 Contact Support
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Support */}
            <div className="space-y-6">
              {/* Support Options */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="font-bold mb-4">Get Help</h3>
                <div className="space-y-4">
                  <a
                    href="tel:0300FFLENDEN"
                    className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100"
                  >
                    <span className="text-xl">📞</span>
                    <div>
                      <div className="font-medium">Call Support</div>
                      <div className="text-sm text-gray-600">0300-FFLENDEN</div>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/923001234567"
                    className="flex items-center gap-3 p-3 bg-green-100 rounded-lg hover:bg-green-200"
                  >
                    <span className="text-xl">💬</span>
                    <div>
                      <div className="font-medium">WhatsApp Support</div>
                      <div className="text-sm text-gray-600">Instant Help</div>
                    </div>
                  </a>
                  <a
                    href="mailto:support@freefirelenden.pk"
                    className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100"
                  >
                    <span className="text-xl">📧</span>
                    <div>
                      <div className="font-medium">Email Support</div>
                      <div className="text-sm text-gray-600">24-hour response</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold mb-4">Available Payment Methods</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📱</span>
                    <span className="font-medium">JazzCash</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💳</span>
                    <span className="font-medium">EasyPaisa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏦</span>
                    <span className="font-medium">Bank Transfer</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-4">
                    All payments are secured with 256-bit SSL encryption
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white border rounded-xl p-6">
                <h3 className="font-bold mb-4">Common Questions</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-medium text-gray-900">Is my money safe?</div>
                    <div className="text-sm text-gray-600">
                      Yes, payments are held in escrow until delivery is confirmed
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">What if payment fails?</div>
                    <div className="text-sm text-gray-600">
                      Your money will be refunded within 2-4 hours if payment fails
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Can I pay in installments?</div>
                    <div className="text-sm text-gray-600">
                      Currently, we only support full payment upfront
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}