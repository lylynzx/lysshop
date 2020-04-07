<!--  -->
<template>
  <div class="recommend">
    <ul>
      <li v-for="item in homeData.data.recommend.list" :key="item.title">
        <img :src="item.image" alt />
        <div>{{item.title}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props:{
      homeData:{
          type:Object,
      }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
.recommend {
  background-color: #fff;
  /* margin-top: 15px; */
  height: 5.5rem;
  width: 100%;
}
.recommend ul {
  font-size: 0.8rem;
  width: 100%;
  height: 100%;
  display: flex;
}
.recommend li {
  flex: 1;
}
.recommend img {
  width: 100%;
  height: 80%;
  /* object-fit: cover;  */
}
/* @import url(); 引入css类 */
</style>