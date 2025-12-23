import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        shopName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        paymentAccount: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            default: 0, // 0–5
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        // 📊 Stats
        totalSales: {
            type: Number,
            default: 0,
        },
        responseRate: {
            type: Number,
            default: 0, // percentage 0-100
        },
    },
    { timestamps: true }
);

export default mongoose.models.Seller ||
    mongoose.model("Seller", SellerSchema);
