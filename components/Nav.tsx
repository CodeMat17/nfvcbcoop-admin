import { auth, clerkClient } from "@clerk/nextjs/server";
import NavButton from "./NavButton";
import { Button } from "./ui/button";

const Nav = async () => {
  const { userId } = auth().protect();
  const user = await clerkClient.users.getUser(userId);

  const PRESIDENT = process.env.PRESIDENT;
  const MATTHEW = process.env.MATTHEW;
  const CODEMAT = process.env.CODEMAT;
  const PAUL = process.env.PAUL;
  const TONY = process.env.TONY;

  const superAdmin = [PRESIDENT, MATTHEW];
  const midAdmin = [CODEMAT];
  const lowAdmin = [TONY, PAUL];

  const isSuperAdmin = superAdmin.includes(user.id);
  const isMidAdmin = midAdmin.includes(user.id);
  const isLowAdmin = lowAdmin.includes(user.id);

  return (
    <div className='fixed hidden pl-4 w-44 lg:w-64 h-[calc(100vh-40px)] sm:flex flex-col justify-center items-center gap-4'>
      {/* {superAdmin.includes(user.id) && ( */}

      {isSuperAdmin || isMidAdmin ? (
        <NavButton href='/dashboard' tag='Applications' />
      ) : (
        <Button
          variant='ghost'
          disabled
          className='w-full transition duration-500 ease-in-out bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 disabled:text-gray-500'>
          Applications
        </Button>
      )}

      {isSuperAdmin || isMidAdmin ? (
        <NavButton href='/dashboard/approved-loans' tag='Approved' />
      ) : (
        <Button
          variant='ghost'
          disabled
          className='w-full transition duration-500 ease-in-out bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 disabled:text-gray-500'>
          Approved
        </Button>
      )}

      {isSuperAdmin || isLowAdmin ? (
        <NavButton href='/dashboard/update' tag='Update' />
      ) : (
        <Button
          variant='ghost'
          disabled
          className='w-full transition duration-500 ease-in-out bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 disabled:text-gray-500'>
          Update
        </Button>
      )}
    </div>
  );
};

export default Nav;
