// /api/orders/[id]/verify/route.js
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Account from "@/models/Account";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { verified } = await req.json();

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (verified) {
      // ✅ Update order status to completed
      order.status = "completed";
      
      // ✅ Update payment status
      order.payment.status = "completed";
      
      // ✅ Mark account as sold
      const account = await Account.findById(order.accountId);
      if (account) {
        account.status = "sold";
        await account.save();
      }
    }

    await order.save();

    return NextResponse.json({ success: true, order });

  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Verification failed: " + error.message }, { status: 500 });
  }
}