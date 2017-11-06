import Vue from 'vue'
// import moment from 'moment'

const handleError = (response) => {
  return {
    error: {
      code: response.status || '999',
      message: response.statusText || ''
    }
  }
}

export default {
  state: {
    insurers: [],
    status: {
      error: null
    }
  },

  getters: {
    insurers: (state) => {
      return state.insurers
    },
    insurersError: (state) => {
      return state.status.error
    }
  },

  mutations: {
    insurers: (state, insurers) => {
      Object.assign(state, { insurers })
    },
    insurersError: (state, error) => {
      Object.assign(state.status, { error: error })
    }
  },

  actions: {
    insurers: (store, insurers) => {
      return Vue.http.get('Insurers', []).then(response => {
        if (response.status && parseInt(response.status) === 200) {
          // console.log('response.data', {data: response.data})
          store.commit('insurers', response.data)
        }
      }, response => store.commit('insurersError', handleError(response)))
      .catch(reason => store.commit('insurersError', handleError(reason)))
    }
  }
}
