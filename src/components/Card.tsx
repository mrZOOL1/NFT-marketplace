import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card_Type } from '@/lib/types'

const Card = ({id, title, price}: Card_Type) => {

  let newtitle = title;
  if (newtitle.length > 23) {
    newtitle = newtitle.slice(0, 23)+'...';
  }

  return (
    <div className='card cardbg relative rounded-[0.5rem] glow hover:-translate-y-2 transition-all w-full sm:w-[275px] bg-accent'>
      
      <Link href={`/${id}`}>

        <Image className='rounded-tr-[0.5rem] rounded-tl-[0.5rem] w-full' src='/images/blank.png' alt='nft image' width={500} height={500}/>

        <div className='flex flex-col justify-center w-full p-2 py-4 rounded-br-[0.5rem] rounded-bl-[0.5rem]'>
          <p className='text-lg overflow-hidden whitespace-nowrap'>{newtitle}</p>
          <p className='text-sm'>{`${price} ETH`}</p>
        </div>

      </Link>

    </div>
  )
}

export default Card