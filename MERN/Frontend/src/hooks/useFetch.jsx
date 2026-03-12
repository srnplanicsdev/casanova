/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData =async () => {
        try {
            setLoading(true)
            const responce = await axios.get(url)
            setData(responce.data)
            setError(null)
        } catch (error) {
            console.error(error)
            setError(error)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
        fetchData()
    },[url])
    
  return {data, loading, error, refetch:fetchData}
}

export default useFetch
