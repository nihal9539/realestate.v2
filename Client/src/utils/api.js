import axios from 'axios'
import dayjs from "dayjs"
import { toast } from "react-toastify"

export const api = axios.create({
    baseURL: "https://realestate-beta-nine.vercel.app//api"
})


export const getAllProperties = async () => {

    try {
        const response = await api.get('/residancy/allresidancy',
            {
                timeout: 10 * 1000,
            }
        );
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data

    } catch (error) {
        toast.error("Something went wrong")
        throw error
    }
};

export const getProperty = async (id) => {
    try {
        const response = await api.get(`/residancy/${id}`,
            {
                timeout: 10 * 1000,
            }
        );
        if (response.status === 400 || response.status === 500) {
            throw response.data
        }
        return response.data

    } catch (error) {
        toast.error("Something went wrong")
        throw error
    }
}

export const createUser = async (email, token) => {

    try {
        await api.post(
            '/user/register',
            { email }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        // .then((res)=>{
        //     console.log(res.data);
        // }).catch((err)=>{
        //     console.log(err);
        // })
    } catch (error) {
        toast.error("Something went wrong,Please tey again")
        throw error
    }
}
export const bookvisit = async (date, propertyId, email,token) => {

    try {
        await api.post(
            `/user/bookvisit/${propertyId}`,
            {
                email,
                id: propertyId,
                date: dayjs(date).format('DD/MM/YYYY')
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

    } catch (error) {
        toast.error(`Something went wrong,Please tey again${error}`)
        console.log("error");
        throw error
    }
}
export const removeBooking = async (id, email, token) => {

    try {

        await api.post(
            `/user/removebooking/${id}`,
            {
                email
            },
            {
                headers: {
                    Authorization: `Bearer `
                }
            }
        )

    } catch (error) {
        toast.error("Something went wrong,Please try again")
        throw error
    }
}
export const tofav = async (id, email, token) => {

    try {
        let ids = id.id
        await api.post(
            `/user/tofav/${ids}`,
            {
                email
            },
            {
                headers: {
                    Authorization: `Bearer `
                }
            }
        )

    } catch (error) {
        console.log(error);
        throw error
    }
}
export const getAllFav = async (email, token) => {

    if (!token) {
        return
    } else {

        try {

            const res = await api.post(
                `/user/allfav`,
                {
                    email
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("reeeee");
            console.log(res.data["favResidanciesID"]);
            return res.data["favResidanciesID"]

        } catch (error) {
            toast.error("something went wrong")
            console.log(error);
            throw error
        }
    }
}
export const gwtAllBooking = async (email, token) => {

    if (!token) {
        return
    } else {

        try {

            const res = await api.post(
                `/user/getallbook`,
                {
                    email
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("reeeee");
            console.log("res",res.data["bookVisits"]);
            return res.data["bookVisits"]

        } catch (error) {
            toast.error("something went wrong while fetching booking")
            console.log(error);
            throw error
        }
    }
}

export const createResidancy = async (data,token)=>{
    try {
        console.log(data,token);
        const res = await api.post(
            `/residancy/create`,
            {
                data
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log(res);
        
    } catch (error) {
        throw error
    }
}