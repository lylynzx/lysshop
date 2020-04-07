<!--  -->
<template>
  <div class="tabbaritem" v-on:click="clicking">
    <slot name="itemimg" v-if="itemactive">img导入失败</slot>
    <span class="activeitem" v-else>
      <slot name="itemimgactive"></slot>
    </span>
    <span :class="{activeitem:!itemactive}">
      <slot name="itemname"></slot>
    </span>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  props: {
    itemname: {
      type: String
    }
  },
  computed: {
    itemactive() {
      return this.$route.path.indexOf(this.itemname) == -1;
    }
  },
  methods: {
    clicking() {
      if (this.itemactive) {
        this.$router.push("/" + this.itemname);
      }
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
.tabbaritem {
  flex: 1;

  text-align: center;
}
.tabbaritem p {
  margin: 0;
  font-size: 0.8rem;
}
.icon {
  margin-top: 0.2rem;
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: -0.15rem;
  fill: currentColor;
  overflow: hidden;
  
}

.activeitem {
  color: red;
}
</style>