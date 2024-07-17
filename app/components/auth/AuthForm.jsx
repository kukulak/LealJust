// import { FaLock, FaUserPlus } from 'react-icons/fa'
import {
  Form,
  Link,
  useSearchParams,
  useNavigation,
  useActionData,
  useNavigate,
} from "@remix-run/react";
import { useEffect, useState } from "react";

function AuthForm(userRole) {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const validationErrors = useActionData();
  const navigate = useNavigate();

  console.log("UZDER", userRole);

  console.log("MODE", searchParams.get("mode"));
  let authMode = searchParams.get("mode") || "login";

  // if (signUp) {
  //   authMode = 'signUp'
  // }

  const [getRole, setRole] = useState(userRole);

  useEffect(() => {
    setRole(userRole);
    console.log("USERfoLOG", userRole);
  }, [userRole]);

  const submitBtnCaption = authMode === "login" ? "Login" : "Crear Usuario";
  const toggleBtnCaption =
    authMode === "login" ? "Create a new user" : "Log in with existing user";

  const isSubmitting = navigation.state !== "idle";

  return (
    <>
      <Form
        method="post"
        className="form mt-5  rounded-lg flex flex-col gap-3 p-5 justify-between bg-darkest w-10/12 md:w-1/3 md:min-w-96  md:p-8 text-gray-900"
        id="auth-form"
      >
        <div className="icon-img text-gray-100">
          {authMode === "login" ? (
            "Lock"
          ) : (
            <div className=" text-9xl -mt-5    "> + </div>
          )}
        </div>
        {authMode !== "login" && (
          <>
            <label className=" text-gray-100" htmlFor="email">
              Nombre del Humano
            </label>
            <input
              className="p-3 h-8 text-darkest"
              type="text"
              id="name"
              name="name"
              required
            />
          </>
        )}
        <label className=" text-gray-100" htmlFor="email">
          eMail
        </label>
        <input
          className="p-3 h-8 text-darkest"
          type="email"
          id="email"
          name="email"
          required
        />
        {authMode !== "login" && (
          <>
            <label className=" text-gray-100" htmlFor="whatsapp">
              Whatsapp
            </label>
            <input
              className="h-10 p-4"
              type="tel"
              name="whatsapp"
              id="whatsapp"
              required
            />

            <label className=" text-gray-100" htmlFor="colonia">
              Colonia
            </label>
            <input
              className="h-10 p-4"
              type="text"
              name="colonia"
              id="colonia"
            />

            <label className=" text-gray-100" htmlFor="municipio">
              Alcaldía
            </label>
            <input
              className="h-10 p-4"
              type="text"
              name="municipio"
              id="municipio"
            />
          </>
        )}
        {getRole.userRole === "ADMIN" ? (
          <>
            <label className=" text-gray-100" htmlFor="password">
              Password Automático
            </label>
            <input
              className="p-3 h-8 text-darkest"
              type="password"
              id="password"
              name="password"
              // minLength={7}
              hidden
              value="0123456789"
            />
          </>
        ) : (
          <>
            <label className=" text-gray-100 " htmlFor="password">
              Password
            </label>
            <input
              className="p-3 h-8 text-darkest"
              type="password"
              id="password"
              name="password"
              minLength={7}
            />
          </>
        )}
        {validationErrors && (
          <div>
            {Object.values(validationErrors).map((error) => (
              <p className="text-gray-100" key={error}>
                {error}
              </p>
            ))}
          </div>
        )}
        <div className="text-gray-100 form-actions justify-center flex flex-row flex-wrap gap-2 ">
          <button
            className="p-3 my-7 rounded-lg border-gray-400 border-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Authenticating..." : submitBtnCaption}
          </button>
          {/* <Link to={authMode === 'login' ? '?mode=signup' : '?mode=login'}>
          {toggleBtnCaption}{' '}
        </Link> */}
        </div>
      </Form>

      <button
        className="p-3  mb-56  rounded-lg border-gray-400 border-2"
        onClick={() => {
          navigate(-1);
        }}
      >
        Regresar
      </button>
    </>
  );
}

export default AuthForm;
