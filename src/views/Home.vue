<!--  -->
<template>
  <div>
    <home-nav-bar />
    <div class="home-tab-control-title" ref="homeTabControlTitle">
      <home-tab-control-title
        :titles="recommendTitles"
        :activeIndex="activeIndex"
        v-on="{itemclick:TabControlItemClick}"
      ></home-tab-control-title>
    </div>
    <better-scroll
      class="myhomescroll"
      :probeType="3"
      @scrolling="myscroll"
      ref="myhomescroll"
      :pullUpLoad="true"
      @pullUpLoad="pullUpLoad"
    >
      <home-swiper :homeData="homeData"></home-swiper>
      <home-recommend :homeData="homeData"></home-recommend>
      <home-tab-control
        :recommendTitles="recommendTitles"
        :recommendData="recommendData"
        :activeIndex="activeIndex"
      ></home-tab-control>
    </better-scroll>
    <backtop class="homeBackTop" ref="mybacktop" @click.native="backTopClick" />
  </div>
</template>

<script>
//引入各部分组件
import HomeNavBar from "@/components/content/home/HomeNavBar.vue";
import HomeTabControlTitle from "@/components/content/home/HomeTabControlTitle.vue";
import HomeTabControl from "@/components/content/home/HomeTabControl.vue";
import HomeSwiper from "@/components/content/home/HomeSwiper.vue";
import HomeRecommend from "@/components/content/home/HomeRecommend.vue";
import Backtop from "@/components/common/Back-top.vue";
//引入功能性组件
import betterScroll from "@/components/common/Better-scroll.vue";
import Pubsub from "pubsub-js";
//引入获取参数方法
import { getHomeMultidata, getHomeGoods } from "@/network/home.js";
import { AUTO_LOG_IN } from "@/store/mutation-type.js";
import { getLocalStore } from "@/config/global.js";

export default {
  data() {
    return {
      activeIndex: 0,
      recommendTitles: ["sell", "new", "pop"],
      homeData: { data: { banner: {}, recommend: {} } },
      recommendData: {
        activeItem: "sell",
        sell: { page: 0, list: [] },
        new: { page: 0, list: [] },
        pop: { page: 0, list: [] }
      },
      scrollY: 0
    };
  },
  components: {
    HomeNavBar,
    HomeTabControlTitle,
    HomeSwiper,
    HomeRecommend,
    HomeTabControl,
    betterScroll,
    Backtop
  },

  methods: {
    TabControlItemClick(data) {
      this.activeIndex = data;
    },
    getHomeMultidata() {
      getHomeMultidata().then(data => {
        this.homeData = data;
      });
    },
    //下面这个方法用于向后台请求推荐列表，传参为类型，如果不传则默认为sell
    getHomeRecommend(type = "sell") {
      getHomeGoods(type, ++this.recommendData[type].page).then(data => {
        this.recommendData[type].list.push(...data.data.list);
        console.log(data);
        console.log(this.recommendData);
      });
    },
    pulltoUpdate(type) {
      getHomeGoods(type, ++this.recommendData[type].page).then(data => {
        this.recommendData[type].list.push(...data.data.list);
        this.$nextTick(() => {
          this.$refs.myhomescroll.finishPullUp();
          this.$refs.myhomescroll.refresh();
        });
      });
    },
    backTopClick() {
      //console.log('back top clicked');
      this.$refs.myhomescroll.scrollTo(0, 0, 500);
      this.$refs.myhomescroll.refresh();
    },
    myscroll(res) {
      //console.log(res);
      if (res.y < -1000) {
        //console.log(this.$refs.mybacktop.$el);
        this.$refs.mybacktop.$el.classList.add("active");

        // console.log('display');
      } else {
        this.$refs.mybacktop.$el.classList.remove("active");
      }
      //console.log(this.$refs.homeTabControlTitle.$el);
      //console.log(res.y);

      if (res.y < -330) {
        this.$refs.homeTabControlTitle.classList.add("active");
      } else {
        this.$refs.homeTabControlTitle.classList.remove("active");
      }
      //this.scrollY = res.y;
    },
    pullUpLoad() {
      this.pulltoUpdate(this.recommendData.activeItem);
    }
  },

  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getHomeMultidata();
    this.getHomeRecommend();
    this.getHomeRecommend("pop");
    this.getHomeRecommend("new");
    //查看本地存储是否有登录信息，有则进行自动登录
    if (getLocalStore("token") && getLocalStore("userInfo")) {
      this.$store.commit(AUTO_LOG_IN);
    }
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    Pubsub.subscribe("itemclick", (msg, data) => {
      console.log("msg=" + msg);
      console.log("data=" + data);
      this.activeIndex = data;
      this.recommendData.activeItem = this.recommendTitles[data];
    });
  },
  activated() {
    console.log("activated");
    console.log("reday scroll to" + this.scrollY);
    this.$refs.myhomescroll.refresh();
    this.$refs.myhomescroll.scrollTo(0, this.scrollY, 0);
  },
  deactivated() {
    console.log("deactivated");
    console.log(this.$refs.myhomescroll.bScroll.y);
    this.scrollY = this.$refs.myhomescroll.bScroll.y;
  },
  destroyed() {
    console.log("home destoryed");
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.home-tab-control-title {
  display: none;
  position: fixed;
  top: 43px;
  left: 0;
  right: 0;
  z-index: 999;
  font-size: 1rem;
}
.myhomescroll {
  /* 这里不设置高度则bscroll无法滚动 */
  height: calc(100vh - 44px - 2.45rem);
}
.homeBackTop {
  position: fixed;
  bottom: 4rem;
  right: 1rem;
  z-index: 999;
}
.active {
  display: block;
}
</style>