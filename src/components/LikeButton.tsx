'use client';

import React, {useState} from 'react'
import Image from 'next/image';
import { ToggleLikeAction } from '@/lib/actions';

interface props {
  cardid: string;
  isliked: boolean;
  email: string;
}

const LikeButton = ({cardid, isliked, email}:props) => {
  const [IsLiked, SetIsLiked] = useState(isliked);

  const SubmitHandler = function (e:React.FormEvent<HTMLFormElement>) {
    SetIsLiked(old => !old);
  }

  return (
    <form action={ToggleLikeAction} className='w-[26px] h-[26px]' onSubmit={(e) => SubmitHandler(e)}>
      <button type='submit'>
        {IsLiked ? <Image src='/images/filled-heart.svg' alt='red heart' width={26} height={26}/> : <Image src='/images/heart.svg' alt='heart' width={26} height={26}/>}
      </button>
      <input type="text" hidden defaultValue={email} name='userid'/>
      <input type="text" hidden defaultValue={cardid} name='cardid'/>
      <input type="text" hidden defaultValue={IsLiked.toString()} name='isliked'/>
    </form>
  )
}

export default LikeButton