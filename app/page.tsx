import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
const { userId } = auth().protect();

const user = await clerkClient.users.getUser(userId);

  if (!user) return redirect('/sign-in')
  if (user) return redirect("/dashboard");

  return (
    <div className='px-4 py-28 flex justify-center text-center'>
      <p>Welcome!</p>
    </div>
  );
};

export default Home;
