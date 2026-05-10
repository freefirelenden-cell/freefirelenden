// /lib/paymentHandler.js
import Payment from "@/models/Payment";

export async function processDirectPayment(paymentData) {
  try {

    const { paymentMethod, sellerPhone, amount, accountId, buyerId, sellerId } = paymentData;

    let paymentInstructions;
    let paymentUrl;

    if (paymentMethod === "jazzcash") {
      paymentInstructions = `Send Rs. ${amount} to JazzCash:\n📱 ${sellerPhone}\n\nAfter payment, share screenshot for confirmation.`;
      paymentUrl = `https://wa.me/${sellerPhone}?text=${encodeURIComponent(`I want to buy account ${accountId}. Please confirm your JazzCash details.`)}`;
    } else if (paymentMethod === "easypaisa") {
      paymentInstructions = `Send Rs. ${amount} to EasyPaisa:\n📱 ${sellerPhone}\n\nAfter payment, share screenshot for confirmation.`;
      paymentUrl = `https://wa.me/${sellerPhone}?text=${encodeURIComponent(`I want to buy account ${accountId}. Please confirm your EasyPaisa details.`)}`;
    }

    const newPayment = Payment({
      accountId, 
      paymentId: `DIRECT-${Date.now().toFixed(10)}-${Math.round(Math.random() * 1000)}`,
      buyerId,
      sellerId,
      method: paymentMethod,
      amount,
      instructions: paymentInstructions,
      paymentUrl,
      status: "pending",
    });

    const paymentDoc = await newPayment.save();
    return { success: true, data: paymentDoc };


  } catch (error) {
    return {
      success: false,
      error: `Payment processing failed: ${error}`
    };
  }
}

export async function processManualPayment(paymentData) {
  try {
    const { 
      paymentMethod, 
      sellerPaymentAccount, 
      buyerPaymentAccount,
      amount, 
      accountId, 
      buyerId, 
      sellerId,
      screenshot 
    } = paymentData;

    let paymentInstructions;

    if (paymentMethod === "jazzcash") {
      paymentInstructions = `
📌 JazzCash Payment Instructions:
1️⃣ Send PKR ${amount.toLocaleString()} to: ${sellerPaymentAccount}
2️⃣ Upload payment screenshot below
3️⃣ Use reference: ${accountId.slice(-8)}
4️⃣ Send from: ${buyerPaymentAccount}
      `;
    } else if (paymentMethod === "easypaisa") {
      paymentInstructions = `
📌 EasyPaisa Payment Instructions:
1️⃣ Send PKR ${amount.toLocaleString()} to: ${sellerPaymentAccount}
2️⃣ Upload payment screenshot below
3️⃣ Use reference: ${accountId.slice(-8)}
4️⃣ Send from: ${buyerPaymentAccount}
      `;
    }

    const paymentId = `MANUAL-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`;

    const newPayment = new Payment({
      accountId, 
      paymentId,
      buyerId,
      sellerId,
      method: paymentMethod,
      amount,
      instructions: paymentInstructions,
      buyerPaymentAccount,
      sellerPaymentAccount,
      screenshot, // Store screenshot
      status: "pending",
      createdAt: new Date()
    });

    const paymentDoc = await newPayment.save();
    return { success: true, data: paymentDoc };

  } catch (error) {
    console.error("Manual payment error:", error);
    return {
      success: false,
      error: `Payment processing failed: ${error.message}`
    };
  }
}