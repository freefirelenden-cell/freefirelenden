"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { CheckCircle, Clock, User, Phone, DollarSign, Package, ExternalLink, AlertCircle } from "lucide-react";

export default function SellerVerifyPayments() {
    const { data: session } = useSession();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (session?.user?._id) {
            fetchSellerOrders();
        }
    }, [session]);

    const fetchSellerOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(`/api/orders?sellerId=${session.user._id}&paymentStatus=pending`);
            const data = await res.json();
            
            if (data.success) {
                setOrders(data.orders || []);
            } else {
                setError(data.message || "Failed to fetch orders");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const confirmPaymentReceived = async (orderId) => {
        setProcessingId(orderId);
        try {
            const res = await fetch(`/api/orders/${orderId}/seller-confirm`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ confirmed: true })
            });
            
            const data = await res.json();
            
            if (res.ok && data.success) {
                alert("✅ Payment confirmed! Admin will now review and release the account.");
                fetchSellerOrders();
            } else {
                alert("❌ Failed to confirm: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Confirmation error:", error);
            alert("Error confirming payment");
        } finally {
            setProcessingId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Loading your pending orders...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                    <div className="text-5xl mb-4">⚠️</div>
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Orders</h3>
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={fetchSellerOrders}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-blue-100 rounded-xl">
                        <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Payment Verification</h1>
                        <p className="text-gray-600 mt-1">Confirm when you receive payment from buyers</p>
                    </div>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Pending Verifications</h3>
                    <p className="text-gray-600">All your orders are up to date. New payments will appear here.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-white">
                                        <Clock className="w-5 h-5" />
                                        <span className="font-medium">Awaiting Your Confirmation</span>
                                    </div>
                                    <span className="text-white/80 text-sm font-mono">
                                        Order #{order._id.slice(-8)}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Left Column */}
                                    <div className="space-y-5">
                                        <div className="flex items-center justify-between pb-3 border-b">
                                            <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
                                            <span className="text-2xl font-bold text-green-600">
                                                PKR {order.price?.toLocaleString()}
                                            </span>
                                        </div>

                                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <DollarSign className="w-4 h-4 text-green-600" />
                                                <h4 className="font-semibold text-gray-900">Payment Details</h4>
                                            </div>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Method:</span>
                                                    <span className="font-medium capitalize">{order.payment?.method}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Buyer Sent From:</span>
                                                    <span className="font-medium">{order.buyer?.paymentAccount || "N/A"}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-purple-50 rounded-xl p-4">
                                            <div className="flex items-center gap-2 mb-3">
                                                <User className="w-4 h-4 text-purple-600" />
                                                <h4 className="font-semibold text-gray-900">Buyer Information</h4>
                                            </div>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-500 w-20">Name:</span>
                                                    <span className="font-medium">{order.buyer?.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-3 h-3 text-gray-400" />
                                                    <span className="text-gray-500 w-20">Phone:</span>
                                                    <span className="font-medium">{order.buyer?.phone}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-500 w-20">Email:</span>
                                                    <span className="font-medium text-sm truncate">{order.buyer?.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-5">
                                        {order.payment?.screenshot && (
                                            <div className="bg-gray-50 rounded-xl p-4">
                                                <h4 className="font-semibold text-gray-900 mb-3">Payment Screenshot</h4>
                                                <div className="border rounded-lg overflow-hidden bg-white">
                                                    <img
                                                        src={order.payment.screenshot}
                                                        alt="Payment proof"
                                                        className="w-full h-auto cursor-pointer hover:opacity-90 transition"
                                                        onClick={() => window.open(order.payment.screenshot, '_blank')}
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => window.open(order.payment.screenshot, '_blank')}
                                                    className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                    View Full Image
                                                </button>
                                            </div>
                                        )}

                                        <button
                                            onClick={() => confirmPaymentReceived(order._id)}
                                            disabled={processingId === order._id}
                                            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {processingId === order._id ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                                    Confirming...
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle className="w-5 h-5" />
                                                    ✅ Confirm I Received Payment
                                                </>
                                            )}
                                        </button>

                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                            <div className="flex items-start gap-2">
                                                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                                <p className="text-xs text-yellow-700">
                                                    Only click confirm after you have verified the payment in your bank/JazzCash/EasyPaisa account. Fake confirmations may lead to account suspension.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}