"use client";

import { createClient } from "@/utils/supabase/client";
import dayjs from "dayjs";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

type LoanProps = {
  id: string;
  name: string;
  phone: string;
  total: number;
  status: string;
  amount: number;
  applied: string;
  approved: string;
  approvedby: string;
  username: string | undefined;
};

const LoanApprovalCard = ({
  id,
  name,
  phone,
  total,
  status,
  amount,
  applied,
  approved,
  approvedby,
  username,
}: LoanProps) => {
  const supabase = createClient();
  const router = useRouter();
  const currentDateISO = new Date().toISOString();

  const [loading, setLoading] = useState(false);

  // const email = user?.primaryEmailAddress?.emailAddress
  // const firstName = email?.split("@")[0];

  const clearLoan = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("records")
        .update({
          loan_status: "free",
          loan_amount: null,
          approved_on: currentDateISO,
          cleared_by: username,
        })
        .eq("id", id)
        .select();

      if (error) {
        toast.error("Something went wrong.", {});
      }

      if (data) {
        toast.success("Loan cleared.", {
          // description: {`${todaysDate}`}
        });
        router.refresh();
      }
    } catch (error) {
      console.log("ErrorMsg: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full sm:w bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md'>
      <div className='px-7 pt-7 pb-3'>
        <p className='text-2xl font-semibold text-green-600'>
          ₦{amount.toLocaleString()}
        </p>
        <p className='font-medium'>{name}</p>
        <div className='text-sm text-gray-500 leading-4'>
          <p>09087653421</p>
          <p>Total Cont.: ₦{total.toLocaleString()}</p>
        </div>
      </div>

      <div className='bg-gray-50 dark:bg-gray-950 px-4 py-3 flex justify-between'>
        <div className='leading-4 text-gray-500 text-sm'>
          <p>Applied on: {dayjs(applied).format("MMM DD, YYYY")}</p>
          <p>Approved on: {dayjs(approved).format("MMM DD, YYYY")}</p>
          <p>Approved by: {approvedby}</p>
        </div>
        <Button
          variant='outline'
          onClick={clearLoan}
          disabled={loading}
          className='  hover:bg-red-100 hover:dark:bg-red-500/50'>
          {loading ? <Loader2Icon className='animate-spin' /> : "Clear"}
        </Button>
      </div>
    </div>
  );
};

export default LoanApprovalCard;
