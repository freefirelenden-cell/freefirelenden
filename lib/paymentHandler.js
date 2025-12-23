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
      paymentId: `DIRECT-${Date.now()}-${Math.round(Math.random() * 1000)}`,
      buyerId,
      sellerId,
      method: paymentMethod,
      amount,
      instructions: paymentInstructions,
      paymentUrl,
      status: "pending",
    });

    console.log(newPayment, sellerId)
    const paymentDoc = await newPayment.save();
    return { success: true, data: paymentDoc };


  } catch (error) {
    return {
      success: false,
      error: `Payment processing failed: ${error}`
    };
  }
}