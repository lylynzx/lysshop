<!--  -->
<template>
<div class="detailShopCart">
    <span @click="addToCart">加入购物车</span>
    <span @click="purchase">立即购买</span>
</div>
</template>

<script>
// import {mapState} from 'vuex';
export default {
data() {
return {

}
},
computed:{
    // ...mapState(['token','shopCart'])
},
methods:{
    addToCart(){
        console.log('addtocart');
        this.$emit('addToCart')
    },
    purchase(){

    }
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.detailShopCart {
    position: fixed;
    display: flex;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background:linear-gradient(90deg,yellow,#ff6000);
}
.detailShopCart span {
    flex: 1;
    font-size: 1rem;
    text-align: center;
    color: white;
    font-weight: 700;
    line-height: 50px;
}
</style>