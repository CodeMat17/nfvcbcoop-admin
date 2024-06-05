import LoanApplicationCard from "@/components/LoanApplicationCard";
import { createClient } from "@/utils/supabase/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const revalidate = 0;

const Dashboard = async () => {
  const supabase = createClient();
  const { userId } = auth().protect();
  const user = await clerkClient.users.getUser(userId);

  const email = user?.primaryEmailAddress?.emailAddress;
  const firstName = email?.split("@")[0];

  const PRESIDENT = process.env.PRESIDENT;
  const MATTHEW = process.env.MATTHEW; 
  const CODEMAT = process.env.CODEMAT;
  const AGUNNA = process.env.AGUNNA;
  const ERIJO = process.env.ERIJO;

  const PAUL = process.env.PAUL;
  const TONY = process.env.TONY;

  const updateAdmins = [PAUL, TONY];
  const isUpdateAdmin = updateAdmins.includes(user.id);

  const knownAdmins = [PRESIDENT, MATTHEW, PAUL, CODEMAT, AGUNNA, ERIJO];
  const notKnownAdmins = !knownAdmins.includes(user.id);

  if (!user) return redirect("/sign-in");
  if (isUpdateAdmin) return redirect("/dashboard/update");

  if (notKnownAdmins) {
    return (
      <div className="text-center text-xl py-28">Hang-on for your role to be defined</div>
    )
  }

  const { data, error } = await supabase
    .from("records")
    .select(
      "id, name, phone, total_contributions, loan_status, loan_amount, applied_on"
    )
    .eq("loan_status", "processing");

  return (
    <div className=''>
      <h1 className='text-center text-2xl font-semibold mt-2'>
        LOAN APPLICATIONS
      </h1>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <div className='mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {data && data.length < 1 ? (
          <div className='text-center mt-28'>
            No loan application at the moment.
          </div>
        ) : (
          data?.map((loan) => (
            <LoanApplicationCard
              key={loan.id}
              id={loan.id}
              name={loan.name}
              phone={loan.phone}
              total={loan.total_contributions}
              status={loan.loan_status}
              amount={loan.loan_amount}
              applied={loan.applied_on}
              username={firstName}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
