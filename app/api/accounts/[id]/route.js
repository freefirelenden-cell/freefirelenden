import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Account from "@/models/Account";

export async function GET(req, context) {
    try {
        await connectDB();
        const params = await context.params;
        const { id } = params

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Account ID missing" },
                { status: 400 }
            );
        }

        const account = await Account.findOne({
            _id: id,
            status: "approved",
        });

        if (!account) {
            return NextResponse.json(
                { success: false, message: "Account not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, account },
            { status: 200 }
        );
    } catch (error) {
        console.error("❌ GET /api/accounts/[id] error:", error);

        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}




export async function PUT(req, context) {
  try {
    await connectDB();
    const body = await req.json();
    const params = await context.params
    const updateFields = {};

    // 🔹 Basic fields
    if (body.title !== undefined) updateFields.title = body.title;
    if (body.rank !== undefined) updateFields.rank = body.rank;
    if (body.price !== undefined) updateFields.price = body.price;
    if (body.description !== undefined) updateFields.description = body.description;

    // 🔹 Account credentials
    if (body.uid !== undefined) updateFields.uid = body.uid;
    if (body.email !== undefined) updateFields.email = body.email;
    if (body.password !== undefined) updateFields.password = body.password;

    // 🔹 Status & feature
    if (body.status !== undefined) updateFields.status = body.status;
    if (body.isFeatured !== undefined) updateFields.isFeatured = body.isFeatured;

    // 🔹 Images
    if (Array.isArray(body.images)) {
      updateFields.images = body.images;
    }

    // 🔹 Stats (partial update, no overwrite)
    if (body.stats) {
      if (body.stats.level !== undefined)
        updateFields["stats.level"] = body.stats.level;

      if (body.stats.matches !== undefined)
        updateFields["stats.matches"] = body.stats.matches;

      if (body.stats.kdr !== undefined)
        updateFields["stats.kdr"] = body.stats.kdr;

      if (body.stats.badges !== undefined)
        updateFields["stats.badges"] = body.stats.badges;
    }

    const updatedAccount = await Account.findByIdAndUpdate(
      params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedAccount) {
      return NextResponse.json(
        { success: false, message: "Account not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Account updated successfully",
        account: updatedAccount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/accounts/[id] error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to update account" },
      { status: 500 }
    );
  }
}
