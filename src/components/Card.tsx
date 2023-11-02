import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card_Type } from '@/lib/types'

import BuyNow from './BuyNow'

const Card = ({id, userid, title, price, image, owner}: Card_Type) => {

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
        <BuyNow id={id}/>
      </div>

    </div>
  )
}

export default Card