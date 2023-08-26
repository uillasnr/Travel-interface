import axios from "axios";

const Travel = axios.create({
    baseURL: "http://localhost:3001"
})

//Pegando o Token JWT
Travel.interceptors.request.use(async config => {
    const userData = await localStorage.getItem("Travel:userData")
    const token = userData && JSON.parse(userData).token

    config.headers.Authorization = `${token}`

    return config
})

export default Travel;