import React from 'react'
import { Wallet2, Image } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getServerSession } from 'next-auth';
import {options} from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation';
import ThemeButton from '@/components/ThemeButton';

const page = async () => {

    const session = await getServerSession(options);
    if (!session) {
      redirect('/api/auth/signin?callbackUrl=/');
    }
    if (session.user?.email === (null || undefined)) {
      redirect('/api/auth/signin?callbackUrl=/');
    }

  return (
    <div className='flex flex-col gap-6 items-center justify-center min-h-[calc(100vh-5rem)]'>

      <div className='flex items-center justify-center gap-6'>

        <Link href='/profile/wallet' className='flex flex-col items-center gap-1'>

          <p className='font-semibold text-xl'>Wallet</p>
          <Button variant='secondary' className='transition-all rounded-[12px] w-28 h-28 flex items-center justify-center glow'>
            <Wallet2 size={50}/>
          </Button>

        </Link>


        <Link href='/profile/nfts' className='flex flex-col items-center gap-1'>

          <p className='font-semibold text-xl'>NFTs</p>
          <Button variant='secondary' className='transition-all rounded-[12px] w-28 h-28 flex items-center justify-center glow'>
            <Image size={50}/>
          </Button>

        </Link>

      </div>

      <div className='flex flex-col items-center justify-center gap-1'>

        <p className='font-semibold text-xl'>Theme</p>
        <ThemeButton/>

      </div>

    </div>
  )
}

export default page