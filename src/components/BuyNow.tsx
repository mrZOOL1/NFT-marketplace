'use client';

import React from 'react'
import { ShoppingCart,Trash2 } from 'lucide-react'
import { AddToCartAction,DeleteCardAction } from '@/lib/actions'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

interface props {
    id: string;
    mycard :boolean;
    email?: string;
    price: string;
}

const BuyNow = ({id, mycard, email, price}: props) => {

    const router = useRouter();
    const path = usePathname();
    const IsView = path === '/profile/nfts' || mycard;
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    params.set('defaultprice', price);

  return (
    <>
        <Link href={IsView ? `/editprice/${id}?${params.toString()}` : '/cart'} className='purple text-white whitespace-nowrap h-full w-10/12 rounded-bl-[8px] flex items-center justify-center'>
            <p className='text-white'>{IsView ? 'Edit price' : 'Buy now'}</p>
        </Link>

        <form id='addcart' action={IsView ? DeleteCardAction : AddToCartAction} className='hover: cursor-pointer border-l-[0.1rem] purple absolute right-0 h-full w-2/12 flex items-center justify-center rounded-br-[8px]' onSubmit={() => IsView && router.push('/profile/nfts')}>
            <button className='w-full flex justify-center items-center' type='submit' form='addcart'>
            {IsView ? <Trash2 color="white"/> : <ShoppingCart color="white"/>}
            </button>
            <input type="text" hidden defaultValue={email} name='userid'/>
            <input type="text" hidden defaultValue={id} name='cardid'/>
        </form>
    </>
  )
}

export default BuyNow