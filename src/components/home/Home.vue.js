// import Vue from 'vue'
// import { mapActions, mapGetters } from 'vuex'
import bgImage from '../../assets/road-bg.png'
import bikeImage from '../../assets/my-bike.png'

const mapServiceIcon = (key) => {
  let icon = {
    'CHAIN_LUBE': 'refresh_round',
    'CHAIN_FULL_CLEAN': 'refresh_round_fill',
    'UIC_RENEWAL': 'card',
    'DEFAULT': 'info'
  }
  return (icon[key] || icon['DEFAULT'])
}

export default {
  computed: {
    isLogged () {
      return this.$store.getters.auth
    },
    services () {
      return this.$store.getters.services
    },
    error () {
      return this.$store.state.status.error
    }
  },

  data: () => {
    return {
      // isLogged: false,
      images: {
        background: bgImage,
        bike: bikeImage
      }
    }
  },

  created: () => {
    // console.log('@Home.created')
  },

  mounted: () => {
    // console.log('@Home.mounted')
  },

  methods: {
    onF7Init () {
      const self = this
      console.log('@Home.onF7Init()')
      console.log('@Home.is.authenticated?', self.isLogged)

      console.log('@Home.getNextServiceList()')
      self.getNextServiceList()

      // pull to reload event
      self.$$('.pull-to-refresh-content').on('ptr:refresh', () => {
        if (self.isLogged) {
          self.getNextServiceList()
        }
      })
    },

    handleError (stack) {
      const self = this
      console.error(stack)
      self.$f7.pullToRefreshDone()
      self.$f7.addNotification({
        title: self.$app.trans('error.title'),
        message: stack.data ? stack.data : self.$app.trans('error.connection'),
        hold: 6000
      })
    },

    getNextServiceList () {
      const self = this
      if (self.isLogged) {
        self.$f7.showPreloader(self.trans('please_wait'))
        self.$store.dispatch('services').then(() => {
          // console.log('____self.services.length:', self.services.length)
          // self.$store.dispatch('serviceCount', self.services.length)
          self.$f7.pullToRefreshDone()
          // self.$f7.initImagesLazyLoad('.homepage')
          self.$f7.hidePreloader()
        })
          .catch(reason => self.handleError(reason))
      }
    },

    serviceIcon (service) {
      return mapServiceIcon(service.typeId)
    },

    trans (key) {
      return this.$app.trans(key, this.$store.getters.locale)
    }
  },

  components: {
    navbar: require('../partials/Navbar.vue'),
    card: require('../partials/Card.vue')
  }
}
