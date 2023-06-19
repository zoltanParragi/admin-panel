import axios from 'axios'

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api` 
})

//before request
axiosClient.interceptors.request.use((config)=> {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

//after response
axiosClient.interceptors.response.use((response)=> {
    return response;
}, (error)=> { // in case the request is rejected
    const {response} = error;
    if(response.status === 401) { // 401: user is not authorised - token expired, incorrect token
        localStorage.removeItem('ACCESS_TOKEN'); 
    }
    throw error;
})

export default axiosClient
