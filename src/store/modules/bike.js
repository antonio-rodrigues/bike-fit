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
    bikes: [],
    status: {
      error: null
    }
  },

  getters: {
    bikes: (state) => {
      return state.bikes
    },
    bikesError: (state) => {
      return state.status.error
    }
  },

  mutations: {
    bikes: (state, bikes) => {
      Object.assign(state, { bikes: bikes })
    },
    bikesError: (state, error) => {
      Object.assign(state.status, { error: error })
    }
  },

  actions: {
    bikes: (store, bikes) => {
      return Vue.http.get('BikeData', []).then(response => {
        if (response.status && parseInt(response.status) === 200) {
          // console.log('response.data', {data: response.data})
          store.commit('bikes', response.data)
        }
      }, response => store.commit('bikesError', handleError(response)))
      .catch(reason => store.commit('bikesError', handleError(reason)))
    }
  }
}
