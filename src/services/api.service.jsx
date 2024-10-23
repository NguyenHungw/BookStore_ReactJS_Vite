// import axios from "./axios.customize"

import axios from "./axios.customize";

const loginUserAPI = (username, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        username: username,
    
        password: password,
        delay: 1000,

    }
    return axios.post(URL_BACKEND, data)
}
const registerUserAPI = (fullname,email,password,phone) => {
    const URL_BACKEND = "/api/v1/user/register";
    const data = {
        fullName:fullname,
        email:email,
        password:password,
        phone:phone
    }
    return axios.post(URL_BACKEND,data)
}

const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account')
}
const callLogOutAccount = () => {
    return axios.post('/api/v1/auth/logout')
}

export {loginUserAPI,registerUserAPI,callFetchAccount,callLogOutAccount
}