'use client';

import React from 'react'
import { ShoppingCart,Trash2 } from 'lucide-react'
import { AddToCartAction,DeleteCardAction } from '@/lib/actions'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link';

interface props {
    id: string;
    mycard? :boolean;
}

const BuyNow = ({id, mycard}: props) => {

    const router = useRouter();
    const path = usePathname();
    const IsView = path === '/profile' || mycard;

  return (
    <>
        <Link href={IsView ? `/${id}` : `/checkout/${id}`} className='purple text-white whitespace-nowrap h-full w-10/12 rounded-bl-[8px] flex items-center justify-center rounded-tl-[8px]' onClick={() => router.push(`/checkout/${id}`)}>
            <p className='text-white text-lg'>{IsView ? 'View' : 'Buy now'}</p>
        </Link>

        <form id='addcart' action={IsView ? DeleteCardAction : AddToCartAction} className='hover: cursor-pointer border-l-[0.1rem] purple absolute right-0 h-full w-2/12 flex items-center justify-center rounded-br-[8px] rounded-tr-[8px]'>
            <button className='w-full flex justify-center items-center' type='submit' form='addcart'>
            {IsView ? <Trash2 color="white"/> : <ShoppingCart color="white"/>}
            </button>
            <input type="text" hidden defaultValue='user2' name='userid'/>
            <input type="text" hidden defaultValue={id} name='cardid'/>
        </form>
    </>
  )
}

export default BuyNow