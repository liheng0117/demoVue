import { post } from '@/utils/request'
import api from '@/services/api'

export default {
  namespaced: true,
  state: {
    user:""
  },
  mutations: {
    FETCH_LOGIN(state,action) {
      state.user = action;
      sessionStorage.setItem('user',action)
    }
  },
  actions: {
    FETCH_LOGIN_ACTION({ commit },payload) {
      post(api.loginUrl)
        .then((res) => {
          if (res.code===200) {
            commit('FETCH_LOGIN', res.data.token)
          }
        });
    },
  },
};
