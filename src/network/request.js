import axios from 'axios';

export function request(config) {
    const instance = axios.create({
        //这里配置使用了corderwhy老师的服务器
        baseURL:'http://152.136.185.210:8000/api/n3',
        timeout:5000
    })
    

    instance.interceptors.request.use(config => {
        return config
    },err => {

    })

    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
        
    })
    //这里调用instance方法发送网络请求，其中的配置由调用request的人传入。调用后的返回值为promise对象，因此可以直接request（config）.then（data）方法进行回调
    return instance(config)
}