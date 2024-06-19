import { NavLink } from '@remix-run/react'

import goHome from '/img/goHome.png'
import goSearch from '/img/goSearch.png'
import goProfile from '/img/goProfile.png'
import goSettings from '/img/goSettings.png'

const MenuMobile = ({ userId }) => {
  const menuItems = [
    { img: goHome, text: '|^|', link: '/homeAdmin' },
    { img: goSettings, text: ';)', link: `/humanProfile/${userId}` },
    { img: goSearch, text: '/˚', link: '/buscarCliente' },
    { img: goProfile, text: '∑´', link: '/explorar' }
  ]

  return (
    <section className=" justify-center pointer-events-none z-40 mobile items-end fixed max-w-[700px] w-full h-full flex">
      <menu className=" w-11/12 rounded-xl mb-7 justify-evenly pt-2 max-w-full  gap-3  h-10 bg-[#2b323f] flex">
        {menuItems.map(({ img, text, link }) => (
          <NavLink
            className=" mt-1 hover:scale-125 text-xs pointer-events-auto"
            to={link}
            key="item"
          >
            {' '}
            <img className="w-4" src={img} alt="go" />
            {/* {text}{' '} */}
          </NavLink>
        ))}
      </menu>
    </section>
  )
}

export default MenuMobile
