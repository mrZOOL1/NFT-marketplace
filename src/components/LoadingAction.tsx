import React from 'react'

const LoadingAction = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-2 w-screen h-screen absolute'>
        <h1 className='text-4xl font-semibold text-center text-primary'>The page is loading</h1>
        <h2 className='text-xl font-semibold text-center'>Thank you for your patience</h2>
    </div>
  )
}

export default LoadingAction