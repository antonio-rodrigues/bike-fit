import Vue from 'vue';

export default {

  state: {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || null,
    expiration: localStorage.getItem("expiration") || 0
  },

  getters: {
    user: function (state) {
      return state.user;
    },

    token: function (state) {
      return state.token;
    },

    expiration: function (state) {
      return state.expiration;
    },

    auth: function (state) {
      if (!state.token || !state.expiration) {
        return false;
      }
      //if (Date.now() > state.expiration) {
      //    return false;
      //}
      return true;
    }
  },

  mutations: {
    login: function (state, body) {
      console.log('__ mutations', {state, body})

      state.user = body; // .data.user;
      localStorage.setItem("user", JSON.stringify(body));

      state.token = body.email; // body.data.token;
      localStorage.setItem("token", body.email);

      state.expiration = new Date(2030,11,30) // body.data.expires;
      localStorage.setItem("expiration", state.expiration);
    },

    logout: function (state) {
      state.user = {};
      localStorage.removeItem("user");

      state.token = null;
      localStorage.removeItem("token");

      state.expiration = 0;
      localStorage.removeItem("expiration");
    }
  },

  actions: {
    login: function (store, user) {
      const params = {
        email: user.email,
        // password: user.password,
      };
      // return Vue.http.post("auth", params).then(function (response) {
      return Vue.http.get("users/1", params).then(function (response) {
        console.log('__ users.js__get.response', response)
        if (response.status) {
          store.commit("login", response.body);
        }
      });
    },

    register: function (store, user) {
      const params = {
        name: user.first_name + ' ' +user.last_name,
        username: user.email.split("@")[0].toLowerCase(),
        email: user.email,
        password: user.password,
        repassword: user.repassword,
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496"
          }
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets"
        }
      };
      return Vue.http.post("users", params).then(function (response) {
        if (response.status) {
          store.commit("login", response.body);
        }
      });
    }
  }
}
