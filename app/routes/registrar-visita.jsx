// routes/registrar-visita.jsx

import { json } from '@remix-run/react'
import { registerVisit } from '../data/cupon.server'

export let action = async ({ request }) => {
  const formData = await request.formData()
  const userId = formData.get('clienteId')
  const couponId = formData.get('couponId')
  console.log('REGISTRAR VISITA', couponId, userId)

  if (!userId || !couponId) {
    return json({ error: 'Faltan parámetros' }, { status: 400 })
  }

  try {
    await registerVisit(userId, couponId)
    return json({ success: true })
  } catch (error) {
    return json({ error: error.message }, { status: 500 })
  }
}

export let loader = () => {
  return json({ message: 'Método no permitido' }, { status: 405 })
}

export default function RegistrarVisita() {
  return null // Este componente no necesita renderizar nada
}
