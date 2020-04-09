<!--  -->
<template>
  <div>
    this is the profile page
    <p v-if="token">welcome,{{userInfo.userName}}</p>
    <p v-else>welcome,stranger</p>
    
    <el-button type="primary" round @click="buysomething">buy something</el-button>
    <el-button v-show="!token" round @click="jumpToLogin" type="success">click to login</el-button>
    <el-button v-show="token" round @click="logOut" type="danger">click to logout</el-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { LOG_OUT } from "@/store/mutation-type.js";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["token", "userInfo"])
  },
  components: {},
  methods: {
    jumpToLogin() {
      this.$router.push("/login");
    },
    logOut() {
      this.$store.commit(LOG_OUT);
      setTimeout(() => {
        this.$router.push("/home");
      }, 500);
      this.$message({
        message: "Log Out success,jump to home page...",
        type: "success"
      });
    },
    buysomething(){
        this.$store.commit('addMockShopInfo');
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
</style>