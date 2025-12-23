import { connectDB } from "@/lib/db";
import Seller from "@/models/Seller";

export async function GET(req) {
  await connectDB();

  try {
    const sellers = await Seller.find({}).sort({ createdAt: -1 });

    return new Response(JSON.stringify(sellers), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
