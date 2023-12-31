import React from 'react'
import Card from '@/components/Card';
import { FilterCardsByUserId, FilterCardsByUserIdAndTitle } from '@/lib/prisma'
import { Card_Type } from '@/lib/types';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import {options} from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

const page = async ({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) => {

  const session = await getServerSession(options);
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/');
  }
  if (session.user?.email === (null || undefined)) {
    redirect('/api/auth/signin?callbackUrl=/');
  }

  const search = searchParams?.search || '';
  let cards;

  if (search === '') {
    cards = await FilterCardsByUserId(session.user!.email!);
  } else {
    cards = await FilterCardsByUserIdAndTitle(session.user!.email!,search);
  }

  const length = cards.length;
  let text;
  if (length === 0) {
    text = 'No NFTs found'
  } else if (length === 1) {
    text = 'Your NFT'
  } else {
    text = 'Your NFTs'
  }

  return (
    <main className='flex flex-col items-center min-h-[calc(100vh-5rem)] pb-4'>

      <SearchBar/>

      <div className="flex flex-col items-center">

        <h1 className="text-3xl font-semibold leading-[22px] mt-4 mb-8">{text}</h1>  
        {text === 'No NFTs found' && <Link href='/create'><Button variant="secondary">Create one here</Button></Link>}
        <div className='flex flex-wrap justify-center gap-10 sm:max-w-[1800px] w-screen px-5'>
          {cards?.map((card:Card_Type) => <Card key={card.id} id={card.id} userid={card.userid} title={card.title} price={card.price} owner={card.owner} email={session.user!.email!}/>)}
        </div>

      </div>

    </main>
  )
}

export default page