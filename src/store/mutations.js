import {
    LOG_OUT,
    CLEAR_CART,
    LOG_IN,
    
} from './mutation-type'
import {
    setLocalStore,
    getLocalStore,
    removeLocalStore
} from '@/config/global.js'
export default {
    [LOG_OUT](state) {
        state.userInfo = {};
        state.shopCart = {};
        state.token = null;
        removeLocalStore('userInfo');
        removeLocalStore('shopCart');
    },
    [CLEAR_CART](state) {
        state.shopCart = {}

    },
    [LOG_IN](state,payload) {
        console.log('mutation login is running');
        console.log(payload);
        state.token =payload.token;
        state.userInfo = payload.userInfo;
        
    }
}

