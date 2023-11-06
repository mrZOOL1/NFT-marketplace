'use client';
import React from 'react';
import {signOut} from 'next-auth/react';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

const SignOut = () => {
  return (
    <Button className='flex gap-2' variant="secondary" onClick={() => signOut({ callbackUrl: '/' })}>
      <LogOut/>Sign Out
    </Button>
  )
}

export default SignOut