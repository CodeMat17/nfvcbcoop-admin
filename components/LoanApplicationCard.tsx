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
  username:string | undefined
};

const LoanApplicationCard = ({
  id,
  name,
  phone,
  total,
  status,
  amount,
  applied,
  username
}: LoanProps) => {
  const supabase = createClient();
  const router = useRouter();
  const currentDateISO = new Date().toISOString();

  const repayDate = new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString()
 
console.log('REPAYMENT: ', repayDate);

  const [loadingDecline, setLoadingDecline] = useState(false);
  const [loadingApprove, setLoadingApprove] = useState(false);

  const declineLoan = async () => {
    try {
      setLoadingDecline(true);

      const { data, error } = await supabase
        .from("records")
        .update({ loan_status: "free", loan_amount: null })
        .eq("id", id)
        .select();

      if (error) {
        toast.error("Something went wrong.", {});
      }

      if (data) {
        toast.success("Loan has been declined.", {
          // description: {`${todaysDate}`}
        });
        router.refresh();
      }
    } catch (error) {
      console.log("ErrorMsg: ", error);
    } finally {
      setLoadingDecline(false);
    }
  };

  const approveLoan = async () => {
    try {
      setLoadingApprove(true);

      const { data, error } = await supabase
        .from("records")
        .update({ loan_status: "approved", approved_on: currentDateISO, approved_by: username, repay_date: repayDate })
        .eq("id", id)
        .select();

      if (error) {
        toast.error("Something went wrong.", {
          // description: {`${todaysDate}`}
        });
      }

      if (data) {
        toast("Loan approved.", {
          // description: {`${todaysDate}`}
        });
        router.refresh();
      }
    } catch (error) {
      console.log("ErrorMsg: ", error);
    } finally {
      setLoadingApprove(false);
    }
  };

  return (
    <div className='w-full sm:w bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md'>
      <div className='px-7 pt-7 pb-3'>
        <p className='text-2xl font-semibold text-red-600'>
          ₦{amount?.toLocaleString()}
        </p>
        <p className='font-medium'>{name}</p>
        <div className='text-sm text-gray-500 leading-4'>
          <p>Total Cont.: ₦{total.toLocaleString()}</p>
          <p>Applied on: {dayjs(applied).format("MMM DD, YYYY")}</p>
     
          {phone && <p>{phone}</p>}
        </div>
      </div>

      <div className='bg-gray-50 dark:bg-gray-950 p-4 flex justify-between'>
        <Button
          variant='outline'
          onClick={declineLoan}
          disabled={loadingDecline}
          className='  hover:bg-red-100 hover:dark:bg-red-500/50'>
          {loadingDecline ? (
            <Loader2Icon className='animate-spin' />
          ) : (
            "Decline"
          )}
        </Button>
        <Button
          variant='ghost'
          onClick={approveLoan}
          className='bg-green-50 text-green-600 dark:bg-green-900/50 hover:bg-green-100 hover:dark:bg-green-900/70'>
          {loadingApprove ? (
            <Loader2Icon className='animate-spin' />
          ) : (
            "Approve"
          )}
        </Button>
      </div>
    </div>
  );
};

export default LoanApplicationCard;
