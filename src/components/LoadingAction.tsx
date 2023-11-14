import React from 'react'

const LoadingAction = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-[calc(100vh-5rem)] absolute top-0 left-0 translate-y-[5rem] bg-background z-40 overflow-hidden'>
      <span className="loader"></span>
    </div>
  )
}

export default LoadingAction