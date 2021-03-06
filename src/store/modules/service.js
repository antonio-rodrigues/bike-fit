import Vue from 'vue'
import * as cache from '../../utils/cache'
import moment from 'moment'

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
    services: [],
    status: {
      error: null
    }
  },

  getters: {
    services: (state) => {
      return state.services
    },
    error: (state) => {
      return state.status.error
    }
  },

  mutations: {
    services: (state, services) => {
      Object.assign(state, { services: services })
    },
    error: (state, error) => {
      Object.assign(state.status, { error: error })
    }
  },

  actions: {
    services: (store, services) => {
      // const _cached = cache.getJson('services')
      // if (_cached) {
      //   console.log('> FROM CACHE')
      //   return store.commit('services', _cached)
      // }
      // add level and color
      const appendInfo = (data) => {
        data.map(d => {
          const level = (moment().diff(moment(d.serviceDate), 'days') <= 1) ? 1 : 2
          Object.assign(d, {level, color: (level === 1 ? 'red' : 'yellow')})
        })
        return data
      }
      Vue.axios.get('Service', [])
        .then(response => {
          if (response.status && parseInt(response.status) === 200) {
            // cache.setJson('services', appendInfo(response.data))
            // console.log('> PERSIST TO CACHE')
            store.commit('services', appendInfo(response.data))
          }
        })
        .catch(response => {
          console.error('axios.Service/error:', response)
          handleError(response)
        })
    }
  }
}
