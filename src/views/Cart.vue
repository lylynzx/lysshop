<!--  -->
<template>
  <div>
    this is the cart page
    <p v-show="!mycart">购物车是空的喔</p>

    <ul>
      <li v-for="(item,index) in mycart" :key="index">
        <el-card class="box-card">
          <div class="boxcontent">
            <div>
              <el-checkbox :checked="item.checked" @change="checkboxclick(item.iid)"></el-checkbox>
            </div>
            <div>
              <img v-lazy="item.img" alt />
            </div>
            <div>
              <p>{{item.title}}</p>
              <div>
                <span>￥{{item.price | tofix2}}</span>
                <span>
                  数量：
                  <el-input-number
                    @change="handleChange($event,item.iid)"
                    v-model="item.amount"
                    :min="1"
                  ></el-input-number>
                </span>
                
              </div>
            </div>
          </div>
        </el-card>
      </li>
    </ul>
    <p>总价：￥{{totalPrice | tofix2}}</p>
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
      let price = 0;
      this.shopCart.forEach(element => {
        if (element.checked) {
          price += Number(element.price) * Number(element.amount);
        }
      });
      return price;
    },
    
  },
  filters: {
    tofix2(data) {
      return Number(data).toFixed(2);
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
    },
    checkboxclick(data) {
      //console.log(data);
      this.$store.commit("changeChecked", data);
    },
    handleChange(val, iid) {
      this.$store.commit("changeAmount", { iid: iid, amount: val });
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
  box-sizing: border-box;

  width: 100%;
  height: 10rem;
}
.box-card {
  margin: 0 auto;
  width: 90%;
  height: 15rem;
}
.boxcontent {
  display: flex;
}
li .boxcontent div:first-of-type {
  flex: 1;
}
li .boxcontent div:nth-of-type(2) {
  flex: 4;
}
li .boxcontent div:nth-of-type(3) {
  flex: 5;
}
li img {
  width: 100%;
  height: 80%;
}
li p {
  /* height: 2rem; */
}
/* @import url(); 引入css类 */
</style>