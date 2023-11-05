import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card_Type } from '@/lib/types'

import BuyNow from './BuyNow'

const Card = ({id, userid, title, price, image, owner}: Card_Type) => {

  let newtitle = title;
  if (newtitle.length > 23) {
    newtitle = newtitle.slice(0, 23)+'...';
  }

  const mycard = userid === 'UBoUrTX5alLmJCZS5TLf';

  return (
    <div className='card cardbg relative rounded-[10px] shadow-lg hover:shadow-lg hover:-translate-y-2 transition-all w-full sm:w-[275px] '>
      
      <Link href={`/${id}`}>

        <Image className='rounded-tr-[8px] rounded-tl-[8px] w-full' src='/images/blank.png' alt='nft image' width={100} height={100}/>

        <div className='flex flex-col justify-center -translate-y-4 w-full p-2 rounded-br-[8px] rounded-bl-[8px] h-24'>
          <p className='text-lg overflow-hidden'>{newtitle}</p>
          <p className='text-sm'>{`${price} ETH`}</p>
        </div>

      </Link>

      <div className='h-8 absolute w-full bottom-0 items-center justify-start flex'>
        <BuyNow id={id} mycard={mycard}/>
      </div>

    </div>
  )
}

export default Card