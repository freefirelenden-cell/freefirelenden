"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAccount } from "@/lib/apiClient";
import { useAuth } from "@/app/context/AuthProvider";
import ProgressBar from "@/app/components/ui/ProgressBar";

export default function AddAccountPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [tempImages, setTempImages] = useState([]);
    const [formData, setFormData] = useState({
        title: "hello this is the test",
        rank: "Bronze",
        price: "5000",
        description: "the quick brown fox jumps over the lazy dog",
        uid: "12345678",
        email: "X@gmail.com",
        password: "12345678",
        stats: {
            level: "",
            matches: "",
            kdr: "",
            badges: ""
        },
        images: [],
        status: "approved"
    });
    const { user, isLoading } = useAuth()

    const ranks = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Heroic", "Grandmaster"];

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("stats.")) {
            const statField = name.split(".")[1];
            setFormData(prev => ({
                ...prev,
                stats: {
                    ...prev.stats,
                    [statField]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const selectFile = (e) => {
        const files = Array.from(e.target.files);

        // Max 3 images check
        if (files.length > 3) {
            alert("Maximum 3 images allowed!");
            return;
        }


        try {
            for (const file of files) {
                // Create object URL for preview
                const objectUrl = URL.createObjectURL(file);

                // setTempImages use karke image add karo
                setTempImages(prev => [...prev, {
                    url: objectUrl,
                    file: file, // actual file object
                    fileName: file.name,
                    isTemp: true // Browser temporary
                }]);
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Error selecting images!");
        } finally {
            e.target.value = ""; // Reset input
        }
    }

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setProgress(10);

        try {
            if (isLoading) {
                alert("Please wait for user to load or sign in first.");
                return;
            }
            if (!user._id) {
                alert("user not found.");
                return;
            }

            const imagesToUpload = tempImages.filter(img => img.isTemp);
            const existingImages = tempImages.filter(img => !img.isTemp).map(img => ({ url: img.url, fileId: img.fileId }));

            const cleanedImages = [...existingImages];
            const total = imagesToUpload.length;


            setProgress(20);

            for (let i = 0; i < total; i++) {
                const img = imagesToUpload[i];
                // update progress — base + per-image share
                setProgress(20 + Math.round((i / total) * 60));  // 20–80 range
                const formData = new FormData();
                formData.append("file", img.file);
                formData.append("fileName", img.fileName);

                const res = await fetch("/api/image", {
                    method: "POST",
                    body: formData
                });
                if (!res.ok) throw new Error(`Upload failed for ${img.fileName}`);

                const result = await res.json();
                cleanedImages.push({ url: result.url, fileId: result.fileId });

                // optional: revoke object URL if using blob
                if (img.url.startsWith("blob:")) {
                    URL.revokeObjectURL(img.url);
                }
            }

            setProgress(80);

            const finalForm = { ...formData, userId: user._id, images: cleanedImages };
            setProgress(90);

            const uploadFormRes = await createAccount(finalForm);
            setProgress(100);


            alert("✅ Account created successfully!");
            router.push("/seller/my-accounts");


        } catch (error) {
            console.error("Submit error:", error);
            alert("Upload failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const calculateSuggestedPrice = () => {
        const basePrices = {
            Bronze: 800,
            Silver: 1200,
            Gold: 1800,
            Platinum: 2500,
            Diamond: 3500,
            Heroic: 5200,
            Grandmaster: 8000
        };

        let price = basePrices[formData.rank] || 1000;

        // Adjust based on level
        if (formData.stats.level) {
            price += (parseInt(formData.stats.level) || 0) * 50;
        }

        // Adjust based on KDR
        if (formData.stats.kdr && formData.stats.kdr > 2) {
            price += (parseFloat(formData.stats.kdr) - 2) * 500;
        }

        return price;
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Add New Account</h1>
                <p className="text-gray-600 mt-2">List your Free Fire account for sale</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="bg-white border rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6">Basic Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Account Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Diamond Tier FF Account with Skins"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rank *
                            </label>
                            <select
                                name="rank"
                                value={formData.rank}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {ranks.map(rank => (
                                    <option key={rank} value={rank}>{rank}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price (PKR) *
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="e.g., 3500"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, price: calculateSuggestedPrice() }))}
                                    className="whitespace-nowrap px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm"
                                >
                                    Suggest Price
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Suggested: PKR {calculateSuggestedPrice().toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your account features, skins, weapons, etc."
                                rows="3"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Account Details */}
                <div className="bg-white border rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6">Account Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Free Fire UID *
                            </label>
                            <input
                                type="text"
                                name="uid"
                                value={formData.uid}
                                onChange={handleChange}
                                placeholder="e.g., 1234567890"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email (for transfer) *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="account@gmail.com"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Leave empty if you'll provide later"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                We'll encrypt and store this securely
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="bg-white border rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6">Account Statistics</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Level
                            </label>
                            <input
                                type="number"
                                name="stats.level"
                                value={formData.stats.level}
                                onChange={handleChange}
                                placeholder="e.g., 45"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Total Matches
                            </label>
                            <input
                                type="number"
                                name="stats.matches"
                                value={formData.stats.matches}
                                onChange={handleChange}
                                placeholder="e.g., 1200"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                KDR (Kill/Death Ratio)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="stats.kdr"
                                value={formData.stats.kdr}
                                onChange={handleChange}
                                placeholder="e.g., 3.2"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Badges
                            </label>
                            <input
                                type="number"
                                name="stats.badges"
                                value={formData.stats.badges}
                                onChange={handleChange}
                                placeholder="e.g., 15"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white border rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6">Images (Max 3)</h2>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Images
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <input
                                type="file"
                                id="images"
                                accept="image/*"
                                multiple
                                onChange={selectFile}
                                className="hidden"
                            />
                            <label
                                htmlFor="images"
                                className="cursor-pointer inline-flex flex-col items-center"
                            >
                                <span className="text-4xl mb-2">📷</span>
                                <span className="text-gray-600">Click to upload images</span>
                                <span className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB each</span>
                            </label>
                        </div>
                    </div>

                    {/* Preview Images */}
                    {tempImages && (
                        <div className="grid grid-cols-3 gap-4">
                            {tempImages.map((image, index) => {
                                return (
                                    <div key={index} className="relative">
                                        <img
                                            src={image.url}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
                                        >
                                            ×
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

                {loading && (<ProgressBar progress={progress} />)}
                {/* Submit Button */}
                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50"
                    >
                        {loading ? 'Adding Account...' : 'Add Account'}
                    </button>
                </div>

            </form>

            {/* Info Box */}
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                <h3 className="font-bold text-blue-800 mb-2">📋 Listing Guidelines</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                    <li>• All accounts will be reviewed by admin before going live</li>
                    <li>• Provide accurate information to avoid rejection</li>
                    <li>• Price your account competitively based on rank and stats</li>
                    <li>• Use clear images showing account stats and items</li>
                    <li>• Commission: 5% on successful sales</li>
                    <li>• Payments are processed weekly</li>
                </ul>
            </div>
        </div>
    );
}