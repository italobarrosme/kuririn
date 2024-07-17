import '@/styles/globals.css'

import { ReactNode } from 'react'
import { Metadata } from 'next'
import { ToastProvider } from '@/providers/toast'

type Props = {
  children?: ReactNode
}

export const metadata: Metadata = {
  title: 'Next.js Nezuko - Boilerplate',
  description: 'Next.js  Nezuko - Boilerplate',
  manifest: '/manifest.json',
  icons: {
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-neutral-dark bg-effect-granula p-4">
        <ToastProvider>
          <main>{children}</main>
        </ToastProvider>
      </body>
    </html>
  )
}
