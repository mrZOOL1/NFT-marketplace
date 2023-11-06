import React from 'react'
import Image from 'next/image'
import { GetCardById,GetLikesById, IsLiked } from '@/lib/prisma'
import OpenedBuyNow from '@/components/OpenedBuyNow'
import { getServerSession } from 'next-auth';
import {options} from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation';
import LikeButton from '@/components/LikeButton';

const page = async ({ params }: { params: { id: string } }) => {

  const session = await getServerSession(options);
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/');
  }
  if (session.user?.email === (null || undefined)) {
    redirect('/api/auth/signin?callbackUrl=/');
  }

  const card = await GetCardById(params.id);
  const mycard = card?.userid === session.user!.email!;
  const num = await GetLikesById(params.id);
  const isliked = await IsLiked(params.id,session.user!.email!);

  return (
    <main className='flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] py-4'>

      <div className='flex flex-col items-center mb-4'>
        <h1 className='font-semibold text-4xl text-center'>{card?.title}</h1>
        <p className='text-center'>Owned by {card?.owner}</p>
      </div>

      <div className=' rounded-[12px] w-[min(500px,90%)] shadow2'>
        
        <LikeButton cardid={params.id} isliked={isliked} email={session.user!.email!} likes={num}/>

        <Image src='/images/blank.png' alt='nft' width={500} height={500} className='rounded-bl-[10px] rounded-br-[10px]'/>

      </div>

      <div className='bg-gray-100 rounded-[12px] mt-2 p-3 flex flex-col items-center gap-1 w-[min(500px,90%)] shadow2'>

        <div className='flex flex-col w-full items-start'>
          <p className='text-gray-600 text-sm'>Current Price</p>
          <p className='text-2xl font-semibold'>{card?.price} ETH</p>
        </div>

        <div className='h-10 w-full items-center justify-start flex relative'>
          <OpenedBuyNow id={params.id} mycard={mycard} email={session.user!.email!}/>
        </div>

      </div>

    </main>
  )
}

export default page