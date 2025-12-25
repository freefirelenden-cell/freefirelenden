"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAccountById } from "@/lib/apiClient";
import { useAuth } from "../context/AuthProvider";
import Image from "next/image";


export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState(null);
  const { user, isSignedIn } = useAuth();
  const [account, setAccount] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "03000000000",
    paymentMethod: "jazzcash",
    paymentAccount: "03000000000",
    termsAccepted: true,
    marketingEmails: true, // ✅ ADD THIS

  });


  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isSignedIn && user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phone || "", // ✅ SAFE
      }));
    }
  }, [isSignedIn, user]);



  useEffect(() => {
    // Get order details from URL params
    const searchParams = new URLSearchParams(window.location.search);
    const type = searchParams.get("type"); // "account" or "topup"
    const accountId = searchParams.get("accountId");
    const diamonds = searchParams.get("diamonds");
    const playerId = searchParams.get("playerId");

    if (type === "account" && accountId) {
      setOrderType("account");
      // Fetch account details from API
      loadAccount(accountId);
    } else if (type === "topup" && diamonds && playerId) {
      setOrderType("topup");
      // Set topup details
      fetchTopupDetails(diamonds, playerId);
    } else {
      // Redirect if no valid order
      router.push("/shop");
    }
  }, [router]);

  const loadAccount = async (accountId) => {
    try {
      const account = await getAccountById(accountId);

      if (!account) {
        router.push("/shop");
        return;
      }
      setAccount(account);

    } catch (err) {
      console.error(err);
      router.push("/shop");
    }
  };


  const fetchTopupDetails = async (diamonds, playerId) => {
    // Simulate API call
    setTimeout(() => {
      const diamondPrice = {
        100: 120,
        500: 600,
        1000: 1200,
        2000: 2400,
        5000: 6000
      };

      // setOrderDetails({
      //   type: "topup",
      //   diamonds: parseInt(diamonds),
      //   playerId: playerId,
      //   server: "Pakistan",
      //   price: diamondPrice[diamonds] || 1200,
      //   quantity: 1,
      //   title: `💎 ${diamonds} Diamonds Top-Up`,
      //   seller: "Premium Top-Up Service",
      //   delivery: "Instant delivery",
      //   warranty: "Guanteed delivery"
      // });
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Enter a valid email";

      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      else if (!/^\d{11}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = "Enter a valid 11-digit number";

    }

    if (stepNumber === 2) {
      if (!formData.paymentMethod) newErrors.paymentMethod = "Select payment method";
      if (formData.paymentMethod === 'jazzcash' && !formData.paymentAccount) {
        newErrors.paymentAccount = "JazzCash number is required";
      }
      if (formData.paymentMethod === 'easypaisa' && !formData.paymentAccount) {
        newErrors.paymentAccount = "EasyPaisa number is required";
      }
      if (formData.paymentMethod === 'bank' && !formData.paymentAccount) {
        newErrors.paymentAccount = "Bank account details are required";
      }
    }

    if (stepNumber === 3) {
      if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept terms & conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handlePayment = async () => {
    if (!validateStep(step)) return;
    setLoading(true)

    try {

      const sellerResponse = await fetch(`/api/seller/${account.createdBy}`)

      if (!sellerResponse.ok) {
        console.error("Error fetching seller data:", sellerResponse.statusText);
        return; // Yahan return ya error handling kar sakte ho
      }
      const seller = await sellerResponse.json(); // Response ko JSON format mein convert karna

        

      const paymentResponse = await fetch('/api/payments/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId: account._id,
          accountPrice: account.price,
          sellerId: account.createdBy,
          seller,
          buyerId: user._id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          paymentMethod: formData.paymentMethod
        })
      });
      
      const paymentResult = await paymentResponse.json();

      if (!paymentResponse.ok) {
        console.error(paymentResult.error || 'Server error');
        throw new Error(paymentResult.error || 'Payment request failed');
      }

      if (!paymentResult.success) {
        console.error(paymentResult.error || 'Payment failed');
        throw new Error(paymentResult.error || 'Payment failed');
      }

      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: account._id,
          paymentMethod: formData.paymentMethod,
          paymentAccount: formData.paymentAccount,
          phone: formData.phone,
          paymentId: paymentResult.payment.paymentId,
          seller,
          account
        }),
      });
     
      const orderResult = await orderResponse.json();

      if (!paymentResult.success) {
        alert(orderResult.error);
        console.error(orderResult.error)
        return;
      }
      if (!orderResponse.ok) {
        alert(orderResult.error);
        console.error(orderResult.error)
        return;
      }

      await fetch(`/api/orders/${orderResult.orderId}/pay`, {
        method: "PATCH",
      });

      const mailRes = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sellerEmail: seller.email,
          sellerPhone: seller.phone,
          buyerEmail: formData.email,
          buyerName: formData.name,
          buyerPhone: formData.phone,
          accountTitle: account.title,
          email: account.email,
          accountId: account._id,
          amount: account.price,
          orderId: orderResult.orderId
        })
      });
  

      router.push(`/checkout/success?orderId=${orderResult.orderId}`);

    } catch (err) {
      alert("Server error");
      console.error(err)
    } finally {
      setLoading(false)
    }
  };



  const paymentMethods = [
    { id: "jazzcash", name: "JazzCash", icon: "📱", description: "Pay via JazzCash account" },
    { id: "easypaisa", name: "EasyPaisa", icon: "💳", description: "Pay via EasyPaisa account" },
    // { id: "bank", name: "Bank Transfer", icon: "🏦", description: "Direct bank transfer" },
  ];

  const getPaymentInstructions = (method) => {
    switch (method) {
      case 'jazzcash':
        return "Send payment to JazzCash: 0300-1234567";
      case 'easypaisa':
        return "Send payment to EasyPaisa: 0315-1234567";
      case 'bank':
        return "Bank: HBL\nAccount: 1234567890\nIBAN: PK00HBL1234567890";
      case 'cod':
        return "Pay cash when you receive your order";
      default:
        return "Select payment method to see instructions";
    }
  };

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
              <p className="mt-4 text-gray-600">Loading order details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalAmount = account.price;
  const platformFee = totalAmount * (orderType === "account" ? 0.05 : 0.03);
  const grandTotal = totalAmount + platformFee;

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="pt-20">
        {/* Progress Steps */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-between py-6">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                    {stepNumber}
                  </div>
                  <span className="text-sm">
                    {stepNumber === 1 ? 'Information' : stepNumber === 2 ? 'Payment' : 'Confirmation'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                <h2 className="text-2xl font-bold mb-6">Checkout</h2>

                {/* Step 1: Customer Information */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold">Customer Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full border rounded-lg px-4 py-3 ${errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full border rounded-lg px-4 py-3 ${errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="flex">
                          {/* <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg">
                            +92
                          </span> */}
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`flex-1 border rounded-r-lg px-4 py-3 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                              }`}
                            placeholder="0300 1234567"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">We'll send order updates via SMS</p>
                      </div>


                    </div>
                  </div>
                )}

                {/* Step 2: Payment Method */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold">Payment Method</h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Select Payment Method *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paymentMethods.map((method) => (
                          <label
                            key={method.id}
                            className={`border rounded-lg p-4 cursor-pointer ${formData.paymentMethod === method.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-300 hover:border-blue-300'
                              }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={formData.paymentMethod === method.id}
                              onChange={handleChange}
                              className="hidden"
                            />
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{method.icon}</div>
                              <div>
                                <div className="font-bold">{method.name}</div>
                                <div className="text-sm text-gray-600">{method.description}</div>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                      {errors.paymentMethod && (
                        <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>
                      )}
                    </div>

                    {formData.paymentMethod && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Payment Details *
                        </label>
                        <input
                          type="text"
                          name="paymentAccount"
                          value={formData.paymentAccount}
                          onChange={handleChange}
                          placeholder={
                            formData.paymentMethod === 'jazzcash' ? 'Your JazzCash number (0300-1234567)' :
                              formData.paymentMethod === 'easypaisa' ? 'Your EasyPaisa number (0315-1234567)' :
                                formData.paymentMethod === 'bank' ? 'Your bank account details' :
                                  'Any additional instructions'
                          }
                          className={`w-full border rounded-lg px-4 py-3 ${errors.paymentAccount ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.paymentAccount && (
                          <p className="text-red-500 text-sm mt-1">{errors.paymentAccount}</p>
                        )}

                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <div className="font-bold mb-2">Payment Instructions:</div>
                          <div className="text-sm text-gray-700">{getPaymentInstructions(formData.paymentMethod)}</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Order Confirmation */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold">Order Confirmation</h3>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-bold mb-4">Order Summary</h4>

                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={account.images?.[0]?.url || "/placeholder.jpg"}
                              alt={account.title || "Account Image"}
                              width={400}
                              height={300}
                              unoptimized
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold">{account.title}</div>
                            {account.type === "account" ? (
                              <div className="text-sm text-gray-600">
                                Rank: {account.rank} • UID: {account.uid}
                              </div>
                            ) : (
                              <div className="text-sm text-gray-600">
                                Player ID: {account.playerId} • Server: {account.server}
                              </div>
                            )}

                          </div>
                          <div className="text-right">
                            <div className="font-bold">PKR {account.price.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          name="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={handleChange}
                          className="mt-1"
                        />
                        <div>
                          <span className="font-medium">I agree to the </span>
                          <a href="/terms" className="text-blue-600 hover:underline">Terms & Conditions</a>
                          <span className="font-medium"> and confirm that I have read the </span>
                          <a href="/refund" className="text-blue-600 hover:underline">Refund Policy</a>
                          <p className="text-gray-600 text-sm mt-1">
                            I confirm that all information provided is accurate
                          </p>
                        </div>
                      </label>
                      {errors.termsAccepted && (
                        <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="marketingEmails"
                          checked={formData.marketingEmails}
                          onChange={handleChange}
                        />
                        <span className="text-sm text-gray-600">
                          Send me updates about new accounts, offers, and promotions
                        </span>
                      </label>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-bold text-yellow-800 mb-2">⚠️ Important Notes</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Delivery time: {account.delivery}</li>
                        <li>• {account.warranty}</li>
                        <li>• Keep your payment receipt for reference</li>
                        <li>• Contact seller if delivery is delayed</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-8 border-t">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      ← Back
                    </button>
                  ) : (
                    <Link
                      href={orderType === "account" ? `/shop/${account._id}` : "/topup"}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      ← Cancel Order
                    </Link>
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Continue →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handlePayment}
                      disabled={loading}
                      className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Confirm & Pay Now'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              {/* Order Summary Card */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">PKR {totalAmount.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Fee ({orderType === "account" ? "5%" : "3%"})</span>
                    <span className="font-medium">PKR {platformFee.toLocaleString()}</span>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="font-bold text-lg">Total Amount</span>
                      <span className="font-bold text-2xl text-blue-600">
                        PKR {grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="text-green-700 font-bold mb-2">✅ Buyer Protection Included</div>
                  <div className="text-sm text-green-600">
                    24-hour refund if order doesn't match description
                  </div>
                </div>
              </div>

              {/* Seller Information */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="font-bold mb-4">Seller Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl">👤</span>
                    </div>
                    <div>
                      <div className="font-bold">{account.seller}</div>
                      <div className="text-sm text-gray-600">Verified Seller</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>⭐ 4.8 Rating</span>
                    <span>•</span>
                    <span>42 Sales</span>
                    <span>•</span>
                    <span className="text-green-600">Online</span>
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm">
                    Contact Seller
                  </button>
                </div>
              </div>

              {/* Support */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📞</span>
                    <div>
                      <div className="font-medium">0300-FFLENDEN</div>
                      <div className="text-sm text-gray-600">24/7 Support</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💬</span>
                    <div>
                      <div className="font-medium">WhatsApp Support</div>
                      <div className="text-sm text-gray-600">Instant Response</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mt-4">
                    We're here to help you with your purchase!
                  </div>
                </div>
              </div>

              {/* Security Badges */}
              <div className="bg-white border rounded-xl p-6">
                <h3 className="font-bold mb-4">Secure Checkout</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🔒</div>
                    <div className="text-xs font-medium">SSL Secured</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🛡️</div>
                    <div className="text-xs font-medium">Fraud Protection</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">💯</div>
                    <div className="text-xs font-medium">24h Refund</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">✅</div>
                    <div className="text-xs font-medium">Verified Sellers</div>
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