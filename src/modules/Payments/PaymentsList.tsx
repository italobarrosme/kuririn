'use client'

import { Payment } from './types'
import { Text } from '@coqueirodigital/react-components'
import { useCallback, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { getPayments } from './service'

const socket = io('http://localhost:8080')

export const PaymentsList = () => {
  const [payments, setPayments] = useState<Payment[]>([])

  const handleGetPayments = useCallback(async () => {
    const response = await getPayments()

    if (response) {
      setPayments(response)
    }
  }, [])

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket server')
    })

    socket.on('signal', (data) => {
      console.log('Signal received in client:', data)
      handleGetPayments()
    })

    handleGetPayments()

    return () => {
      socket.off('connect')
      socket.off('signal')
    }
  }, [handleGetPayments])

  if (!payments.length) {
    return <Text tag="h1">Nenhum pagamento a confirmar</Text>
  }

  return (
    <div className="flex w-full flex-col gap-8 rounded-lg border border-gray-200 bg-[#FFF8E5] p-8 shadow-md">
      <Text tag="h1" variant="sm/bold" className="text-neutral-black">
        Pagamentos a confirmar
      </Text>
      <table className="w-full border-collapse text-neutral-black">
        <thead>
          <tr>
            <th className="border-b border-gray-200">CPF</th>
            <th className="border-b border-gray-200">Nome</th>
            <th className="border-b border-gray-200">Valor</th>
            <th className="border-b border-gray-200">Data</th>
            <th className="border-b border-gray-200">Código</th>
            <th className="border-b border-gray-200">Meio de Pagamento</th>
            <th className="border-b border-gray-200">Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b border-gray-200">
              <td className="p-4">{payment.cpf}</td>
              <td className="p-4">{payment.name}</td>
              <td className="p-4">{payment.amount}</td>
              <td className="p-4">{payment.date}</td>
              <td className="p-4">{payment.code}</td>
              <td className="p-4">{payment.paymentMethod}</td>
              <td className="p-4">
                <button className="rounded bg-green-500 p-2 text-white">
                  {payment.details}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
