<!--  -->
<template>
<div id="navbar">
    <slot name="leftside"></slot>
    <slot name="center"></slot>
    <slot name="rightside"></slot>
</div>
</template>

<script>
export default {
data() {
return {

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
#navbar {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 44px;
    line-height: 44px;
    /* font-size: 30px; */
    /* background-color: orange; */
    box-shadow: 0px 1px 1px rgba(100, 100, 100, .1);
    background-color: white;
    
    
}

</style>