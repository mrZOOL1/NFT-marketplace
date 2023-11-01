'use client'

import React from 'react'
import Image from 'next/image'
import { ShoppingCart,Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Card_Type } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { AddToCartAction,DeleteCardAction } from '@/lib/actions'
import { usePathname } from 'next/navigation'

const Card = ({id, userid, title, price, image}: Card_Type) => {

  const router = useRouter();
  const path = usePathname();
  const IsProfile = path === '/profile'
  
  return (
    <div className='w-[11.25rem] h-[12.5rem] onecard:w-72 onecard:h-80 card cardbg relative rounded-[10px] shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all'>
      
      <Link href={`/${id}`} className=''>

        <Image className='rounded-tr-[8px] rounded-tl-[8px] h-2/3 w-full' src='/images/blank.png' alt='nft image' width={100} height={100}/>

        <div className='flex flex-col w-full px-2 pt-2 h-1/3 rounded-br-[8px] rounded-bl-[8px]'>
          <p className='text-lg'>{title}</p>
          <p className='text-sm'>{`${price} ETH`}</p>
        </div>

      </Link>

      <div className='h-8 absolute w-full bottom-0 items-center justify-start flex'>

        <Link href={IsProfile ? `/${id}` : `/checkout/${id}`} className='purple text-white whitespace-nowrap h-full w-10/12 rounded-bl-[8px] flex items-center justify-center' onClick={() => router.push(`/checkout/${id}`)}>
          <p className='text-white'>{IsProfile ? 'View' : 'Buy now'}</p>
        </Link>

        <form id='addcart' action={IsProfile ? DeleteCardAction : AddToCartAction} className='hover: cursor-pointer border-l-[0.1rem] purple absolute right-0 h-full w-2/12 flex items-center justify-center rounded-br-[8px]'>
          <button className='w-full flex justify-center items-center' type='submit' form='addcart'>
            {IsProfile ? <Trash2 color="white" className='w-2/12 scale-[2.5]'/> : <ShoppingCart color="white" className='w-2/12 scale-[2.5]'/>}
          </button>
          <input type="text" hidden defaultValue='user2' name='userid'/>
          <input type="text" hidden defaultValue={id} name='cardid'/>
        </form>
        
      </div>

    </div>
  )
}

export default Card