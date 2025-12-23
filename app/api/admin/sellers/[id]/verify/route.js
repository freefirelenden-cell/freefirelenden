import { connectDB } from "@/lib/db";
import Seller from "@/models/Seller";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(req, context) {

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const params = await context.params
    const seller = await Seller.findById(params.id);
    if (!seller) {
        return Response.json({ error: "Seller not found" }, { status: 404 });
    }

    seller.isVerified = true;
    await seller.save();

    return Response.json({
        message: "Seller verified (blue tick added)",
    });
}
