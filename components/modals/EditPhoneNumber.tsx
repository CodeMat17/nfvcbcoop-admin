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

const EditPhoneNumber = ({ id, phone }: { id: string; phone: string }) => {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(phone);

  const [open, setOpen] = useState(false);

  const updatePhone = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("records")
        .update({ phone: value })
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
        <div className='py-4'>
          <div className=''>
            <Label htmlFor='name' className=''>
              Phone number
            </Label>
            <Input
              type='text'
              id='name'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className='mt-1'
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={updatePhone} disabled={loading}>
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

export default EditPhoneNumber;
