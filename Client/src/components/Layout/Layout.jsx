import React, { useContext, useEffect } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import UserDetailsContext from '../../context/UserDetailsContext.js'
import { useMutation } from 'react-query'
import { createUser } from '../../utils/api'
import useFavourite from '../../hooks/useFavourite.jsx'
import useBooking from '../../hooks/useBooking.jsx'

const Layout = () => {
  useFavourite()
  useBooking()
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0()
  const { setUserDetails } = useContext(UserDetailsContext)
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    const getTokenAndRegsiter = async () => {
      console.log("trying to get the token")
      const res = await getAccessTokenSilently({
        authorizationParams: {
          audience: "https://realestate-v2-two.vercel.app",
          scope: "openid profile email",

        },
      });
      console.log("token is : ", res);
      localStorage.setItem("access_token", res);
      setUserDetails((prev) => ({ ...prev, token: res }));
      mutate(res)
    };


    isAuthenticated && getTokenAndRegsiter();
  }, [isAuthenticated]);
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