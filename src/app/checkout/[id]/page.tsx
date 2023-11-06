import React from 'react'
import { getServerSession } from 'next-auth';
import {options} from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';

const page = () => {

  return (
    <div>page</div>
  )
}

export default page