import React from 'react'
import Image from 'next/image'
import { GetCardById,GetLikesById, IsLiked, GetFunds } from '@/lib/prisma'
import BuyNow from '@/components/BuyNow'
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
  const mycard = card!.userid === session.user!.email!;
  const num = await GetLikesById(params.id);
  const isliked = await IsLiked(params.id,session.user!.email!);
  const message = mycard ? 'you' : (card?.owner ? card.owner : 'Unknown') ;
  const funds = await GetFunds(session.user!.email!);

  return (
    <main className='flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] py-4 gap-4'>

      <div className='flex flex-col items-center'>
        <h1 className='font-semibold text-4xl text-center break-all'>{card?.title}</h1>
        <p className='text-center break-all'>Owned by {message}</p>
      </div>

      <div className=' rounded-[0.5rem] w-[min(500px,90%)] bg-accent glow'>
        
        <LikeButton cardid={params.id} isliked={isliked} email={session.user!.email!} likes={num}/>

        <Image src='/images/blank.png' alt='nft' width={500} height={500} className='rounded-bl-[0.5rem] rounded-br-[0.5rem]'/>

      </div>

      <div className='bg-accent rounded-[0.5rem] p-3 flex flex-col items-center gap-1 w-[min(500px,90%)] glow'>

        <div className='flex flex-col w-full items-start'>
          <p className='text-sm text-muted-foreground'>Current Price</p>
          <p className='text-2xl font-semibold'>{card?.price} ETH</p>
        </div>

        <BuyNow id={params.id} mycard={mycard} owner={card?.owner ? card.owner : 'Unknown'} email={session.user!.email!} price={card!.price} funds={funds ? parseFloat(funds) : 0}/>

      </div>

    </main>
  )
}

export default page