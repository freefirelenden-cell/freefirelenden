import mongoose from "mongoose";

let isConnected = false; // Track connection status

export async function connectDB() {
  if (isConnected) {
    console.log("✔ Already connected to MongoDB");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI missing in environment variables");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "freefirelenden",
    });

    isConnected = db.connections[0].readyState === 1;

    console.log("✔ MongoDB Connected Successfully");

  } catch (error) {
    console.log("❌ MongoDB Connection Failed");
    console.error(error);
    throw error;
  }
}
