import {
    LOG_OUT,
    CLEAR_CART,
    LOG_IN,
    AUTO_LOG_IN,
    ADD_TO_CART
} from './mutation-type'
import {
    setLocalStore,
    getLocalStore,
    removeLocalStore
} from '@/config/global.js'
export default {
    [LOG_OUT](state) {
        state.userInfo = {};
        state.shopCart = [];
        state.token = null;
        removeLocalStore('userInfo');
        removeLocalStore('shopCart');
        removeLocalStore('token');
    },
    [CLEAR_CART](state) {
        state.shopCart = [];

    },
    [LOG_IN](state, payload) {
        console.log('mutation login is running');
        console.log(payload);
        state.token = payload.token;
        state.userInfo = payload.userInfo;

    },
    [AUTO_LOG_IN](state) {
        state.token = getLocalStore('token');
        state.userInfo = JSON.parse(getLocalStore('userInfo'));
        state.shopCart = JSON.parse(getLocalStore('shopCart'));
        //console.log(JSON.parse(getLocalStore('userInfo')));

    },
    [ADD_TO_CART](state,payload) {
        //console.log('mutations addtocart running');
        //console.log(payload);
        //这里判断购物车中是否有这个商品
        // if(state.shopCart.find((item)=>{
        //     return item.iid == payload.iid
        // })) {
        //     state.shopCart
        // }
        // state.shopCart.push(payload);
        if(payload.title != undefined) {
            state.shopCart.push(payload);
        }else {
            state.shopCart.forEach(element => {
                if(element.iid ==payload.iid){
                    element.amount = payload.amount
                }
            });
        }
        
        setLocalStore('shopCart', state.shopCart);
        
    },
    addMockShopInfo(state) {
        //以下为根据接口选择的三个商品作为购物车的初始假数据
        let shopCart = [{
            title: '秋装女2018新款套装时尚晚晚风气质chic港味女神网红两件套装俏皮',
            price: 109.00,
            img: "//s5.mogucdn.com/mlcdn/c45406/180827_1590j44g2bk619i6655ji20ihikfb_640x960.jpg",
            amount: 3,
            iid: '1m7rp9w',
            checked:true
        }, {
            title: '秋装女2018新款时尚套装两件套早秋韩版秋季小清新女装长袖时尚宽松衣服',
            price: 95.20,
            img: "//s5.mogucdn.com/mlcdn/c45406/180916_3ekh0ge37aachk6hkhade7bjgg2ll_693x694.jpg",
            amount: 1,
            iid: '1m8mrva',
            checked:true
        }, {
            title: '2018夏装新款韩范t恤女短袖宽松百搭韩版学生半袖ins超火的上衣体侐潮',
            price: 50.00,
            img: "//s11.mogucdn.com/mlcdn/55cf19/180620_7aggehi8gj7055gh77bf4hjgg390i_640x960.jpg",
            amount: 6,
            iid: '1m4jogi',
            checked:true
        }]
        if (state.shopCart.length == 0) {
            state.shopCart.push(...shopCart);
            //console.log(123);
            
        }
        // console.log(shopCart);
        // console.log(state.shopCart.length == 0);
        
        
        setLocalStore('shopCart', state.shopCart);
    },
    changeAmount(state,payload){
        state.shopCart.forEach(item =>{
            if(item.iid == payload.iid) {
                item.amount = payload.amount
            }
        })
    },
    changeChecked(state,payload) {
        state.shopCart.forEach(item =>{
            if(item.iid == payload) {
                item.checked = !item.checked;
            }
        })
    }
}

