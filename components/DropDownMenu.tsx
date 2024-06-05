import { auth, clerkClient } from "@clerk/nextjs/server";
import { AlignLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export async function DropDownMenu() {
  const { userId } = auth().protect();
  const user = await clerkClient.users.getUser(userId);

  const PRESIDENT = process.env.PRESIDENT;
  const AGUNNA = process.env.AGUNNA;
  const ERIJO = process.env.ERIJO;
  const MATTHEW = process.env.MATTHEW;
  const CODEMAT = process.env.CODEMAT;
  const PAUL = process.env.PAUL;
  const TONY = process.env.TONY;

  const midAdmin = [AGUNNA, ERIJO, CODEMAT, PRESIDENT, MATTHEW];
  const lowAdmin = [TONY, PAUL, PRESIDENT, MATTHEW];

  // const isSuperAdmin = superAdmin.includes(user.id);
  const isMidAdmin = midAdmin.includes(user.id);
  const isLowAdmin = lowAdmin.includes(user.id);

  const allAdmins = [
    PRESIDENT,
    MATTHEW,
    PAUL,
    TONY,
    CODEMAT,
    AGUNNA,
    ERIJO,
    TONY,
    PAUL,
  ];
  const noRole = !allAdmins.includes(user.id);

  return (
    <div className='sm:hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <AlignLeftIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56 space-y-8 mb-8'>
      
          <DropdownMenuGroup>
            {
              isMidAdmin && (
                <Link href='/dashboard' className='cursor-pointer'>
                  <DropdownMenuItem className='my-4 ml-4'>
                    Loan Applications
                  </DropdownMenuItem>
                </Link>
              )}

            {
              isMidAdmin && (
                <Link
                  href='/dashboard/approved-loans'
                  className='cursor-pointer'>
                  <DropdownMenuItem className='mb-4 ml-4'>
                    Approved Loans
                  </DropdownMenuItem>
                </Link>
              )}

            {
              isLowAdmin && (
                <Link href='/dashboard/update' className='cursor-pointer'>
                  <DropdownMenuItem className='mb-4 ml-4'>
                    Update Records
                  </DropdownMenuItem>
                </Link>
              )}

            {noRole && (
              <DropdownMenuItem className='mb-4 ml-4'>
                NO role assigned to you yet
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
