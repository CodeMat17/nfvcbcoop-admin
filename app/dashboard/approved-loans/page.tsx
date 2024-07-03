"use client";

import LoanApprovalCard from "@/components/LoanApprovalCard";
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { TbChevronLeft, TbChevronRight, TbEdit } from "react-icons/tb";

// export const revalidate = 0;

type Loans =
  | {
      id: string;
      name: string;
      phone: string;
      total_contributions: number;
      loan_status: string;
      loan_amount: number;
      applied_on: Date | null;
      approved_on: Date | null;
      approved_by: string;
      repay_date: string;
      disbursed: boolean;
    }[]
  | null;

const ApprovedLoans = () => {
  const supabase = createClient();
  const { isLoaded, user } = useUser();



  const [approvedLoans, setApprovedLoans] = useState<Loans>();
  // const { userId } = auth().protect();
  // const user = await clerkClient.users.getUser(userId);

  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
     fetchApprovedLoans();
   }, [page]);

  const email = user?.primaryEmailAddress?.emailAddress;
  const firstName = email?.split("@")[0];

  const PAUL = process.env.PAUL;
  const TONY = process.env.TONY;

  const updateAdmins = [PAUL, TONY];
  const isUpdateAdmin = updateAdmins.includes(user?.id);

  if (!user) return redirect("/sign-in");
  if (isUpdateAdmin) return redirect("/dashboard/update");

 


  const fetchApprovedLoans = async () => {
    setLoading(true);
    const perPage = 9;
    const from = page * perPage;
    const to = from + perPage - 1;

    const { data, count, error } = await supabase
      .from("records")
      .select(
        "id, name, phone, total_contributions, loan_status, loan_amount, applied_on, approved_on, approved_by, repay_date, disbursed",
        { count: "exact" }
      )
      .eq("loan_status", "approved")
      .order("approved_on", { ascending: false })
      .order("applied_on", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Error fetching approved loans: ", error);
    } else {
      setApprovedLoans(data || []);
      setTotalPages(Math.ceil((count || 0) / perPage));
      setTotalCount(count || 0);
    }
    setLoading(false);
  };

  // const { data, error } = await supabase
  //   .from("records")
  //   .select(
  //     "id, name, phone, total_contributions, loan_status, loan_amount, applied_on, approved_on, approved_by, repay_date, disbursed"
  //   )
  //   .eq("loan_status", "approved")
  //   .order("approved_on", { ascending: false });

  if (loading) {
    return (
      <div className='w-full flex flex-col items-center justify-center mt-32'>
        <Loader2 className='animate-spin' />
        <p>Loading approved loans</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className='text-center text-2xl font-semibold mt-2'>
        APPROVED LOANS
      </h1>
      {/* <pre>{ JSON.stringify(data, null, 2)}</pre> */}
      <div className='mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {approvedLoans &&
          approvedLoans.map((loan) => (
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
              repay={loan.repay_date}
              disbursed={loan.disbursed}
              username={firstName}
              fetchApprovedLoans={fetchApprovedLoans}
            />
          ))}
      </div>
      <div className='my-7'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant='ghost'
                onClick={() => setPage(page - 1)}
                disabled={page === 0}>
                <TbChevronLeft className='mr-2' /> Previous
              </Button>
            </PaginationItem>
            <PaginationItem>
              <span className='text-sm'>
                Page {page + 1} of {totalPages}
              </span>
            </PaginationItem>

            <PaginationItem>
              <Button
                variant='ghost'
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages - 1}>
                Next <TbChevronRight className='ml-2' />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ApprovedLoans;
