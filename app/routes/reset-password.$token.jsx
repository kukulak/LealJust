// routes/reset-password.$token.jsx
import { json, redirect } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { prisma } from '../data/database.server'

import bcrypt from 'bcryptjs'

export async function loader({ params }) {
  const { token } = params

  const user = await prisma.user.findUnique({
    where: { passwordResetToken: token }
  })

  if (!user || user.tokenExpiry < new Date()) {
    return json({ error: 'Token inválido o expirado' }, { status: 400 })
  }

  return json({ token })
}

export async function action({ request, params }) {
  const formData = await request.formData()
  const newPassword = formData.get('password')

  const user = await prisma.user.findUnique({
    where: { passwordResetToken: params.token }
  })

  if (!user || user.tokenExpiry < new Date()) {
    return json({ error: 'Token inválido o expirado' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      passwordResetToken: null,
      tokenExpiry: null
    }
  })

  return redirect('/reset-password-success') // Redirige a una página de éxito
}

export default function ResetPassword() {
  const data = useLoaderData()
  const actionData = useActionData()

  if (actionData?.error) {
    return <div>{actionData.error}</div>
  }

  return (
    <div>
      <h1>Restablecer contraseña</h1>
      <Form method="post">
        <label>
          Nueva contraseña:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Restablecer</button>
      </Form>
    </div>
  )
}
