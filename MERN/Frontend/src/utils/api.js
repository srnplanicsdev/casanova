import axios from "axios";

export  const api = axios.create({
    baseURL:"http://localhost:5432/api",
    headers:{
        'Content-Type': 'application/json',
    }
})


api.interceptors.request.use((config)=>{
    const token = JSON.parse(localStorage.getItem('user')).token
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})