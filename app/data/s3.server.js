import { Upload } from '@aws-sdk/lib-storage'
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand
} from '@aws-sdk/client-s3'

import { createId } from '@paralleldrive/cuid2'
import { unstable_parseMultipartFormData } from '@remix-run/node'

// import { Readable } from 'stream'

////////

const s3 = new S3Client({
  region: process.env.DREAMS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.DREAMS_ACCES_KEY_ID,
    secretAccessKey: process.env.DREAMS_SECRET_ACCESS_KEY
  }
})

////////////

async function uploadHandler(args) {
  console.log('ARGS', await args)
  if (args.name !== 'dream-pic') {
    args.data.resume()
    return
  }
  // Crear un buffer a partir del stream de datos binarios
  const chunks = []
  for await (const chunk of args.data) {
    chunks.push(chunk)
  }
  const imageData = Buffer.concat(chunks)
  ///////
  const cuidName = `${createId()}.${args.filename.split('.').slice(-1)}`
  const command = new PutObjectCommand({
    Bucket: process.env.DREAMS_BUCKET_NAME || '',
    Key: cuidName,
    Body: imageData
  })

  try {
    const response = await s3.send(command)
    console.log('FU:L RESPONSE?', response)
    // return response
    // Return the URL of the uploaded image
    return `https://${process.env.DREAMS_BUCKET_NAME}.s3.amazonaws.com/${cuidName}`
  } catch (err) {
    console.error('ES UN ERROR', err)
  }
}

export async function uploadImage(request) {
  ////
  const formData = await unstable_parseMultipartFormData(request, uploadHandler)

  const file = formData.get('dream-pic')?.toString() || ''

  console.log({ imageUrl: file })

  return file
}
