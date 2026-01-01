"use client";

import { useState } from "react";
import Link from "next/link";

export default function HowToSellPage() {
    const [activeTab, setActiveTab] = useState("accounts");
    const CALL_NUMBER = process.env.NEXT_PUBLIC_CALL_NUMBER;
    const MESSAGE_NUMBER = process.env.NEXT_PUBLIC_MESSAGE_NUMBER;

    // Helper function to calculate earnings
    const calculateEarnings = (price, commissionPercent) => {
        const commissionAmount = (price * commissionPercent) / 100;
        const earnings = price - commissionAmount;
        return {
            commission: `${commissionPercent}% (PKR ${commissionAmount.toFixed(2)})`,
            earnings: `PKR ${earnings.toFixed(2)}`
        };
    };

    const commissionPerAccount = parseFloat(process.env.NEXT_PUBLIC_COMMISSION_PER_ACCOUNT) || 1; // Default to 1% if not set
    const commissionPerTopup = parseFloat(process.env.NEXT_PUBLIC_COMMISSION_PER_TOPUP) || 1; // Default to 1% if not set





    const accountSellingSteps = [
        {
            step: 1,
            title: "Become a Verified Seller",
            description: "Complete seller registration and verification",
            details: "Apply to become a seller by providing your CNIC, contact information, and payment details. Get verified within 24-48 hours.",
            requirements: [
                "Valid Pakistani CNIC",
                "Active phone number",
                "Bank account or mobile wallet",
                "Clean transaction history"
            ]
        },
        {
            step: 2,
            title: "Prepare Your Account",
            description: "Get your FF account ready for sale",
            details: "Take clear screenshots of account stats, skins, weapons, and characters. Note down all important details like UID, level, KDR, and rank.",
            tips: [
                "Take screenshots from multiple angles",
                "Include rare items and skins",
                "Note account creation date",
                "Record win rate and achievements"
            ]
        },
        {
            step: 3,
            title: "List Your Account",
            description: "Create an attractive listing",
            details: "Fill out the account details form with accurate information. Add compelling description, set competitive price, and upload high-quality images.",
            bestPractices: [
                "Be honest about account condition",
                "Price competitively based on rank",
                "Use clear, high-resolution images",
                "Highlight unique features"
            ]
        },
        {
            step: 4,
            title: "Manage Your Listing",
            description: "Respond to buyers and manage orders",
            details: "Monitor your account listings, respond to buyer inquiries quickly (within 15 minutes), and update prices based on demand.",
            managementTips: [
                "Respond quickly to inquiries",
                "Update listing regularly",
                "Monitor competitor prices",
                "Use featured listing for visibility"
            ]
        },
        {
            step: 5,
            title: "Complete Sale",
            description: "Transfer account and receive payment",
            details: "When a buyer purchases your account, transfer the Gmail credentials securely. Get paid after successful transfer (weekly payments).",
            transferProcess: [
                "Share Gmail credentials via secure channel",
                "Guide buyer through password change",
                "Confirm transfer completion",
                "Rate buyer experience"
            ]
        }
    ];

    const topupSellingSteps = [
        {
            step: 1,
            title: "Apply for Top-Up Service",
            description: "Get approved for diamond recharge service",
            details: "Apply as a top-up seller with your diamond source details and recharge capacity. Get verified within 24 hours.",
            requirements: [
                "Reliable diamond source",
                "Fast recharge capability",
                "Active Pakistani number",
                "Payment account details"
            ]
        },
        {
            step: 2,
            title: "Set Up Your Service",
            description: "Configure your top-up settings",
            details: "Set your available diamond packages, prices, and delivery time. Configure automatic order assignment or manual acceptance.",
            configuration: [
                "Define diamond packages",
                "Set competitive prices",
                "Specify delivery time",
                "Configure working hours"
            ]
        },
        {
            step: 3,
            title: "Receive Orders",
            description: "Get top-up orders from buyers",
            details: "Receive automatic order assignments or manually accept orders. Check buyer's Player ID and server information carefully.",
            orderProcessing: [
                "Verify Player ID accuracy",
                "Check server compatibility",
                "Confirm payment received",
                "Note special instructions"
            ]
        },
        {
            step: 4,
            title: "Recharge Diamonds",
            description: "Process the diamond recharge",
            details: "Use your diamond source to recharge the buyer's account. Complete within promised timeframe (usually 5-15 minutes).",
            rechargeTips: [
                "Double-check Player ID before recharge",
                "Use secure recharge method",
                "Keep recharge receipts",
                "Test delivery if possible"
            ]
        },
        {
            step: 5,
            title: "Confirm & Get Paid",
            description: "Mark order as completed",
            details: "After successful recharge, mark order as completed. Receive payment in your weekly payout (3% commission deducted).",
            completion: [
                "Get buyer confirmation",
                "Mark order as completed",
                "Rate buyer",
                "Track earnings in dashboard"
            ]
        }
    ];

    const earningsExamples = [
        {
            type: "Account Sale",
            price: 3500,
            frequency: "Average 5-10 sales/month",
            ...calculateEarnings(3500, commissionPerAccount)
        },
        {
            type: "Diamond Top-Up",
            diamonds: "1,000 diamonds",
            price: 1200,
            frequency: "Average 20-50 topups/month",
            ...calculateEarnings(1200, commissionPerTopup)
        },
        {
            type: "Premium Account",
            price: 8000,
            frequency: "Average 2-5 sales/month",
            ...calculateEarnings(8000, commissionPerAccount)
        }
    ];

    const sellerRequirements = [
        "Must be 18+ years old",
        "Valid Pakistani CNIC",
        "Active Pakistani phone number",
        "Bank account or mobile wallet",
        "Clean transaction history",
        "Agree to platform rules",
        "Fast response time (<15 min)",
        "Good customer service skills"
    ];

    const benefits = [
        {
            icon: "💰",
            title: "High Earnings",
            description: "Earn PKR 10,000-50,000 per month selling accounts and top-ups"
        },
        {
            icon: "🛡️",
            title: "Secure Payments",
            description: "Protected transactions, no chargebacks, weekly payments"
        },
        {
            icon: "📈",
            title: "Growing Market",
            description: "Access to thousands of Free Fire players in Pakistan"
        },
        {
            icon: "⚡",
            title: "Fast Payouts",
            description: "Weekly payments directly to your bank or mobile wallet"
        },
        {
            icon: "🎯",
            title: "Verified Badge",
            description: "Build trust with verified seller status and ratings"
        },
        {
            icon: "📱",
            title: "Easy Management",
            description: "User-friendly dashboard to manage all your listings"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="pt-20">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">How to Sell on LendenFF</h1>
                        <p className="text-xl text-yellow-100 max-w-3xl">
                            Start earning money by selling FF accounts and diamond top-ups
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-12">
                    {/* Tabs */}
                    <div className="mb-12">
                        <div className="flex justify-center">
                            <div className="inline-flex bg-white border rounded-xl p-1">
                                <button
                                    onClick={() => setActiveTab("accounts")}
                                    className={`px-8 py-3 rounded-lg font-medium transition-all ${activeTab === "accounts"
                                        ? "bg-yellow-500 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    🎮 Sell Accounts
                                </button>
                                <button
                                    onClick={() => setActiveTab("topups")}
                                    className={`px-8 py-3 rounded-lg font-medium transition-all ${activeTab === "topups"
                                        ? "bg-purple-500 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    💎 Sell Top-Ups
                                </button>
                                <button
                                    onClick={() => setActiveTab("both")}
                                    className={`px-8 py-3 rounded-lg font-medium transition-all ${activeTab === "both"
                                        ? "bg-gradient-to-r from-yellow-500 to-purple-500 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                        }`}
                                >
                                    🚀 Sell Both
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Selling Guide */}
                    <div className="mb-16">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                {activeTab === "accounts" ? "Account Selling Guide" :
                                    activeTab === "topups" ? "Top-Up Selling Guide" :
                                        "Complete Selling Guide"}
                            </h2>
                            <p className="text-gray-600 max-w-3xl mx-auto">
                                Follow these steps to start selling successfully
                            </p>
                        </div>

                        {/* Steps */}
                        <div className="space-y-6">
                            {(activeTab === "accounts" ? accountSellingSteps :
                                activeTab === "topups" ? topupSellingSteps :
                                    [...accountSellingSteps, ...topupSellingSteps]).map((step, index) => (
                                        <div key={index} className="bg-white border rounded-2xl overflow-hidden">
                                            <div className="p-6">
                                                <div className="flex flex-col md:flex-row gap-6">
                                                    <div className="md:w-48 flex-shrink-0">
                                                        <div className="flex items-center gap-4 mb-4">
                                                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-xl flex items-center justify-center text-xl font-bold">
                                                                {step.step}
                                                            </div>
                                                            <div>
                                                                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                                                                <p className="text-gray-600 text-sm">{step.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex-1">
                                                        <div className="mb-4">
                                                            <h4 className="font-bold text-gray-900 mb-2">Details:</h4>
                                                            <p className="text-gray-700">{step.details}</p>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {step.requirements && (
                                                                <div>
                                                                    <h4 className="font-bold text-gray-900 mb-2">Requirements:</h4>
                                                                    <ul className="space-y-2">
                                                                        {step.requirements.map((req, index) => (
                                                                            <li key={index} className="flex items-start gap-2">
                                                                                <span className="text-green-500">✓</span>
                                                                                <span className="text-gray-700">{req}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {step.tips && (
                                                                <div>
                                                                    <h4 className="font-bold text-gray-900 mb-2">Tips:</h4>
                                                                    <ul className="space-y-2">
                                                                        {step.tips.map((tip, index) => (
                                                                            <li key={index} className="flex items-start gap-2">
                                                                                <span className="text-blue-500">💡</span>
                                                                                <span className="text-gray-700">{tip}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {step.bestPractices && (
                                                                <div>
                                                                    <h4 className="font-bold text-gray-900 mb-2">Best Practices:</h4>
                                                                    <ul className="space-y-2">
                                                                        {step.bestPractices.map((practice, index) => (
                                                                            <li key={index} className="flex items-start gap-2">
                                                                                <span className="text-yellow-500">⭐</span>
                                                                                <span className="text-gray-700">{practice}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {step.managementTips && (
                                                                <div>
                                                                    <h4 className="font-bold text-gray-900 mb-2">Management Tips:</h4>
                                                                    <ul className="space-y-2">
                                                                        {step.managementTips.map((tip, index) => (
                                                                            <li key={index} className="flex items-start gap-2">
                                                                                <span className="text-purple-500">⚡</span>
                                                                                <span className="text-gray-700">{tip}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {step.transferProcess && (
                                                                <div>
                                                                    <h4 className="font-bold text-gray-900 mb-2">Transfer Process:</h4>
                                                                    <ul className="space-y-2">
                                                                        {step.transferProcess.map((process, index) => (
                                                                            <li key={index} className="flex items-start gap-2">
                                                                                <span className="text-green-500">🔄</span>
                                                                                <span className="text-gray-700">{process}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {step.configuration && (
                                                                <div>
                                                                    <h4 className="font-bold text-gray-900 mb-2">Configuration:</h4>
                                                                    <ul className="space-y-2">
                                                                        {step.configuration.map((config, index) => (
                                                                            <li key={index} className="flex items-start gap-2">
                                                                                <span className="text-blue-500">⚙️</span>
                                                                                <span className="text-gray-700">{config}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {step.orderProcessing && (
                                                                <div>
                                                                    <h4 className="font-bold text-gray-900 mb-2">Order Processing:</h4>
                                                                    <ul className="space-y-2">
                                                                        {step.orderProcessing.map((process, index) => (
                                                                            <li key={index} className="flex items-start gap-2">
                                                                                <span className="text-purple-500">📦</span>
                                                                                <span className="text-gray-700">{process}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {step.rechargeTips && (
                                                                <div>
                                                                    <h4 className="font-bold text-gray-900 mb-2">Recharge Tips:</h4>
                                                                    <ul className="space-y-2">
                                                                        {step.rechargeTips.map((tip, index) => (
                                                                            <li key={index} className="flex items-start gap-2">
                                                                                <span className="text-green-500">💎</span>
                                                                                <span className="text-gray-700">{tip}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {step.completion && (
                                                                <div>
                                                                    <h4 className="font-bold text-gray-900 mb-2">Completion:</h4>
                                                                    <ul className="space-y-2">
                                                                        {step.completion.map((complete, index) => (
                                                                            <li key={index} className="flex items-start gap-2">
                                                                                <span className="text-yellow-500">✅</span>
                                                                                <span className="text-gray-700">{complete}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                        </div>
                    </div>

                    {/* Earnings Calculator */}
                    <div className="mb-16">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Earnings Potential</h2>
                            <p className="text-gray-600">See how much you can earn as a seller</p>
                        </div>

                        <div className="bg-white border rounded-2xl p-8">
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Service Type</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Sale Price</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Commission</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Your Earnings</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Avg. Frequency</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {earningsExamples.map((example, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-900">{example.type}</div>
                                                    {example.diamonds && (
                                                        <div className="text-sm text-gray-500">{example.diamonds}</div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 font-medium">{example.price}</td>
                                                <td className="px-6 py-4">
                                                    <div className="text-red-600">{example.commission}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-green-600">{example.earnings}</div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">{example.frequency}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-8 p-4 bg-green-50 rounded-lg">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-700">Estimated Monthly Earnings: PKR 15,000 - 50,000</div>
                                    <div className="text-green-600">Based on average seller performance</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Seller Requirements */}
                    <div className="mb-16">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Seller Requirements</h2>
                        </div>

                        <div className="bg-white border rounded-2xl p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-6">Basic Requirements</h3>
                                    <ul className="space-y-4">
                                        {sellerRequirements.slice(0, 4).map((req, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                                                    {index + 1}
                                                </div>
                                                <span className="text-gray-700">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-900 mb-6">Additional Requirements</h3>
                                    <ul className="space-y-4">
                                        {sellerRequirements.slice(4).map((req, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                                                    {index + 5}
                                                </div>
                                                <span className="text-gray-700">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Seller Benefits */}
                    <div className="mb-16">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Sell With Us?</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="bg-white border rounded-xl p-6 text-center">
                                    <div className="text-4xl mb-4">{benefit.icon}</div>
                                    <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 text-center text-white">
                        <h3 className="text-2xl font-bold mb-4">Ready to Start Earning?</h3>
                        <p className="text-yellow-100 mb-8 max-w-2xl mx-auto">
                            Join hundreds of successful sellers earning money with LendenFF
                        </p>
                        <Link
                            href="/seller/become"
                            className="inline-block px-8 py-3 bg-white text-yellow-600 rounded-xl font-bold text-lg hover:bg-gray-100 shadow-lg"
                        >
                            🚀 Become a Seller Now
                        </Link>
                    </div>

                    {/* Support Section */}
                    <div className="mt-12 p-8 bg-blue-50 rounded-2xl text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help Getting Started?</h3>
                        <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                            Our seller support team is here to help you succeed
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href={`https://wa.me/${MESSAGE_NUMBER}`}
                                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium"
                            >
                                💬 WhatsApp Seller Support
                            </a>
                            <a
                                href={`tel:${CALL_NUMBER}`}
                                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium"
                            >
                                📞 Call Seller Support
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}