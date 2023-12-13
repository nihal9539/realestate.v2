import React, { useContext, useEffect, useRef } from 'react'
import UserDetailsContext from '../context/UserDetailsContext'
import { useQuery } from "react-query"
import { useAuth0 } from "@auth0/auth0-react"
import { getAllFav } from '../utils/api'

const useFavourite = () => {

    const { userDetails, setUserDetails } = useContext(UserDetailsContext)
    const queryRef = useRef()
    const { user } = useAuth0()

    const { data, isLoading, isEroor, refetch } = useQuery({
        queryKey: "allFavourite",
        queryFn: () => getAllFav(user?.email, userDetails?.token),
        onSuccess: (data) => setUserDetails((prev) => ({ ...prev, favourite: data })),
        enabled: user !== undefined,
        staleTime: 3000
    })

    queryRef.current = refetch;

    useEffect(()=>{
          queryRef.current && queryRef.current()
    },[userDetails?.token])
    
    return {data,isEroor,isLoading,refetch};
}

export default useFavourite
