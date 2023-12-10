import React, { useState } from 'react'
import './Header.css'
import { BiMenuAltRight } from "react-icons/bi"
import OutsideClickHandler from "react-outside-click-handler"
import { Link, NavLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import ProfileMenu from '../ProfileMenu/ProfileMenu'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  const getMenuStyles = (menuOpen) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpen && "-100%" }
    }
  }
  return (
    <section className="h-wrapper">
      <div className="h-container flexCenter paddings innerWidth">

        {/* Logo */}
        <Link to="/">

          <img src="./logo.png" alt="logo" width={100} />
        </Link>
        <OutsideClickHandler
          onOutsideClick={() => setMenuOpen(false)}
        >
          {/* Menu */}
          <div className="flexCenter h-menu"
            style={getMenuStyles(menuOpen)}
          >
            <NavLink to="/proporties">Properties</NavLink>
            {/* <a href="">Residance</a>
            <a href="">Our Value</a>
            <a href="">Contact us</a>
            <a href="">Get Start</a> */}
            {/* login button */}
            <a href="#">Contact</a>


            {/* Login */}
            {
              !isAuthenticated ?
                <button className='button' onClick={loginWithRedirect}>
                  Login
                </button> :
                (
                  <ProfileMenu user={user} logout={logout}/>
                )
            }

          </div>
        </OutsideClickHandler>
        <div className="menu-icon" onClick={() => { setMenuOpen((prev) => !prev) }}>
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  )
}

export default Header