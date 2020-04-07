import { LOGIN_OUT } from './mutation-type'
export default {
    [LOGIN_OUT](state) {
        state.userInfo = {};
        state.shopCart = {};
        removeLocalStore('userInfo');
        removeLocalStore('shopCart');
    },
}