// app/api/schedule/keepAwake/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const cronSecret = process.env.CRON_SECRET as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-cron-secret");

//   if (secret !== cronSecret) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

  try {
    const { data, error } = await supabase
      .from("records")
      .select("*")
      .limit(1);

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "Supabase is awake", data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
