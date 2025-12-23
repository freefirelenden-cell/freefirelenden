"use client";

import { useState, useEffect } from "react";

export default function AdminReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: "2024-01-01",
    end: "2024-01-31"
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReports([
        {
          id: "REP001",
          type: "sales",
          title: "Monthly Sales Report",
          description: "Complete sales report for January 2024",
          period: "2024-01-01 to 2024-01-31",
          generatedAt: "2024-01-31",
          status: "completed",
          downloadUrl: "#",
          stats: {
            totalRevenue: 1256000,
            totalOrders: 5400,
            avgOrderValue: 2325,
            growth: 15.5
          }
        },
        {
          id: "REP002",
          type: "users",
          title: "User Growth Analysis",
          description: "New user registration and activity report",
          period: "2024-01-01 to 2024-01-31",
          generatedAt: "2024-01-31",
          status: "completed",
          downloadUrl: "#",
          stats: {
            newUsers: 245,
            activeUsers: 1245,
            userGrowth: 12.8,
            retentionRate: 78.5
          }
        },
        {
          id: "REP003",
          type: "sellers",
          title: "Seller Performance",
          description: "Seller performance and earnings report",
          period: "2024-01-01 to 2024-01-31",
          generatedAt: "2024-01-31",
          status: "completed",
          downloadUrl: "#",
          stats: {
            totalSellers: 156,
            activeSellers: 142,
            topSellerEarnings: 125000,
            avgSellerRating: 4.3
          }
        },
        {
          id: "REP004",
          type: "topups",
          title: "Diamond Top-Up Analysis",
          description: "Diamond recharge patterns and trends",
          period: "2024-01-01 to 2024-01-31",
          generatedAt: "2024-01-30",
          status: "completed",
          downloadUrl: "#",
          stats: {
            totalTopups: 1250,
            totalDiamonds: 2500000,
            avgTopupAmount: 2000,
            topupGrowth: 22.4
          }
        },
        {
          id: "REP005",
          type: "custom",
          title: "Custom Report: Weekend Sales",
          description: "Sales analysis for weekends only",
          period: "2024-01-06 to 2024-01-28",
          generatedAt: "2024-01-29",
          status: "completed",
          downloadUrl: "#",
          stats: {
            weekendRevenue: 425000,
            weekendOrders: 1850,
            weekendAvgOrder: 2297
          }
        },
        {
          id: "REP006",
          type: "system",
          title: "System Performance",
          description: "Platform performance and uptime report",
          period: "2024-01-01 to 2024-01-31",
          generatedAt: "2024-01-31",
          status: "generating",
          downloadUrl: null,
          progress: 75
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const stats = {
    totalRevenue: 1256000,
    totalOrders: 5400,
    totalUsers: 1245,
    totalSellers: 156,
    platformCommission: 62800,
    growthRate: 15.5
  };

  const handleGenerateReport = (type) => {
    alert(`Generating ${type} report for ${dateRange.start} to ${dateRange.end}`);
    // In real app, this would call API
  };

  const getReportTypeColor = (type) => {
    switch(type) {
      case 'sales': return 'bg-green-100 text-green-800';
      case 'users': return 'bg-blue-100 text-blue-800';
      case 'sellers': return 'bg-purple-100 text-purple-800';
      case 'topups': return 'bg-pink-100 text-pink-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
        <p className="mt-4 text-gray-600">Loading reports...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-2">Generate and view platform reports</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="text-2xl font-bold text-green-700">PKR {stats.totalRevenue.toLocaleString()}</div>
          <div className="text-green-600">Total Revenue</div>
          <div className="text-sm text-green-700 mt-2">↑ {stats.growthRate}% growth</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="text-2xl font-bold text-blue-700">{stats.totalOrders}</div>
          <div className="text-blue-600">Total Orders</div>
          <div className="text-sm text-blue-700 mt-2">{stats.totalUsers} active users</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <div className="text-2xl font-bold text-purple-700">PKR {stats.platformCommission.toLocaleString()}</div>
          <div className="text-purple-600">Platform Commission</div>
          <div className="text-sm text-purple-700 mt-2">{stats.totalSellers} active sellers</div>
        </div>
      </div>

      {/* Generate Report Section */}
      <div className="bg-white border rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">Generate New Report</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold mb-4">Select Report Type</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleGenerateReport('sales')}
                className="p-4 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 text-center"
              >
                <div className="text-2xl mb-2">💰</div>
                <div className="font-medium">Sales Report</div>
              </button>
              <button
                onClick={() => handleGenerateReport('users')}
                className="p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-center"
              >
                <div className="text-2xl mb-2">👥</div>
                <div className="font-medium">User Report</div>
              </button>
              <button
                onClick={() => handleGenerateReport('sellers')}
                className="p-4 border border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 text-center"
              >
                <div className="text-2xl mb-2">🏪</div>
                <div className="font-medium">Seller Report</div>
              </button>
              <button
                onClick={() => handleGenerateReport('topups')}
                className="p-4 border border-gray-300 rounded-lg hover:border-pink-500 hover:bg-pink-50 text-center"
              >
                <div className="text-2xl mb-2">💎</div>
                <div className="font-medium">Top-Up Report</div>
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Date Range</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">End Date</label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setDateRange({
                    start: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0],
                    end: new Date().toISOString().split('T')[0]
                  })}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Last 7 Days
                </button>
                <button
                  onClick={() => setDateRange({
                    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
                    end: new Date().toISOString().split('T')[0]
                  })}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Last 30 Days
                </button>
                <button
                  onClick={() => {
                    const today = new Date();
                    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
                    setDateRange({
                      start: firstDay.toISOString().split('T')[0],
                      end: today.toISOString().split('T')[0]
                    });
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  This Month
                </button>
              </div>

              <button
                onClick={() => handleGenerateReport('custom')}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium"
              >
                Generate Custom Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Generated Reports</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Generated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{report.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{report.title}</div>
                      <div className="text-sm text-gray-500">{report.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getReportTypeColor(report.type)}`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{report.period}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{report.generatedAt}</div>
                  </td>
                  <td className="px-6 py-4">
                    {report.status === 'completed' ? (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Completed
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                          Generating
                        </span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${report.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">{report.progress}%</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
                      >
                        View Details
                      </button>
                      {report.status === 'completed' && report.downloadUrl && (
                        <>
                          <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200">
                            Download
                          </button>
                          <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200">
                            Share
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-bold mb-6">Revenue Trend (Last 30 Days)</h3>
          <div className="space-y-4">
            {[
              { day: 'Jan 1', revenue: 35000, growth: 5 },
              { day: 'Jan 5', revenue: 42000, growth: 12 },
              { day: 'Jan 10', revenue: 38000, growth: -4 },
              { day: 'Jan 15', revenue: 45000, growth: 18 },
              { day: 'Jan 20', revenue: 52000, growth: 25 },
              { day: 'Jan 25', revenue: 48000, growth: 15 },
              { day: 'Jan 30', revenue: 55000, growth: 30 }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-sm text-gray-600">{item.day}</div>
                <div className="flex-1">
                  <div className="h-8 bg-gray-200 rounded-lg overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-lg"
                      style={{ width: `${(item.revenue / 55000) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-24 text-right">
                  <div className="font-medium">PKR {item.revenue.toLocaleString()}</div>
                  <div className={`text-xs ${item.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.growth >= 0 ? '↑' : '↓'} {Math.abs(item.growth)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Activity */}
        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-bold mb-6">User Activity Metrics</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">New Registrations</span>
                <span className="font-bold text-green-600">↑ 12.8%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">245 new users this month</div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Active Users</span>
                <span className="font-bold text-green-600">↑ 8.4%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">1245 active users this month</div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">User Retention</span>
                <span className="font-bold text-green-600">↑ 5.2%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">78.5% retention rate</div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Conversion Rate</span>
                <span className="font-bold text-green-600">↑ 3.7%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">45% of visitors convert to buyers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{selectedReport.title}</h3>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold mb-2">Report Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Report ID</div>
                    <div className="font-medium">{selectedReport.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Type</div>
                    <div className="font-medium">{selectedReport.type}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Period</div>
                    <div className="font-medium">{selectedReport.period}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Generated</div>
                    <div className="font-medium">{selectedReport.generatedAt}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-2">Description</h4>
                <p className="text-gray-700">{selectedReport.description}</p>
              </div>

              {selectedReport.stats && (
                <div>
                  <h4 className="font-bold mb-4">Key Statistics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedReport.stats).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        <div className="font-bold">
                          {typeof value === 'number' && key.includes('Revenue') 
                            ? `PKR ${value.toLocaleString()}`
                            : typeof value === 'number' && key.includes('Growth')
                            ? `${value.toFixed(1)}%`
                            : typeof value === 'number'
                            ? value.toLocaleString()
                            : value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-6 border-t">
                {selectedReport.status === 'completed' && selectedReport.downloadUrl && (
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Download Report (PDF)
                  </button>
                )}
                <button
                  onClick={() => setSelectedReport(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}