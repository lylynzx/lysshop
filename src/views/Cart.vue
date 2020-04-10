<!--  -->
<template>
  <div>
    this is the cart page
    <p v-show="!mycart">购物车是空的喔</p>
    <ul>
      <li v-for="(item,index) in mycart" :key="index">
        <p>{{item.title}}</p>
        <div>
          <span>￥{{item.price}}</span>
          <span>数量：{{item.amount}}</span>
          <span>总价：{{totalPrice[index]}}</span>
        </div>
        <img v-lazy="item.img" alt />
      </li>
    </ul>
  </div>
</template>

<script>
import {
  setLocalStore,
  getLocalStore,
  removeLocalStore
} from "@/config/global.js";
import { mapState } from "vuex";
import LoginVue from "./Login.vue";

export default {
  data() {
    return {
      mycart: []
    };
  },
  computed: {
    ...mapState(["token", "shopCart"]),
    totalPrice() {
      return this.mycart.map(item => {
        return item.price * item.amount;
      });
    }
  },
  methods: {
    init_cart() {
      // console.log(this.token);
      //console.log('cart inited');
      this.mycart = [];
      if (this.token) {
        if (getLocalStore("shopCart")) {
          //如果有登录且有购物车信息，则添加进mycart中
          this.mycart.push(...JSON.parse(getLocalStore("shopCart")));
        }
      }
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.init_cart();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  activated() {
    this.init_cart();
  }
};
</script>
<style scoped>
li {
  width: 100%;
}
li img {
  width: 100%;
}
li span {
  margin: 0 1.5rem;
}
/* @import url(); 引入css类 */
</style>