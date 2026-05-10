// /api/payments/process/route.js 
import { processManualPayment } from "@/lib/paymentHandler";
import Account from "@/models/Account";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const data = await req.json();
        const { accountId, accountPrice, paymentMethod, sellerId, seller, buyerId, screenshot } = data


        if (!accountId || !accountPrice || !sellerId || !buyerId || !seller) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        const account = await Account.findById(accountId);
        if (!account) {
            return NextResponse.json(
                { success: false, error: "Account not found" },
                { status: 404 }
            );
        }

        if (account.status !== "approved") {
            return NextResponse.json(
                { success: false, error: "Account is not available for purchase" },
                { status: 400 }
            );
        }

        if (!seller) {
            return NextResponse.json(
                { success: false, error: "Seller not found" },
                { status: 404 }
            );
        }

        const totalAmount = Number(accountPrice);

        const paymentResult = await processManualPayment({
            amount: totalAmount,
            sellerPaymentAccount: seller.paymentAccount,
            buyerPaymentAccount: data.paymentAccount, 
            paymentMethod,
            accountId,
            buyerId,
            sellerId,
            screenshot,
        });

        if (paymentResult.success) {
            return NextResponse.json(
                { success: true, payment: paymentResult.data },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { success: false, error: paymentResult.error },
            { status: 402 }
        );




    } catch (error) {
        console.error("Payment processing error:", error);
        return NextResponse.json(
            { success: false, error: "Payment processing failed" },
            { status: 500 }
        );
    }
}





