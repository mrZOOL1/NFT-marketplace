'use client';

import React from 'react'
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const SearchBar = () => {

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();

  const submitHandler = function() {
    const search = document.querySelector('input[name="search"]') as HTMLInputElement;
    const searchvalue = search.value.toString();
    params.set('title', searchvalue);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <form className='flex items-center w-[min(90%,500px)] my-4' onSubmit={submitHandler}>

      <button type='submit' className='flex items-center justify-right'>
        <Search className='absolute ml-2' size={20}/>
      </button>
      
      <Input placeholder='search' className='pl-8 shadow2' name='search' autoComplete='off'/>

    </form>
  )
}

export default SearchBar