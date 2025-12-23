import { imagekit, uploadToImageKit } from '@/lib/imagekit';
import { NextResponse } from "next/server";

export async function POST(request) {
    const formData = await request.formData();
    try {
        const file = formData.get("file");
        const fileName = formData.get("fileName") || file?.name;

        if (!file) {
            return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
        }

        // Convert file to buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Upload directly to ImageKit
        const uploadResponse = await uploadToImageKit(buffer, fileName);

        return NextResponse.json({
            success: true,
            url: uploadResponse.url,
            fileId: uploadResponse.fileId,
            name: fileName
        }, { status: 200 }
        );

    } catch (error) {
        console.error("❌ ImageKit Upload Error:", error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 }
        );
    }
}

export async function DELETE(req) {
    const { fileId } = await req.json();
    try {
        if (!fileId) {
            return NextResponse.json(
                { success: false, message: "Missing fileId" },
                { status: 400 }
            );
        }

        await imagekit.deleteFile(fileId);

        return NextResponse.json({
            success: true
        });

    } catch (err) {
        console.error("ImageKit delete error:", err);
        return NextResponse.json(
            {
                success: false,
                error: err.message
            },
            { status: 500 }
        );
    }
}


