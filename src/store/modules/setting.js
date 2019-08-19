import defaultSettings from '@/settings';

const {showSettings, fixedHeader, sidebarLogo} = defaultSettings;

const state = {
  showSettings, fixedHeader, sidebarLogo
};

const mutations = {
  change_setting: (state, {key, value}) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  }
};

const actions = {
  changeSetting({commit}, data) {
    commit('change_setting', data)
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
