import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import app from "./modules/app";
import page from "./modules/page";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules:{
    app,
    page
  },
  getters
})

export default store
