import mongoose from "mongoose";

const SellerRequestSchema = new mongoose.Schema(
  {
    // User basic
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // ek user sirf ek request bhej sakta hai
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    // Shop info
    shopName: {
      type: String,
      required: true,
    },

    sellingType: {
      type: String,
      enum: ["account", "topup", "both"],
      default: "account",
    },

    // Payment info
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentAccount: {
      type: String,
      required: true,
    },

    // Documents
    documents: {
      cnicFront: {
        type: String,
        required: false,  // Made it optional
      },
      cnicBack: {
        type: String,
        required: false,  // Made it optional
      },
    },


    // User stats (snapshot at apply time)
    userStats: {
      joinDate: {
        type: Date,
      },
      totalOrders: {
        type: Number,
        default: 0,
      },
    },

    // Admin flow
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    rejectionReason: {
      type: String,
    },
    approvedAt: {
      type: Date,
    },
    approvedBy: {
      type: String, // admin name or id
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.models.SellerRequest ||
  mongoose.model("SellerRequest", SellerRequestSchema);
