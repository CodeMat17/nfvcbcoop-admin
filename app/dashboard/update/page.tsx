import UpdateList from "@/components/UpdateList";
import { createClient } from "@/utils/supabase/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const revalidate = 0;

const Update = async () => {
  const supabase = createClient();
  const { userId } = auth().protect();
  const user = await clerkClient.users.getUser(userId);

  const PRESIDENT = process.env.PRESIDENT;
  const PAUL = process.env.PAUL;
  const TONY = process.env.TONY;

  const adminIds = [PRESIDENT, PAUL, TONY];
  const isNorAdmin = !adminIds.includes(user.id);

  // const email = user?.primaryEmailAddress?.emailAddress;
  // const firstName = email?.split("@")[0];

  if (!user) return redirect("/sign-in");

  if (isNorAdmin) {
    redirect("/dashboard");
  }

  const { data, error } = await supabase
    .from("records")
    .select("id, name, code, ippis_no")
    .order("name", { ascending: true });

  return (
    <div>
      <h1 className='text-center text-2xl font-semibold mt-2'>
        UPDATE RECORDS
      </h1>

      <div className='mt-10 w-full max-w-md mx-auto'>
        <UpdateList data={data} />
      </div>
    </div>
  );
};

export default Update;
