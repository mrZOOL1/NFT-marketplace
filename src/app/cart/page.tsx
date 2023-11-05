import React from 'react'
import { ReadCart, GetCardsFromCartitems } from '@/lib/prisma'
import Cart from '@/components/Cart';

const page = async () => {

  const cartitems = await ReadCart('UBoUrTX5alLmJCZS5TLf');
  const allcards = await GetCardsFromCartitems(cartitems);
  const IsEmpty = cartitems.length === 0;

  return (
    <div className='flex flex-col items-center p-4'>

      <h1 style={{display: IsEmpty ? '' : 'none'}} className='font-semibold text-2xl'>Your shopping cart is empty</h1>

      <div style={{display: IsEmpty ? 'none' : ''}} className='w-[min(100%,1200px)]  flex justify-center gap-4'>
        <Cart allcards={allcards}/>
      </div>

    </div>

  )
}

export default page