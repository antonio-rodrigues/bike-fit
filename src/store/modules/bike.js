import Vue from 'vue'
import * as cache from '../../utils/cache'
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
      const _cached = cache.getJson('bikes')
      if (_cached) {
        console.log('> FROM CACHE')
        return store.commit('bikes', _cached)
      }
      return Vue.http.get('BikeData', []).then(response => {
        if (response.status && parseInt(response.status) === 200) {
          // console.log('response.data', {data: response.data})
          cache.setJson('bikes', response.data)
          console.log('> PERSIST TO CACHE')
          store.commit('bikes', response.data)
        }
      }, response => store.commit('bikesError', handleError(response)))
      .catch(reason => store.commit('bikesError', handleError(reason)))
    }
  }
}
