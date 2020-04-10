<!--  -->
<template>
  <div>
    <nav-bar>
      <div class="back" slot="leftside"></div>
      <ul slot="center" class="navtitles" @click="detailTitleClicked($event)">
        <li ref="one" data-index="1" class="active">商品</li>
        <li ref="two" data-index="2">参数</li>
        <li ref="three" data-index="3">评论</li>
        <li ref="four" data-index="4">推荐</li>
      </ul>
    </nav-bar>
    <better-scroll class="mydetailscroll" :probeType="3" @scrolling="myscroll" ref="mydetailscroll">
      <detail-swiper :detailData="detailData"></detail-swiper>
      <detail-info :detailData="detailData"></detail-info>
      <detail-service :detailData="detailData"></detail-service>
      <detail-img :detailData="detailData"></detail-img>
    </better-scroll>
    <backtop class="detailBackTop" ref="mybacktop" @click.native="backTopClick" />
    <detail-shop-cart @addToCart="addToCart"></detail-shop-cart>
  </div>
</template>

<script>
//引入获取数据的接口方法
import { getDetailInfo } from "@/network/detail.js";
//引入页面组件
import NavBar from "@/components/common/Navbar.vue";
import DetailSwiper from "@/components/content/Detail/DetailSwiper.vue";
import DetailInfo from "@/components/content/Detail/DetailInfo.vue";
import DetailService from "@/components/content/Detail/DetailService.vue";
import DetailImg from "@/components/content/Detail/DetailImg.vue";
import DetailShopCart from "@/components/content/Detail/DetailShopCart.vue";
//引入功能性组件
import Backtop from "@/components/common/Back-top.vue";
import betterScroll from "@/components/common/Better-scroll.vue";
import Pubsub from "pubsub-js";

//引入mapstate mapmutation
import { mapState, mapMutations } from "vuex";

//引入方法常量
import { ADD_TO_CART } from "@/store/mutation-type.js";

export default {
  data() {
    return {
      //因为直接将detailData传给各个组件 所以这里如果不写一下空白的数据结构会报错 虽不影响运行
      detailData: {
        result: {
          columns: [],
          itemInfo: {
            topImages: [],
            title: []
          },
          shopInfo: {
            services: {}
          },
          detailInfo: {
            detailImage: [{ list: {} }]
          }
        }
      }
    };
  },
  computed: {
    ...mapState(["token", "shopCart"])
  },
  components: {
    NavBar,
    DetailSwiper,
    DetailInfo,
    DetailService,
    DetailImg,
    betterScroll,
    Backtop,
    DetailShopCart
  },
  methods: {
    ...mapMutations([ADD_TO_CART]),
    openFullScreen2() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
      }, 1000);
    },
    myscroll(res) {
      if (res.y < -1000) {
        this.$refs.mybacktop.$el.classList.add("active");
      } else {
        this.$refs.mybacktop.$el.classList.remove("active");
      }

      if (res.y < -2000) {
        this.$refs.four.classList.add("active");
        this.$refs.three.classList.remove("active");
      } else if (res.y < -1500) {
        this.$refs.three.classList.add("active");
        this.$refs.two.classList.remove("active");
        this.$refs.four.classList.remove("active");
      } else if (res.y < -1000) {
        this.$refs.two.classList.add("active");
        this.$refs.one.classList.remove("active");
        this.$refs.three.classList.remove("active");
      } else if (res.y < -500) {
        this.$refs.one.classList.add("active");
        this.$refs.two.classList.remove("active");
      }
    },
    backTopClick() {
      //console.log('back top clicked');
      this.$refs.mydetailscroll.scrollTo(0, 0, 500);
      this.$refs.mydetailscroll.refresh();
    },
    detailTitleClicked(e) {
      console.log(e);
      this.$refs.mydetailscroll.scrollTo(0, -e.target.dataset.index * 501, 300);
    },
    addToCart() {
      if (this.token) {
        let itemAmount = 0;
        let item = this.shopCart.find(item => {
          return item.iid == this.$route.query.iid;
        });
        console.log(item);
        
        if (item) {
          console.log(item.amount);
          itemAmount = ++item.amount;
          this.$store.commit(ADD_TO_CART,{iid:item.iid,
          amount:item.amount})
        } else {
          itemAmount = 1;
          let myShopCart = {
            title: this.detailData.result.itemInfo.title,
            price: this.detailData.result.itemInfo.highNowPrice,
            img: this.detailData.result.itemInfo.topImages[0],
            amount: itemAmount,
            iid: this.$route.query.iid
          };
          this.$store.commit(ADD_TO_CART, myShopCart);
        }
        // console.log(this.shopCart);
        // console.log(itemAmount);

        this.$message({
          message: "添加购物车成功",
          type: "success"
        });
      } else {
        this.$message({
          message: "Please log in first...",
          type: "warning"
        });
        setTimeout(() => {
          this.$router.push("/login");
        }, 500);
      }
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    getDetailInfo(this.$route.query.iid).then(res => {
      console.log(res);
      this.detailData = res;
    });
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.openFullScreen2();
  }
};
</script>
<style scoped>
.back {
  position: absolute;
  width: 44px;
  height: 44px;
  top: 0;
  left: 0;
}
.back::before {
  content: "";
  position: absolute;
  top: 10px;
  left: 20px;
  width: 20px;
  height: 20px;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  transform: rotate(45deg);
}
.navtitles {
  display: flex;
  width: 13rem;
  margin: 0 auto;
  justify-content: space-around;
}
.navtitles li {
  flex: 1;
}
.mydetailscroll {
  /* 这里不设置高度则bscroll无法滚动 */
  height: calc(100vh - 44px - 2.45rem);
}
.detailBackTop {
  position: fixed;
  bottom: 4rem;
  right: 1rem;
  z-index: 999;
}
.active {
  color: red;
}
/* @import url(); 引入css类 */
</style>