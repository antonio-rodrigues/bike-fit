import { mapGetters } from 'vuex'

export default {
  computed: {
    bikes () {
      return this.transformToList(this.$store.getters.bikes)
    },
    insurers () {
      return this.$store.getters.insurers
    },
    error () {
      return this.$store.state.status.error
    },
    mileage: {
      get: function () {
        return this.$store.getters.mileage
      },
      set: function (newMileage) {
        return this.$store.dispatch('setMileage', newMileage)
      }
    },
    ...mapGetters([
      'locale', 'direction', 'bike', 'insurer'
    ])
  },

  data: () => {
    return {
      bikeLabel: null,
      insurerLabel: null,
      insuranceDueDateLabel: null
    }
  },

// lifecycle: init
  beforeCreate () {
    console.log('beforeCreate(): nothing gets called before me')
  },
  created () {
    console.log('created(): computed will be updated')
  },
// lifecycle: DOM
  beforeMount () {
    console.log(`beforeMount(): this.joke doesn't exist yet`)
  },
  mounted () {
    console.log('mounted(): component did mount')
  },
// Updating (Re-render)
  beforeUpdate () {
    console.log('beforeUpdate(): before the DOM updates')
  },
  updated () {
    console.log('updated(): after DOM updates')
  },
// Destruction (Teardown)
  beforeDestroy () {
    console.log('beforeDestroy(): that Chuck Norris fixed look...')
  },
  destroyed () {
    console.log('destroyed(): *PAW* You\'re gone for good!')
  },

  methods: {
    onF7Init () {
      console.info('@Settings.onF7Init()')
      const self = this
      self.bikeLabel = self.bike ? self.bike.title : self.trans('general_settings.bike.model')
      self.insurerLabel = self.insurer ? self.insurer.company : self.trans('general_settings.legal.insurance.company')
      self.insuranceDueDateLabel = self.trans('general_settings.legal.insurance.period')
      self.loadData()
      // init calendar ctrl
      self.$f7.calendar({
        input: '#calendar-default'
      })
    },

    handleError (stack) {
      const self = this
      console.error(stack)
      self.$f7.hidePreloader()
      self.$f7.addNotification({
        title: self.$app.trans('error.title'),
        message: stack.data ? stack.data : self.$app.trans('error.connection'),
        hold: 6000
      })
    },

    // COMMON
    loadData () {
      const self = this
      self.$f7.showPreloader(self.trans('please_wait'))
      Promise.all([
        self.loadBikeModels(),
        self.loadInsureCompanies()
      ]).then(() => {
        console.log('Data loaded!')
        self.$f7.hidePreloader()
      })
      .catch(reason => self.handleError(reason))
    },

    // BIKE
    transformToList (payload) {
      return payload.map(item => {
        return { title: `${item.brand} ${item.model} (${item.makeYear})`, ...item }
      })
    },

    loadBikeModels () {
      const self = this
      return self.$store.dispatch('bikes').then().catch(reason => self.handleError(reason))
    },

    searchAll (query) {
      const self = this
      let found = []
      for (var i = 0; i < self.bikes.length; i++) {
        if (self.bikes[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i)
      }
      return found
    },

    selectBike (id) {
      const self = this
      const bike = self.getBikeById(id)
      self.selectedBike = id
      self.bikeLabel = bike.title
      self.$store.dispatch('setBike', bike) // persist choice
    },

    getBikeById (id) {
      const self = this
      return self.bikes.filter(i => i.id === id)[0] || {}
    },

    // INSURER
    loadInsureCompanies () {
      const self = this
      return self.$store.dispatch('insurers').then().catch(reason => self.handleError(reason))
    },
    searchAllInsurers (query) {
      const self = this
      let found = []
      for (var i = 0; i < self.insurers.length; i++) {
        if (self.insurers[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i)
      }
      return found
    },
    selectInsurer (id) {
      const self = this
      const insurerData = self.insurers.filter(i => i.id === id)[0] || {}
      self.insurerLabel = insurerData.company
      self.$store.dispatch('setInsurer', insurerData) // persist choice
    },

    // LANGUAGE
    setLocale (locale) {
      const self = this
      self.$f7.showIndicator()
      console.log('__ settings.setLocale()', locale)

      setTimeout(() => {
        self.$f7.hideIndicator()
        self.$store.dispatch('setLocale', locale)
        self.$app.router.load('/')
      }, 2600)
    },

    clearCache () {
      const self = this
      self.$f7.confirm(self.$app.trans('general_settings.app.cache.confirm'), self.$app.trans('general_settings.app.cache.section'), () => {
        self.$f7.showIndicator()
        setTimeout(() => {
          self.$store.dispatch('appReset').then().catch(reason => self.handleError(reason))
          self.$f7.alert(self.$app.trans('general_settings.app.cache.success'))
          self.$app.router.load('/') // reload, must login again
          self.$f7.hideIndicator()
        }, 2000)
      })
    },

    cloudBackup () {
      const self = this
      console.log('__ onCloudBackup()')
      self.$f7.alert(self.$app.trans('general_settings.backup.success'), self.$app.trans('general_settings.backup.save'))
    },

    cloudRestore () {
      const self = this
      console.log('__ onCloudRestore()')
      self.$f7.alert(self.$app.trans('general_settings.backup.failure'), self.$app.trans('general_settings.backup.restore'))
    },

    showBackupInfo () {
      this.$f7.popup('.popup-info-backup')
    },

    trans (key) {
      return this.$app.trans(key, this.$store.getters.locale)
    }
  },

  components: {
    navbar: require('../partials/Navbar.vue')
  }
}
