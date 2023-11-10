'use client';

import React from 'react'
import { Button } from './ui/button'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

const ThemeButton = () => {

    const {theme, setTheme} = useTheme();

    const handler = function (e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

  return (
    <form onSubmit={(e) => handler(e)}>
        <Button type='submit' variant='secondary' className='rounded-[12px] w-28 h-28 flex items-center justify-center glow transition-all'>
            {theme === 'light' ? <Sun size={50}/> : <Moon size={50}/>}
        </Button>
    </form>

  )
}

export default ThemeButton