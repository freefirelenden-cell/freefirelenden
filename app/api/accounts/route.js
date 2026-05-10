import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import Account from "@/models/Account";


export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    // Extract filters
    const rank = searchParams.get("rank") || "all";
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sortBy = searchParams.get("sortBy") || "newest";
    const status = searchParams.get("status");


    let query = {
      status: "approved"
    };

    if (status) {
      if (status === "all") {
        delete query.status; 
      } else if (status.includes(",")) {
        query.status = { $in: status.split(",") };
      } else {
        query.status = status;
      }
    }

    // Rank filter
    if (rank !== "all") {
      query.rank = rank;
    }

    // Price filter
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

    // Sorting logic
    let sortQuery = {};
    switch (sortBy) {
      case "price-low":
        sortQuery.price = 1;
        break;
      case "price-high":
        sortQuery.price = -1;
        break;
      case "level-high":
        sortQuery["stats.level"] = -1;
        break;
      case "newest":
      default:
        sortQuery.createdAt = -1;
        break;
    }

    // Fetch from DB
    const accounts = await Account.find(query).sort(sortQuery);

    return NextResponse.json(
      { success: true, accounts },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ GET /api/accounts error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}




// 🔹 POST — Add a new account (from Sell form)
export async function POST(req) {
  try {

    await connectDB();
    const body = await req.json();
    const images = Array.isArray(body.images) 
      ? body.images.map(img => ({
          url: img.url?.toString(),
          fileId: img.fileId?.toString(),
          thumbnailUrl: img.thumbnailUrl?.toString() || img.url?.toString()
        }))
      : [];

    const stats = body.stats || {};
    stats.level = stats.level || 0;
    stats.matches = stats.matches || 0;
    stats.kdr = stats.kdr || 0;
    stats.badges = stats.badges || 0;

    const newAccount = new Account({
      title: body.title,
      rank: body.rank,
      price: body.price,
      images: images,
      description: body.description,
      stats: stats,
      uid: body.uid,
      email: body.email,
      password: body.password,
      isFeatured: body.isFeatured || false,
      status: body.status || "pending",
      createdBy: body.userId,
    });
    await newAccount.save()

    return NextResponse.json(
      { message: "Account submitted successfully", account: newAccount },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/accounts error:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { message: error.message },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { message: "Failed to create account", error: error.message },
      { status: 500 }
    );
  }
}
