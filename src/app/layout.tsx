import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { ThemeProvider } from "@/components/ThemeProvider"
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Buy Hub',
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

      <body className={`${inter.className} gradient`} >
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>

          <div className='min-h-screen'>
            <Nav/>
            {children}
          </div>

          <Footer/>

        </ThemeProvider>
      </body>

    </html>
  )
}
