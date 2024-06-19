import { useEffect } from 'react'
import { useNavigate } from '@remix-run/react'

// routes/activation-success.jsx
export default function ActivationSuccess() {
  const redirect = useNavigate()

  useEffect(() => {
    redirect('/')
  }, [])

  return (
    <div className=" mt-32 w-6/12 h-6/12 text-center">
      ¡Tu cuenta ha sido activada con éxito!
    </div>
  )
}
