import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card_Type } from '@/lib/types'

const Card = ({id, title, price, image}: Card_Type) => {

  let newtitle = title;
  if (newtitle.length > 23) {
    newtitle = newtitle.slice(0, 23)+'...';
  }

  return (
    <div className='card cardbg relative rounded-[10px] shadow-lg hover:shadow-lg hover:-translate-y-2 transition-all w-full sm:w-[275px] '>
      
      <Link href={`/${id}`}>

        <Image className='rounded-tr-[8px] rounded-tl-[8px] w-full' src='/images/blank.png' alt='nft image' width={500} height={500}/>

        <div className='flex flex-col justify-center -translate-y-4 w-full p-2 rounded-br-[8px] rounded-bl-[8px] h-24'>
          <p className='text-lg overflow-hidden whitespace-nowrap'>{newtitle}</p>
          <p className='text-sm'>{`${price} ETH`}</p>
        </div>

      </Link>

    </div>
  )
}

export default Card