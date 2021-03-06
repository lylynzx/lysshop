import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import '@/assets/rem.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
// 解决移动端点击延迟200ms的问题
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
      FastClick.attach(document.body);
  }, false);
  
}
Vue.use(ElementUI);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: require('@/assets/logo.png'),
  attempt: 1
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
