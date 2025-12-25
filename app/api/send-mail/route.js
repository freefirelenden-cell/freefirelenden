import Account from "@/models/Account";
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const {
            sellerPhone,
            sellerEmail,
            buyerEmail,
            buyerName,
            buyerPhone,
            accountTitle,
            amount,
            email,
            accountId,
            orderId
        } = await req.json();


        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const account = await Account.findById(accountId).select("+password");



        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: buyerEmail,
            subject: `Your purchased account details Order #${orderId}`,

            html: `
    <p><b>Purchase Successful!</b></p>

    <p>You have purchased <b>${accountTitle}</b>.</p>

    <p><b>Order ID:</b> ${orderId}<br/>
    <b>Amount Paid:</b> Rs. ${amount}</p>

    ${!email || !account.password ? (
                    `<p><b>Account Login:</b><br/>
    Email: ${email}<br/>
    Password: ${account.password}</p>`) : ""}

    <p><b>Seller Contact:</b><br/>
    Email: ${sellerEmail}<br/>
    Phone: ${sellerPhone}</p>

    <p>- FreeFireLenden Team</p>
  `
        });


        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: sellerEmail,
            subject: `Your account has been purchased! Order #${orderId}`,
            html: `
    <p><b>New Purchase!</b></p>

    <p>Your account <b>${accountTitle}</b> has been purchased.</p>

    <p><b>Order ID:</b> ${orderId}<br/>
    <b>Amount:</b> Rs. ${amount}</p>

    <p><b>Buyer Details:</b><br/>
    Name: ${buyerName}<br/>
    Email: ${buyerEmail}<br/>
    Phone: ${buyerPhone}</p>

    <p>Please contact the buyer and provide account login details.</p>

    <p>- FreeFireLenden Team</p>
  `
        });



        return Response.json({ success: true, msg: "Email sent!" });
    } catch (error) {
        console.log("Email error:", error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
