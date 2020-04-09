//异步操作有以下功能：1.登录2.初始化购物车3.清空购物车4.添加到购物车
import {
    LOG_IN,
    ADD_TO_CART,
    CLEAR_CART
} from '@/store/mutation-type.js'
import {
    setLocalStore,
    getLocalStore,
    removeLocalStore
} from '@/config/global.js'
export default {
    [LOG_IN](context, payload) {
        //用定时器模拟异步发送请求进行登录操作
        let p = new Promise(function (resolve, reject) {
            let timer = setTimeout(function () {
                if (payload.phoneNumber == '13570369896' && payload.pwd == '13570369896') {
                    resolve({
                        token: 123456, userInfo: {
                            userName: 'ly'
                        }
                    })
                } else {
                    reject('login failed,wrong phoneNumber or password.')
                }
            }, 300)
        })
        p.then(res => {
            context.commit(LOG_IN, res);
            setLocalStore('token',res.token);
            setLocalStore('userInfo',res.userInfo)
        }).catch(res =>{
            
        });
        return p

    }
}