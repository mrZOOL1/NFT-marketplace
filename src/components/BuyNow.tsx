'use client';

import React, {useState, useEffect, useTransition} from 'react'
import { ShoppingCart,Trash2 } from 'lucide-react'
import { AddToCartAction,DeleteCardAction, BuyOne } from '@/lib/actions'
import { usePathname, useSearchParams } from 'next/navigation'
import { Button } from './ui/button';
import { ActionHandler } from '@/lib/utils';
import LoadingAction from './LoadingAction';

interface props {
    id: string;
    email: string;
    mycard :boolean;
    price: string;
    funds:number;
    owner: string;
}

const BuyNow = ({id, mycard, email, price, funds, owner}: props) => {

    const [isPending, startTransition] = useTransition();
    const [CanAfford, SetCanAfford] = useState(true);
    const path = usePathname();
    const IsView = path === '/profile/nfts' || mycard;
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    params.set('defaultprice', price);

    const buyone = function (e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();
        e.stopPropagation();

        if (!IsView) {

            SetCanAfford(true);
            let allgood = true;
        
            if (parseFloat(price) > funds) {
                console.log(price, funds);
                SetCanAfford(false);
                allgood = false;
            }
        
            if (allgood) {
                SetCanAfford(true);
            }

        }

        ActionHandler('#buyoneform', BuyOne, startTransition);

    }

    const deleteoraddtocart = function (e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();
        e.stopPropagation();

        ActionHandler('#addcart', IsView ? DeleteCardAction : AddToCartAction, startTransition);

    }

    useEffect(() => {

        const ownerinput = document.querySelector('#owner') as HTMLInputElement;
        const emailinput = document.querySelector('#email') as HTMLInputElement;
        const fundsinput = document.querySelector('#funds') as HTMLInputElement;
        const IsViewinput = document.querySelector('#IsView') as HTMLInputElement;

        ownerinput.value = owner;
        emailinput.value = email;
        fundsinput.value = funds.toString();
        IsViewinput.value = IsView.toString();

      },[IsView]);

  return (
    <>

        {isPending && <LoadingAction/>}

        <div className='h-10 w-full flex flex-col justify-center relative'>
                
            <form id='buyoneform' onSubmit={(e) => buyone(e)} className='whitespace-nowrap h-full w-10/12 flex items-center justify-center'>

                <Button type='submit' className='rounded-tr-none rounded-br-none text-lg w-full h-full'>{IsView ? 'Edit price' : 'Buy now'}</Button>

                <input type="text" hidden id='cardid' name='cardid' defaultValue={id}/>
                <input type="text" hidden id='price' name='price' defaultValue={price}/>
                <input type="text" hidden id='owner' name='owner' defaultValue={owner}/>
                <input type="text" hidden id='email' name='email' defaultValue={email}/>
                <input type="text" hidden id='funds' name='funds' defaultValue={funds.toString()}/>
                <input type="text" hidden id='IsView' name='IsView' defaultValue={IsView.toString()}/>
                <input type="text" hidden id='params' name='params' defaultValue={params.toString()}/>

            </form>

            <form id='addcart' className='hover: cursor-pointer border-l-[0.1rem] absolute right-0 h-full w-2/12 flex items-center justify-center' onSubmit={(e) => deleteoraddtocart(e)}>
                <Button className='w-full flex justify-center items-center rounded-tl-none rounded-bl-none' type='submit'>
                {IsView ? <Trash2/> : <ShoppingCart/>}
                </Button>
                <input type="text" hidden defaultValue={email} name='userid'/>
                <input type="text" hidden defaultValue={id} name='cardid'/>
            </form>

        </div>

        <p className='text-red-500 font-semibold w-full text-center mt-2' style={{display: CanAfford ? 'none' : ''}}>Not Enough Funds</p>
    
    </>
  )
}

export default BuyNow