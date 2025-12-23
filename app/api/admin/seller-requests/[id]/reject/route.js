import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import SellerRequest from "@/models/SellerRequest";

export async function PATCH(req, context) {
    const params = await context.params
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { reason } = await req.json();

    if (!reason || !reason.trim()) {
        return Response.json(
            { error: "Rejection reason required" },
            { status: 400 }
        );
    }

    const request = await SellerRequest.findById(params.id);

    if (!request) {
        return Response.json({ error: "Request not found" }, { status: 404 });
    }

    if (request.status !== "pending") {
        return Response.json(
            { error: "Request already processed" },
            { status: 400 }
        );
    }

    request.status = "rejected";
    request.rejectionReason = reason;
    request.rejectedAt = new Date();

    await request.save();

    return Response.json({ success: true });
}
