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
    <nav className='sticky top-0 z-10 flex items-center w-full justify-between p-4 bg-background'>

      <div className='flex items-center gap-2'>
        <Link href='/'>
          <Image src='/images/icon.png' alt='logo' width={40} height={40}/>
        </Link>

        <Separator orientation="vertical" className='h-10'/>

        <Link href='/create' className='text-lg font-semibold hover:text-[#b92ed1] transition-all'>Create</Link>
      </div>

      <div className='hidden gap-2 onecard:flex'>

        <Link href='/auth'>
          <Button className='flex gap-2' variant="secondary">
            <Mail/>
            <p>Signin/out</p>
          </Button>
        </Link>

        <Link href='/profile'>
          <Button variant="secondary">
            <UserCircle2/>
          </Button>
        </Link>

        
        <Link href='/cart' className='relative'>

          <div className='absolute top-0 right-0 w-6 h-6 bg-[#b92ed1] rounded-full translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-white'>
            {cartnum}
          </div>

          <Button variant="secondary">
            <ShoppingCart/>
          </Button>

        </Link>

      </div>

      <div className='inline onecard:hidden'>
        <DropdownMenu>

          <button><DropdownMenuTrigger><Menu/></DropdownMenuTrigger></button>

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