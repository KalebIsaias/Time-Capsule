import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function memoriesRoutes(server: FastifyInstance){
  server.addHook('preHandler', async (req) => {
    await req.jwtVerify()
  })

  server.get('/memories', async (req) => {
    const memories = await prisma.memory.findMany({
      where: {
        userId: req.user.sub,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return memories.map(memory => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...'),
      }
    })
  })
  server.get('/memories/:id', async (req, rep) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const memory = await prisma.memory.findFirstOrThrow({
      where: {
        id,
      },
    })

    if (!memory.isPublic && memory.userId !== req.user.sub){
      return rep.status(401).send()
    }

    return memory
  })
  server.post('/memories', async (req) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = bodySchema.parse(req.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: req.user.sub,
      },
    })
    
    return memory
  })
  server.put('/memories/:id', async (req, rep) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })
    
    const { id } = paramsSchema.parse(req.params)
    const { content, coverUrl, isPublic } = bodySchema.parse(req.body)

    let memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      }
    })

    if (memory.userId !== req.user.sub) {
      return rep.status(401).send()
    }
    
    memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })
    
    return memory
  })
  server.delete('/memories/:id', async (req, rep) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: {
        id,
      }
    })

    if (memory.userId !== req.user.sub) {
      return rep.status(401).send()
    }

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}