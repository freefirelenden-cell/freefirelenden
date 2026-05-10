// /api/upload-payment-screenshot/route.js
import { NextResponse } from "next/server";
import { imagekit } from "@/lib/imagekit";
import { connectDB } from "@/lib/db";


export async function POST(req) {
  try {
    await connectDB();
    
    const formData = await req.formData();
    const file = formData.get("file");
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `payment-screenshots/${Date.now()}-${file.name}`;

    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: fileName,
      folder: "/payment-screenshots",
    });

    // ✅ Return URL with default transformation
    const originalUrl = uploadResponse.url;
    const transformedUrl = `${originalUrl}?tr=w-800,h-800,fo-auto`; 

    return NextResponse.json({
      success: true,
      fileUrl: transformedUrl,  // Return transformed URL
      originalUrl: originalUrl,
      fileId: uploadResponse.fileId
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed: " + error.message },
      { status: 500 }
    );
  }
}