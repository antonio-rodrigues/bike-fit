<template>
  <div class="page" data-page="settings">

    <navbar :options="{back: true, title: $app.trans('settings'), modal: '.backup-options'}"></navbar>

    <!--page.content-->
    <div class="page-content">

      <!--language.section-->
      <div class="content-block">
        <div class="content-block-title">{{ $app.trans("general_settings.label") }}</div>
        <div class="list-block">
          <ul>
            <li>
              <a href="#" class="item-link smart-select" data-open-in="picker" :data-back-text="$app.trans('close')" data-back-on-select="true">
                <select @change="setLocale($event.target.value)">
                  <option value="en" :selected="locale == 'en'">English</option>
                  <option value="pt" :selected="locale == 'pt'">Português</option>
                </select>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title">{{ $app.trans("language") }}</div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!--bike.section-->
      <div class="content-block">
        <div class="content-block-title">{{ $app.trans("general_settings.bike.section") }}</div>
        <div class="list-block">
          <ul>
            <li>
              <a href="#" class="item-link smart-select" data-searchbar="true" data-virtual-list="true" :data-back-text="$app.trans('close')" data-back-on-select="true">
                <select name="selectBikeModel" @change="selectBike($event.target.value)">
                  <option v-for="item in bikes" :post="item.id" :key="item.id" :value="item.id" :selected="bike && bike.id == item.id">{{ item.title }}</option>
                </select>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title">{{ bikeLabel }}</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="#" class="item-link item-content open-picker" data-picker=".bike-mileage-options">
                <div class="item-inner">
                  <div class="item-title">{{ $app.trans("general_settings.bike.mileage") }}</div>
                  <div class="item-after">{{ mileage }}</div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!--insurance.section-->
      <div class="content-block">
        <div class="content-block-title">{{ $app.trans("general_settings.legal.insurance.label") }}</div>
        <div class="list-block">
          <ul>
            <li>
              <a href="#" class="item-link smart-select" data-searchbar="true" data-virtual-list="true" :data-back-text="$app.trans('close')" data-back-on-select="true">
                <select name="selectInsurerCompany" @change="selectInsurer($event.target.value)">
                  <option v-for="item in insurers" :post="item.id" :key="item.id" :value="item.id" :selected="insurer && insurer.id == item.id">{{ item.company }}</option>
                </select>
                <div class="item-content">
                  <div class="item-inner">
                    <div class="item-title">{{ insurerLabel }}</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-title">{{ insuranceDueDateLabel }}</div>
                  <div class="item-after">
                    <div class="item-input">
                      <input type="text" placeholder="AAAA-MM-DD" readonly id="calendar-default">
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!--cache.section-->
      <div class="content-block">
        <div class="content-block-title">{{ $app.trans("general_settings.app.cache.section") }}</div>
        <div class="list-block">
          <ul>
            <li>
              <a href="#" class="item-link item-content" @click="clearCache()">
                <div class="item-inner">
                  <div class="item-title">{{ $app.trans("general_settings.app.cache.reset") }}</div>
                  <div class="item-after"></div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

    </div>
    <!--page.content-->

    <!--Picker:bike-mileage-input-->
    <div class="picker-modal bike-mileage-options">
      <div class="toolbar">
        <div class="toolbar-inner">
          <div class="left"></div>
          <div class="right"><a href="#" class="close-picker">Done</a></div>
        </div>
      </div>
      <div class="picker-modal-inner">
        <div class="content-block">
          <h4>{{ $app.trans("general_settings.bike.mileage") }}</h4>
          <div class="list-block">
            <ul>
              <li>
                <div class="item-content">
                  <div class="item-media"><i class="icon f7-icons">gear</i></div>
                  <div class="item-inner">
                    <div class="item-input">
                      <input type="number" placeholder="0" v-model.number="mileage">
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!--backup-options-->
    <div class="toolbar toolbar-bottom toolbar-fixed">
      <div class="toolbar-inner">
        <div class="left"></div>
        <div class="right">
          <a href="#" class="link icon-only right open-picker" data-picker=".backup-options">
            <i class="icon f7-icons icon-more">more_vertical</i>
          </a>
        </div>
      </div>
    </div>
    <!-- Picker:backup-options -->
    <div class="picker-modal backup-options">
      <div class="toolbar">
        <div class="toolbar-inner">
          <div class="left"></div>
          <div class="right"><a href="#" class="link close-picker">{{ $app.trans('close') }}</a></div>
        </div>
      </div>
      <div class="picker-modal-inner">
        <div class="page-content">
          <div class="content-block backup-header">
            <div class="content-block-title"><span>{{ $app.trans('general_settings.backup.label') }}</span><i class="icon f7-icons color-bluegray help-icon" @click="showBackupInfo()">info</i></div>
            <div class="list-block">
              <ul>
                <li>
                  <a href="#" class="list-button item-link item-link-icon" @click="cloudBackup($event.target.value)">
                    <i class="icon f7-icons">cloud_upload</i>
                    {{ $app.trans('general_settings.backup.save') }}
                  </a>
                </li>
                <li>
                  <a href="#" class="list-button item-link item-link-icon" @click="cloudRestore($event.target.value)">
                    <i class="icon f7-icons">cloud_download</i>
                    {{ $app.trans('general_settings.backup.restore') }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Backup Options Info Popup -->
    <div class="popup popup-info-backup">
      <div class="content-block">
        <p>Backup options</p>
        <p><a href="#" class="close-popup">{{ $app.trans('close') }}</a></p>
        <p>{{ $app.trans('general_settings.backup.info.row1') }}</p>
        <p>{{ $app.trans('general_settings.backup.info.row2') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// let self;

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
    ]),
  },

  data: () => {
    return {
      bikeLabel: null,
      insurerLabel: null,
      insuranceDueDateLabel: null
    }
  },

  methods: {
    onF7Init () {
      // console.info('@Settings.onF7Init()')
      this.bikeLabel = this.bike ? this.bike.title : this.trans('general_settings.bike.model')
      this.insurerLabel = this.insurer ? this.insurer.company : this.trans('general_settings.legal.insurance.company')
      this.insuranceDueDateLabel = this.trans('general_settings.legal.insurance.period')
      this.loadData()
      // init calendar ctrl
      const calendarDefault = this.$f7.calendar({
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

    loadBikeModels() {
      // get from API
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
      const bike = this.getBikeById(id)
      this.selectedBike = id
      this.bikeLabel = bike.title
      this.$store.dispatch('setBike', bike) // persist choice
    },

    getBikeById (id) {
      return this.bikes.filter(i => i.id == id)[0] || {}
    },

    // INSURER
    loadInsureCompanies() {
      // get from API
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
      const insurerData = this.insurers.filter(i => i.id == id)[0] || {}
      this.insurerLabel = insurerData.company
      this.$store.dispatch('setInsurer', insurerData) // persist choice
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
</script>

<style scoped>
  .backup-header {
    margin: 0;
  }

  .icon-more {
    margin-right: 6px;
  }

  .help-icon {
    font-size: 1.2em;
    margin: -4px 0 0 10px;
  }

  .item-link-icon .f7-icons {
    margin-right: 8px;
  }
</style>
