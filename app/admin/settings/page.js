"use client";

import { useState, useEffect } from "react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    // General Settings
    siteName: "FreeFireLenden",
    siteDescription: "Pakistan's #1 Free Fire Marketplace",
    contactEmail: "support@freefirelenden.pk",
    contactPhone: "0300-FFLENDEN",
    supportHours: "24/7",
    
    // Commission Settings
    accountCommission: 5,
    topupCommission: 3,
    minimumCommission: 50,
    
    // Payment Settings
    paymentMethods: {
      jazzcash: true,
      easypaisa: true,
      bankTransfer: true,
      card: false,
      cod: false
    },
    paymentGateway: "stripe",
    
    // Security Settings
    enable2FA: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    enableEmailVerification: true,
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    orderAlerts: true,
    sellerAlerts: true
  });

  useEffect(() => {
    // Simulate loading settings from API
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        // Load settings here
      }));
    }, 500);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Settings saved successfully!");
    }, 1500);
  };

  const tabs = [
    { id: "general", name: "General", icon: "⚙️" },
    { id: "commission", name: "Commission", icon: "💰" },
    { id: "payment", name: "Payment", icon: "💳" },
    { id: "security", name: "Security", icon: "🔒" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
    { id: "maintenance", name: "Maintenance", icon: "🛠️" }
  ];

  const resetToDefaults = (section) => {
    if (confirm(`Reset ${section} settings to defaults?`)) {
      const defaults = {
        general: {
          siteName: "FreeFireLenden",
          siteDescription: "Pakistan's #1 Free Fire Marketplace",
          contactEmail: "support@freefirelenden.pk",
          contactPhone: "0300-FFLENDEN",
          supportHours: "24/7"
        },
        commission: {
          accountCommission: 5,
          topupCommission: 3,
          minimumCommission: 50
        },
        payment: {
          paymentMethods: {
            jazzcash: true,
            easypaisa: true,
            bankTransfer: true,
            card: false,
            cod: false
          },
          paymentGateway: "stripe"
        }
      };

      if (defaults[section]) {
        setFormData(prev => ({
          ...prev,
          ...defaults[section]
        }));
      }
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-600 mt-2">Configure platform settings and preferences</p>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        {/* Tabs */}
        <div className="border-b">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span>{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4">General Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      name="siteName"
                      value={formData.siteName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Description
                    </label>
                    <input
                      type="text"
                      name="siteDescription"
                      value={formData.siteDescription}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone
                    </label>
                    <input
                      type="text"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Support Hours
                    </label>
                    <input
                      type="text"
                      name="supportHours"
                      value={formData.supportHours}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t">
                <button
                  type="button"
                  onClick={() => resetToDefaults("general")}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Reset to Defaults
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save General Settings'}
                </button>
              </div>
            </div>
          )}

          {/* Commission Settings */}
          {activeTab === "commission" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4">Commission Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Sales Commission (%)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        name="accountCommission"
                        value={formData.accountCommission}
                        onChange={handleChange}
                        min="0"
                        max="20"
                        step="0.5"
                        className="flex-1"
                      />
                      <span className="ml-4 text-2xl font-bold text-blue-600">
                        {formData.accountCommission}%
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Applied to all Free Fire account sales
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Top-Up Commission (%)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        name="topupCommission"
                        value={formData.topupCommission}
                        onChange={handleChange}
                        min="0"
                        max="15"
                        step="0.5"
                        className="flex-1"
                      />
                      <span className="ml-4 text-2xl font-bold text-purple-600">
                        {formData.topupCommission}%
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Applied to all diamond top-up orders
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Commission (PKR)
                    </label>
                    <input
                      type="number"
                      name="minimumCommission"
                      value={formData.minimumCommission}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-2xl font-bold text-center"
                    />
                    <div className="text-sm text-gray-500 mt-2">
                      Minimum commission per transaction
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                  <h4 className="font-bold mb-4">Commission Examples</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Account Sale: PKR 3,500</div>
                      <div className="font-bold text-blue-600">
                        Commission: PKR {Math.max(3500 * formData.accountCommission / 100, formData.minimumCommission)}
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Top-Up: PKR 1,200</div>
                      <div className="font-bold text-purple-600">
                        Commission: PKR {Math.max(1200 * formData.topupCommission / 100, formData.minimumCommission)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t">
                <button
                  type="button"
                  onClick={() => resetToDefaults("commission")}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Reset to Defaults
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Commission Settings'}
                </button>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === "payment" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4">Payment Settings</h3>
                
                <div className="mb-6">
                  <h4 className="font-bold mb-4">Enabled Payment Methods</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { id: 'jazzcash', name: 'JazzCash', icon: '📱' },
                      { id: 'easypaisa', name: 'EasyPaisa', icon: '💳' },
                      { id: 'bankTransfer', name: 'Bank Transfer', icon: '🏦' },
                      { id: 'card', name: 'Card', icon: '💳' },
                      { id: 'cod', name: 'Cash on Delivery', icon: '💰' }
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`border rounded-lg p-4 text-center cursor-pointer ${
                          formData.paymentMethods[method.id]
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <input
                          type="checkbox"
                          name={`paymentMethods.${method.id}`}
                          checked={formData.paymentMethods[method.id]}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <div className="text-2xl mb-2">{method.icon}</div>
                        <div className="font-medium">{method.name}</div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold mb-4">Payment Gateway</h4>
                  <select
                    name="paymentGateway"
                    value={formData.paymentGateway}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="stripe">Stripe</option>
                    <option value="razorpay">Razorpay</option>
                    <option value="paypal">PayPal</option>
                    <option value="manual">Manual Processing</option>
                  </select>
                  <div className="text-sm text-gray-500 mt-2">
                    Configure payment gateway settings in the gateway dashboard
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h4 className="font-bold text-yellow-800 mb-2">⚠️ Important Note</h4>
                  <p className="text-sm text-yellow-700">
                    Ensure all payment methods are properly configured in their respective dashboards.
                    Test transactions should be enabled in development mode only.
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t">
                <button
                  type="button"
                  onClick={() => resetToDefaults("payment")}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Reset to Defaults
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Payment Settings'}
                </button>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4">Security Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="enable2FA"
                        checked={formData.enable2FA}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div>
                        <div className="font-medium">Enable Two-Factor Authentication</div>
                        <div className="text-sm text-gray-500">Require 2FA for admin login</div>
                      </div>
                    </label>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Session Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        name="sessionTimeout"
                        value={formData.sessionTimeout}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Login Attempts
                      </label>
                      <input
                        type="number"
                        name="maxLoginAttempts"
                        value={formData.maxLoginAttempts}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="enableEmailVerification"
                        checked={formData.enableEmailVerification}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div>
                        <div className="font-medium">Email Verification Required</div>
                        <div className="text-sm text-gray-500">Users must verify email</div>
                      </div>
                    </label>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-medium mb-2">Security Status</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Password Strength</span>
                          <span className="text-green-600 font-medium">Strong</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Last Security Scan</span>
                          <span className="text-green-600 font-medium">Today</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Firewall Status</span>
                          <span className="text-green-600 font-medium">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t">
                <button
                  type="button"
                  onClick={() => resetToDefaults("security")}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Reset to Defaults
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Security Settings'}
                </button>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4">Notification Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-bold">Notification Channels</h4>
                    
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={formData.emailNotifications}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-gray-500">Send email alerts</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="smsNotifications"
                        checked={formData.smsNotifications}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div>
                        <div className="font-medium">SMS Notifications</div>
                        <div className="text-sm text-gray-500">Send SMS alerts</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="pushNotifications"
                        checked={formData.pushNotifications}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div>
                        <div className="font-medium">Push Notifications</div>
                        <div className="text-sm text-gray-500">Send push alerts</div>
                      </div>
                    </label>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold">Alert Types</h4>
                    
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="orderAlerts"
                        checked={formData.orderAlerts}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div>
                        <div className="font-medium">Order Alerts</div>
                        <div className="text-sm text-gray-500">New orders, completions</div>
                      </div>
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="sellerAlerts"
                        checked={formData.sellerAlerts}
                        onChange={handleChange}
                        className="w-5 h-5"
                      />
                      <div>
                        <div className="font-medium">Seller Alerts</div>
                        <div className="text-sm text-gray-500">New seller requests</div>
                      </div>
                    </label>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="font-medium mb-2">Test Notifications</div>
                      <button
                        type="button"
                        onClick={() => alert("Test notification sent!")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        Send Test Notification
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t">
                <button
                  type="button"
                  onClick={() => resetToDefaults("notifications")}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Reset to Defaults
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Notification Settings'}
                </button>
              </div>
            </div>
          )}

          {/* Maintenance Settings */}
          {activeTab === "maintenance" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4">Maintenance Settings</h3>
                
                <div className="space-y-6">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h4 className="font-bold text-red-800 mb-2">⚠️ Maintenance Mode</h4>
                    <p className="text-sm text-red-700 mb-4">
                      Enable maintenance mode to take the site offline for updates
                    </p>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="w-5 h-5"
                      />
                      <span className="font-medium">Enable Maintenance Mode</span>
                    </label>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <h4 className="font-bold text-yellow-800 mb-2">Database Operations</h4>
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => alert("Backup initiated!")}
                        className="w-full px-4 py-3 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200"
                      >
                        📦 Backup Database
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm("Clear all cache? This may temporarily affect performance.")) {
                            alert("Cache cleared!");
                          }
                        }}
                        className="w-full px-4 py-3 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200"
                      >
                        🗑️ Clear Cache
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm("Optimize database? This may take a few minutes.")) {
                            alert("Database optimization started!");
                          }
                        }}
                        className="w-full px-4 py-3 bg-green-100 text-green-800 rounded-lg hover:bg-green-200"
                      >
                        ⚡ Optimize Database
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <h4 className="font-bold mb-4">System Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Platform Version</span>
                        <span className="font-medium">v2.1.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated</span>
                        <span className="font-medium">2024-01-15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Server Status</span>
                        <span className="font-medium text-green-600">Online</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Uptime</span>
                        <span className="font-medium">99.8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t">
                <button
                  type="button"
                  onClick={() => alert("Check for updates clicked")}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Check for Updates
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Update all system components?")) {
                      alert("System update started!");
                    }
                  }}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Update System
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* System Health */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-bold mb-4">System Health</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Server Load</span>
              <span className="font-medium text-green-600">32%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '32%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span>Database Size</span>
              <span className="font-medium">2.4 GB</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '48%' }}></div>
            </div>
            <div className="flex items-center justify-between">
              <span>Storage Used</span>
              <span className="font-medium">65%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-bold mb-4">Recent Activity Log</h3>
          <div className="space-y-3">
            {[
              { action: 'Settings updated', time: '5 min ago', user: 'Admin' },
              { action: 'New seller approved', time: '15 min ago', user: 'Admin' },
              { action: 'System backup', time: '2 hours ago', user: 'System' },
              { action: 'Cache cleared', time: '4 hours ago', user: 'Admin' }
            ].map((log, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium">{log.action}</div>
                  <div className="text-gray-500">by {log.user}</div>
                </div>
                <div className="text-gray-500">{log.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-bold mb-4">Quick Links</h3>
          <div className="space-y-3">
            <a href="/admin/logs" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
              📊 View System Logs
            </a>
            <a href="/admin/backups" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
              💾 Manage Backups
            </a>
            <a href="/admin/api" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
              🔌 API Documentation
            </a>
            <a href="/admin/support" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
              🆘 Technical Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}