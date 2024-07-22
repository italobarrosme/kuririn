'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold text-red-600">Algo deu errado!</h2>
      <p className="mb-4 text-neutral-white">
        Não foi possível carregar os pagamentos. Por favor, tente novamente.
      </p>
      <button
        onClick={() => reset()}
        className="rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
      >
        Tentar novamente
      </button>
    </div>
  )
}
