"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { GitCommitHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  ippis_no: z.string().length(6, {
    message: "IPPIS no. must be at least 6 digits.",
  }),
  phone: z.string().length(11, {
    message: "Phone number must be exactly 11 digits.",
  }),
  date_joined: z.string().min(8, {
    message: "Ex. JAN 2024 | FEB 2025 | MAR 2026 | APR 2027, etc.",
  }),
  total_contributions: z.string().refine((val) => {
    const numberVal = Number(val);
    if (isNaN(numberVal)) {
      throw new Error("Total contribution must be a number.");
    }
    return numberVal;
  }),
  monthly_contribution: z.string().refine((val) => {
    const numberVal = Number(val);
    if (isNaN(numberVal)) {
      throw new Error("Monthly contribution must be a number.");
    }
    return numberVal;
  }),
  code: z.string().length(6, {
    message: "Passcode must be exactly 6 digits. No alphabets.",
  }),
});

const AddNewRecordForm = () => {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ippis_no: "",
      phone: "",
      date_joined: "",
      total_contributions: "",
      monthly_contribution: "",
      code: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      setLoading(true);
      setErrorMsg("");

      const { data, error } = await supabase
        .from("records")
        .insert([values])
        .select();

      if (error) {
        if (error.code === "23505") {
          setErrorMsg(error.details);
        } else {
          setErrorMsg("Something went wrong. Try again later.");
        }
      }

      if (data) {
        //   revalidatePath("/dashboard/update");
        //   revalidateTag("/dashboard/update");
        toast("Record is successfully created");
        router.refresh();
        form.reset({ name: "", ippis_no: "", phone: "" });
     
      }
    } catch (error) {
      console.log("Error Msg: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-full min-h-screen pb-8'>
      {errorMsg && (
        <h3 className='text-sm font-light text-red-500 bg-red-100 p-4 my-4 rounded-xl'>
          {errorMsg}
        </h3>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Eg. MARY MATHIAS' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='ippis_no'
            render={({ field }) => (
              <FormItem>
                <FormLabel>IPPIS No:</FormLabel>
                <FormControl>
                  <Input placeholder='Eg. 123456' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input placeholder='Eg. 08012345678' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='date_joined'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date joined</FormLabel>
                <FormControl>
                  <Input placeholder='Eg. MAR 2024' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='total_contributions'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total contributions</FormLabel>
                <FormControl>
                  <Input placeholder='Eg. 200000' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='monthly_contribution'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly contribution</FormLabel>
                <FormControl>
                  <Input placeholder='Eg. 5000' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='code'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passcode</FormLabel>
                <FormControl>
                  <Input placeholder='Eg. 445554' {...field} />
                </FormControl>
                <FormDescription>
                  Generate 6 numbers, no alphabets.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            disabled={loading}
            className='disabled:cursor-not-allowed'>
            {loading ? (
              <GitCommitHorizontalIcon className='animate-spin' />
            ) : (
              "Submit"
            )}{" "}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddNewRecordForm;
