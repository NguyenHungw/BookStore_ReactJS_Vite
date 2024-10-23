import axios from "axios";

const NO_RETRY_HEADER = 'x-no-retry'

const instance = axios.create({
    baseURL:  import.meta.env.VITE_BACKEND_URL,
    withCredentials: true

  });

 
  instance.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}

  const handleRefreshToken = async ()=>{
    const res = await instance.get('/api/v1/auth/refresh')
    if(res&&res.data) return res.data.access_token
    else return null;
  }

  instance.interceptors.request.use(function (config) {
    
    //check xem co bien window k  
    // console.log("check window>>",window)

    // if (typeof window !== "undefined" 
    //   && window 
    //   && window.localStorage 
    //   //neu window.localStorage co data thi moi gan 
    //   && window.localStorage.getItem('access_token')) {//access_token da duoc gan truoc do r 
    // config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');//goi den window.localstor de lay token va gan vao header
    // }
    // // Do something before request is sent
     return config;
   }, function (error) {

    // Do something with request error
    return Promise.reject(error);
   });

   // Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if(response.data && response.data.data) return response.data
    return response;
  },async function (error) {
    
   
      if (error.config 
        && error.response 
        && +error.response.status === 401 
        &&!error.config.headers[NO_RETRY_HEADER] ) {

        const access_token = await handleRefreshToken()
        error.config.headers[NO_RETRY_HEADER] = 'true' // string val only


        if(access_token){

          error.config.headers['Authorization'] = `Bearer ${access_token}`;
          localStorage.setItem('access_token',access_token)
          return instance.request(error.config);
        }
      }
    
    
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    //console.log("check error respo1 >>",error.response)
    if(error.response && error.response.data) return error.response.data
    //console.log("check error respo2 >>",error.response)
  
    return Promise.reject(error);
  });

  export default instance;