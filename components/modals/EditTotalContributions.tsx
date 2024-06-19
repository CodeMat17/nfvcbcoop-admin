"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/utils/supabase/client";
import { Loader2Icon } from "lucide-react";
import { revalidatePath, revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const EditTotalContributions = ({
  id,
  total,
}: {
  id: string;
  total: number;
}) => {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<number>(total);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const latest_update = `${month} ${year}`.trim();

  const [open, setOpen] = useState(false);

  const updateTotal = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("records")
        .update({ total_contributions: value, latest_update })
        .eq("id", id)
        .select();

      if (error) {
        toast("Something went wrong.!");
      }

      if (data) {
        setOpen(false);
        toast("Updated successfully!");
        router.refresh();
        revalidateTag(`/dashboard/update/${id}`);
        revalidatePath(`/dashboard/update/${id}`);
      }
    } catch (error) {
      console.log("ErrorMsg: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Edit</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Double check your changes before uploading.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-3'>
          <div className=''>
            <Label htmlFor='name' className='text-sm'>
              Total Contributions
            </Label>
            <Input
              type='number'
              id='name'
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(Number(e.target.value))
              }
              className='mt-1'
            />
          </div>
          <div className=''>
            <Label htmlFor='name' className='text-sm'>
              As at
            </Label>
            <div className='flex items-center justify-between gap-4'>
              <Select value={month} onValueChange={(value) => setMonth(value)}>
                <SelectTrigger className=''>
                  <SelectValue placeholder='Select month' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className='grid grid-cols-4'>
                    <SelectItem value='JAN'>JAN</SelectItem>
                    <SelectItem value='FEB'>FEB</SelectItem>
                    <SelectItem value='MAR'>MAR</SelectItem>
                    <SelectItem value='APR'>APR</SelectItem>
                    <SelectItem value='MAY'>MAY</SelectItem>
                    <SelectItem value='JUN'>JUN</SelectItem>
                    <SelectItem value='JUL'>JUL</SelectItem>
                    <SelectItem value='AUG'>AUG</SelectItem>
                    <SelectItem value='SEP'>SEP</SelectItem>
                    <SelectItem value='OCT'>OCT</SelectItem>
                    <SelectItem value='NOV'>NOV</SelectItem>
                    <SelectItem value='DEC'>DEC</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select value={year} onValueChange={(value) => setYear(value)}>
                <SelectTrigger className=''>
                  <SelectValue placeholder='Select year' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className=''>
                    <SelectItem value='2024'>2024</SelectItem>
                    <SelectItem value='2025'>2025</SelectItem>
                    <SelectItem value='2026'>2026</SelectItem>
                    <SelectItem value='2027'>2027</SelectItem>
                    <SelectItem value='2028'>2028</SelectItem>
                    <SelectItem value='2029'>2029</SelectItem>
                    <SelectItem value='2030'>2030</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          {month && year &&
            <Button onClick={updateTotal} disabled={loading}>
              {loading ? (
                <Loader2Icon className='animate-spin' />
              ) : (
                "Save changes"
              )}{" "}
            </Button>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTotalContributions;
