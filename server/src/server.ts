import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'

const server = fastify()

server.register(cors, {
  origin: true,
})
server.register(memoriesRoutes)

server.listen({
  port: 3333,
}).then(() => {
  console.log('👍Server is running on http://localhost:3333')
})