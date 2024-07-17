'use client'

import { ToastifyProvider } from '@coqueirodigital/react-components'
import { ReactNode } from 'react'

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <ToastifyProvider />
    </>
  )
}
