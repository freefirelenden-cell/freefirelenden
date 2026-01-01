import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // 🔍 Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    await connectDB();

    await ContactMessage.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully",
    });

  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
