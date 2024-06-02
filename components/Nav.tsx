import Link from "next/link";
import { Button } from "./ui/button";

const Nav = () => {
  return (
    <div className='fixed hidden pl-4 w-44 lg:w-64 h-[calc(100vh-40px)] sm:flex flex-col justify-center items-center gap-4'>
      <Button
        asChild
        variant='ghost'
        className='w-full transition duration-500 ease-in-out bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800'>
        <Link href='/dashboard'>Applications</Link>
      </Button>
      <Button
        asChild
        variant='ghost'
        className='w-full transition duration-500 ease-in-out bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800'>
        <Link href='/dashboard/approved-loans'>Approved</Link>
      </Button>
      <Button
        asChild
        variant='ghost'
        className='w-full transition duration-500 ease-in-out bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800'>
        <Link href='/dashboard/update'>Update</Link>
      </Button>
    </div>
  );
};

export default Nav;
