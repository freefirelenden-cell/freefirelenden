import { connectDB } from "@/lib/db";
import SellerRequest from "@/models/SellerRequest";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Seller from "@/models/Seller";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const query = status && status !== "all" ? { status } : {};

  // ✅ yahan SellerRequest hona chahiye
  const requests = await SellerRequest
    .find(query)
    .sort({ createdAt: -1 });

  return Response.json(requests);
}



export async function PATCH(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const body = await req.json();
  const { sellerId, action, rejectionReason } = body;

  const seller = await Seller.findById(sellerId);
  if (!seller) {
    return Response.json({ error: "Seller not found" }, { status: 404 });
  }

  if (action === "approve") {
    seller.status = "approved";
    seller.approvedAt = new Date();
    seller.approvedBy = session.user.email;
    seller.rejectionReason = "";
  }

  if (action === "reject") {
    seller.status = "rejected";
    seller.rejectionReason = rejectionReason || "Rejected by admin";
  }

  await seller.save();

  return Response.json({
    message: `Seller ${action}d successfully`,
    seller,
  });
}
