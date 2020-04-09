<!--  -->
<template>
  <div>this is the cart page
      <ul>
          <li v-for="(item,index) in mycart" :key="index"></li>
      </ul>
  </div>
</template>

<script>
import {
    setLocalStore,
    getLocalStore,
    removeLocalStore
} from '@/config/global.js'
import {mapState} from 'vuex';

export default {
data() {
return {
    mycart:[]
}
},
computed:{
    ...mapState(["token", "shopCart"])
},
methods:{
    init_cart(){
        // console.log(this.token);
        if(this.token) {
            if(getLocalStore('shopCart')) {
                //如果有登录且有购物车信息，则添加进mycart中
                this.mycart.push(...JSON.parse(getLocalStore('shopCart')))
            }
        }
    }
},
//生命周期 - 创建完成（访问当前this实例）
created() {
    this.init_cart();
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>