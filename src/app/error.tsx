'use client';
 
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button' ;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className='flex flex-col gap-6 items-center justify-center min-h-[calc(100vh-5rem)]'>

      <h1 className='font-semibold text-2xl'>Something went wrong!</h1>
      <Button onClick={() => reset()}>Try again</Button>

    </div>
  )
}