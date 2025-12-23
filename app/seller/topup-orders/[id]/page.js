"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function TopupOrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Simulate API call with order ID from params
    setTimeout(() => {
      setOrder({
        id: params.id || "TOP001",
        playerId: "1234567890",
        server: "Pakistan",
        diamonds: 1000,
        price: 1200,
        status: "pending",
        buyer: "Ali Ahmed",
        buyerPhone: "0300-1234567",
        buyerEmail: "ali.ahmed@example.com",
        date: "2024-01-15",
        paymentMethod: "JazzCash",
        paymentStatus: "completed",
        orderNotes: "Please recharge within 1 hour"
      });
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const handleApprove = async () => {
    setProcessing(true);
    
    // Simulate processing steps
    setTimeout(() => {
      if (step < 3) {
        setStep(step + 1);
        setProcessing(false);
      } else {
        // Final completion
        alert("Top-up completed successfully! Order marked as completed.");
        router.push("/seller/topup-orders");
      }
    }, 1500);
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel this order?")) {
      alert("Order cancelled successfully");
      router.push("/seller/topup-orders");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">😕</div>
        <h3 className="text-xl font-bold mb-2">Order not found</h3>
        <p className="text-gray-600 mb-6">The requested order does not exist.</p>
        <button
          onClick={() => router.push("/seller/topup-orders")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={() => router.push("/seller/topup-orders")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back to Top-Up Orders
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Top-Up Order: {order.id}</h1>
        <p className="text-gray-600 mt-2">Process this diamond recharge order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status Steps */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">Processing Steps</h2>
            
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= 1 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-2">Verify Order Details</h3>
                  <p className="text-gray-600 text-sm">Check player ID, server, and diamond amount</p>
                </div>
                {step > 1 && <span className="text-green-500">✓</span>}
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= 2 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-2">Recharge Diamonds</h3>
                  <p className="text-gray-600 text-sm">Use your diamond source to recharge the account</p>
                </div>
                {step > 2 && <span className="text-green-500">✓</span>}
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= 3 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-bold mb-2">Confirm Completion</h3>
                  <p className="text-gray-600 text-sm">Mark order as completed and notify buyer</p>
                </div>
                {step > 3 && <span className="text-green-500">✓</span>}
              </div>
            </div>
          </div>

          {/* Order Information */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">Order Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-700 mb-4">Buyer Details</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Name</div>
                    <div className="font-medium">{order.buyer}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-medium">{order.buyerPhone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">{order.buyerEmail}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-700 mb-4">Game Details</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Player ID</div>
                    <div className="font-mono font-medium bg-gray-100 p-2 rounded">{order.playerId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Server</div>
                    <div className="font-medium">{order.server}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Diamonds</div>
                    <div className="font-bold text-purple-600 text-xl">
                      💎 {order.diamonds.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {order.orderNotes && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-bold text-gray-700 mb-2">Buyer Notes</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  {order.orderNotes}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">Actions</h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {order.status === 'pending' && step < 3 ? (
                <button
                  onClick={handleApprove}
                  disabled={processing}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 font-medium"
                >
                  {processing ? 'Processing...' : 
                   step === 1 ? 'Verify & Proceed' :
                   step === 2 ? 'Mark as Recharged' :
                   'Complete Order'}
                </button>
              ) : order.status === 'completed' ? (
                <div className="text-center w-full py-3 bg-green-100 text-green-700 rounded-lg font-medium">
                  ✅ Order Completed Successfully
                </div>
              ) : null}
              
              {order.status === 'pending' && (
                <button
                  onClick={handleCancel}
                  className="flex-1 px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium"
                >
                  Cancel Order
                </button>
              )}
              
              <button
                onClick={() => router.push(`/seller/topup-orders`)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Back to List
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Payment & Info */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">Payment Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Diamonds Amount</span>
                <span className="font-medium">💎 {order.diamonds.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price</span>
                <span className="font-medium">PKR {order.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Commission (5%)</span>
                <span className="font-medium text-red-600">- PKR {(order.price * 0.05).toLocaleString()}</span>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="font-bold">Your Earnings</span>
                  <span className="font-bold text-green-600 text-lg">
                    PKR {(order.price * 0.95).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {order.paymentStatus}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Via {order.paymentMethod}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">Quick Contact</h2>
            
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                <span className="text-xl">💬</span>
                WhatsApp Buyer
              </button>
              
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                <span className="text-xl">📞</span>
                Call Buyer
              </button>
              
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                <span className="text-xl">📧</span>
                Email Buyer
              </button>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
            <h3 className="font-bold text-purple-800 mb-4">Need Help?</h3>
            <ul className="space-y-3 text-sm text-purple-700">
              <li className="flex items-start gap-2">
                <span>📞</span>
                <span>Support: 0300-FFLENDEN</span>
              </li>
              <li className="flex items-start gap-2">
                <span>💬</span>
                <span>WhatsApp Support Available</span>
              </li>
              <li className="flex items-start gap-2">
                <span>⏰</span>
                <span>Process within 1 hour for best rating</span>
              </li>
              <li className="flex items-start gap-2">
                <span>⚠️</span>
                <span>Double-check Player ID before recharging</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}