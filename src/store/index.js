import Vue from 'vue'
import Vuex from 'vuex'
import { post, get } from '@/utils/request'
import api from '@/services/api'
import { login } from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tableData: [],
  },
  mutations: {
    FETCH_HOME(state, action) {
      state.tableData = action
    },
  },
  actions: {
    FETCH_HOME_ACTION({ commit }) {
      get(api.homeUrl).then((res) => {
        commit("FETCH_HOME", res.data)
      })
    },
    FETCH_ACTION_ADD(context, payload) {
      post(api.addUrl, payload).then((res) => {
        if (res.code === 200) {
          context.dispatch("FETCH_HOME_ACTION")
        }
      })
    },
    FETCH_ACTION_DELETE(context, payload) {
      post(api.delUrl, payload).then((res) => {
        if (res.code === 200) {
          context.dispatch("FETCH_HOME_ACTION")
        }
      })
    },
    FETCH_ACTION_UPDATE(context, payload) {
      post(api.updateUrl, payload).then((res) => {
        if (res.code === 200) {
          context.dispatch("FETCH_HOME_ACTION")
        }
      })
    },
  },
  modules: {
    login,
  },
})
