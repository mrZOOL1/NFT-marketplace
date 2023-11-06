'use client';
import React from 'react';
import {signOut} from 'next-auth/react';
import Link from 'next/link';

const SignOutMobile = () => {
  return (
    <Link href='/' onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</Link>
  )
}

export default SignOutMobile