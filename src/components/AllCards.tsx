import React from 'react'
import Card from './Card';
import { ReadAllCards, FilterCardsByTitle } from '@/lib/prisma'
import { Card_Type } from '../lib/types';

interface Search {
  search:string;
}

const AllCards = async ({search}:Search) => {

  let cards;

  if (search === '') {
    cards = await ReadAllCards();
  } else {
    cards = await FilterCardsByTitle(search);
  }

  return (
    <div className='flex flex-wrap justify-center gap-10 custom:max-w-[1800px] w-full px-4'>
      {cards?.map((card:Card_Type) => <Card key={card.id} id={card.id} userid={card.userid} title={card.title} price={card.price} image={card.image} owner={card.owner}/>)}
    </div>
  )
}

export default AllCards