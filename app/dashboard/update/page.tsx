import UpdateList from "@/components/UpdateList";
import { createClient } from "@/utils/supabase/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";
import AddNewRecordForm from "@/components/AddNewRecordForm";

export const revalidate = 0;

const Update = async () => {
  const supabase = createClient();
  const { userId } = auth().protect();
  const user = await clerkClient.users.getUser(userId);

  const PRESIDENT = process.env.PRESIDENT;
  const PAUL = process.env.PAUL;
  const TONY = process.env.TONY;
  const MATTHEW = process.env.MATTHEW

  const adminIds = [PRESIDENT, PAUL, TONY, MATTHEW];
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
        RECORDS
      </h1>
      <div className='flex justify-center mt-8'>
        <Tabs defaultValue='update' className='w-[400px]'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger
              value='update'
              className='border rounded-full py-3 mr-2 shadow-md'>
              Update Records
            </TabsTrigger>
            <TabsTrigger
              value='add'
              className='border rounded-full py-3 ml-2 shadow-md'>
              Add New Record
            </TabsTrigger>
          </TabsList>
          <TabsContent value='update' className='mt-8'>
            <div className='mt-10 w-full max-w-md mx-auto'>
              <UpdateList data={data} />
            </div>
          </TabsContent>
          <TabsContent value='add' className='mt-8'>
          <AddNewRecordForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Update;
