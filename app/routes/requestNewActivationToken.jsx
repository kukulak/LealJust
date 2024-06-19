import { json } from '@remix-run/node'
import { prisma } from '../data/database.server'
import { sendEmail } from '../data/email.server'
import crypto from 'crypto'
import { Form } from '@remix-run/react'

export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get('email')

  if (!email || typeof email !== 'string') {
    return json(
      { error: 'El correo electrónico es requerido' },
      { status: 400 }
    )
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return json(
        { error: 'No se encontró ningún usuario con ese correo electrónico' },
        { status: 404 }
      )
    }

    if (user.isActivated) {
      return json({ error: 'La cuenta ya está activada' }, { status: 400 })
    }

    const activationToken = crypto.randomBytes(32).toString('hex')
    const tokenExpiry = new Date()
    tokenExpiry.setHours(tokenExpiry.getHours() + 24) // Token válido por 24 horas

    await prisma.user.update({
      where: { id: user.id },
      data: {
        activationToken,
        tokenExpiry
      }
    })

    const activationLink = `https://jlhlealtad.com/activate/${activationToken}`

    await sendEmail({
      to: email,
      subject: 'Nuevo Código de Activación',
      text: `Activa tu cuenta haciendo clic en el siguiente enlace: ${activationLink}`
    })

    return json({
      message:
        'Se ha enviado un nuevo código de activación a tu correo electrónico'
    })
  } catch (error) {
    console.error('Error al solicitar un nuevo código de activación:', error)
    return json(
      { error: 'Error al solicitar un nuevo código de activación' },
      { status: 500 }
    )
  }
}

export default function RequestNewActivationToken() {
  return (
    <div className="mt-32    ">
      <h2>Solicitar Nuevo Código de Activación</h2>
      <Form
        className="flex flex-col justify-center items-center content-center "
        method="post"
      >
        <input
          className="p-2 w-full my-3"
          type="email"
          name="email"
          placeholder="Ingresa tu correo electrónico"
          required
        />
        <div className="bg-gray-800 p-5 w-10/12 flex justify-center">
          <button type="submit">Solicitar Nuevo Código</button>
        </div>
      </Form>
    </div>
  )
}
