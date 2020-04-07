<!--  -->
<template>
  <div class="wrap">
    <div class="content">
      <slot ></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import Pubsub from 'pubsub-js'
export default {
  data() {
    return {
      bScroll: {}
    };
  },
  props:{
      pullUpLoad:{
          type:Boolean,
          default:false
      },
      probeType:{
          type:Number,
          default:0
      }
  },
  components: {
    BScroll
  },
  methods: {
    initScroll() {
      //console.log("initescroll running");

      this.bScroll = new BScroll(".wrap", {
        scrollY: true, // 默认
        click: true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad,
      });
    },
    scrollTo(x,y,time){
        //console.log('触发了bs组件的scrollto方法');
        
        this.bScroll && this.bScroll.scrollTo(x,y,time);
    },
    finishPullUp(){
        this.bScroll && this.bScroll.finishPullUp();
    },
    refresh(){
        console.log('bscroll refresh');
        
        this.bScroll && this.bScroll.refresh();
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.initScroll();
    this.bScroll && this.bScroll.on('scroll', res => {
        //console.log(res);
        this.$emit('scrolling',res);
    })//拿到创建的bscroll对象进行on方法监听scroll事件
    // console.log(this.bScroll);
    this.bScroll.on('pullingUp' ,res => {
        console.log('下拉加载更多');
        this.$emit('pullUpLoad');
    }),
    Pubsub.subscribe('refresh',()=>{
      this.refresh();
    })
  },
  
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.wrap {
  height: 100%;
}
.wrap > div {
  min-height: 100.1%;
}
</style>