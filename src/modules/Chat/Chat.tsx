'use client'

import { Button, InputText, Text } from '@coqueirodigital/react-components'

import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io('https://e6fb-143-208-128-125.ngrok-free.app')

type UserMessage = {
  user: string
  message: string
}

export const Chat = () => {
  const [messages, setMessages] = useState<UserMessage[]>([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const handlePreviousMessages = (messages: UserMessage[]) => {
      setMessages(messages)
    }

    const handleMessage = (userMessage: UserMessage) => {
      setMessages((prevMessages) => [...prevMessages, userMessage])
    }

    socket.on('previous messages', handlePreviousMessages)
    socket.on('chat message', handleMessage)

    // Limpa os eventos ao desmontar o componente
    return () => {
      socket.off('previous messages', handlePreviousMessages)
      socket.off('chat message', handleMessage)
    }
  }, [])

  const sendMessage = () => {
    console.log('Sending message:', newMessage)
    socket.emit('chat message', newMessage)
    setNewMessage('')
  }

  return (
    <div className="flex flex-col gap-4">
      <Text tag="h1" variant="2xl/bold" className="text-primary-regular">
        Chat
      </Text>
      <div>
        {}
        {messages.length === 0 && <div>No messages yet</div>}
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <InputText
        label="Message"
        value={newMessage}
        className="text-primary-regular"
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <Button variant="fit/regular" onClick={sendMessage}>
        Send
      </Button>
    </div>
  )
}
