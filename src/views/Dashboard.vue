<!--  -->
<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <tab-bar :itemdata="itemdata">
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "@/components/common/TabBar.vue";
import TabbarItem from "@/components/common/TabbarItem.vue";
export default {
  data() {
    return {
      itemdata: [
        { iconid: "#icon-wxbzhuye", itemtitle: "home", path: "/home" },
        { iconid: "#icon-search", itemtitle: "category", path: "/category" },
        { iconid: "#icon-cart", itemtitle: "cart", path: "/cart" },
        { iconid: "#icon-account", itemtitle: "profile", path: "/profile" }
      ]
    };
  },
  components: {
    TabBar,
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
</style>