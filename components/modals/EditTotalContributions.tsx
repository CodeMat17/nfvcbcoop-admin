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

 const [open, setOpen] = useState(false);

  const updateTotal = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("records")
        .update({ total_contributions: value })
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
        <Button variant='outline'>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Double check your changes before uploading.
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <div className=''>
            <Label htmlFor='name' className=''>
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
        </div>
        <DialogFooter>
          <Button onClick={updateTotal} disabled={loading}>
            {loading ? (
              <Loader2Icon className='animate-spin' />
            ) : (
              "Save changes"
            )}{" "}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTotalContributions;
