import { uploadImage } from '../data/s3.server'

import { json } from '@remix-run/node'

export const action = async ({ request }) => {
  // const userId = await requireUserSession(request)
  console.log('FROM IMAGES.JS')
  const imageUrl = await uploadImage(request)
  // await ImageDream(userId, imageUrl)
  return json({ imageUrl })
}
