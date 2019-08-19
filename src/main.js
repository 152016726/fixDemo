// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import elementUI, {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import './common/js/torem.js';
import './permisson';

Vue.prototype.$localStore = sessionStorage;
Vue.prototype.$Message = Message;
Vue.prototype.$uploadUrl = 'http://localhost:8080/api/admin/file/upload';           // 上传请求路径
Vue.prototype.$downloadUrl = 'http://localhost:8080/api/admin/file/download/';      // 下载请求路径

import Print from '@/plugins/print';
Vue.use(Print);

import {get, post} from './axios';
Vue.prototype.$get = get;
Vue.prototype.$post = post;

import defaultAvatar from './assets/img_user_default.png';
import defaultManImg from './assets/img_man_big.png';
import defaultWomanImg from './assets/img_woman.png';
Vue.prototype.$defaultAvatar = defaultAvatar;                                 // 默认头像
Vue.prototype.$defaultManImg = defaultManImg;                                 // 默认男士图片
Vue.prototype.defaultWomanImg = defaultWomanImg;                              // 默认女士图片

Vue.use(elementUI);

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
