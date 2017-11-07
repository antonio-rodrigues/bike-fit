/* global localStorage */

import Vue from 'vue'
import Vuex from 'vuex'
import { VALUES } from './constants'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import User from './modules/user'
import Service from './modules/service'
import Bike from './modules/bike'
import Insurers from './modules/insurers'

Vue.use(Vuex)

// app global state
const state = {
  locale: localStorage.getItem('locale') || VALUES.DEFAULT_LANG,
  bike: localStorage.getItem('bike') ? JSON.parse(localStorage.getItem('bike')) : null,
  insurer: localStorage.getItem('insurer') ? JSON.parse(localStorage.getItem('insurer')) : null,
  mileage: localStorage.getItem('mileage') || VALUES.DEFAULT_MILEAGE,
  newsTotal: 0,
  loading: false,
  success: false,
  error: false
}

export const store = new Vuex.Store({
  state,
  getters,    // state values available to components, retrieve on computed methods
  mutations,  // setters - possible mutations to state
  actions,    // actions to dispatch > commit mutation > change the state (use for async ops)
  modules: [
    User,
    Service,
    Bike,
    Insurers
  ]
})
