// routes/forgot-password.jsx
import { json } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { prisma } from '../data/database.server'

import { sendEmail } from '../data/email.server' // Ajusta el path según tu configuración
import { generateToken } from '../data/auth.server' // Ajusta el path según tu configuración

export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get('email')

  const user = await prisma.user.findUnique({ where: { email } })

  if (user) {
    const passwordResetToken = generateToken()
    const tokenExpiry = new Date()
    tokenExpiry.setHours(tokenExpiry.getHours() + 1) // Token válido por 1 hora

    await prisma.user.update({
      where: { email },
      data: {
        passwordResetToken,
        tokenExpiry
      }
    })

    const resetLink = `https://tuapp.com/reset-password/${passwordResetToken}`

    await sendEmail({
      to: email,
      subject: 'Restablece tu contraseña',
      text: `Restablece tu contraseña haciendo clic en el siguiente enlace: ${resetLink}`
    })
  }

  return json({ success: true })
}

export default function ForgotPassword() {
  const actionData = useActionData()

  return (
    <div>
      <h1>Restablecer contraseña</h1>
      <Form method="post">
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <button type="submit">Enviar</button>
      </Form>
      {actionData?.success && (
        <p>
          Si el email existe, se ha enviado un enlace para restablecer la
          contraseña.
        </p>
      )}
    </div>
  )
}
