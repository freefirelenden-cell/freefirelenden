import mongoose from "mongoose";


const accountSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      enum: [
        "Bronze",
        "Silver",
        "Gold",
        "Platinum",
        "Diamond",
        "Heroic",
        "Grandmaster",
      ],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [
        {
          url: { type: String, required: true },
          fileId: { type: String, required: true },
        },
      ],
      validate: [(val) => val.length <= 3, "Maximum 3 images allowed"],
      default: [], // ✅ EMPTY ARRAY
    },

    description: {
      type: String,
    },
    stats: {
      level: { type: Number, default: 0 },
      matches: { type: Number, default: 0 },
      kdr: { type: Number, default: 0 },
      badges: { type: Number, default: 0 },
    },
    uid: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false, // optional (seller can provide later)
      select: false, // hides password when querying
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "sold"],
      default: "pending",
    },
    isFeatured: { type: Boolean, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",   // jis model se buyer belong karta hai
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);



export default mongoose.models.Account ||
  mongoose.model("Account", accountSchema);
