'use client';

import React, {useTransition} from 'react'
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { DeleteCartItemAction } from '@/lib/actions';
import { Separator } from './ui/separator';
import { ActionHandler } from '@/lib/utils';
import LoadingAction from './LoadingAction';

interface props {
  title: string;
  price: string;
  index: number;
  last: number;
  cardid: string;
  email: string;
  CheckHandler: (price: number, index: number, cardid: string, justdelete:boolean) => void;
}

const CartItem = ({title, price, last, CheckHandler, index, cardid, email}:props) => {

  const [isPending, startTransition] = useTransition();

  const clickhandler = function (mybool:boolean, e?: React.FormEvent<HTMLFormElement>) {

    e?.preventDefault();
    e?.stopPropagation();

    CheckHandler(parseFloat(price), index, cardid, mybool);

    ActionHandler('#deleteitemform', DeleteCartItemAction, startTransition);

  }


  return (
    <>

      {isPending && <LoadingAction/>}

      <div className='h-32 flex items-center justify-between px-2'>

        <div className='flex gap-4 items-center overflow-hidden'>

          <input defaultChecked={true} type="checkbox" name="cart-checkbox" id="checkbox" onClick={() => clickhandler(false)}/>

          <Image className='hidden sm:inline-block' src='/images/blank.png' alt='nft' width={120} height={120}/>

          <div className='flex flex-col'>
            <p className='text-xl font-semibold sm:break-all'>{title}</p>
            <p className='text-sm' id='price'>{`${price} ETH`}</p>
          </div>

        </div>

        <form id='deleteitemform' onSubmit={(e) => clickhandler(true, e)}>

          <input type="text" name='userid' id='userid' hidden defaultValue={email}/>
          <input type="text" name='cardid' id='cardid' hidden defaultValue={cardid}/>
          
          <button type='submit'>
            <Trash2 className='hover:scale-[1.2] transition-all'/>
          </button>

        </form>

      </div>

      <Separator className={`bg-muted-foreground ${(last-1 === index) ? 'hidden' : ''}`}/>
    </>
  )
}

export default CartItem