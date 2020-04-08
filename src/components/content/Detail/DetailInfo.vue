<!--  -->
<template>
<div class="detailInfo">
    <p>{{detailData.result.itemInfo.title}}</p>
    <div class="prices">
        <span>￥{{detailData.result.itemInfo.highNowPrice}}</span>
        <span>￥{{detailData.result.itemInfo.highPrice}}</span>
    </div>
    <div class="salesamount">
        <span>{{detailData.result.columns[0]}}</span>
        <span>{{detailData.result.columns[1]}}</span>
    </div>
</div>
</template>

<script>
export default {
data() {
return {

}
},
props:{
    detailData:{
        type:Object,
        default:{}
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
.detailInfo {
    box-shadow: 2px 2px 2px rgba(0, 0, 0, .3);
}
p {
    margin: 1rem .5rem;
    
}
.prices span:first-of-type {
    color: red;
    font-size: 1.2rem;
}
.prices span:nth-of-type(2) {
    font-size: .6rem;
    color: #666;
    text-decoration: line-through;
}
.salesamount {
    margin-top: 1rem;
    text-align: left;
}
.salesamount span {
    font-size: .4rem;
    color: #666;
    padding-right: 3rem;
}
</style>