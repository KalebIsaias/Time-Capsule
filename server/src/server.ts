import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

const server = fastify()

server.register(cors, {
  origin: true,
})
server.register(jwt, {
  secret: 'spacetime',
})

server.register(authRoutes)
server.register(memoriesRoutes)

server.listen({
  port: 3333,
}).then(() => {
  console.log('👍Server is running on http://localhost:3333')
})