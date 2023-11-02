import React from 'react'
import { Button } from './ui/button';
import { Separator } from "@/components/ui/separator"
import Image from 'next/image';
import { UserCircle2, Mail, ShoppingCart, Menu } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CountCartItems } from '@/lib/prisma';

const Nav = async () => {

  const cartnum = await CountCartItems('user2');

  return (
    <nav className='sticky top-0 z-10 flex items-center w-full justify-between p-4 shadoww bg-[#424242]'>

      <div className='flex items-center gap-2'>
        <Link href='/'>
          <Image src='/images/icon.png' alt='logo' width={40} height={40}/>
        </Link>

        <Link href='/create' className='text-gray-100 text-lg font-semibold hover:text-gray-300 transition-all'>Create</Link>
      </div>

      <div className='hidden gap-2 sm:flex'>

        <Link href='/auth'>
          <Button className='flex gap-2' variant="secondary">
            <Mail/>
            <p>Signin/out</p>
          </Button>
        </Link>

        <Link href='/profile'>
          <Button variant="secondary" size='icon'>
            <UserCircle2 width={24} height={24}/>
          </Button>
        </Link>

        
        <Link href='/cart' className='relative'>

          <div className='absolute top-0 right-0 w-6 h-6 bg-[#b92ed1] rounded-full translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-white'>
            {cartnum}
          </div>

          <Button variant="secondary" size='icon'>
            <ShoppingCart width={24} height={24}/>
          </Button>

        </Link>

      </div>

      <div className='sm:hidden bg-gray-100 rounded-sm p-2 flex justify-center items-center'>
        <DropdownMenu>

          <DropdownMenuTrigger><Menu height={24} width={24}/></DropdownMenuTrigger>

          <DropdownMenuContent>

            <DropdownMenuItem><Link href='/profile'>Profile</Link></DropdownMenuItem>
    
            <DropdownMenuItem className='flex items-center'>
              <Link href='/cart'>
                Cart
                <div className='absolute top-1/2 -translate-y-1/2 right-0 w-6 h-6 bg-[#c043d6] rounded-full -translate-x-1 flex justify-center items-center text-white'>
                  {cartnum}
                </div>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem><Link href='/auth'>Signin/out</Link></DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>
      </div>



    </nav>
  )
}

export default Nav