import Vue from 'vue'
import * as cache from '../../utils/cache'

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
      const _cached = cache.getJson('insurers')
      if (_cached) {
        console.log('> FROM CACHE')
        return store.commit('insurers', _cached)
      }
      Vue.axios.get('Insurers', [])
        .then(response => {
          if (response.status && parseInt(response.status) === 200) {
            // console.log('response.data', {data: response.data})
            cache.setJson('insurers', response.data)
            console.log('> PERSIST TO CACHE: insurers')
            store.commit('insurers', response.data)
          }
        })
        .catch(response => {
          console.error('axios.Insurers/error:', response)
          handleError(response)
        })
    }
  }
}
