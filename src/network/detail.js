import {request} from './request'


export function getDetailInfo(data) {
    return request({
        url:'/detail',
        params:{
            iid:data
        }
    })
}