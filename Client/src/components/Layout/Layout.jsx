import React, { useContext, useEffect } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import UserDetailsContext from '../../context/UserDetailsContext.js'
import { useMutation } from 'react-query'
import { createUser } from '../../utils/api'

const Layout = () => {

  const { isAuthenticated, user, getAccessTokenWithPopup ,getAccessTokenSilently} = useAuth0()
  const { setUserDeatils } = useContext(UserDetailsContext)
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email,token),
  });
  
  useEffect(() => {
    const getTokenAndRegsiter = async () => {
      console.log("trying to get the token")
      const res = await getAccessTokenSilently({
        authorizationParams: {
          audience: "http://localhost:8000",
          scope: "openid profile email",
          
        },
      });
      console.log("token is : ",res);
      console.log(setUserDeatils);
      localStorage.setItem("access_token", res);
      // setUserDeatils((prev) => ({ ...prev, token: res }));
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