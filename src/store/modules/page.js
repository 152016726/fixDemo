const state = {
  orderPage: '0'                          // 当前页面的标记
};

const mutations = {
  /**
   * 更新state数据
   * @param state
   * @param data
   */
  updateState(state, data) {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        state[key] = data[key];
      }
    }
  }
};

const actions = {
  /**
   * 公共侧边栏的活跃page顺序
   * @param commit
   * @param orderPage  外部传入的page顺序
   */
  setDefaultOrderPage({commit}, orderPage) {
    if (orderPage) commit('updateState', {orderPage})
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
