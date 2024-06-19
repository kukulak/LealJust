// import { redirect } from '@remix-run/node'
// import { useSearchParams } from '@remix-run/react'

import AuthForm from '../components/auth/AuthForm'
import { login, signup } from '../data/auth.server'

import { validateCredentials } from '../data/validation.server'

// export const meta = () => {
//   return [
//     { title: 'Log In Human' },
//     {
//       name: 'description',
//       content: 'Registra al humano, despues ¡los perritos!'
//     }
//   ]
// }

export default function LogIn() {
  return (
    // <main className="p-8 flex justify-center w-screen items-center">
    <div className="mt-10  w-full items-center flex flex-col gap-5">
      <AuthForm signUp={true} />
    </div>
    // </main>
  )
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams
  const authMode = searchParams.get('mode') || 'login'

  const formData = await request.formData()
  const credentials = Object.fromEntries(formData)

  //validate user input
  try {
    validateCredentials(credentials)
  } catch (error) {
    return error
  }

  try {
    if (authMode === 'login') {
      console.log('ITS LOGIN')
      console.log({ authMode })
      console.log(credentials)
      // return redirect('/dashboard')

      return await login(credentials)
    } else {
      console.log('ITS SIGNUP')
      return await signup(credentials)
      // return redirect('/dashboard')
    }
  } catch (error) {
    if (error.status === 422) {
      return { credentials: error.message }
    } else {
      return { credentials: error.message }
    }
    // console.log('EL ERROR DE LOGIN', error)
  }
}
