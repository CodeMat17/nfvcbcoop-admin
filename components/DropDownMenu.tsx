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

export function DropDownMenu() {
  return (
    <div className='sm:hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <AlignLeftIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56 space-y-8 mb-8'>
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuGroup className=''>
            <Link href='/dashboard' className='cursor-pointer'>
              <DropdownMenuItem className='my-4 ml-4'>
                Loan Applications
              </DropdownMenuItem>
            </Link>

            <Link href='/dashboard/approved-loans' className='cursor-pointer'>
              <DropdownMenuItem className='mb-4 ml-4'>
                Approved Loans
              </DropdownMenuItem>
            </Link>

            <Link href='/dashboard/update' className='cursor-pointer'>
              <DropdownMenuItem className='mb-4 ml-4'>
                Update Records
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
