import React from 'react'
import { ReadCart, GetCardsFromCartitems, GetFunds } from '@/lib/prisma'
import Cart from '@/components/Cart';
import { getServerSession } from 'next-auth';
import {options} from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation';

const page = async () => {

  const session = await getServerSession(options);
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/');
  }
  if (session.user?.email === (null || undefined)) {
    redirect('/api/auth/signin?callbackUrl=/');
  }

  const cartitems = await ReadCart(session.user!.email!);
  const allcards = await GetCardsFromCartitems(cartitems);
  const funds = await GetFunds(session.user!.email!);
  const IsEmpty = cartitems.length === 0;

  return (
    <div className='flex flex-col items-center p-4'>

      <h1 style={{display: IsEmpty ? '' : 'none'}} className='font-semibold text-3xl mt-4'>Your shopping cart is empty</h1>

      <div style={{display: IsEmpty ? 'none' : ''}} className='w-[min(100%,1200px)] flex justify-center gap-4'>
        <Cart allcards={allcards} email={session.user!.email!} name={session.user.name ? session.user.name : 'Unknown'} funds={funds}/>
      </div>

    </div>
  )
}

export default page