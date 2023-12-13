import React, { useContext, useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import useAuthCheck from '../../hooks/useAuthCheck'
import { useMutation } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'
import UserDetailsContext from '../../context/UserDetailsContext'
import { tofav } from '../../utils/api'
import {  checkFavourites, updateFavourite } from '../../utils/common'

const Heart = (id) => {
    const [heartColor, setHeartColor] = useState("white")
    const { user } = useAuth0()
    const { validateLogin } = useAuthCheck()
    const { userDetails: { favourite, token }, setUserDetails } = useContext(UserDetailsContext)
    const handleLike = () => {
        console.log("hii");
        if (validateLogin()) {

            mutate()
            setHeartColor((prev) => prev === "#fa3e5f" ? "white" : "#fa3e5f")
        }
    }
    const { mutate } = useMutation(({
        mutationFn: () => tofav(id, user?.email, token),
        onSuccess: () => {
            setUserDetails((prev) => ({
                ...prev,
                favourite: updateFavourite(id, prev.favourite)
            }))
        }
    }))
    useEffect(() => {
        setHeartColor(() => checkFavourites(id, favourite))
    }, [favourite])


    return (
        <div>
            <AiFillHeart size={24} color={heartColor} onClick={(e) => {
                e.stopPropagation()
                handleLike()
            }} />
        </div>
    )
}

export default Heart
