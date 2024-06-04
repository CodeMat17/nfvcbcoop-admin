import LoanApprovalCard from "@/components/LoanApprovalCard";
import { createClient } from "@/utils/supabase/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const revalidate = 0;

const ApprovedLoans = async () => {
  const supabase = createClient();
    const { userId } = auth().protect();
  const user = await clerkClient.users.getUser(userId);
  
  const email = user?.primaryEmailAddress?.emailAddress;
  const firstName = email?.split("@")[0];

   const PAUL = process.env.PAUL;
   const TONY = process.env.TONY;

   const updateAdmins = [PAUL, TONY];
   const isUpdateAdmin = updateAdmins.includes(user.id);

  if (!user) return redirect("/sign-in");
   if (isUpdateAdmin) return redirect("/dashboard/update");

const { data, error } = await supabase
  .from("records")
  .select("id, name, phone, total_contributions, loan_status, loan_amount, applied_on, approved_on, approved_by")
  .eq("loan_status", "approved");

  return (
    <div>
      <h1 className='text-center text-2xl font-semibold mt-2'>
        APPROVED LOANS
      </h1>

      <div className='mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {data && data.length < 1 ? (
          <div className='text-center mt-28'>
            No loan application at the moment.
          </div>
        ) : (
          data?.map((loan) => (
            <LoanApprovalCard
              key={loan.id}
              id={loan.id}
              name={loan.name}
              phone={loan.phone}
              total={loan.total_contributions}
              status={loan.loan_status}
              amount={loan.loan_amount}
              applied={loan.applied_on}
              approved={loan.approved_on}
              approvedby={loan.approved_by}
              username={firstName}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ApprovedLoans;
