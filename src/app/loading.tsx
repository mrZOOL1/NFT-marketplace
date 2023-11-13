import React from 'react'

const loading = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] gap-2'>
      <h1 className='text-4xl font-semibold text-center text-primary'>The page is loading</h1>
      <h2 className='text-xl font-semibold text-center'>Thank you for your patience</h2>
    </div>
  )
}

export default loading