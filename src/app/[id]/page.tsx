import React from 'react'
import Image from 'next/image'
import { GetCardById,GetLikesById, IsLiked } from '@/lib/prisma'
import LikeButton from '@/components/LikeButton'
import OpenedBuyNow from '@/components/OpenedBuyNow'

const page = async ({ params }: { params: { id: string } }) => {

  const card = await GetCardById(params.id);
  const mycard = card?.userid === 'UBoUrTX5alLmJCZS5TLf';
  //get userid with authentication
  //get userid with authentication
  //get userid with authentication
  //get userid with authentication
  //get userid with authentication
  //get userid with authentication
  //get userid with authentication
  //get userid with authentication
  //get userid with authentication
  //get userid with authentication
  //get userid with authentication
  //get userid with authentication
  //get userid with authentication
  //get userid with authentication
  //get userid with authentication
  //get userid with authentication
  const num = await GetLikesById(params.id);
  const isliked = await IsLiked(params.id,'UBoUrTX5alLmJCZS5TLf');

  return (
    <main className='flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] py-4'>

      <div className='flex flex-col items-center mb-4'>
        <h1 className='font-semibold text-4xl text-center'>{card?.title}</h1>
        <p className='text-center'>Owned by {card?.owner}</p>
      </div>

      <div className='border-2 rounded-[12px] w-[min(500px,90%)]'>
        
        <div className='flex gap-1 items-center justify-start p-2 cardbg rounded-tl-[10px] rounded-tr-[10px]'>
          <LikeButton cardid={params.id} isliked={isliked}/>
          <p className='text-lg font-semibold'>{num}</p>
        </div>

        <Image src='/images/blank.png' alt='nft' width={500} height={500} className='rounded-bl-[10px] rounded-br-[10px]'/>

      </div>

      <div className='bg-gray-200 rounded-[12px] mt-2 p-3 flex flex-col items-center gap-1 w-[min(500px,90%)]'>

        <div className='flex flex-col w-full items-start'>
          <p className='text-gray-600 text-sm'>Current Price</p>
          <p className='text-2xl font-semibold'>{card?.price} ETH</p>
        </div>

        <div className='h-10 w-full items-center justify-start flex relative'>
          <OpenedBuyNow id={params.id} mycard={mycard}/>
        </div>

      </div>

    </main>
  )
}

export default page