import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "account",
    },

    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    buyer: {
      userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
         required: true
         },
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      paymentAccount: { type: String, required: true },
    },


    seller: {
      userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Seller",
        required: true,
       },
      name: { type: String, required: true },
      email: { type: String, required: true },
      shopName: { type: String, required: true },
      phone: { type: String, required: true },
    },


    price: {
      type: Number,
      required: true,
    },

    payment: {
      paymentId: { type: String, required: true },
      method: { type: String, required: true }, // jazzcash / easypaisa / bank / cod
      paymentAccount: { type: String, required: true },
      screenshot: String,
      status: {
        type: String,
        required: true,
        enum: ["pending", "seller_confirmed", "completed"],
        default: "pending",
      },
    },

     verification: {
        sellerConfirmed: { type: Boolean, default: false },
        sellerConfirmedAt: {type: Date},
        adminCompleted: { type: Boolean, default: false },
        adminCompletedAt: { type: Date}
    },
    
    status: {
      type: String,
      required: true,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
