"use client";

import { createClient } from "@/utils/supabase/client";
import dayjs from "dayjs";
import { Loader2Icon, LoaderIcon, SendIcon } from "lucide-react";
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
  applied: Date | null;
  approved: Date | null;
  approvedby: string;
  repay: string;
  disbursed: boolean;
  username: string | undefined;
  fetchApprovedLoans: () => void
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
  repay,
  disbursed,
  username,
  fetchApprovedLoans
}: LoanProps) => {
  const supabase = createClient();
  const router = useRouter();
  const currentDateISO = new Date().toISOString();

  const [loading, setLoading] = useState(false);
  const [disburseLoading, setDisburseLoading] = useState(false);

  // const email = user?.primaryEmailAddress?.emailAddress
  // const firstName = email?.split("@")[0];
  const today = new Date();
  const todayISO = today.toISOString();

  const isDeadlineReached = repay ? todayISO >= repay : false;

  const disburse = async () => {
    try {
      setDisburseLoading(true);
      const { data, error } = await supabase
        .from("records")
        .update({ disbursed: true })
        .eq("id", id)
        .select();

      if (error) {
        toast.error("Something went wrong.", {});
      }

      if (data) {
        toast.success(`You have confirmed disbursement to ${name}.`);
       fetchApprovedLoans()
      }
    } catch (error) {
      console.log("ErrorMsg: ", error);
    } finally {
      setDisburseLoading(false);
    }
  };

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
          repay_date: null,
        })
        .eq("id", id)
        .select();

      if (error) {
        toast.error("Something went wrong.", {});
      }

      if (data) {
        toast.success("Loan cleared.", {});
        fetchApprovedLoans()
      }
    } catch (error) {
      console.log("ErrorMsg: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full sm:w bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md'>
      <div className='relative px-7 pt-7 pb-3'>
        <p className='text-2xl font-semibold text-green-600'>
          ₦{amount.toLocaleString()}
        </p>
        <p className='font-medium'>{name}</p>
        <div className='text-sm text-gray-500 leading-4'>
          <p>09087653421</p>
          <p>Total Cont.: ₦{total.toLocaleString()}</p>
        </div>
        {!disbursed && (
          <Button
            onClick={disburse}
            size='icon'
            variant='outline'
            className='py-2 text-sm absolute bottom-2 right-4'>
          {disburseLoading ? <LoaderIcon className="animate-spin" /> : <SendIcon className='w-5 h-5' />}  
          </Button>
        )}
        <p
          className={`absolute top-3 right-4 text-sm ${
            disbursed ? "text-gray-500" : "text-rose-500"
          } `}>
          {disbursed ? "Disbursed" : "Not disbursed"}
        </p>
      </div>

      <div
        className={`${
          isDeadlineReached ? "bg-red-600" : "bg-gray-50 dark:bg-gray-950"
        } px-4 py-3 flex items-center justify-between`}>
        <div
          className={`${
            isDeadlineReached ? "text-white" : "text-gray-500"
          } leading-4 text-sm font-light`}>
          <p>Applied on: {dayjs(applied).format("MMM DD, YYYY")}</p>
          <p>Approved on: {dayjs(approved).format("MMM DD, YYYY")}</p>
          <p>Approved by: {approvedby}</p>
          <p>Repay on: {dayjs(repay).format("MMM DD, YYYY")}</p>
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
