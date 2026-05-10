import { imagekit, uploadToImageKit } from '@/lib/imagekit';
import { NextResponse } from "next/server";

export async function POST(request) {
    const formData = await request.formData();
    try {
        const file = formData.get("file");
        const fileName = formData.get("fileName") || file?.name;

        if (!file) {
            return NextResponse.json(
                { success: false, error: "No file provided" },
                { status: 400 }
            );
        }

        // ✅ Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { success: false, error: "File size too large. Max 5MB" },
                { status: 400 }
            );
        }


        // ✅ Check file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { success: false, error: "Invalid file type. Only JPEG, PNG, WEBP allowed" },
                { status: 400 }
            );
        }


        // Convert file to buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadResponse = await uploadToImageKit(buffer, fileName);



        return NextResponse.json({
            success: true,
            url: uploadResponse.url,
            fileId: uploadResponse.fileId,
            thumbnailUrl: uploadResponse.thumbnailUrl,
            name: fileName
        }, { status: 200 }
        );

    } catch (error) {
        console.error("❌ ImageKit Upload Error:", error);

        // ✅ Specific error messages
        if (error.message.includes('size')) {
            return NextResponse.json(
                { success: false, error: "File too large. Max 5MB" },
                { status: 400 }
            );
        }

        if (error.message.includes('rate limit')) {
            return NextResponse.json(
                { success: false, error: "Too many uploads. Please try again later" },
                { status: 429 }
            );
        }

        return NextResponse.json({
            success: false,
            error: "Image upload failed. Please try again."
        }, { status: 500 });
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


