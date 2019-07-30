// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import elementUI, {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import './common/js/torem.js';
import {get, post} from './axios';
// import CKEditor from '@ckeditor/ckeditor5-vue';
import defaultAvatar from './assets/img_user_default.png';
import defaultManImg from './assets/img_man_big.png';
import defaultWomanImg from './assets/img_woman.png';
import Print from '@/plugins/print';

// Vue.use( CKEditor );
Vue.use(Print);
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$localStore = sessionStorage;
Vue.prototype.$Message = Message;
Vue.prototype.$uploadUrl = 'http://localhost:8080/api/admin/file/upload';           // 上传请求路径
Vue.prototype.$downloadUrl = 'http://localhost:8080/api/admin/file/download/';      // 下载请求路径
Vue.prototype.$defaultAvatar = defaultAvatar;                                 // 默认头像
Vue.prototype.$defaultManImg = defaultManImg;                                 // 默认男士图片
Vue.prototype.defaultWomanImg = defaultWomanImg;                              // 默认女士图片

Vue.use(elementUI);

// Vue.config.productionTip = false

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.order) store.dispatch('setDefaultOrderPage', to.meta.order)
  if (to.name !== 'login' && !sessionStorage.getItem('auth-token')) {
    Message({
      message: '请先登录！',
      type: 'error',
      duration: 3 * 1000,
      center: true
    });
    // 跳转到登录页面
    router.push({name: 'login'});
  }else{
    next()
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
