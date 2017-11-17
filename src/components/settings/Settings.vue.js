import { mapGetters } from 'vuex'
import * as common from './Settings.common'
import * as bike from './Settings.bike'
import * as insurer from './Settings.insurer'
import * as backup from './Settings.backup'

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
  beforeCreate () { console.group('[LIFECYCLE]'); console.log('beforeCreate(): nothing gets called before me') },
  created () { console.log('created(): computed will be updated') },
  // lifecycle: DOM
  beforeMount () { console.log(`beforeMount(): this.joke doesn't exist yet`) },
  mounted () { console.log('mounted(): component did mount') },
  // Updating (Re-render)
  beforeUpdate () { console.log('beforeUpdate(): before the DOM updates') },
  updated () { console.log('updated(): after DOM updates') },
  // Destruction (Teardown)
  beforeDestroy () { console.log('beforeDestroy(): that Chuck Norris fixed look...') },
  destroyed () { console.log('destroyed(): *PAW* You\'re gone for good!'); console.groupEnd() },

  methods: {
    // common
    onF7Init: common.onF7Init,
    handleError: common.handleError,
    loadData: common.loadData,
    setLocale: common.setLocale,
    clearCache: common.clearCache,
    trans: common.trans,
    // Bike
    transformToList: bike.transformToList,
    loadBikeModels: bike.loadBikeModels,
    searchAll: bike.searchAll,
    selectBike: bike.selectBike,
    getBikeById: bike.getBikeById,
    // insurer
    loadInsureCompanies: insurer.loadInsureCompanies,
    searchAllInsurers: insurer.searchAllInsurers,
    selectInsurer: insurer.selectInsurer,
    // backup
    cloudBackup: backup.cloudBackup,
    cloudRestore: backup.cloudRestore,
    showBackupInfo: backup.showBackupInfo
  },

  components: {
    navbar: require('../partials/Navbar.vue')
  }
}
