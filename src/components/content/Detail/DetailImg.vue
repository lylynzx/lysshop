<!--  -->
<template>
<div class="detailImg">
    <img v-for="(item,index) in detailData.result.detailInfo.detailImage[0].list" :key="index" v-lazy="item" alt="" @load="imgloaded">
</div>
</template>

<script>
import Pubsub from "pubsub-js";
export default {
data() {
return {
    timer:0
}
},
props:{
    detailData:{
        type:Object,
        default:{}
    }
},
methods:{
    imgloaded(){
        this.timer = null;
        this.timer = setTimeout(function () {
            Pubsub.publish('refresh');
            // console.log('imgloaded');
            
        })
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
.detailImg {
    margin-top: 3px;
}
img {
    width: 100%;
}

</style>