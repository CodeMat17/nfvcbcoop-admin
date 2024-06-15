import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  console.log("Pinging process just started");
  try {
    // Perform a simple query to keep the Supabase backend active
    const { data, error } = await supabase
      .from("records")
      .select("id")
      .limit(1);

    if (error) {
      console.log("Fetching error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Fetching successful");
    return NextResponse.json(
      { message: "Supabase pinged successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.log("Catch error:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
