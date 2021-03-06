/* global Framework7, nativeclick, f7 */
import Vue from 'vue'
import App from './components/App.vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueCordova from 'vue-cordova'
import Framework7Vue from 'framework7-vue'

import Routes from './routes'
import { store } from './store/store'
import { i18n } from './i18n'

import moment from 'moment'
import VueMomentJS from 'vue-momentjs'

require('framework7')

// const session = window.sessionStorage
// const env = process.env

// Available themes
const THEMES = {
  IOS: 'ios',
  MATERIAL: 'material'
}

// set theme by device type
const theme = (Framework7.prototype.device.android ? THEMES.MATERIAL : THEMES.IOS)
require('framework7/dist/css/framework7.' + theme + '.min.css')
require('framework7/dist/css/framework7.' + theme + '.colors.min.css')
require('framework7-icons/css/framework7-icons.css')
// global styles
import './styles/app.scss'

Vue.use(Framework7Vue)
Vue.use(VueCordova, {})
Vue.use(VueMomentJS, moment)

Vue.use(VueAxios, axios)
Vue.conf = require('./config').items
Vue.prototype.$config = Vue.conf

/**
 *  Application object
 */
Vue.app = {
  vue: false,
  cordova: false,
  f7: false,
  mainView: false,
  dom: false,
  i18n: i18n,
  store: store,
  initialize: function () {
    // const self = this

    /**
     * set global API url
     */
    const API = Vue.app.config.get('api').slug

    /**
     * append access token to every request
     */
    Vue.axios = axios.create({
      baseURL: API,
      timeout: false,
      params: {}
    })

    // Add a request interceptor
    Vue.axios.interceptors.request.use(config => {
      let token = Vue.app.auth.token()
      if (token) {
        config.params['token'] = token
        // config.headers.common['Authorization'] = 'Bearer ' + token
      }
      return config
    }, error => {
      return Promise.reject(error)
    })

    Vue.axios.interceptors.response.use(response => response, error => {
      alert('>> resp.error:' + JSON.stringify(error))
      console.error('>> resp.error:', error)
      return Promise.reject(error)
    })

    // /**
    //  * set API base url
    //  * @type {string}
    //  */
    // Vue.http.options.root = Vue.app.config.get('api').slug

    // /**
    //  * append cache to every request
    //  * append access token to every request
    //  */
    // Vue.http.interceptors.push(function (request, next) {
    //   // [REQUEST] append access token
    //   request.params['token'] = Vue.app.auth.token()
    //   next()

    //   // // TODO: implement expires and invalidate cache option
    //   // let cache = null
    //   // if (request.method.toLowerCase() === 'get') {
    //   //   cache = localStorage.getItem(`CACHE_${request.url}`) ? JSON.parse(localStorage.getItem(`CACHE_${request.url}`)) : null
    //   //   if (cache) {
    //   //     console.log('> from cache', request.url)
    //   //     next(request.respondWith(cache, { status: 200, statusText: 'Ok' }))
    //   //   } else {
    //   //     console.log('> from server', request.url)
    //   //   }
    //   // }
    //   // next(response => {
    //   //   let { status, statusText, body } = response
    //   //   if (status === 200 && request.method.toLowerCase() === 'get' && !cache) {
    //   //     console.log('> persist to cache', request.url)
    //   //     localStorage.setItem(`CACHE_${request.url}`, JSON.stringify(body))
    //   //   }
    //   //   request.respondWith(body, {status, statusText})
    //   // })
    // })

    /**
     * Native click sound
     */
    Vue.cordova.on('deviceready', () => {
      nativeclick.watch(['sound-click', 'button', 'a'])
    })

    /**
     * initializing vue instance
     * @type {Vue$3|Vue}
     */
    this.vue = new Vue({
      el: '#app',
      render: h => h(App),
      i18n,
      store,
      framework7: {
        root: '#app',
        material: Vue.app.isMaterial(),
        pushState: true,
        animateNavBackIcon: true,
        routes: Routes,
        dynamicNavbar: true,
        swipePanel: Vue.app.isRTL() ? 'right' : 'left',
        modalTitle: i18n.t('name'),
        modalButtonOk: i18n.t('ok'),
        modalButtonCancel: i18n.t('cancel'),
        notificationTitle: i18n.t('name'),
        notificationHold: 1000
      },
      mounted: function () {
        // On Framework init
        document.addEventListener('page:init', (page) => {
          if (!Vue.app.f7) {
            Vue.app.f7 = Vue.app.vue.$f7Router.framework7
            Vue.app.dom = Vue.app.vue.$f7Router.dom7
          }
        })

        // On offline connection
        document.addEventListener('offline', () => {
          Vue.app.f7.addNotification({
            message: Vue.app.trans('offline_message'),
            hold: false
          })
        }, false)

        // On online connection
        document.addEventListener('online', () => {
          // Don't do any thing
          // Vue.app.f7.addNotification({ message: Vue.app.trans('online_message'), hold: false })
        }, false)
      }
    })
  },

  on: function (service, callback) {
    return document.addEventListener(service, () => {
      callback(Vue.app)
    })
  },

  /**
   * application config
   */
  config: {
    /**
     * get config item value
     * @param item
     * @returns {boolean}
     */
    get: function (item, options) {
      if (item && item.toLowerCase() === 'formatdate' && Vue.conf['date']) {
        const formatPlaceholder = store.getters.locale === 'pt' ? Vue.conf['date'].formatPt : Vue.conf['date'].formatDefault
        if (!options) return formatPlaceholder
        return Vue.moment(options).format(formatPlaceholder)
      }
      return Vue.conf[item] !== undefined ? Vue.conf[item] : false
    },

    /**
     * set config item value
     * @param name
     * @param value
     */
    set: function (name, value) {
      Vue.conf[name] = value
    }
  },

  auth: {
    /**
     * get logged user
     * @returns {boolean}
     */
    user: function (field) {
      if (field) {
        return store.getters.user[field] !== undefined ? store.getters.user[field] : false
      }

      return store.getters.user
    },

    /**
     * get user token
     * @returns {Vue.app.auth.token|*|getters.token|null|token}
     */
    token: function () {
      return store.getters.token
    },

    /**
     * get user token expiration
     * @returns {*|getters.expiration|number|expiration}
     */
    expiration: function () {
      return store.getters.expiration
    },

    /**
     * check user
     * @returns {boolean}
     */
    check: function () {
      if (store.getters.auth) {
        return true
      }

      return false
    },

    logout: function () {
      Vue.app.f7.showIndicator()

      Vue.app.f7.addNotification({
        title: Vue.app.trans('logout'),
        message: Vue.app.trans('logout_success'),
        hold: 1600
      })

      setTimeout(() => {
        Vue.app.f7.hideIndicator()
        Vue.app.store.commit('logout')
        Vue.app.router.load('/')
      }, 2000)
    }
  },

  /**
   * get current theme
   * @returns {string}
   */
  theme: function () {
    return theme
  },

  /**
   * check current theme if IOS
   * @returns {boolean}
   */
  isIOS: function () {
    return this.theme() === 'ios'
  },

  /**
   * check current theme if android/material
   * @returns {boolean}
   */
  isMaterial: function () {
    return this.theme() === 'material'
  },

  /**
   * get current application locale
   */
  locale: function () {
    return this.store.getters.locale
  },

  /**
   * get current application direction
   * @returns {string}
   */
  direction: function () {
    return this.store.getters.locale === 'ar' ? 'rtl' : 'ltr'
  },

  /**
   * check current application direction if rtl
   * @returns {boolean}
   */
  isRTL: function () {
    return this.direction() === 'rtl'
  },

  /**
   * check current application direction if ltr
   * @returns {boolean}
   */
  isLTR: function () {
    return this.direction() === 'ltr'
  },

  /**
   * get translations
   * @param key
   * @returns {TranslateResult|VueI18n.TranslateResult|*}
   */
  trans: function (key) {
    return this.i18n.t(key, this.store.getters.locale)
  },

  /**
   * application router object
   */
  router: {

    /**
     * redirect to a given url
     * @param url
     * @returns {*}
     */
    load: function (url) {
      return Vue.app.vue.$f7Router.framework7.mainView.router.loadPage(url)
    },

    /**
     * redirect to previous url
     * @returns {*}
     */
    back: function () {
      return Vue.app.vue.$f7Router.framework7.mainView.router.back()
    }
  }
}

Vue.prototype.$app = Vue.app

// APP init
Vue.app.initialize()

// Fix android Back behaviour
document.addEventListener('deviceready', () => {
  // Bind to the back button for Android
  document.addEventListener('backbutton', () => {
    // NOTE: The back button will behave differently depending on circumstance
    // If the side panel is open, close it
    if (document.querySelector('.panel-left.active')) {
      // This will do nothing when the split-view is open
      return window.f7.closePanel()
    }
    // Close modals
    // @TODO How to handle modals we shouldn't close like a login-screen?
    if (document.querySelector('.modal-in')) {
      return f7.closeModal()
    }
    // If we have a back button, we want it to go back
    if (f7.mainView.history.length > 1) {
      return f7.mainView.router.back()
    }
    // Default to closing the app
    return window.navigator.app.exitApp()
  })
})
