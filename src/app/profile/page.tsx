import React from 'react'
import Card from '@/components/Card';
import { FilterCardsByUserId, FilterCardsByUserIdAndTitle } from '@/lib/prisma'
import { Card_Type } from '@/lib/types';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';

const page = async ({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) => {

  const search = searchParams?.search || '';
  let cards;

  if (search === '') {
    cards = await FilterCardsByUserId('UBoUrTX5alLmJCZS5TLf');
  } else {
    cards = await FilterCardsByUserIdAndTitle('UBoUrTX5alLmJCZS5TLf',search);
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
        {text === 'No NFTs found' && <Link href='/create' className='bg-gray-200 p-2 rounded-lg'>Create one here</Link>}
        <div className='flex flex-wrap justify-center gap-10 sm:max-w-[1800px] w-screen px-5'>
          {cards?.map((card:Card_Type) => <Card key={card.id} id={card.id} userid={card.userid} title={card.title} price={card.price} image={card.image} owner={card.owner}/>)}
        </div>

      </div>
    </main>
  )
}

export default page