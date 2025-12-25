"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [platformFee, setPlatformFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const orderId = searchParams.get("orderId");
    if (!orderId) {
      router.push("/");
      return;
    }

    async function loadOrder() {
      try {
        setLoading(true);
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();

        if (!res.ok) {
          router.push("/");
          return;
        }

        setOrder(data.order);
        // Platform fee calculation (aap apne hisaab se adjust kar sakte hain)
        const fee = Math.round((data.order.price * 0) / 100);
        setPlatformFee(fee);
        setTotalAmount(data.order.price + fee);

      } catch (err) {
        console.error(err);
        router.push("/checkout/failed");
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [router]);

  const handleDownloadReceipt = () => {
    if (!order) return;

    const receipt = `
FreeFireLenden - Order Receipt
==============================
Order ID: ${order._id}
Order Type: ${order.type}
Date: ${new Date(order.createdAt).toLocaleString()}
Transaction ID: ${order.payment?.paymentId || "N/A"}

Amount: PKR ${totalAmount}
Payment Method: ${order.payment?.method || "N/A"}
Payment Status: ${order.payment?.status || "N/A"}

Buyer Information:
------------------
Name: ${order.buyer?.name || "N/A"}
Email: ${order.buyer?.email || "N/A"}
Phone: ${order.buyer?.phone || "N/A"}

Seller Information:
-------------------
Shop: ${order.seller?.shopName || "N/A"}
Name: ${order.seller?.name || "N/A"}
Phone: ${order.seller?.phone || "N/A"}

Order Status: ${order.status}
==============================
`;

    const blob = new Blob([receipt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${order._id}.txt`;
    a.click();
  };



  useEffect(() => {
  if (!order?._id) return;

  const key = `receipt-downloaded-${order._id}`;
  const alreadyDownloaded = localStorage.getItem(key);

  // ✅ sirf pehli baar
  if (!alreadyDownloaded) {
    handleDownloadReceipt();
    localStorage.setItem(key, "true");
  }
}, [order._id]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-20">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
              <p className="mt-4 text-gray-600">Processing your order...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Order Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Delivery time estimation based on order type
  const getDeliveryTime = () => {
    if (order.type === "account") {
      return "1-24 hours";
    }
    return "Instant to 1 hour";
  };

  // Next steps based on order type
  const getNextSteps = () => {
    const steps = [
      {
        step: 1,
        title: "Seller Contact",
        description: `Seller will contact you within 5 minutes at: ${order.buyer?.phone || "your provided phone number"}`,
      },
      {
        step: 2,
        title: "Delivery",
        description: `Your ${order.type} will be delivered within ${getDeliveryTime()}.`,
      },
      {
        step: 3,
        title: "Confirmation",
        description: order.buyer?.email
          ? `Check your email (${order.buyer.email}) for order confirmation`
          : "You will receive SMS confirmation",
      },
    ];

    if (order.type === "account") {
      steps.splice(1, 0, {
        step: 2,
        title: "Account Details",
        description: "You will receive account credentials (ID/password)",
      });
    }

    return steps;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-green-600">✓</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-gray-600 text-lg">
              Thank you for your purchase. Your {order.type} order is being processed.
            </p>
            {order.payment?.status === "pending" && (
              <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg inline-block">
                ⚠️ Payment status is pending. Please complete the payment.
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Order Details</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "completed" ? "bg-green-100 text-green-800" :
                    order.status === "processing" ? "bg-blue-100 text-blue-800" :
                      order.status === "cancelled" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                    }`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-6">
                  {/* Order Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Order ID</div>
                      <div className="font-bold text-lg truncate">{order._id}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Order Type</div>
                      <div className="font-bold">{order.type.toUpperCase()}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Transaction ID</div>
                      <div className="font-bold text-lg truncate">{order.payment?.paymentId || "N/A"}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Date & Time</div>
                      <div className="font-bold">
                        {new Date(order.createdAt).toLocaleDateString()}
                        <span className="text-gray-500 mx-1">•</span>
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="border-t pt-6">
                    <h3 className="font-bold mb-4">Payment Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Payment Method</div>
                          <div className="font-medium">{order.payment?.method || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Payment Status</div>
                          <div className={`font-medium ${order.payment?.status === "paid" ? "text-green-600" : "text-yellow-600"
                            }`}>
                            {order.payment?.status?.toUpperCase() || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="border-t pt-6">
                    <h3 className="font-bold mb-4">Order Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Order Amount</span>
                        <span className="font-medium">PKR {order.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform Fee</span>
                        <span>PKR {platformFee}</span>
                      </div>
                      <div className="pt-3 border-t">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total Amount</span>
                          <span className="text-green-600">PKR {totalAmount}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* What's Next */}
                  <div className="border-t pt-6">
                    <h3 className="font-bold mb-4">What's Next?</h3>
                    <div className="space-y-4">
                      {getNextSteps().map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600">{step.step}</span>
                          </div>
                          <div>
                            <div className="font-medium">{step.title}</div>
                            <div className="text-gray-600 text-sm">{step.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="font-bold mb-6">Order Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={handleDownloadReceipt}
                    className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-medium transition-colors"
                  >
                    📄 Download Receipt
                  </button>
                  <Link
                    href="/orders"
                    className="px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 font-medium text-center transition-colors"
                  >
                    📦 View Orders
                  </Link>
                  <Link
                    href={order.type === "account" ? "/shop" : "/topup"}
                    className="px-6 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 font-medium text-center transition-colors"
                  >
                    🛒 Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Support & Info */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  {/* Buyer Info */}
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Buyer</div>
                    <div className="font-medium">{order.buyer?.name || "N/A"}</div>
                    <div className="text-sm text-gray-600">{order.buyer?.phone || "N/A"}</div>
                    <div className="text-sm text-gray-600 truncate">{order.buyer?.email || "N/A"}</div>
                  </div>

                  {/* Seller Info */}
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Seller</div>
                    <div className="font-medium">{order.seller?.shopName || order.seller?.name || "N/A"}</div>
                    <div className="text-sm text-gray-600">{order.seller?.phone || "N/A"}</div>
                  </div>

                  {/* Support Links */}
                  <div className="space-y-2">
                    <a
                      href={`tel:${order.seller?.phone}`}
                      className="flex items-center gap-2 p-2 bg-green-50 rounded-lg hover:bg-green-100 text-green-700 transition-colors"
                    >
                      <span>📞</span>
                      <span className="font-medium">Call Seller</span>
                    </a>
                    <a
                      href="tel:0300FFLENDEN"
                      className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg hover:bg-blue-100 text-blue-700 transition-colors"
                    >
                      <span>🆘</span>
                      <span className="font-medium">Platform Support</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold mb-4">Order Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${order.payment?.status === "paid"
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600"
                      }`}>
                      ✓
                    </span>
                    <span>Payment {order.payment?.status === "paid" ? "Confirmed" : "Pending"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${order.status !== "pending"
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600"
                      }`}>
                      {order.status !== "pending" ? "✓" : "2"}
                    </span>
                    <span>Order Processing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm bg-gray-300 text-gray-600">
                      3
                    </span>
                    <span>Seller Contact</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm bg-gray-300 text-gray-600">
                      4
                    </span>
                    <span>Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-sm bg-gray-300 text-gray-600">
                      5
                    </span>
                    <span>Order Complete</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  Estimated delivery: {getDeliveryTime()}
                </div>
              </div>

              {/* Safety Tips */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="font-bold text-yellow-800 mb-4">⚠️ Safety Tips</h3>
                <ul className="text-sm text-yellow-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Never share your payment PIN with anyone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Verify seller identity before sharing details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Keep all communication within platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Report any suspicious activity immediately</span>
                  </li>
                </ul>
              </div>

              {/* Return Policy */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold mb-4">Return Policy</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>24-hour refund if order doesn't match description</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Full support for delivery issues</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Escrow protection for all payments</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}