import express from 'express'
import crypto from 'crypto'
import cors from 'cors'

const app = express()
const port = 3002

const endpointSecret = 'your_endpoint_secret'

// ARRAY QUE SIMULA OS PAGAMENTOS PERSISTIDOS
const payments = [
  {
    id: '1',
    cpf: '045.***.***-39',
    name: 'User 1',
    amount: 'R$ 40,00',
    date: '06/06/2024 18:12:27',
    code: '79856917298',
    paymentMethod: 'Dinheiro',
    details: 'Revisar pagamento',
  },
]

app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

// ENDPOINT QUE RETORNA OS PAGAMENTOS
app.get('/api/payments', (req, res) => {
  res.status(200).json(payments)
})

// ENDPOINT QUE RECEBE O PAGAMENTO E NOTIFICA O FRONTEND
app.post('/api/paymentsWebhook', (req, res) => {
  const sig = req.headers['x-signature']

  const hash = crypto
    .createHmac('sha256', endpointSecret)
    .update(JSON.stringify(req.body))
    .digest('hex')

  if (hash !== sig) {
    console.error('Signature mismatch')
    return res.sendStatus(400)
  }

  const newPayment = req.body
  payments.push(newPayment)

  fetch('http://localhost:3000/api/webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPayment),
  })
    .then((response) => response.json())
    .then((data) => console.log('Notified Next.js:', data))
    .catch((error) => console.error('Error notifying Next.js:', error))

  res
    .status(200)
    .json({ message: 'Webhook received successfully', data: newPayment })

  console.log('Webhook received and new payment added:', newPayment)
})

// FUNCAO QUE SIMULA PAGAMENTOS ENTRANDO E CHAMA O ENDPOINT WEBHOOK
const generatePayment = () => {
  const newPayment = {
    id: (payments.length + 1).toString(),
    cpf: '999.***.***-99',
    name: `User ${payments.length + 1}`,
    amount: `R$ ${(Math.random() * 100).toFixed(2)}`,
    date: new Date().toLocaleString(),
    code: (Math.random() * 1000000000000).toFixed(0),
    paymentMethod: ['Dinheiro', 'Cartão', 'Pix', 'Transferência'][
      Math.floor(Math.random() * 4)
    ],
    details: 'Revisar pagamento',
  }

  const sig = crypto
    .createHmac('sha256', endpointSecret)
    .update(JSON.stringify(newPayment))
    .digest('hex')

  fetch('http://localhost:3002/api/paymentsWebhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-signature': sig,
    },
    body: JSON.stringify(newPayment),
  })
    .then((response) => response.json())
    .then((data) => console.log('Webhook simulated:', data))
    .catch((error) => console.error('Error simulating webhook:', error))

  console.log('New payment added:', newPayment)
}

setInterval(generatePayment, 20 * 1000)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
