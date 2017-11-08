/* global localStorage */

import Vue from 'vue'

export default {
  state: {
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || null,
    expiration: localStorage.getItem('expiration') || 0
  },

  getters: {
    user: (state) => {
      return state.user
    },

    token: (state) => {
      return state.token
    },

    expiration: (state) => {
      return state.expiration
    },

    auth: (state) => {
      if (!state.token || !state.expiration) {
        return false
      }
      if (Date.now() > state.expiration) {
        return false
      }
      return true
    }
  },

  mutations: {
    login: (state, body) => {
      state.user = body // .data.user;
      localStorage.setItem('user', JSON.stringify(body))

      state.token = body.id
      localStorage.setItem('token', body.id)

      state.expiration = new Date(2030, 11, 30) // body.data.expires;
      localStorage.setItem('expiration', state.expiration)
    },

    logout: (state) => {
      state.user = {}
      localStorage.removeItem('user')

      state.token = null
      localStorage.removeItem('token')

      state.expiration = 0
      localStorage.removeItem('expiration')
    }
  },

  actions: {
    login: (store, user) => {
      const params = {
        email: user.email,
        password: user.password
      }
      Vue.axios.post('/Persons/login', params)
        .then(response => {
          alert('http.persons/login:' + response.data)
          console.info('http.persons/login:', response.status, response.data)
          if (response.status && parseInt(response.status) === 200) {
            store.commit('login', response.data)
          }
        })
        .catch(response => {
          // Error
          alert('http.persons/error:' + JSON.stringify(response))
          console.error('http.persons/error:', response)
        })
    },

    register: (store, user) => {
      // TODO: change Person fields to match API...
      const params = {
        name: user.firstName + ' ' + user.lastName,
        username: user.email.split('@')[0].toLowerCase(),
        email: user.email,
        password: user.password,
        repassword: user.repassword,
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496'
          }
        },
        phone: '1-770-736-8031 x56442',
        website: 'elvis.io',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets'
        }
      }
      return Vue.http.post('Persons', params).then(response => {
        if (response.status) {
          store.commit('login', response.body)
        }
      })
    }
  }
}
