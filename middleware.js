import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // JWT token
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // -----------------------------
  // 🔒 Checkout Routes Protection
  // -----------------------------
  if (pathname.startsWith("/checkout")) {
    if (!token) {
      // User not logged in → redirect to login page
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // -----------------------------
  // 🔒 Seller Routes Protection
  // -----------------------------
  if (pathname.startsWith("/seller")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    if (token.role !== "seller" && token.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // -----------------------------
  // 🔒 Admin Routes Protection
  // -----------------------------
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // -----------------------------
  // 🔒 Orders Route Protection (admin only)
  // -----------------------------
  if (pathname.startsWith("/orders")) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}
