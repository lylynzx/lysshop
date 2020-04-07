<!--  -->
<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // 禁止手机端扩大和缩小手势
    window.onload = function() {
      document.addEventListener("touchstart", function(event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      document.addEventListener("gesturestart", function(event) {
        event.preventDefault();
      });
    };
  }
};
</script>
<style>
/* 根据屏幕大小来修改根字体大小 配合rem
html {
  font-size: 20px;
}
@media only screen and (min-width: 401px) {
  html {
    font-size: 25px !important;
  }
}
@media only screen and (min-width: 428px) {
  html {
    font-size: 26.75px !important;
  }
}
@media only screen and (min-width: 481px) {
  html {
    font-size: 30px !important;
  }
}
@media only screen and (min-width: 569px) {
  html {
    font-size: 35px !important;
  }
}
@media only screen and (min-width: 641px) {
  html {
    font-size: 40px !important;
  }
} */
/* @import url(); 引入css类 */
@import "./assets/css/normalize.css";
@import "./assets/css/base.css";
</style>
