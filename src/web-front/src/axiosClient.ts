import axios from "axios";

const instance = axios.create({
    baseURL : import.meta.env.VITE_URL_API,
    timeout : 1000,
    headers: {
        "Content-type": "application/json",
      },
})

instance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        console.log(error);
    }
);

export default instance