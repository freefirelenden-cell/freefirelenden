"use client";

import { useState, useEffect } from "react";
import { getSellerRequests } from "@/lib/apiClient";

export default function AdminSellerRequestsPage() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("pending");
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("");


    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const data = await getSellerRequests(filter);
            setRequests(data);
            setLoading(false);
        };
        load();
    }, [filter]);


    const filteredRequests = requests.filter(request =>
        filter === "all" ? true : request.status === filter
    );

    const handleApprove = async (requestId) => {
        if (!confirm("Approve this seller request?")) return;

        try {
            setLoading(true);

            const res = await fetch(
                `/api/admin/seller-requests/${requestId}/approve`,
                { method: "PATCH" }
            );

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Approval failed");
                return;
            }

            // update UI state
            setRequests((prev) =>
                prev.map((req) =>
                    req._id === requestId
                        ? {
                            ...req,
                            status: "approved",
                            approvedAt: new Date().toISOString().split("T")[0],
                            approvedBy: "Admin",
                        }
                        : req
                )
            );

            setSelectedRequest(null);
            alert("✅ Seller request approved");

        } catch (err) {
            alert("Server error");
        } finally {
            setLoading(false);
        }
    };


    const handleReject = async (requestId) => {
        if (!rejectionReason.trim()) {
            alert("Please provide rejection reason");
            return;
        }

        if (!confirm("Reject this seller request?")) return;

        try {
            setLoading(true);

            const res = await fetch(
                `/api/admin/seller-requests/${requestId}/reject`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ reason: rejectionReason }),
                }
            );
            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Rejection failed");
                return;
            }

            setRequests((prev) =>
                prev.map((req) =>
                    req._id === requestId
                        ? {
                            ...req,
                            status: "rejected",
                            rejectionReason,
                            rejectedAt: new Date().toISOString().split("T")[0],
                        }
                        : req
                )
            );

            setSelectedRequest(null);
            setRejectionReason("");
            alert("❌ Seller request rejected");

        } catch (err) {
            alert("Server error");
        } finally {
            setLoading(false);
        }
    };


    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getSellingTypeBadge = (type) => {
        switch (type) {
            case 'account': return { text: 'Accounts', color: 'bg-blue-100 text-blue-800' };
            case 'topup': return { text: 'Top-Ups', color: 'bg-purple-100 text-purple-800' };
            case 'both': return { text: 'Both', color: 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800' };
            default: return { text: type, color: 'bg-gray-100 text-gray-800' };
        }
    };

    const stats = {
        total: requests.length,
        pending: requests.filter(r => r.status === 'pending').length,
        approved: requests.filter(r => r.status === 'approved').length,
        rejected: requests.filter(r => r.status === 'rejected').length
    };

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
                <p className="mt-4 text-gray-600">Loading seller requests...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Seller Requests</h1>
                <p className="text-gray-600 mt-2">Review and approve seller applications</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
                <div className="bg-white border rounded-xl p-6">
                    <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                    <div className="text-gray-600">Total Requests</div>
                </div>
                <div className="bg-white border rounded-xl p-6">
                    <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                    <div className="text-gray-600">Pending Review</div>
                </div>
                <div className="bg-white border rounded-xl p-6">
                    <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
                    <div className="text-gray-600">Approved</div>
                </div>
                <div className="bg-white border rounded-xl p-6">
                    <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
                    <div className="text-gray-600">Rejected</div>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-6 bg-white border rounded-xl p-4">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-4 py-2 rounded-lg ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                        All Requests ({stats.total})
                    </button>
                    <button
                        onClick={() => setFilter("pending")}
                        className={`px-4 py-2 rounded-lg ${filter === "pending" ? "bg-yellow-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                        Pending ({stats.pending})
                    </button>
                    <button
                        onClick={() => setFilter("approved")}
                        className={`px-4 py-2 rounded-lg ${filter === "approved" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                        Approved ({stats.approved})
                    </button>
                    <button
                        onClick={() => setFilter("rejected")}
                        className={`px-4 py-2 rounded-lg ${filter === "rejected" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                        Rejected ({stats.rejected})
                    </button>
                </div>
            </div>

            {/* Requests Table */}
            <div className="bg-white border rounded-xl overflow-hidden">
                {filteredRequests.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-5xl mb-4">📝</div>
                        <h3 className="text-xl font-bold mb-2">No requests found</h3>
                        <p className="text-gray-600">
                            {filter === "all"
                                ? "No seller requests available."
                                : `No ${filter} requests found.`}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shop Details</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Selling Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredRequests.map((request) => (
                                    <tr key={request._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{request._id}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium text-gray-900">{request.name}</div>
                                                <div className="text-sm text-gray-500">{request.phone}</div>
                                                <div className="text-sm text-gray-500">{request.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-medium">{request.shopName}</div>
                                                <div className="text-sm text-gray-500">{request.paymentMethod}</div>
                                                <div className="text-xs text-gray-400">{request.paymentAccount}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSellingTypeBadge(request.sellingType).color}`}>
                                                {getSellingTypeBadge(request.sellingType).text}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                                {request.status}
                                            </span>
                                            {request.rejectionReason && (
                                                <div className="text-xs text-red-600 mt-1">{request.rejectionReason}</div>
                                            )}
                                            {request.approvedAt && (
                                                <div className="text-xs text-green-600 mt-1">
                                                    Approved by {request.approvedBy}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">{request.createdAt}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-2">
                                                <button
                                                    onClick={() => setSelectedRequest(request)}
                                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
                                                >
                                                    Review
                                                </button>
                                                {request.status === 'pending' && (
                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => handleApprove(request._id)}
                                                            className="flex-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedRequest(request);
                                                                setRejectionReason("");
                                                            }}
                                                            className="flex-1 px-2 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Review Modal */}
            {selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">Review Seller Request</h3>
                                <button
                                    onClick={() => {
                                        setSelectedRequest(null);
                                        setRejectionReason("");
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column - Applicant Info */}
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-bold mb-4">Applicant Information</h4>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Name:</span>
                                                <span className="font-medium">{selectedRequest.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Email:</span>
                                                <span className="font-medium">{selectedRequest.email}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Phone:</span>
                                                <span className="font-medium">{selectedRequest.phone}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">User Since:</span>
                                                <span className="font-medium">{selectedRequest.userStats.joinDate}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Previous Orders:</span>
                                                <span className="font-medium">{selectedRequest.userStats.totalOrders}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-4">Shop Information</h4>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Shop Name:</span>
                                                <span className="font-medium">{selectedRequest.shopName}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Selling Type:</span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSellingTypeBadge(selectedRequest.sellingType).color}`}>
                                                    {getSellingTypeBadge(selectedRequest.sellingType).text}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-4">Payment Information</h4>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Payment Method:</span>
                                                <span className="font-medium">{selectedRequest.paymentMethod}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Account Number:</span>
                                                <span className="font-medium">{selectedRequest.paymentAccount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Documents */}
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-bold mb-4">CNIC Verification</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            {selectedRequest?.documents?.cnicFront && (
                                                <div>
                                                    <div className="text-sm text-gray-600 mb-2">CNIC Front</div>
                                                    <img
                                                        src={selectedRequest?.documents?.cnicFront}
                                                        alt="CNIC Front"
                                                        className="w-full h-48 object-cover rounded-lg border"
                                                    />
                                                </div>
                                            )}
                                            {selectedRequest?.documents?.cnicBack && (
                                                <div>
                                                    <div className="text-sm text-gray-600 mb-2">CNIC Back</div>
                                                    <img
                                                        src={selectedRequest?.documents?.cnicBack}
                                                        alt="CNIC Back"
                                                        className="w-full h-48 object-cover rounded-lg border"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    {selectedRequest.status === 'pending' && (
                                        <div className="space-y-4">
                                            <button
                                                onClick={() => handleApprove(selectedRequest._id)}
                                                className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 font-medium"
                                            >
                                                ✅ Approve Seller Request
                                            </button>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Rejection Reason (if rejecting)
                                                </label>
                                                <textarea
                                                    value={rejectionReason}
                                                    onChange={(e) => setRejectionReason(e.target.value)}
                                                    placeholder="Provide reason for rejection..."
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2"
                                                    rows="3"
                                                />
                                                <button
                                                    onClick={() => handleReject(selectedRequest._id)}
                                                    disabled={!rejectionReason.trim()}
                                                    className="w-full px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    ❌ Reject Request
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {selectedRequest.status === 'approved' && (
                                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                            <div className="font-bold text-green-700">✅ Approved</div>
                                            <div className="text-sm text-green-600 mt-1">
                                                Approved on {selectedRequest.approvedAt} by {selectedRequest.approvedBy}
                                            </div>
                                        </div>
                                    )}

                                    {selectedRequest.status === 'rejected' && (
                                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                            <div className="font-bold text-red-700">❌ Rejected</div>
                                            <div className="text-sm text-red-600 mt-1">
                                                Reason: {selectedRequest.rejectionReason}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Guidelines */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <h3 className="font-bold mb-4">Seller Verification Guidelines</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-bold text-green-600 mb-2">✅ Approval Criteria</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Clear CNIC images (front & back)</li>
                            <li>• Valid Pakistani phone number</li>
                            <li>• Active payment account</li>
                            <li>• No previous violations</li>
                            <li>• Clear shop name and purpose</li>
                        </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-bold text-red-600 mb-2">❌ Rejection Reasons</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Blurry or unclear documents</li>
                            <li>• Suspicious payment information</li>
                            <li>• Previous scam reports</li>
                            <li>• Incomplete application</li>
                            <li>• Violates platform policies</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}