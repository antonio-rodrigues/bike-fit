<template>
  <div class="page" data-page="settings">

    <navbar :options="{back: true, title: $app.trans('settings'), modal: '.backup-options'}"></navbar>

    <!-- <div class="navbar">
      <div class="navbar-inner">
        <div class="left">
          <a href="#" class="link icon-only" @click="goBack()">
            <i class="icon f7-icons">arrow-left</i>
          </a>
        </div>
        <div class="center">
          {{ $app.trans("settings") }}
        </div>
        <div class="right"></div>
      </div>
    </div> -->

    <div class="page-content">
      <div class="content-block">
        <div class="content-block-title">{{ $app.trans("general_settings.label") }}</div>
        <div class="list-block">
          <ul>
            <li>
              <a href="#" class="item-link smart-select" data-open-in="picker" :data-back-text="$app.trans('close')" data-back-on-select="true">
                <select @change="setLocale($event.target.value)">
                  <option value="en" :selected="locale === 'en'">English</option>
                  <option value="pt" :selected="locale === 'pt'">Português</option>
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
    ...mapGetters([
      'locale', 'direction'
    ])
  },

  methods: {
    onF7Init: () => {
      console.info('@Settings.vue')
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

    trans: (key) => {
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
