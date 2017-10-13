import Vue from 'vue'
import moment from "moment"

const handleError = (response) => {
  return {
    error: {
      code: response.status || '999',
      message: response.statusText || ''
    }
  }
}

// const appendInfo = (data) => {
//   return data.map(d => {
//     console.log('>>> D:', d, this.$moment())
//     const color = (this.$moment().diff(this.$moment(d.date), 'days') <= 1) ? 'red' : 'yellow'
//     console.log('color:', color)
//     Object.assign(d, {color: color})
//   })
// }

export default {
  state: {
    services: [],
    status: {
      error: null
    }
  },

  getters: {
    services: (state) => {
      return state.services;
    },
    error: (state) => {
      return state.status.error;
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
      // add level and color
      const appendInfo = (data) => {
        data.map(d => {
          const level = (moment().diff(moment(d.date), 'days') <= 1) ? 1 : 2
          Object.assign(d, {level, color: (level === 1 ? 'red' : 'yellow')})
        })
        return data
      }
      return Vue.http.get('services', []).then(response => {
        // console.log('__ service.js__response', response)
        if (response.status && parseInt(response.status) === 200) {
          store.commit('services', appendInfo(response.body.result))
        }
      }, response => store.commit('error', handleError(response)))
      .catch(reason => store.commit('error', handleError(response)))
    }
  }
}
