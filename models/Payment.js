import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  paymentId: { type: String, unique: true, required: true },

  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true
  },

  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true
  },

  method: {
    type: String,
    enum: ["jazzcash", "easypaisa"],
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["pending", "seller_confirmed", "confirmed", "failed"],
    default: "pending"
  },

  instructions: String,
  paymentUrl: String,
  screenshot: String,

}, { timestamps: true });

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
