'use client'

import { cn } from '@/utils'
import { Button, Text } from '@coqueirodigital/react-components'
import { useState } from 'react'

export const SendWebhookButton = () => {
  const [loading, setLoading] = useState(false)
  const [responseInfo, setResponseInfo] = useState({
    message: '',
    status: '',
  })

  const sendWebhook = async () => {
    setLoading(true)
    setResponseInfo({
      message: '',
      status: '',
    })

    try {
      const response = await fetch('/api/send-webhook', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to send webhook')
      }

      const data = await response.json()
      setResponseInfo({
        message: data.message,
        status: 'success',
      })
    } catch (error) {
      setResponseInfo({
        message: (error as Error).message,
        status: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Button variant="fit/outline" onClick={sendWebhook} disabled={loading}>
        {loading ? 'Sending...' : 'Send Webhook'}
      </Button>
      {responseInfo && (
        <div
          className={cn('absolute right-5 top-5 rounded-md  p-4', {
            'border border-primary-regular bg-green-500 text-neutral-black':
              responseInfo.status === 'success',
            'border border-error bg-red-500 text-neutral-black':
              responseInfo.status === 'error',
          })}
        >
          <Text
            tag="p"
            variant="2xl/bold"
            className={cn('text-primary-regular')}
          >
            {responseInfo.message}
          </Text>
        </div>
      )}
    </div>
  )
}
