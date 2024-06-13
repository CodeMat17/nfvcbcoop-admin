// // app/api/keepAwake/route.ts

// import { createClient } from "@supabase/supabase-js";
// import { NextRequest, NextResponse } from "next/server";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// const supabase = createClient(supabaseUrl, supabaseKey);
// const cronSecret = process.env.CRON_SECRET as string;

// export async function GET(req: NextRequest) {
//   const url = new URL(req.url);
//   const secret = req.headers.get("x-cron-secret");
// //   if (secret !== cronSecret) {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //   }

//   try {
//     const { data, error } = await supabase.from("records").select("*").limit(1);

//     if (error) {
//       throw error;
//     }

//     return NextResponse.json({ message: "Supabase is awake", data });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }



export async function GET() {
  const result = await fetch(
    "http://worldtimeapi.org/api/timezone/America/Chicago",
    {
      cache: "no-store",
    }
  );
  const data = await result.json();

  return Response.json({ datetime: data.datetime });
}