"use client";

import { useState } from "react";

export default function SellerProfile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+92 300 1234567",
    city: "Lahore",
    cnic: "35201-1234567-8",
    bankAccount: "IBAN PK00XXXX1234567890",
    bankName: "Bank Alfalah",
    rating: 4.8,
    totalSales: 45,
    joinDate: "2023-06-15"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-2">Manage your seller profile information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Personal Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 disabled:bg-gray-50"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CNIC
                  </label>
                  <input
                    type="text"
                    name="cnic"
                    value={profile.cnic}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 disabled:bg-gray-50"
                  />
                </div>
              </div>

              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-bold mb-6">Bank Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      name="bankName"
                      value={profile.bankName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Number
                    </label>
                    <input
                      type="text"
                      name="bankAccount"
                      value={profile.bankAccount}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 disabled:bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Column - Stats & Info */}
        <div className="space-y-6">
          {/* Stats Card */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl p-6">
            <div className="text-center mb-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <div className="text-3xl font-bold">{profile.rating}</div>
              <div className="text-blue-200">Seller Rating</div>
            </div>
            <div className="text-center text-sm">
              Based on {profile.totalSales} sales
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-white border rounded-xl p-6">
            <h3 className="font-bold mb-4">Verification Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Verified</span>
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Phone Verified</span>
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">CNIC Verified</span>
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Bank Verified</span>
                <span className="text-green-600 font-bold">✓</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t text-center">
              <span className="text-green-600 font-bold">Fully Verified Seller</span>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white border rounded-xl p-6">
            <h3 className="font-bold mb-4">Account Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium">{profile.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Sales</span>
                <span className="font-medium">{profile.totalSales}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Response Rate</span>
                <span className="font-medium">98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Response Time</span>
                <span className="font-medium">15 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}