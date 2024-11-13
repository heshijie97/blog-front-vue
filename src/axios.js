import axios from "axios"
import Element from "element-ui";

axios.defaults.baseURL="http://192.168.0.46:8081"

// 前置拦截
axios.interceptors.request.use(config=>{
    return config
})


// 后置拦截
axios.interceptors.response.use(response=> {
        let res = response.data
        console.log("后置拦截")
        console.log(res)
        if (res.code === 200) {
            return response
        } else {
            return Promise.reject(response.data.message)
        }
    },
    error => {
        console.log(error)
    }
    )