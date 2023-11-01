import React from 'react'
import Card from '@/components/Card';
import { FilterCardsByUserId, FilterCardsByUserIdAndTitle } from '@/lib/prisma'
import { Card_Type } from '@/lib/types';
import SearchBar from '@/components/SearchBar'

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
    cards = await FilterCardsByUserId('4HZWSUTvWSViPqOIMWOVh');
  } else {
    cards = await FilterCardsByUserIdAndTitle('4HZWSUTvWSViPqOIMWOVh',search);
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
    <main className='flex flex-col items-center'>

      <SearchBar/>

      <div className="flex flex-col p-10 items-center">

        <h1 className="text-3xl font-semibold mb-4">{text}</h1>  
        <div className='flex flex-wrap gap-10 max-w-[1920px] justify-center'>
          {cards?.map((card:Card_Type) => <Card key={card.id} id={card.id} userid={card.userid} title={card.title} price={card.price} image={card.image}/>)}
        </div>

      </div>
    </main>
  )
}

export default page