import axios from 'axios'

export function request(config) {
    // 1:创建一个axios实例
    const instance = axios.create(
        {
            baseURL: 'http://152.136.185.210:8000/api/w6',
            timeout: 5000
        }
    )

    // 2:axios的拦截器
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        //console.log(err)
    })

    instance.interceptors.request.use(res => {
        return res
    }, err => {
        console.log(err)
    })

    // 3:发送真正的网络请求 return请求之后的结果，而这个结果返回的是一个promise,所以当在外面调用时 可以直接使用.then
    return instance(config)
}