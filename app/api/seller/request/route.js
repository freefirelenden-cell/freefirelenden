// app/api/seller-requests/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SellerRequest from "@/models/SellerRequest";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  await connectDB();

  const alreadyApplied = await SellerRequest.findOne({
    userId: session.user._id,
  });

  if (alreadyApplied) {
    return Response.json(
      { error: "You already applied for seller" },
      { status: 400 }
    );
  }

  const request = await SellerRequest.create({
    userId: session.user._id,
    name: session.user.name,
    email: session.user.email,

    shopName: body.shopName,
    phone: body.phone,
    sellingType: body.sellingType,
    paymentMethod: body.paymentMethod,
    paymentAccount: body.paymentAccount,
  });

  return Response.json(request);
}
