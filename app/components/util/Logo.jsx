import { NavLink } from '@remix-run/react'

function Logo({ name }) {
  return (
    <div id="logo">
      <NavLink to="/">
        <h1 className=" font-bold text-4xl text-light">{name}</h1>
        <p className=" font-bold text-1xl text-light">
          We sell the art of your dreams
        </p>
      </NavLink>
    </div>
  )
}

export default Logo
