'use client';

import React from 'react'
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { DeleteCartItemAction } from '@/lib/actions';

interface props {
  title: string;
  price: string;
  image: string;
  index: number;
  cardid: string;
  email: string;
  CheckHandler: (price: number, index: number, cardid: string) => void;
}

const CartItem = ({title, price, image, CheckHandler, index, cardid, email}:props) => {

  const clickhandler = function () {
    CheckHandler(parseFloat(price), index, cardid);
  }   

  return (
    <div className='h-32 flex items-center justify-between px-2'>

      <div className='flex gap-4 items-center overflow-hidden'>

        <input className='h-4 w-4' defaultChecked={true} type="checkbox" name="cart-checkbox" id="checkbox" onClick={() => clickhandler()}/>

        <Image className='hidden sm:inline-block' src='/images/blank.png' alt='nft' width={120} height={120}/>

        <div className='flex flex-col'>
          <p className='text-xl font-semibold sm:break-all'>{title}sdsdfsdfdfsdsdf</p>
          <p className='text-sm' id='price'>{`${price} ETH`}</p>
        </div>

      </div>

      <form action={DeleteCartItemAction}>
        <input type="text" name='userid' hidden defaultValue={email}/>
        <input type="text" name='cardid' hidden defaultValue={cardid}/>
        <button type='submit'>
          <Trash2 className='hover:scale-[1.2] transition-all'/>
        </button>
      </form>

    </div>
  )
}

export default CartItem