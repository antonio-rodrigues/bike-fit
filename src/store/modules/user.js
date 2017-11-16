/* global localStorage */
import Vue from 'vue'

const handleError = (store, context, error) => {
  console.error(`> ${context}: ${error}`)
  return store.commit('authError')
}

export default {
  state: {
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || null,
    expiration: localStorage.getItem('expiration') || 0,
    authError: null
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
    },

    authError: (state) => {
      return state.authError
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
        // username: user.username,
        email: user.email,
        password: user.password
      }
      Vue.axios.post('Persons/login', params)
        .then(response => {
          if (response.status && parseInt(response.status) === 200) {
            console.info('> axios.persons/login:', response.data)
            store.commit('login', response.data)
          } else {
            console.error('> axios.persons/not-200:', response)
            store.commit('login', response.data)
          }
        })
        .catch(response => this.handleError(store, 'Login', response))
    },

    logout: (store, user) => {
      Vue.axios.post('Persons/logout', [])
        .then(response => {
          if (response.status && parseInt(response.status) === 200) {
            store.commit('logout', response.data)
          } else {
            console.error('> axios.persons/logout:', response)
            store.commit('logout')
          }
        })
        .catch(response => this.handleError(store, 'Logout', response))
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
      return Vue.axios.post('Persons', params).then(response => {
        if (response.status) {
          store.commit('login', response.body)
        }
      })
    }
  }
}
