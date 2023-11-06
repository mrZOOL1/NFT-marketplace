'use client';

import React, { useState } from 'react'
import Heart from '@/components/Heart'

interface props {
    cardid: string;
    isliked: boolean;
    email: string;
    likes:number;
}

const LikeButton = ({cardid, isliked, email, likes}:props) => {

    const [Num, SetNum] = useState(likes);

    const ChangeNum = function (IsAdd:boolean) {
        if (IsAdd) {
            SetNum(old => old + 1);
        } else {
            SetNum(old => old - 1);         
        }
    }

  return (
    <div className='flex gap-1 items-center justify-start p-2 cardbg rounded-tl-[10px] rounded-tr-[10px]'>
        <Heart cardid={cardid} isliked={isliked} email={email} ChangeNum={ChangeNum}/>
        <p className='text-lg font-semibold'>{Num}</p>
    </div>
  )
}

export default LikeButton