<!--  -->
<template>
  <div id="tabbar">
    <div id="tabbar">
      <tabbar-item v-for="item in itemdata" :key="item.iconid" :itemname="item.itemtitle">
        <svg class="icon" aria-hidden="true" slot="itemimg">
          <use :xlink:href="item.iconid" />
        </svg>
        <svg class="icon" aria-hidden="true" slot="itemimgactive">
          <use :xlink:href="item.iconid" />
        </svg>
        <p slot="itemname">{{item.itemtitle}}</p>
      </tabbar-item>
    </div>
  </div>
</template>

<script>
//iconfont字体js文件引入
import "@/assets/font_cppvnv8h2y/iconfont.js"
import TabbarItem from './TabbarItem.vue'
export default {
  data() {
    return {};
  },
  props: {
    itemdata: {
      type: Array
    }
  },
  components: {
    TabbarItem
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
#tabbar {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2.45rem;
  /* background-color: orange; */
  box-shadow: 0px -1px 1px rgba(100, 100, 100, 0.1);
  background-color: #fff;
  z-index: 999;
}
</style>