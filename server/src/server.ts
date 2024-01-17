import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const server = fastify()
const prisma = new PrismaClient()

server.get('/users', async () => {
  const users = await prisma.user.findMany()
  return users
})

server.listen({
  port: 3333,
}).then(() => {
  console.log('👍Server is running on http://localhost:3333')
})