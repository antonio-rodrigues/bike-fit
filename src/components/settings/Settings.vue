<template>
  <div class="page" data-page="settings">

    <navbar :options="{back: true, title: $app.trans('settings'), modal: '.backup-options'}"></navbar>

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
                    <div class="item-title">{{ selectBikeLabel }}</div>
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
                    <div class="item-title">{{ selectInsurerLabel }}</div>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <div class="item-content">
                <div class="item-inner">
                  <div class="item-input">
                    <input type="text" placeholder="Insurance Due Date" readonly id="calendar-default">
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>

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

    <!--Picker:backup-options-->
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
import { mapGetters } from 'vuex';
let self;

export default {
  computed: {
    bikes () {
      return this.transformBikesToList(this.$store.getters.bikes)
    },
    insurers () {
      return this.$store.getters.insurers
    },
    error () {
      return this.$store.state.status.error
    },
    mileage: {
      get: function () {
        return self.$store.getters.mileage
      },
      set: function (newMileage) {
        return self.$store.dispatch('setMileage', newMileage)
      }
    },
    ...mapGetters([
      'locale', 'direction', 'bike', 'insurer'
    ])
  },

  data: () => {
    return {
      selectBikeLabel: null,
      bikeMileageLabel: null,
      selectInsurerLabel: null,
      bikeMileage: 0
    }
  },

  created () {
    self = this;
  },

  methods: {
    onF7Init () {
      self.bikeMileage = self.mileage || 0
      self.selectBikeLabel = self.bike ? self.bike.title : self.trans('general_settings.bike.model')
      self.selectInsurerLabel = self.insurer ? self.insurer.company : self.trans('general_settings.legal.insurance.company')
      self.loadData()

      var calendarDefault = self.$f7.calendar({
        input: '#calendar-default',
      })
    },

    handleError (stack) {
      console.error(stack)
      self.$f7.hidePreloader()
      self.$f7.addNotification({
        title: self.$app.trans('error.title'),
        message: stack.data ? stack.data : self.$app.trans('error.connection'),
        hold: 6000
      })
    },

    loadData () {
      self.$f7.showPreloader(self.trans('please_wait'))
      Promise.all([
        self.loadBikeModels(),
        self.loadEnsureCompanies()
      ]).then(() => {
        self.$f7.hidePreloader()
      })
      .catch(reason => self.handleError(reason))
    },

    transformBikesToList (payload) {
      return payload.map(item => {
        return { title: `${item.brand} ${item.model} (${item.makeYear})`, ...item }
      })
    },

    loadBikeModels() {
      // get from API
      self.$store.dispatch('bikes').then().catch(reason => self.handleError(reason))
    },

    searchAllBikes (query) {
      var found = []
      for (var i = 0; i < self.bikes.length; i++) {
          if (self.bikes[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i)
      }
      return found
    },

    getBikeById (id) {
      return self.bikes.filter(i => i.id == id)[0] || {}
    },

    selectBike (id) {
      const bike = self.getBikeById(id)
      self.$store.dispatch('setBike', bike) // persist choice
    },

    loadEnsureCompanies() {
      // get from API
      self.$store.dispatch('insurers').then().catch(reason => self.handleError(reason))
    },

    searchAllInsurers (query) {
      var found = []
      for (var i = 0; i < self.insurers.length; i++) {
          if (self.insurers[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i)
      }
      return found
    },

    selectInsurer (id) {
      const insurerData = self.insurers.filter(i => i.id == id)[0] || {}
      self.selectInsurerLabel = insurerData.company
      self.$store.dispatch('setInsurer', insurerData) // persist choice
    },

    setLocale (locale) {
      self.$f7.showIndicator()
      console.log('__ settings.setLocale()', locale)

      setTimeout(() => {
        self.$f7.hideIndicator()
        self.$store.dispatch('setLocale', locale)
        self.$app.router.load('/')
      }, 2600)
    },

    cloudBackup () {
      console.log('__ onCloudBackup()')
      self.$f7.alert(self.$app.trans('general_settings.backup.success'), self.$app.trans('general_settings.backup.save'))
    },

    cloudRestore () {
      console.log('__ onCloudRestore()')
      self.$f7.alert(self.$app.trans('general_settings.backup.failure'), self.$app.trans('general_settings.backup.restore'))
    },

    showBackupInfo () {
      self.$f7.popup('.popup-info-backup')
    },

    updateBikeMileage () {
      self.$store.dispatch('setBikeMileage', self.bikeMileage)
    },

    trans(key) {
      return self.$app.trans(key, self.$store.getters.locale)
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
