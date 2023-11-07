import React from 'react'
import { Wallet2, Image } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-5rem)] gap-6'>
        
        <Link href='/profile/wallet' className='flex flex-col items-center gap-2'>

            <p className='font-semibold text-xl'>Wallet</p>

            <Button variant='secondary' className='bg-gray-200 rounded-[12px] w-28 h-28 flex items-center justify-center shadow2'>
                <Wallet2 size={60}/>
            </Button>

        </Link>


        <Link href='/profile/nfts' className='flex flex-col items-center gap-2'>

            <p className='font-semibold text-xl'>NFTs</p>

            <Button variant='secondary' className='bg-gray-200 rounded-[12px] w-28 h-28 flex items-center justify-center shadow2'>
                <Image size={60}/>
            </Button>

        </Link>

    </div>
  )
}

export default page