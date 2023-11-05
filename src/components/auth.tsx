'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import {signOut} from 'next-auth/react'
import Image from 'next/image'

interface props {
  page: string;
}

export const SignInButton = ({page}:props) => {

    const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push(`/api/auth/signin?callbackUrl=/${page}`)}>Sign In</button>
    </div>
  )
}

export const SignOutButton = () => {

  return (
    <div>
        <button onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</button>
    </div>
  )
}

type User = {
  image?: string | null | undefined;
} | undefined

type Props = {
  user: User,
}

export const ProfileImage = ({user}: Props) => {

  return (
    <div>
      {user?.image && <Image src={user.image ? user.image : 'profile.png'} width={50} height={50} alt='profile photo'/>}
    </div>     
  )
}





// import { getServerSession } from 'next-auth';
// import {options} from '../api/auth/[...nextauth]/options'
// import { redirect } from 'next/navigation';

// const page = async () => {

//   const session = await getServerSession(options);
// if (!session) {
//     redirect('/api/auth/signin?callbackUrl=/');
//   }