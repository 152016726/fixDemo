import {login, logout} from '@/api/user';
import {getAuth, removeAuth, setAuth} from '@/utils/auth';
import {getInfo, removeInfo, setInfo} from '@/utils/userInfo';
import {getRole, removeRole, setRole} from '@/utils/role';
import {getAuthority, setAuthority, removeAuthority} from '@/utils/authority';
import authority from '@/common/js/authOptions';

const state = {
  token: getAuth(),
  info: JSON.parse(getInfo()),
  role: JSON.parse(getRole()),
  authority: JSON.parse(getAuthority())
};

const mutations = {
  set_token: (state, token) => {
    state.token = token;
  },
  set_info: (state, info) => {
    state.info = info;
  },
  set_role: (state, role) => {
    state.role = role;
  },
  set_authority: (state, authority) => {
    state.authority = authority
  }
};

const actions = {
  // user login
  login({commit}, userInfo) {
    const {account, password} = userInfo;
    return new Promise((resolve, reject) => {
      login({account: account.trim(), password}).then(response => {
        const {data} = response;
        // 角色权限
        let subList = data.permissionGroups.map(item => {
          let arr = item.permissions.map(item => {
            return item.permission;
          });
          return arr
        });
        let authList = [];
        subList.forEach(item => {
          authList = authList.concat(item);
        });
        for (let key in authority) {
          authority[key] = authList.indexOf(key) !== -1;
        }
        commit('set_authority', authority)
        setAuthority(authority)
        commit('set_token', data.token)
        setAuth(data.token)
        setInfo(JSON.stringify(data))
        commit('set_info', data)
        setRole(JSON.stringify(data.role))
        commit('set_role', data.role)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
