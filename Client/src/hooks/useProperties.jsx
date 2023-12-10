import React from 'react' 
import { useQuery } from 'react-query'
import { getAllProperties } from '../utils/api'


const useProperties = () => {
    const { isError,data,isLoading,refetch } = useQuery(
        "allProperties",
        getAllProperties,
        {refetchOnWindowFocus:false}
    )
  return {

    data,isError,isLoading,refetch
  }
  
}

export default useProperties