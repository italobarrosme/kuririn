'use server'

export const getPayments = async () => {
  let payments = []
  try {
    const response = await fetch('http://localhost:3002/api/payments', {
      next: {
        tags: ['payments'],
      },
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    payments = await response.json()

    return payments.reverse()
  } catch (error) {
    console.error('Error fetching payments:', error)
  }
}
