export default [
  {
    path: '/',
    component: require('./components/Home.vue')
  },
  {
    path: '/settings',
    component: require('./components/settings/Settings.vue')
  },
  {
    path: '/login',
    component: require('./components/profile/Login.vue')
  },
  {
    path: '/register',
    component: require('./components/profile/Register.vue')
  },
  {
    path: '/profile',
    component: require('./components/profile/Profile.vue')
  },
  {
    path: '/test',
    component: require('./components/test/Test.vue')
  }
]
