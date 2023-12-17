import React, { useState } from 'react'
import './Header.css'
import { BiMenuAltRight } from "react-icons/bi"
import OutsideClickHandler from "react-outside-click-handler"
import { Link, NavLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import AddPropertyModel from '../AddPropertyModel/AddPropertyModel'
import useAuthCheck from '../../hooks/useAuthCheck'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {  isAuthenticated,loginWithPopup, user, logout } = useAuth0();

  const [modelOpened,setModelOpened] = useState(false)
  const {validateLogin} = useAuthCheck()
  const handleAddProprtyClick = ()=>{
     if (validateLogin()) {
      setModelOpened(true)
     }
  }

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

          <img src="./logo.png" alt="logo"width={100} />
        </Link>
        <OutsideClickHandler
          onOutsideClick={() => {setMenuOpen(false)}}
        >
          {/* Menu */}
          <div className="flexCenter h-menu"
            style={getMenuStyles(menuOpen)}
          >
            <NavLink to="/proporties" onClick={()=>setMenuOpen(false)}>Properties</NavLink>
         
            <a href="#"  onClick={()=>setMenuOpen(false)}>Contact</a>


            {/* add propertymodel */}

            <div onClick={handleAddProprtyClick}>Add property </div>
            <AddPropertyModel
            open={modelOpened}
            setOpen={setModelOpened}
            />
            {/* Login */}
            {
              !isAuthenticated ?
                <button className='button'onClick={loginWithPopup}>
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