import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET(req, context) {
    try {
        await connectDB();
        const params = await context.params

        // ✅ ID validation
        if (!params?.id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Order ID is required",
                },
                { status: 400 }
            );
        }

        // ✅ Fetch order
        const order = await Order.findById(params.id);
        

        // ✅ Order not found
        if (!order) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Order not found",
                },
                { status: 404 }
            );
        }

        // ✅ Success response
        return NextResponse.json(
            {
                success: true,
                order,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("❌ GET /api/accounts/order error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
            },
            { status: 500 }
        );
    }
}
