import Vue from 'vue';

export default {

  state: {
    posts: [],
  },

  getters: {
    posts: function (state) {
      // console.log('__ post.js__getters', state.posts)
      return state.posts;
    }
  },

  mutations: {
    posts: function (state, posts) {
      // state.posts = posts;
      Object.assign(state, {posts: posts})
      // console.log('__ post.js__mutations', state, posts)
    },
  },

  actions: {
    posts: function (store, posts) {
      return Vue.http.get("posts", []).then(function (response) {
        // console.log('__ post.js__response', response)
        if (response.status) {
          store.commit("posts", response.body.filter(i => i.id <= 5));
        }
      });
    },
  }
}
