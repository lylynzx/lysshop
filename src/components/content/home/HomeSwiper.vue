<!--  -->
<template>
  <div class="homeSwiper">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide
        class="myswiper-slide"
        v-for="item in homeData.data.banner.list"
        :key="item.image"
      >
        <img :src="item.image" alt />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import "swiper/css/swiper.css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";

export default {
  data() {
    return {
      myswiper: {},
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: true,
        loop: true
        // Some Swiper option/callback...
      }
    };
  },
  props: {
    homeData: {
      type: Object
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {},

  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.homeSwiper {
  width: 100%;
  height: 10rem;
  margin-top: 44px;
  overflow: hidden;
}
.swiper-container {
    height: 100%;
    /* 这句很重要 不然图片高度会不和外层盒子高度一致 */
}
.myswiper-slide {
  width: 100%;
  text-align: center;
  /* background-color: rosybrown; */
}
.myswiper-slide img {
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
}
</style>