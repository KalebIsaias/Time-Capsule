import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { FastifyInstance } from 'fastify'
import { createWriteStream } from 'node:fs'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'

const pump = promisify(pipeline)

export async function uploadRoutes(server: FastifyInstance) {
  server.post('/upload', async (req, rep) => {
    const upload = await req.file({
      limits: {
        fileSize: 1024 * 1024 * 5, //5MB
      }
    })

    if (!upload) {
      return rep.status(400).send()
    }

    const mimeType = /^(image|video)|\/[a-zA-Z]+/
    const isValidFileFormat = mimeType.test(upload.mimetype)

    if (!isValidFileFormat) {
      return rep.status(400).send()
    }

    const fileId = randomUUID()
    const extension = extname(upload.filename)
    const fileName = fileId.concat(extension)

    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads', fileName)
    )

    await pump(upload.file, writeStream)

    const fullUrl = req.protocol.concat('://').concat(req.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    return { fileUrl }
  })
}