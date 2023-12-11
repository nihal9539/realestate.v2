import React, { useContext, useEffect } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import UserDetailsContext from '../../context/UserDetailsContext.js'
import { useMutation } from 'react-query'
import { createUser } from '../../utils/api'

const Layout = () => {

  const { isAuthenticated, user, getAccessTokenWithPopup} = useAuth0()
  const { setUserDeatils } = useContext(UserDetailsContext)

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email,token)
  })

  useEffect(() => {
    const getTokenAndRegister = async () => {
      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "http://localhost:8000",
          scope: "openid profile email"
        },
      });
      localStorage.setItem("access_token", res)
      setUserDeatils((prev) => ({prev, token: res }));
      console.log(res);
      mutate(res)
    }
    isAuthenticated && getTokenAndRegister();
  }, [isAuthenticated])
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
        <Footer />
    </>
  )
}

export default Layout