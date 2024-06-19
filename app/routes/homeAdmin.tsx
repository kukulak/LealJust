import type {
  MetaFunction,
  LoaderFunctionArgs,
  LinksFunction,
  ActionFunctionArgs
} from '@remix-run/node'
import Intro from '../components/Intro'
import { getUserFromSession, requireUserSession } from '~/data/auth.server'
import {
  redirect,
  useActionData,
  useLoaderData,
  useNavigate
} from 'react-router'

import { useEffect } from 'react'

export const meta: MetaFunction = () => {
  return [
    { title: 'Programa de Lealtad Just Like Home' },
    { name: 'description', content: 'Programa de lealtad' }
  ]
}

export default function HomeAdmin() {
  const navigate = useNavigate()
  const userId = useActionData()
  const user = useLoaderData()

  useEffect(() => {
    if (user?.role !== 'ADMIN') {
      {
        navigate(`/`)
      }
    }
  }, [user, navigate])

  return (
    <>
      <div className=" animate-buscador flex items-center flex-col content-center justify-center h-screen bg-gray-950 mt-10  ">
        {/* <div className=" mt-28">
          <p> Hola</p>
          <p className="first-letter:uppercase ">{user.userName}</p>
        </div> */}
        {/* <div className="flex flex-row gap-2 items-end my-10 mt-28">
          <p className=""> Hola</p>
          <p className="first-letter:uppercase text-5xl ">{user.userName}</p>
        </div> */}
        <Intro user={user?.userName} />
      </div>
    </>
  )
}

export async function action({ request }: ActionFunctionArgs) {
  // const userId = await requireUserSession(request)
  // const user = useLoaderData()
  const { userId } = await getUserFromSession(request)
  try {
    if (userId?.role !== 'ADMIN') {
      console.log('NOESADMIN', userId?.role)
      return redirect('/')
    }
  } catch (error) {
    console.log('ERROR ERRRRRROR', error)
  }
  console.log('FROM ACTION', userId.userId)
  return userId
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUserFromSession(request)
  // const userId = user.userId
  return user
}
