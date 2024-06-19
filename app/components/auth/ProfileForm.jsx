// import { FaLock, FaUserPlus } from 'react-icons/fa'
import {
  Form,
  Link,
  useSearchParams,
  useNavigation,
  useActionData,
  useLoaderData,
  useMatches
} from '@remix-run/react'
import { useEffect, useState } from 'react'

function ProfileForm(signUp) {
  const [searchParams] = useSearchParams()
  const { humano } = useLoaderData()
  console.log('PROFILE', humano)
  const navigation = useNavigation()
  const validationErrors = useActionData()
  console.log('MODE', searchParams.get('mode'))
  let authMode = searchParams.get('mode') || 'login'
  // if (signUp) {
  //   authMode = 'signUp'
  // }

  // const submitBtnCaption = authMode === 'login' ? 'Login' : 'Create humano'
  // const toggleBtnCaption =
  //   authMode === 'login' ? 'Create a new humano' : 'Log in with existing humano'

  const defaultValues = humano && {
    name: humano.name,
    email: humano.email,
    whatsapp: humano.whatsapp,
    colonia: humano.colonia,
    municipio: humano.municipio,
    role: humano.role
  }

  const [privacy, setPrivacy] = useState(defaultValues.privacy)

  const handlePrivacy = event => {
    setPrivacy(event.target.checked)
    console.log('TRUE OR FAKE', event.target.checked)
    // setPrivacy(!privacy)
  }

  const isSubmitting = navigation.state !== 'idle'

  return (
    <Form method="patch" className="w-full flex justify-center">
      <div className="flex flex-col  gap-5 w-full">
        <div className="flex flex-col gap-1">
          <label
            className="font-semibold px-4 text-gray-100 text-lg my-1"
            htmlFor="name"
          >
            Nombre Completo
          </label>
          <input
            id="name"
            name="name"
            className="h-12 p-4 text-gray-800"
            type="text"
            placeholder="Tu nombre permanecerá privado, solo es para comunicarnos contigo"
            autoComplete="off"
            defaultValue={defaultValues.name}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            className="font-semibold px-4 text-gray-100 text-lg my-1"
            htmlFor="email"
          >
            eMail
          </label>
          <input
            id="email"
            name="email"
            className="h-12 p-4 text-gray-800"
            type="text"
            placeholder="Te mandaremos ofertas, promociones y algun recordatorio"
            autoComplete="off"
            defaultValue={defaultValues.email}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            className="font-semibold my-1 px-4  text-gray-100"
            htmlFor="whatsapp"
          >
            Whatsapp
          </label>
          <input
            className="h-12 p-4 text-gray-800"
            type="tel"
            name="whatsapp"
            id="whatsapp"
            placeholder="Es nuestro principal medio de comunicacion"
            required
            defaultValue={defaultValues.whatsapp}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className=" font-semibold my-1 px-4  text-gray-100"
            htmlFor="colonia"
          >
            Colonia
          </label>
          <input
            className="h-10 p-4 text-gray-800"
            type="text"
            name="colonia"
            id="colonia"
            defaultValue={defaultValues.colonia}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className=" font-semibold my-1 px-4  text-gray-100"
            htmlFor="municipio"
          >
            Municipio
          </label>
          <input
            className="h-10 p-4 text-gray-800"
            type="text"
            name="municipio"
            id="municipio"
            defaultValue={defaultValues.municipio}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className=" font-semibold my-1 px-4  text-gray-100"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="h-10 p-4 text-gray-800"
            type="password"
            name="password"
            id="password"
            placeholder="********"
          />
        </div>

        {validationErrors && (
          <div>
            {Object.values(validationErrors).map(error => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        <div className=" bg-gray-800 form-actions text-gray-200 border-2 border-gray-400 p-4 flex justify-center flex-wrap gap-2 items-center rounded-lg mt-5">
          <button
          //  disable={isSubmitting}
          >
            {isSubmitting ? 'Authenticating...' : 'Actualizar'}
          </button>
        </div>
      </div>
    </Form>
  )
}

export default ProfileForm
