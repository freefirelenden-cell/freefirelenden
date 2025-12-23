"use client";

import { useState, useEffect } from "react";
import AccountCard from "../components/AccountCard";
import { getAllAccounts } from "@/lib/apiClient";


export default function ShopPage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    rank: "all",
    minPrice: "",
    maxPrice: "",
    sortBy: "newest"
  });
  const [showFilters, setShowFilters] = useState(false);

  // Sample account data (in real app, fetch from API)
  useEffect(() => {
    async function loadAccounts() {
      setLoading(true);
      const response = await getAllAccounts(filters);
      setAccounts(response.accounts);
      setLoading(false);
    }

    loadAccounts();
  }, [filters]);



  const filteredAccounts = accounts.filter(account => {
    if (filters.rank !== "all" && account.rank !== filters.rank) {
      return false;
    }
    if (filters.minPrice && account.price < parseInt(filters.minPrice)) {
      return false;
    }
    if (filters.maxPrice && account.price > parseInt(filters.maxPrice)) {
      return false;
    }
    return true;
  });

  // Sort accounts
  const sortedAccounts = [...filteredAccounts].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "level-high":
        return b.stats.level - a.stats.level;
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  // Ranks for filter
  const ranks = [
    "all",
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Heroic",
    "Grandmaster"
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      rank: "all",
      minPrice: "",
      maxPrice: "",
      sortBy: "newest"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
              <p className="mt-4 text-gray-600">Loading accounts...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Browse Free Fire Accounts</h1>
            <p className="text-blue-100 text-lg">
              Find your perfect Free Fire account from our verified sellers. Secure transactions, instant delivery.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Stats Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Available Accounts: <span className="text-blue-600">{sortedAccounts.length}</span>
                </h2>
                <p className="text-gray-600 text-sm">
                  All accounts are verified and ready for instant delivery
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="level-high">Highest Level</option>
                  </select>
                </div>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  Filters
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={`md:w-64 ${showFilters ? 'block' : 'hidden'} md:block`}>
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold">Filters</h3>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Reset All
                  </button>
                </div>

                {/* Rank Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Rank</h4>
                  <div className="space-y-2">
                    {ranks.map(rank => (
                      <label key={rank} className="flex items-center">
                        <input
                          type="radio"
                          name="rank"
                          value={rank}
                          checked={filters.rank === rank}
                          onChange={(e) => handleFilterChange("rank", e.target.value)}
                          className="mr-2"
                        />
                        <span className="capitalize">{rank === "all" ? "All Ranks" : rank}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Price Range (PKR)</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Min</label>
                      <input
                        type="number"
                        placeholder="500"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Max</label>
                      <input
                        type="number"
                        placeholder="10000"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Price Filters */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Quick Price</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Under 2K", min: 0, max: 2000 },
                      { label: "2K - 5K", min: 2000, max: 5000 },
                      { label: "5K - 10K", min: 5000, max: 10000 },
                      { label: "10K+", min: 10000, max: 999999 }
                    ].map(filter => (
                      <button
                        key={filter.label}
                        onClick={() => {
                          handleFilterChange("minPrice", filter.min);
                          handleFilterChange("maxPrice", filter.max);
                        }}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stats Info */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-3">Account Stats</h4>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Verified Accounts</span>
                      <span className="font-semibold text-green-600">{accounts.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Featured Accounts</span>
                      <span className="font-semibold text-yellow-600">
                        {accounts.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg. Price</span>
                      <span className="font-semibold">
                        PKR {Math.round(accounts.reduce((sum, a) => sum + a.price, 0) / accounts.length).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accounts Grid */}
            <div className="flex-1">
              {sortedAccounts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <div className="text-5xl mb-4">😕</div>
                  <h3 className="text-xl font-bold mb-2">No accounts found</h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or check back later for new listings.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <>
                  {/* Active Filters */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {filters.rank !== "all" && (
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        Rank: {filters.rank}
                        <button
                          onClick={() => handleFilterChange("rank", "all")}
                          className="ml-1 hover:text-blue-900"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    {filters.minPrice && (
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        Min: PKR {filters.minPrice}
                        <button
                          onClick={() => handleFilterChange("minPrice", "")}
                          className="ml-1 hover:text-green-900"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    {filters.maxPrice && (
                      <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        Max: PKR {filters.maxPrice}
                        <button
                          onClick={() => handleFilterChange("maxPrice", "")}
                          className="ml-1 hover:text-purple-900"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedAccounts.map((account, index) => (
                      <AccountCard
                        key={index}
                        {...account}
                        onClick={() => {
                          // Navigate to account details page
                          window.location.href = `/shop/${account._id}`;
                        }}
                      />
                    ))}
                  </div>

                  {/* Load More */}
                  <div className="mt-12 text-center">
                    <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                      Load More Accounts
                    </button>
                    <p className="text-gray-600 text-sm mt-4">
                      Showing {sortedAccounts.length} of {accounts.length} accounts
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Why Buy from FreeFireLenden?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h4 className="font-bold mb-2">100% Secure</h4>
                <p className="text-gray-600 text-sm">
                  All accounts verified. Gmail transfer ensures complete ownership.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-bold mb-2">Instant Delivery</h4>
                <p className="text-gray-600 text-sm">
                  Get account credentials within minutes after payment.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💯</span>
                </div>
                <h4 className="font-bold mb-2">Buyer Protection</h4>
                <p className="text-gray-600 text-sm">
                  24-hour refund if account doesn't match description.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}