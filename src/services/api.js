import axios from "axios";

 const Travel = axios.create({
    baseURL: "http://localhost:3001"
})

export default Travel;