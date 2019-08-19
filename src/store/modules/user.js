import {login, logout} from '@/api/user';
import {resetRouter} from '@/router';
import {getAuth, removeAuth, setAuth} from '@/utils/auth';

const state = {
  token: getAuth(),
  name: '',
  avatar: ''
};

const mutations = {
  set_token: (state, token) => {
    state.token = token;
  },
  set_name: (state, name) => {
    state.name = name;
  },
  set_avatar: (state, avatar) => {
    state.avatar = avatar;
  }
};

const actions = {
  // user login
  login({commit}, userInfo) {
    const {account, password} = userInfo;
    return new Promise((resolve, reject) => {
      login({account: account.trim(), password}).then(response => {
        const {data} = response;
        commit('set_token', data.token)
        setAuth(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {

      })
    })
  }
}
