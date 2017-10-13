import Vue from 'vue'
import Vuex from 'vuex'
import * as VALUES from './constants'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import User from './modules/user'
import Post from './modules/post'
import Service from './modules/service'

Vue.use(Vuex)

// app global state
const state = {
  locale: localStorage.getItem('locale') || VALUES.DEFAULT_LANG,
  newsTotal: 0,
  loading: false,
  success: false,
  error: false,
}

export const store = new Vuex.Store({
  state,
  getters,    // state values available to components, retrieve on computed methods
  mutations,  // setters - possible mutations to state
  actions,    // actions to dispatch > commit mutation > change the state (use for async ops)
  modules: [
    User,
    Post,
    Service
  ]
})
