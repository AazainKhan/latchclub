import { NextResponse } from "next/server";

export function middleware() {
  // TODO: Implement Supabase auth check for /admin routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
