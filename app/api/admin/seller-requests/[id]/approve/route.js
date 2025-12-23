import { connectDB } from "@/lib/db";
import SellerRequest from "@/models/SellerRequest";
import Seller from "@/models/Seller";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(req, context) {
    try {
        const session = await getServerSession(authOptions);

        // 🔐 Admin check
        if (!session || session.user.role !== "admin") {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        const params = await context.params;
        const requestId = params.id

        // 🔍 Find seller request
        const request = await SellerRequest.findById(requestId);
        if (!request) {
            return Response.json({ error: "Request not found" }, { status: 404 });
        }

        if (request.status === "approved") {
            return Response.json(
                { error: "Request already approved" },
                { status: 400 }
            );
        }

        // 🔥 Create Seller
        const seller = await Seller.create({
            userId: request.userId,
            name: request.name,
            email: request.email,
            shopName: request.shopName,
            phone: request.phone,
            paymentMethod: request.paymentMethod,
            paymentAccount: request.paymentAccount,
            isActive: true,
            isVerified: false, // Blue tick initially false
            totalSales: 0,
            responseRate: 0,
            rating: 0,

        });


        // 👤 Update user role
        await User.findByIdAndUpdate(
             request.userId,
            { role: "seller" },
            { new: true }
        );

        // ✅ Update request status
        request.status = "approved";
        request.approvedAt = new Date();
        request.approvedBy = session.user.id;
        await request.save();

        return Response.json({
            message: "Seller approved successfully",
            seller,
        });

    } catch (error) {
        console.error("Approve seller error:", error);
        return Response.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
