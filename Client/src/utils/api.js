import axios from 'axios'
import dayjs from "dayjs"
import { toast } from "react-toastify"

export const api = axios.create({
    baseURL: "http://localhost:8000/api"
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

export const createUser = async (email,token) => {

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