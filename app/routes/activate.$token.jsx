// routes/activate.$token.jsx
import { json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { prisma } from '../data/database.server'

export async function loader({ params }) {
  const { token } = params

  const user = await prisma.user.findFirst({
    where: { activationToken: token }
  })

  if (!user || user.tokenExpiry < new Date()) {
    return json({ error: 'Token inválido o expirado' }, { status: 400 })
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isActive: true,
      activationToken: null,
      tokenExpiry: null
    }
  })

  return redirect('/activationSuccess') // Redirige a una página de éxito
}

export default function ActivateAccount() {
  const data = useLoaderData()

  if (data.error) {
    return <div>{data.error}</div>
  }

  return <div>Activando tu cuenta...</div>
}
