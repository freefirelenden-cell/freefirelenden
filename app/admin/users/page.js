"use client";

import { useState, useEffect } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers([
        {
          id: "1",
          name: "Ahmed Raza",
          email: "ahmed@example.com",
          phone: "0300-1234567",
          type: "buyer",
          status: "active",
          joinDate: "2023-12-01",
          totalOrders: 12,
          totalSpent: 42000
        },
        {
          id: "2",
          name: "Sara Khan",
          email: "sara@example.com",
          phone: "0312-7654321",
          type: "seller",
          status: "active",
          joinDate: "2023-11-15",
          totalOrders: 45,
          totalSpent: 125000
        },
        {
          id: "3",
          name: "Bilal Ahmed",
          email: "bilal@example.com",
          phone: "0333-9876543",
          type: "buyer",
          status: "suspended",
          joinDate: "2024-01-05",
          totalOrders: 3,
          totalSpent: 9000,
          suspensionReason: "Violation of terms"
        },
        {
          id: "4",
          name: "Usman Ali",
          email: "usman@example.com",
          phone: "0301-1122334",
          type: "seller",
          status: "pending",
          joinDate: "2024-01-10",
          totalOrders: 0,
          totalSpent: 0
        },
        {
          id: "5",
          name: "Fatima Noor",
          email: "fatima@example.com",
          phone: "0345-5566778",
          type: "buyer",
          status: "active",
          joinDate: "2023-12-20",
          totalOrders: 8,
          totalSpent: 24000
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter(user => {
    if (filter !== "all" && user.status !== filter) return false;
    if (search && !user.name.toLowerCase().includes(search.toLowerCase()) && 
        !user.email.toLowerCase().includes(search.toLowerCase()) &&
        !user.phone.includes(search)) return false;
    return true;
  });

  const handleStatusChange = async (userId, newStatus) => {
    // Simulate API call
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    alert(`User status changed to ${newStatus}`);
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    
    // Simulate API call
    setUsers(prev => prev.filter(user => user.id !== userId));
    alert("User deleted successfully");
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    pending: users.filter(u => u.status === 'pending').length
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
        <p className="mt-4 text-gray-600">Loading users...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
        <p className="text-gray-600 mt-2">Manage all users and buyers on the platform</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-gray-600">Total Users</div>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          <div className="text-gray-600">Active</div>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-gray-600">Pending</div>
        </div>
        <div className="bg-white border rounded-xl p-6">
          <div className="text-2xl font-bold text-red-600">{stats.suspended}</div>
          <div className="text-gray-600">Suspended</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="all">All Users</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.type === 'seller' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                    {user.suspensionReason && (
                      <div className="text-xs text-red-600 mt-1">{user.suspensionReason}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{user.totalOrders}</div>
                    <div className="text-sm text-gray-500">PKR {user.totalSpent.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
                      >
                        View
                      </button>
                      <select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                      >
                        <option value="active">Active</option>
                        <option value="suspended">Suspend</option>
                        <option value="pending">Pending</option>
                      </select>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
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

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">👤</div>
            <h3 className="text-xl font-bold mb-2">No users found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">User Details</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">Name</div>
                <div className="font-medium">{selectedUser.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">{selectedUser.email}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-medium">{selectedUser.phone}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">User Type</div>
                <div className="font-medium">{selectedUser.type}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Status</div>
                <div className="font-medium">{selectedUser.status}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Orders</div>
                <div className="font-medium">{selectedUser.totalOrders}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Spent</div>
                <div className="font-medium">PKR {selectedUser.totalSpent.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Joined Date</div>
                <div className="font-medium">{selectedUser.joinDate}</div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  // View user's orders
                  alert(`Would redirect to orders for ${selectedUser.name}`);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                View Orders
              </button>
              <button
                onClick={() => setSelectedUser(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}