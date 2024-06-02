"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = {
  data:
    | {
        id: string;
        name: string;
        code: string;
        ippis_no: number;
      }[]
    | null;
};

const UpdateList = ({ data }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredList = data?.filter((item) => {
    const name = item.name.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    return name.includes(searchTermLower);
    // coop.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  //   <pre>{JSON.stringify(filteredList, null, 2)}</pre>;

  // console.log('LIST: ', list);

  return (
    <div className=''>
      <div className='mb-6'>
        <Input
          type='search'
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search with name '
        />
      </div>
      {filteredList!.length < 1 ? (
        <div className='text-center mt-32'>Name is not in database</div>
      ) : (
        filteredList?.map((item) => (
          <div key={item.id} className='mb-8'>
            <h1 className='text-xl'>{item.name}</h1>
            <div className='flex items-center justify-between'>
              <div className='text-sm text-gray-500 mt-2 leading-4'>
                <p>IPPIS No: {item.ippis_no}</p>
                <p>Passcode: {item.code}</p>
              </div>
              <Button asChild className='rounded-full'>
                <Link href={`/dashboard/update/${item.id}`}>Update</Link>
              </Button>
            </div>
          </div>
        ))
      )}
      <div></div>
    </div>
  );
};

export default UpdateList;
