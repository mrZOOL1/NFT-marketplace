'use client';

import React, {useState, useRef, useEffect} from 'react'
import Image from 'next/image';
import { ToggleLikeAction } from '@/lib/actions';

interface props {
  cardid: string;
  isliked: boolean;
  email: string;
  ChangeNum: (IsAdd: boolean) => void;
}

const Heart = ({cardid, isliked, email, ChangeNum}:props) => {
  const [IsLikedState, SetIsLikedState] = useState(isliked);
  const IsLiked = useRef(isliked);

  const SubmitHandler = function (e:React.FormEvent<HTMLFormElement>) {
    SetIsLikedState(old => !old);
    IsLiked.current = !IsLiked.current;
    ChangeNum(IsLiked.current);
  }

  useEffect(() => {
    const input = document.querySelector('#isliked') as HTMLInputElement;
    input.value = IsLiked.current.toString();
  },[IsLikedState]);

  return (
    <form action={ToggleLikeAction} className='w-[26px] h-[26px]' onSubmit={(e) => SubmitHandler(e)}>
      <button type='submit'>
        {IsLiked.current ? <Image src='/images/filled-heart.svg' alt='red heart' width={26} height={26}/> : <Image src='/images/heart.svg' alt='heart' width={26} height={26}/>}
      </button>
      <input type="text" hidden defaultValue={email} name='userid' id='userid'/>
      <input type="text" hidden defaultValue={cardid} name='cardid' id='cardid'/>
      <input type="text" hidden defaultValue={IsLiked.current.toString()} name='isliked' id='isliked'/>
    </form>
  )
}

export default Heart