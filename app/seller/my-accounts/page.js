"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthProvider";
import { getAllAccounts } from "@/lib/apiClient";
import Image from "next/image";

export default function MyAccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [editingAccount, setEditingAccount] = useState(null);

  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Log user only if session is loaded
    async function load() {
      if (isLoading) return
      try {
        const res = await getAllAccounts(user.id);
        setAccounts(res.accounts)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }

    }
    load()
  }, [user, isLoading]);


  const filteredAccounts = accounts.filter(account => {
    if (filter === "all") return true;
    return account.status === filter;
  });

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this account?")) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAccounts(prev => prev.filter(acc => acc._id !== id));
      setLoading(false);
      alert("Account deleted successfully");
    }, 800);
  };

  const handleUpdateStatus = async (id, status) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAccounts(prev => prev.map(acc =>
        acc._id === id ? { ...acc, status } : acc
      ));
      setLoading(false);
      alert(`Account marked as ${status}`);
    }, 800);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && accounts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">Loading your accounts...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Accounts</h1>
            <p className="text-gray-600 mt-2">Manage your listed Free Fire accounts</p>
          </div>
          <Link
            href="/seller/add-account"
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 font-medium"
          >
            + Add New Account
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-blue-600">{accounts.length}</div>
          <div className="text-gray-600">Total Accounts</div>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-green-600">
            {accounts.filter(a => a.status === 'approved').length}
          </div>
          <div className="text-gray-600">Active</div>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-yellow-600">
            {accounts.filter(a => a.status === 'pending').length}
          </div>
          <div className="text-gray-600">Pending Review</div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white border rounded-xl p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            All ({accounts.length})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-4 py-2 rounded-lg ${filter === "approved" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            Approved ({accounts.filter(a => a.status === 'approved').length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg ${filter === "pending" ? "bg-yellow-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            Pending ({accounts.filter(a => a.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-4 py-2 rounded-lg ${filter === "rejected" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            Rejected ({accounts.filter(a => a.status === 'rejected').length})
          </button>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        {filteredAccounts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📂</div>
            <h3 className="text-xl font-bold mb-2">No accounts found</h3>
            <p className="text-gray-600 mb-6">
              {filter === "all"
                ? "You haven't listed any accounts yet."
                : `No ${filter} accounts found.`}
            </p>
            <Link
              href="/seller/add-account"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Your First Account
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Account</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views/Likes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAccounts.map((account) => (
                  <tr key={account._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                          {account.images.length > 0 ? (
                            <Image
                              src={account.images[0].url}
                              alt={account.title}
                              width={48}
                              height={48}
                              className="object-cover rounded-lg"
                              unoptimized={true} // bypass Next.js optimization
                            />

                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">🎮</div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{account.title}</div>
                          <div className="text-sm text-gray-500">{account.rank}</div>
                        </div>
                        {account.isFeatured && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Featured</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-blue-600">PKR {account.price.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
                        {account.status}
                      </span>
                      {account.rejectionReason && (
                        <div className="text-xs text-red-600 mt-1">{account.rejectionReason}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="font-bold">{account.views}</div>
                          <div className="text-xs text-gray-500">Views</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold">{account.likes}</div>
                          <div className="text-xs text-gray-500">Likes</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(account.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/shop/${account._id}`}
                          target="_blank"
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => setEditingAccount(account)}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(account._id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
        <h3 className="font-bold text-yellow-800 mb-2">💡 Account Management Tips</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Update your account prices regularly based on market demand</li>
          <li>• Add high-quality images to attract more buyers</li>
          <li>• Respond quickly to buyer inquiries (within 15 minutes recommended)</li>
          <li>• Mark accounts as sold immediately after sale to avoid confusion</li>
          <li>• Featured accounts get 3x more views - consider featuring your best accounts</li>
        </ul>
      </div>

      {/* Edit Modal */}
      {editingAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Edit Account</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  defaultValue={editingAccount.title}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (PKR)
                </label>
                <input
                  type="number"
                  defaultValue={editingAccount.price}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setEditingAccount(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert("Update functionality would save to API");
                    setEditingAccount(null);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}