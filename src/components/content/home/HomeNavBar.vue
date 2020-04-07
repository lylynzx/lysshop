<!--  -->
<template>
  <div>
    <navbar>
      <p slot="center">vue商城项目</p>
    </navbar>
  </div>
</template>

<script>
import Navbar from '@/components/common/Navbar'
export default {
  data() {
    return {};
  },
  components:{
      Navbar
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>