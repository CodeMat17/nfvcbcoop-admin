"use client";

import { CircleArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const GoBackButton = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <Button onClick={goBack} className='rounded-full'>
      <CircleArrowLeftIcon className='mr-2' /> Go back
    </Button>
  );
};

export default GoBackButton;
