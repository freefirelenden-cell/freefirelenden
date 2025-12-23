"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAccountById } from "@/lib/apiClient";

export default function AccountDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showContactInfo, setShowContactInfo] = useState(false);
    const [sellerInfo, setSellerInfo] = useState(null);

    useEffect(() => {
        async function loadAccount() {
            try {
                setLoading(true);

                const data = await getAccountById(params.accountId);
                if (!data) {
                    setAccount(null);
                    return;
                }

                setAccount(data);

                // Seller fetch
                const sellerRes = await fetch(`/api/seller/${data.createdBy}`);
                const sellerData = await sellerRes.json();
                setSellerInfo(sellerData);

            } catch (error) {
                console.error(error);
            } finally {
                // ✅ Dono API complete hone ke baad
                setLoading(false);
            }
        }

        if (params.accountId) {
            loadAccount();
        }
    }, [params.accountId]);





    const handleBuyNow = () => {
        if (!account) return;

        const params = new URLSearchParams({
            type: "account",
            accountId: account._id,
            sellerId: account.createdBy,
        });

        router.push(`/checkout?${params.toString()}`);
    };


    const handleContactSeller = () => setShowContactInfo(true);
 

    const rankColors = {
        Bronze: "bg-amber-800",
        Silver: "bg-gray-500",
        Gold: "bg-yellow-500",
        Platinum: "bg-blue-500",
        Diamond: "bg-purple-600",
        Heroic: "bg-red-600",
        Grandmaster: "bg-pink-600",
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="pt-20">
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                            <p className="mt-4 text-gray-600">Loading account details...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!account) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="pt-20">
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        <div className="text-center py-20">
                            <div className="text-5xl mb-4">😕</div>
                            <h3 className="text-2xl font-bold mb-2">Account not found</h3>
                            <p className="text-gray-600 mb-6">The requested account doesn't exist or has been removed.</p>
                            <Link
                                href="/shop"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Browse Other Accounts
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const totalPrice = account.price

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="pt-20">
                {/* Breadcrumb */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex items-center text-sm text-gray-600">
                            <Link href="/" className="hover:text-blue-600">Home</Link>
                            <span className="mx-2">›</span>
                            <Link href="/shop" className="hover:text-blue-600">Shop</Link>
                            <span className="mx-2">›</span>
                            <span className="text-gray-900">{account.title}</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Images */}
                        <div>
                            {/* Main Image */}
                            <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
                                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                    {account.images && account.images[selectedImage] ? (
                                        <Image
                                            src={account.images[selectedImage].url}
                                            width={800}
                                            height={450}
                                            unoptimized
                                            alt={account.title || "Account Image"} // ✅ alt added
                                            className="w-full h-full object-cover"
                                        />


                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <span className="text-5xl">🎮</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Thumbnail Images */}
                            {account.images && account.images.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {account.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'}`}
                                        >
                                            <Image
                                                src={image.url}
                                                alt={`Thumbnail ${index + 1}`}
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover"
                                            />

                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Column - Details */}
                        <div>
                            {/* Title and Status */}
                            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{account.title}</h1>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className={`${rankColors[account.rank]} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                                                {account.rank ? account.rank : "_"}
                                            </span>
                                            {account.isFeatured && (
                                                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
                                                    🔥 FEATURED
                                                </span>
                                            )}
                                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                                                ✅ VERIFIED
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-blue-600">PKR {account.price.toLocaleString()}</div>
                                        <div className="text-sm text-gray-500">Per account</div>
                                    </div>
                                </div>

                                {/* Tags */}
                                {account.tags && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {account.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Description */}
                                <div className="mb-6">
                                    <h3 className="font-bold text-gray-900 mb-2">Description</h3>
                                    <p className="text-gray-700">{account.description}</p>
                                </div>

                                {/* Account Info */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="text-sm text-gray-500">Free Fire UID</div>
                                        <div className="font-mono font-bold">{account.uid}</div>
                                    </div>
                                    {/* <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="text-sm text-gray-500">Email for Transfer</div>
                                        <div className="font-bold">{account.email}</div>
                                    </div> */}
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                                <h3 className="font-bold text-gray-900 mb-4">Account Statistics</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-600">{account.stats.level ? account.stats.level : "_"}</div>
                                        <div className="text-sm text-gray-600">Level</div>
                                    </div>
                                    <div className="text-center p-3 bg-green-50 rounded-lg">
                                        <div className="text-2xl font-bold text-green-600">{account.stats.kdr ? account.stats.kdr : "_"}</div>
                                        <div className="text-sm text-gray-600">KDR</div>
                                    </div>
                                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                                        <div className="text-2xl font-bold text-purple-600">{account.stats.matches ? account.stats.matches.toLocaleString() : "_"}</div>
                                        <div className="text-sm text-gray-600">Matches</div>
                                    </div>
                                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                                        <div className="text-2xl font-bold text-yellow-600">{account.stats.badges ? account.stats.badges : "_"}</div>
                                        <div className="text-sm text-gray-600">Badges</div>
                                    </div>
                                    <div className="text-center p-3 bg-red-50 rounded-lg">
                                        <div className="text-2xl font-bold text-red-600">{account.stats.winRate ? account.stats.winRate : "_"}</div>
                                        <div className="text-sm text-gray-600">Win Rate</div>
                                    </div>
                                    <div className="text-center p-3 bg-indigo-50 rounded-lg">
                                        <div className="text-2xl font-bold text-indigo-600">{account.stats.headshotRate ? account.stats.headshotRate : "_"}</div>
                                        <div className="text-sm text-gray-600">Headshot Rate</div>
                                    </div>
                                </div>
                            </div>

                            {/* Seller Info */}
                            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-gray-900">Seller Information</h3>
                                    <span className="text-green-600 font-bold">⭐ {sellerInfo.rating || "_"}</span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Seller Name</span>
                                        <span className="font-medium">{sellerInfo.name || "_"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Sales</span>
                                        <span className="font-medium">{sellerInfo.totalSales ? sellerInfo.totalSales + "+" : "_"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Response Rate</span>
                                        <span className="font-medium">{sellerInfo.responseRate || "_"}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Verification</span>

                                        <span className="flex items-center gap-1 font-medium">
                                            {!sellerInfo?.isVerified ? (
                                                <>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-4 h-4 text-blue-500"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M12 2l2.09 4.26L19 7.27l-3.5 3.41L16.18 16 12 13.77 7.82 16l.68-5.32L5 7.27l4.91-.99L12 2z" />
                                                        <path
                                                            fill="white"
                                                            d="M10.5 14.5l-2-2 1.4-1.4 0.6 0.6 3-3 1.4 1.4-4 4z"
                                                        />
                                                    </svg>
                                                    <span className="text-blue-600">Verified</span>
                                                </>
                                            ) : (
                                                <span className="text-gray-500">Not Verified</span>
                                            )}
                                        </span>
                                    </div>

                                </div>

                                {showContactInfo ? (
                                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                        <h4 className="font-bold mb-2">Contact Information</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span>Phone:</span>
                                                <span className="font-medium">{sellerInfo.phone || "Loading..."}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>WhatsApp:</span>
                                                <span className="font-medium">{sellerInfo.phone || "Loading..."}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Email:</span>
                                                <span className="font-medium">{sellerInfo.email || "Loading..."}</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleContactSeller}
                                        className="mt-4 w-full py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-medium"
                                    >
                                        Contact Seller
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Buy Now Section - Fixed Bottom */}
                    <div className="sticky bottom-0 bg-white border-t shadow-lg mt-8 p-4 rounded-t-xl">
                        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">


                                <div>
                                    <div className="text-sm text-gray-600">Total Price</div>
                                    <div className="text-2xl font-bold text-green-600">
                                        PKR {totalPrice.toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">

                                <button
                                    onClick={handleBuyNow}
                                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 font-bold"
                                >
                                    🛒 Buy Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white border rounded-xl p-6 text-center">
                            <div className="text-3xl mb-4">⚡</div>
                            <h4 className="font-bold mb-2">Instant Delivery</h4>
                            <p className="text-gray-600">Get account within 5-15 minutes after payment</p>
                        </div>
                        <div className="bg-white border rounded-xl p-6 text-center">
                            <div className="text-3xl mb-4">🛡️</div>
                            <h4 className="font-bold mb-2">Secure Transfer</h4>
                            <p className="text-gray-600">Full Gmail account transfer for 100% ownership</p>
                        </div>
                        <div className="bg-white border rounded-xl p-6 text-center">
                            <div className="text-3xl mb-4">💯</div>
                            <h4 className="font-bold mb-2">Buyer Protection</h4>
                            <p className="text-gray-600">24-hour refund if account doesn't match description</p>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                        <h3 className="text-xl font-bold mb-4 text-center">Accepted Payment Methods</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {["JazzCash", "EasyPaisa", "Bank Transfer", "Credit/Debit Card", "Cash on Delivery"].map((method) => (
                                <div
                                    key={method}
                                    className="px-6 py-3 bg-white rounded-lg shadow-sm"
                                >
                                    {method}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}