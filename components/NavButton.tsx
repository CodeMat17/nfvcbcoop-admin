"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const NavButton = ({ href, tag }: { href: string; tag: string }) => {
  const pathname = usePathname();


  return (
    <Button
      asChild
      variant='ghost'
      className={`w-full transition duration-500 ease-in-out bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 ${
        pathname === href ? "border-r-4 border-green-600" : ""
      }`}>
      <Link href={href}>{tag}</Link>
    </Button>
  );
};

export default NavButton;
