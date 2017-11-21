/* global localStorage */
import Vue from 'vue'

const handleError = (store, context, error) => {
  console.error(`> ${context}: ${error}`)
  return false // store.commit('authError')
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
            // get user data from API
            let userData = response.data
            const endpoint = `Persons/${userData.userId}?access_token=${userData.id}`
            Vue.axios.get(endpoint).then(response => {
              Object.assign(userData, response.data) // merge extra data
              // dispatch to store
              store.commit('login', userData)
            })
            .catch(response => handleError(store, 'Login', response))
          } else {
            console.error('> axios.persons/not-200:', response)
            store.commit('login', response.data)
          }
        })
        .catch(response => handleError(store, 'Login', response))
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
        .catch(response => handleError(store, 'Logout', response))
    },

    register: (store, user) => {
      // TODO: change Person fields to match API...
      console.log('>> user:', user)
      const params = {
        id: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        avatar: 'no-avatar.png',
        level: 'NoviceRider',
        active: true,
        username: user.email.split('@')[0].toLowerCase(),
        password: user.password
        // repassword: user.repassword
      }
      return Vue.axios.post('Persons', params).then(response => {
        console.log('Person.post:', response)
        if (response.status) {
          // Object.assign(response.data, { password: user.password })
          store.commit('login', response.data)
        }
      })
    }
  }
}
