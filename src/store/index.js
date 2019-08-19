import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import page from './modules/page';

Vue.use(Vuex);

// 公共的store
let defStore = new Vuex.Store({
  modules:{
    app,
    page
  }
});

export default defStore;
