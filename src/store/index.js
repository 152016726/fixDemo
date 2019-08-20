import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import page from './modules/page';
import user from './modules/user';
import setting from "./modules/setting";
import getters from "./getters";

Vue.use(Vuex);

// 公共的store
let defStore = new Vuex.Store({
  modules:{
    app,
    page,
    user,
    setting
  },
  getters
});

export default defStore;
