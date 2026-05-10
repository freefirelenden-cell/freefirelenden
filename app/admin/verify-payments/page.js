"use client";
import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, ExternalLink, User, Phone, DollarSign, ShoppingBag, Users, CreditCard } from "lucide-react";

export default function AdminVerifyPayments() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/orders?paymentStatus=seller_confirmed");
            const data = await res.json();
            setOrders(data.orders || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const completeOrder = async (orderId) => {
        setProcessingId(orderId);
        try {
            const res = await fetch(`/api/orders/${orderId}/admin-complete`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: true })
            });
            if (res.ok) {
                alert("✅ Order completed! Account details sent to buyer.");
                fetchOrders();
            } else {
                alert("❌ Failed to complete order");
            }
        } catch (error) {
            console.error(error);
            alert("Error completing order");
        } finally {
            setProcessingId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Loading pending verifications...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">💰 Payment Verification</h1>
                <p className="text-gray-600 mt-2">Review and release accounts after seller confirmation</p>
            </div>

            {orders.length === 0 ? (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">No Pending Verifications</h3>
                    <p className="text-green-600">All orders have been processed. Check back later for new verifications.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                            {/* Status Banner */}
                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3">
                                <div className="flex items-center gap-2 text-white">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-medium">Seller Has Confirmed Payment Receipt</span>
                                </div>
                            </div>

                            {/* Order Content */}
                            <div className="p-6">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Left Column - Order Details */}
                                    <div className="lg:col-span-2 space-y-4">
                                        <div className="flex items-center justify-between pb-3 border-b">
                                            <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                ID: {order._id.slice(-8)}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-start gap-2">
                                                <DollarSign className="w-4 h-4 text-green-600 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-gray-500">Amount</p>
                                                    <p className="font-bold text-xl text-green-600">
                                                        PKR {order.price?.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <CreditCard className="w-4 h-4 text-blue-600 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-gray-500">Payment Method</p>
                                                    <p className="font-medium capitalize">{order.payment?.method}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Seller Info */}
                                        <div className="bg-blue-50 rounded-xl p-4">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Users className="w-4 h-4 text-blue-600" />
                                                <h4 className="font-semibold text-gray-900">Seller Information</h4>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div>
                                                    <p className="text-gray-500">Name</p>
                                                    <p className="font-medium">{order.seller?.name}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Phone</p>
                                                    <p className="font-medium">{order.seller?.phone}</p>
                                                </div>
                                                <div className="col-span-2">
                                                    <p className="text-gray-500">Email</p>
                                                    <p className="font-medium">{order.seller?.email}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Buyer Info */}
                                        <div className="bg-purple-50 rounded-xl p-4">
                                            <div className="flex items-center gap-2 mb-3">
                                                <User className="w-4 h-4 text-purple-600" />
                                                <h4 className="font-semibold text-gray-900">Buyer Information</h4>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div>
                                                    <p className="text-gray-500">Name</p>
                                                    <p className="font-medium">{order.buyer?.name}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Phone</p>
                                                    <p className="font-medium">{order.buyer?.phone}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Payment Account</p>
                                                    <p className="font-medium">{order.buyer?.paymentAccount || "N/A"}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Email</p>
                                                    <p className="font-medium text-sm">{order.buyer?.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Screenshot & Action */}
                                    <div className="space-y-4">
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
                                            onClick={() => completeOrder(order._id)}
                                            disabled={processingId === order._id}
                                            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {processingId === order._id ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    🚀 Release Account & Complete Order
                                                </>
                                            )}
                                        </button>

                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                            <div className="flex items-start gap-2">
                                                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                                                <p className="text-xs text-yellow-700">
                                                    Confirm with seller before releasing. Once completed, account details will be emailed to buyer automatically.
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