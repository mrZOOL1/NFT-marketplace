import React from 'react'
import { Button } from './ui/button';
import { Separator } from "@/components/ui/separator"
import Image from 'next/image';
import { UserCircle2, Mail, ShoppingCart, Menu, LogOut, Heading1 } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CountCartItems } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import {options} from '@/app/api/auth/[...nextauth]/options'
import SignOut from './SignOut';
import SignOutMobile from './SignOutMobile';
import ThemeButton from './ThemeButton';

const Nav = async () => {

  const session = await getServerSession(options);
  const cartnum = await CountCartItems((session && session.user?.email) ? session.user.email : 'Unknown');

  return (
    <nav className='sticky top-0 z-10 flex items-center w-full justify-between p-4 glow bg-background'>

      <div className='flex items-center gap-2'>
        <Link href='/'>
          <Image src='/images/icon.png' alt='logo' width={40} height={40}/>
        </Link>

        <Separator orientation='vertical' className='h-10 bg-foreground'/>

        <Link href='/create' className='text-lg font-semibold hover:text-muted-foreground transition-all'>Create</Link>
      </div>

      <div className='hidden gap-2 sm:flex'>

        {session ? <SignOut/> :

          <Link href='/api/auth/signin?callbackUrl=/'>
            <Button className='flex gap-2' variant="secondary">
              <Mail/>Sign In
            </Button>
          </Link>

        }

        <Link href='/profile'>
          <Button variant="secondary" size='icon'>
            <UserCircle2 width={24} height={24}/>
          </Button>
        </Link>

        
        <Link href='/cart' className='relative'>

          <div className='absolute top-0 right-0 w-6 h-6 bg-primary rounded-full translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-white'>
            <p>{cartnum}</p>
          </div>

          <Button variant="secondary" size='icon'>
            <ShoppingCart width={24} height={24}/>
          </Button>

        </Link>

      </div>

      <div className='sm:hidden rounded-sm p-2 flex justify-center items-center'>
        <DropdownMenu>

          <DropdownMenuTrigger><Menu height={24} width={24}/></DropdownMenuTrigger>

          <DropdownMenuContent>

            <DropdownMenuItem><Link href='/profile'>Profile</Link></DropdownMenuItem>
    
            <DropdownMenuItem className='flex items-center'>
              <Link href='/cart'>
                Cart
                <div className='absolute top-1/2 -translate-y-1/2 right-0 w-6 h-6 bg-primary rounded-full -translate-x-1 flex justify-center items-center text-white'>
                  <p>{cartnum}</p>
                </div>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              {session ? <SignOutMobile/> : <Link href='/api/auth/signin?callbackUrl=/'>Sign In</Link>}
            </DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>
      </div>

    </nav>
  )
}

export default Nav