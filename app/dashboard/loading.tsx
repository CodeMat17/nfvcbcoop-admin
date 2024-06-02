import { LoaderCircleIcon } from "lucide-react";

const loading = () => {
  return (
    <div className='flex flex-col w-full mt-32 justify-center items-center'>
      <LoaderCircleIcon className='animate-spin' />
      <p>Please wait</p>
    </div>
  );
};

export default loading;
