<!--  -->
<template>
  <div class="detailservice">
    <span v-for="(item,index) in detailData.result.shopInfo.services" :key="index">
      <img :src="item.icon" alt />
      <span>{{item.name}}</span>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    detailData: {
      type: Object,
      default: {}
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.detailservice {
  width: 100%;
  height: 3rem;

  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  padding-top: 1rem;
  text-align: left;
}
.detailservice span {
    font-size: .4rem;
    color: #666;
    padding-right: .5rem;
}
.detailservice img {
    width: .5rem;
}
</style>