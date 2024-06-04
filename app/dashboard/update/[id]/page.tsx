import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EditMonthlyContribution from "@/components/modals/EditMonthlyContribution";
import EditName from "@/components/modals/EditName";
import EditPasscode from "@/components/modals/EditPasscode";
import EditPhoneNumber from "@/components/modals/EditPhoneNumber";
import EditTotalContributions from "@/components/modals/EditTotalContributions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { CircleArrowLeftIcon } from "lucide-react";
import GoBackButton from "@/components/GoBackButton";

export const revalidate = 0;

type Props = {
  params: {
    id: string;
  };
};

const IDPage = async ({ params: { id } }: Props) => {
  const supabase = createClient();
    const { userId } = auth().protect();
    const user = await clerkClient.users.getUser(userId);

    const PRESIDENT = process.env.PRESIDENT;
    const PAUL = process.env.PAUL;
    const TONY = process.env.TONY;

    const adminIds = [PRESIDENT, PAUL, TONY];
    const isNorAdmin = !adminIds.includes(user.id);

    // const email = user?.primaryEmailAddress?.emailAddress;
    // const firstName = email?.split("@")[0];

    if (!user) return redirect("/sign-in");

    if (isNorAdmin) {
      redirect("/dashboard");
    }

  const { data, error } = await supabase
    .from("records")
    .select(
      "id, name, phone, code, date_joined, total_contributions, ippis_no, monthly_contribution"
    )
    .match({ id })
    .single();

  if (!data) {
    notFound;
  }

  return (
    <div className='py-8 '>
      <h1 className='text-2xl font-semibold text-center'>{data?.name}</h1>
      <h3 className='text-center text-lg font-medium'>Update Records</h3>

      <div className='mt-12 space-y-4 max-w-md mx-auto'>
        <div>
          <Label>Edit name</Label>
          <div className='mt-1 flex items-end justify-between gap-6'>
            <Input
              type='text'
              placeholder='Edit name'
              defaultValue={data?.name}
              disabled
            />
            <EditName id={id} name={data?.name} />
          </div>
        </div>

        <div>
          <Label>Date joined</Label>
          <div className='mt-1 flex items-end justify-between gap-6'>
            <Input
              type='text'
              //   placeholder='Date number'
              defaultValue={data?.date_joined}
              disabled
            />
            <Button disabled>Edit</Button>
          </div>
        </div>

        <div>
          <Label>Edit total contributions</Label>
          <div className='mt-1 flex items-end justify-between gap-6'>
            <Input
              type='number'
              placeholder='Total contributions'
              defaultValue={data?.total_contributions}
              disabled
            />
            <EditTotalContributions id={id} total={data?.total_contributions} />
          </div>
        </div>

        <div>
          <Label>Edit monthly contribution</Label>
          <div className='mt-1 flex items-end justify-between gap-6'>
            <Input
              type='number'
              placeholder='Monthly contributions'
              defaultValue={data?.monthly_contribution}
              disabled
            />
            <EditMonthlyContribution
              id={id}
              monthly={data?.monthly_contribution}
            />
          </div>
        </div>

        <div>
          <Label>Edit phone number</Label>
          <div className='mt-1 flex items-end justify-between gap-6'>
            <Input
              type='tel'
              placeholder='Phone number'
              defaultValue={data?.phone}
              disabled
            />
            <EditPhoneNumber id={id} phone={data?.phone} />
          </div>
        </div>

        <div>
          <Label>Edit passcode</Label>
          <div className='mt-1 flex items-end justify-between gap-6'>
            <Input
              type='text'
              placeholder='Passcode'
              maxLength={6}
              disabled
              defaultValue={data?.code}
            />
            <EditPasscode id={id} code={data?.code} />
          </div>
        </div>
      </div>
      <div className='mt-12 flex justify-end'>
        <GoBackButton />
      </div>
    </div>
  );
};

export default IDPage;
