import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Nav from '@/components/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NFT Hub',
  description: 'NFT Marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>

      <head>
        <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>"/>
      </head>

      <body className={`${inter.className} gradient min-h-screen`}>
        <Nav/>
        {children}
      </body>

    </html>
  )
}
