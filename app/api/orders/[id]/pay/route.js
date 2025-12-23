import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(req, context) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const params = await context.params

  const order = await Order.findById(params.id);
  if (!order) {
    return Response.json({ error: "Order not found" }, { status: 404 });
  }

  order.payment.status = "paid";
  order.status = "processing";

  await order.save();

  return Response.json({ success: true });
}
