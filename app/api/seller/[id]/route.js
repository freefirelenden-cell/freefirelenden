import { connectDB } from "@/lib/db";
import Seller from "@/models/Seller";

export async function GET(req, context) {
    await connectDB();

    const params = await context.params
    const { id } = params
    if (!id) {
        return new Response(JSON.stringify({ error: "Seller ID required" }), { status: 400 });
    }
    const seller = await Seller.findOne({ userId: id });

    if (!seller) {
        return new Response(JSON.stringify({ error: "Seller not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(seller), { status: 200 });
}
