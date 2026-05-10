import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Account from "@/models/Account"; // ✅ Add this import


// 🔹 GET — Fetch orders (with filters)
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const sellerId = searchParams.get("sellerId");
    const status = searchParams.get("status");
    const paymentStatus = searchParams.get("paymentStatus");


    let query = {};

    if (sellerId) {
      query["seller.userId"] = sellerId;
    }

    if (status) {
      query.status = status;
    }

    if (paymentStatus) {
      query["payment.status"] = paymentStatus;
    }

    const orders = await Order.find(query)
      .populate("accountId")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        count: orders.length,
        orders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ GET /api/orders error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch orders",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const { accountId, paymentMethod, paymentAccount, paymentId, phone, seller, account, screenshot } = body;


    if (!accountId || !paymentMethod || !paymentAccount || !paymentId || !phone || !seller || !account || !screenshot) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }


    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }
    if (!seller) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }
    // ✅ Ensure sellerId is ObjectId
    const order = Order({
      accountId: account._id,
      price: account.price,
      buyer: {
        userId: session.user._id,
        name: session.user.name,
        email: session.user.email,
        phone,
        paymentAccount: paymentAccount, // Add this
      },
      seller: {
        userId: seller.userId,
        name: seller.name,
        email: seller.email,
        shopName: seller.shopName,
        phone: seller.phone,
      },
      payment: {
        method: paymentMethod,
        paymentAccount,
        paymentId,
        screenshot,
        status: "pending"
      },
      status: "pending"
    });
    await order.save()

    return NextResponse.json({
      success: true,
      orderId: order._id,
    }, { status: 201 });

  } catch (err) {
    console.error(err);

    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: "Validation error", details: err.errors || err.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
