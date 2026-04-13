import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { first_name, last_name, email } = await request.json();

    if (!email || !first_name) {
      return NextResponse.json(
        { error: "First name and email are required" },
        { status: 400 }
      );
    }

    // TODO: Connect to Supabase when ready
    // For now, log and return success
    console.log("Waitlist signup:", { first_name, last_name, email });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
