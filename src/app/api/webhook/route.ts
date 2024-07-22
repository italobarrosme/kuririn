import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

import io from 'socket.io-client'

const socket = io('http://localhost:8080')

export async function POST(req: Request) {
  const body = await req.json()

  socket.emit('signal', body)

  try {
    revalidateTag('payments')

    return NextResponse.json(
      {
        message: 'Webhook received successfully',
        data: body,
      },
      {
        status: 200,
      }
    )
  } catch (error: any) {
    console.error('Error receiving webhook:', error)

    return NextResponse.json(
      {
        message: 'Error receiving webhook',
      },
      {
        status: 400,
      }
    )
  }
}
