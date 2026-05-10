import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Payment from "@/models/Payment";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function PATCH(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const { confirmed } = await req.json();

        const order = await Order.findById(id).populate("accountId");
        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        if (confirmed) {

            if (order.verification?.sellerConfirmed) {
                return NextResponse.json({
                    error: "Payment already confirmed for this order"
                }, { status: 400 });
            }
            order.verification = {
                sellerConfirmed: true,
                sellerConfirmedAt: new Date()
            };
            order.payment.status = "seller_confirmed";

                await Payment.findOneAndUpdate(
                { paymentId: order.payment.paymentId },
                { status: "seller_confirmed" }
            );

            await order.save();

            // Optional: Send notification to admin that seller confirmed
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: `"LendenFF" <${process.env.EMAIL_USER}>`,
                to: process.env.ADMIN_EMAIL, // Add ADMIN_EMAIL in env
                subject: `💰 Seller Confirmed Payment - Order #${order._id}`,
                html: `
                    <h2>Payment Confirmed by Seller</h2>
                    <p><strong>Order ID:</strong> ${order._id}</p>
                    <p><strong>Seller:</strong> ${order.seller.name} (${order.seller.email})</p>
                    <p><strong>Amount:</strong> PKR ${order.price}</p>
                    <p><strong>Buyer:</strong> ${order.buyer.name}</p>
                    <p>Visit admin panel to release the account now.</p>
                    <a href="${process.env.NEXTAUTH_URL}/admin/verify-payments">Click here to complete order</a>
                `
            });
        }

        return NextResponse.json({ success: true, order });

    } catch (error) {
        console.error("Seller confirm error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
} 