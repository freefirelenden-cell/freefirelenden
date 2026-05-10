import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Account from "@/models/Account";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Payment from "@/models/Payment";

// Email sending function
async function sendOrderCompleteEmails(order, account, buyerEmail, sellerEmail) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // ✅ Email to BUYER - Account details
        await transporter.sendMail({
            from: `"LendenFF" <${process.env.EMAIL_USER}>`,
            to: buyerEmail,
            subject: `✅ Account Delivered - Order #${order._id}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #22c55e;">✅ Purchase Successful!</h2>
                    
                    <p>Dear <b>${order.buyer.name}</b>,</p>
                    
                    <p>Your payment has been verified and the account is now ready!</p>
                    
                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">📋 Order Details</h3>
                        <p><strong>Order ID:</strong> ${order._id}</p>
                        <p><strong>Account Title:</strong> ${account.title}</p>
                        <p><strong>Amount Paid:</strong> PKR ${order.price.toLocaleString()}</p>
                        <p><strong>Payment Method:</strong> ${order.payment.method.toUpperCase()}</p>
                    </div>
                    
                    <div style="background-color: #dcfce7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
                        <h3 style="margin-top: 0; color: #166534;">🎮 Account Login Details</h3>
                        <p><strong>Email/ID:</strong> ${account.email || "Check account section"}</p>
                        <p><strong>Password:</strong> ${account.password || "Use recovery option"}</p>
                        ${account.uid ? `<p><strong>UID:</strong> ${account.uid}</p>` : ''}
                        ${account.rank ? `<p><strong>Rank:</strong> ${account.rank}</p>` : ''}
                    </div>
                    
                    <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">⚠️ Important Instructions</h3>
                        <ul>
                            <li>Change password immediately after login</li>
                            <li>Add your own email recovery</li>
                            <li>Don't share account with anyone</li>
                            <li>Contact seller for any issues</li>
                        </ul>
                    </div>
                    
                    <div style="background-color: #e0f2fe; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">👤 Seller Contact</h3>
                        <p><strong>Name:</strong> ${order.seller.name}</p>
                        <p><strong>Phone:</strong> ${order.seller.phone}</p>
                        <p><strong>Email:</strong> ${sellerEmail}</p>
                    </div>
                    
                    <hr style="margin: 20px 0;" />
                    
                    <p style="color: #6b7280; font-size: 12px;">Need help? Contact our support: ${process.env.NEXT_PUBLIC_CALL_NUMBER}</p>
                    <p style="color: #6b7280; font-size: 12px;">- LendenFF Team</p>
                </div>
            `
        });

        // ✅ Email to SELLER - Order completed notification
        await transporter.sendMail({
            from: `"LendenFF" <${process.env.EMAIL_USER}>`,
            to: sellerEmail,
            subject: `💰 Payment Confirmed & Order Completed - Order #${order._id}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #22c55e;">💰 Payment Confirmed!</h2>
                    
                    <p>Dear <b>${order.seller.name}</b>,</p>
                    
                    <p>Great news! The buyer's payment has been verified and the order is now <b>COMPLETED</b>.</p>
                    
                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">📋 Sale Details</h3>
                        <p><strong>Order ID:</strong> ${order._id}</p>
                        <p><strong>Account Sold:</strong> ${account.title}</p>
                        <p><strong>Sale Amount:</strong> PKR ${order.price.toLocaleString()}</p>
                        <p><strong>Buyer Paid Via:</strong> ${order.payment.method.toUpperCase()}</p>
                    </div>
                    
                    <div style="background-color: #e0f2fe; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">👤 Buyer Details</h3>
                        <p><strong>Name:</strong> ${order.buyer.name}</p>
                        <p><strong>Phone:</strong> ${order.buyer.phone}</p>
                        <p><strong>Email:</strong> ${buyerEmail}</p>
                        <p><strong>Payment Account:</strong> ${order.buyer.paymentAccount || "N/A"}</p>
                    </div>
                    
                    <div style="background-color: #dcfce7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">✅ Next Steps</h3>
                        <ul>
                            <li>Funds should be in your account (if transferred to you)</li>
                            <li>If payment went to platform wallet, expect settlement in 24-48 hours</li>
                            <li>Keep this order confirmation for your records</li>
                            <li>Rate the buyer if they were cooperative</li>
                        </ul>
                    </div>
                    
                    <hr style="margin: 20px 0;" />
                    
                    <p style="color: #6b7280; font-size: 12px;">Questions about settlement? Contact finance: ${process.env.NEXT_PUBLIC_CALL_NUMBER}</p>
                    <p style="color: #6b7280; font-size: 12px;">- LendenFF Team</p>
                </div>
            `
        });

        console.log("✅ Emails sent successfully for order:", order._id);
        return { success: true };

    } catch (error) {
        console.error("❌ Email sending error:", error);
        return { success: false, error: error.message };
    }
}


export async function PATCH(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const { completed } = await req.json();

        if (!completed) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const order = await Order.findById(id);
        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        if (order.status === "completed") {
            return NextResponse.json({
                error: "Order already completed"
            }, { status: 400 });
        }

        const account = await Account.findById(order.accountId).select("+password");
        if (!account) {
            return NextResponse.json({ error: "Account not found" }, { status: 404 });
        }
        if (account.status === "sold") {
            return NextResponse.json({ error: "Account already sold" }, { status: 404 });
        }


        order.verification = {
            sellerConfirmed: true,
            sellerConfirmedAt: order.verification?.sellerConfirmedAt || new Date(),
            adminCompleted: true,
            adminCompletedAt: new Date()
        };
        order.payment.status = "completed";
        order.status = "completed";

        await Payment.findOneAndUpdate(
            { paymentId: order.payment.paymentId },
            { status: "confirmed" }  // or "completed" if you add to enum
        );

        account.status = "sold";

        await order.save();
        await account.save();

        const buyerEmail = order.buyer.email;
        const sellerEmail = order.seller.email;

        if (buyerEmail && sellerEmail) {
            const emailResult = await sendOrderCompleteEmails(order, account, buyerEmail, sellerEmail);
            if (!emailResult.success) {
                console.error("Email warning:", emailResult.error);
            }
        }

        return NextResponse.json({
            success: true,
            message: "Order completed successfully! Emails sent to buyer and seller.",
            order
        });

    } catch (error) {
        console.error("Admin complete error:", error);
        return NextResponse.json({
            error: "Failed to complete order: " + error.message
        }, { status: 500 });
    }
}