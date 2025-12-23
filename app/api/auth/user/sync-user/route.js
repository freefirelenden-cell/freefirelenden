// /app/api/sync-user/route.js
import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";



export async function POST(req) {

  await connectDB();
  const body = await req.json();
  const user = await User.findOne({ authId: body.authId })

  if (!user) {
    const newUser = new User({
      authId: body.authId,
      email: body.email,
      name: body.name,
      image: body.image,
      role: body.role,
      isTrusted: body.isTrusted,
      phone: body.phone
    });

    await newUser.save();
    return NextResponse.json({ message: "User synced", syncUser: true, data: newUser });
  }

  return NextResponse.json({ message: "User already exists" });
}


