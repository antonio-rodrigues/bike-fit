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
        <f7-list form>
          <f7-list-item smart-select smart-select-searchbar smart-select-virtual-list smart-select-back-on-select :title="selectLabel">
            <select name="selectBikeModel" @change="selectBike($event.target.value)">
              <option v-for="item in bikes" :post="item.id" :key="item.id" :value="item.id" :selected="bike && bike.id == item.id">{{ item.title }}</option>
            </select>
          </f7-list-item>
        </f7-list>
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

export default {
  computed: {
    bikes () {
      return this.transformToList(this.$store.getters.bikes)
    },
    error () {
      return this.$store.state.status.error
    },
    ...mapGetters([
      'locale', 'direction', 'bike'
    ]),
  },

  data: () => {
    return {
      selectedBike: null,
      selectLabel: null
    }
  },

  methods: {
    onF7Init () {
      console.info('@Settings.vue')
      this.loadBikeModels()
      this.selectLabel = this.trans('general_settings.bike.' + (this.bike ? 'change' : 'select'))
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

    transformToList (payload) {
      return payload.map(item => {
        return { title: `${item.brand} ${item.model} (${item.makeYear})`, ...item }
      })
    },

    loadBikeModels() {
      const self = this
      self.$f7.showPreloader(self.trans('please_wait'))
      // get from API
      self.$store.dispatch('bikes').then(() => {
        self.$f7.hidePreloader()
      }).catch(reason => self.handleError(reason))
    },

    searchAll (query) {
      var self = this
      var found = []
      for (var i = 0; i < self.bikes.length; i++) {
          if (self.bikes[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i)
      }
      return found
    },

    selectBike (id) {
      const bike = this.getBikeById(id)
      this.selectedBike = id
      this.selectLabel = bike.title || this.selectLabel
      this.$store.dispatch('setBike', bike) // persist choice
    },

    getBikeById (id) {
      return this.bikes.filter(i => i.id == id)[0] || {}
    },

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

    // goBack () {
    //   this.$f7.closeModal('.backup-options')
    //   this.$app.router.back()
    // },

    trans(key) {
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
