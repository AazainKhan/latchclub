import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { email, city } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("waitlist")
    .insert({ email, city });

  if (error?.code === "23505") {
    return NextResponse.json(
      { error: "Already on waitlist" },
      { status: 409 }
    );
  }

  if (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
