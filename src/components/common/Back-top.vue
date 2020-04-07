<!--  -->
<template>
<div class="backtop"></div>
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
.backtop {
    display: none;
    position: relative;
    width: 50px;
    height: 50px;
    background-color: #fff;
    border-radius: 25px;
    box-shadow: 2px 2px 2px rgba(100, 100, 100, 0.1);
}
.backtop::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 15px;
    width: 20px;
    height: 20px;
    /* background-color: #fff; */
    border-bottom: black 2px solid;
    border-left: black 2px solid;
    transform: rotate(135deg);
}
.active {
    display: block;
}
</style>