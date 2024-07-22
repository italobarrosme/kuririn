import { Server } from 'socket.io'

const io = new Server(8080, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

let clients: Array<any> = []

io.on('connection', (socket) => {
  console.log('Client connected to socket.io')
  clients.push(socket)

  socket.on('signal', (data) => {
    console.log('Signal received on server:', data)
    io.emit('signal', data)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
    clients = clients.filter((client) => client !== socket)
  })
})

export function broadcast(data: any) {
  clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(data))
    }
  })
}
