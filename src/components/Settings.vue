<template>
  <div class="page" data-page="settings">

    <div class="navbar">
      <div class="navbar-inner">
        <div class="left">
          <a href="#" class="link icon-only" @click="$app.router.back()">
            <i class="icon f7-icons">arrow-left</i>
          </a>
        </div>
        <div class="center">
          {{ $app.trans("settings") }}
        </div>
        <div class="right"></div>
      </div>
    </div>

    <div class="page-content">
      <div class="content-block">
        <div class="content-block-title">{{ $app.trans("general_settings.label") }}</div>
        <div class="list-block">
          <ul>
            <li>
              <a href="#" class="item-link smart-select" data-open-in="picker" :data-back-text="$app.trans('close')" data-back-on-select="true">
                <select v-model="locale" @change="setLocale($event.target.value)">
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

    <!-- Picker:backup-options -->
    <div class="picker-modal backup-options">
      <div class="toolbar">
        <div class="toolbar-inner">
          <div class="left"></div>
          <div class="right"><a href="#" class="link close-picker">{{ $app.trans('close') }}</a></div>
        </div>
      </div>
      <div class="picker-modal-inner">
        <div class="content-block">
          <div class="list-block">
            <div class="row no-gutter backup-header">
              <div class="col-40">
                <h4>{{ $app.trans('general_settings.backup.label') }}</h4>
              </div>
              <div class="col-60">
                <i class="icon f7-icons color-bluegray">info</i>
              </div>
            </div>
            <ul>
              <li class="center">
                <a href="#" class="list-button item-link item-link-icon">
                  <i class="icon f7-icons">cloud_upload</i>
                  {{ $app.trans('general_settings.backup.save') }}
                </a>
              </li>
              <li class="center">
                <a href="#" class="list-button item-link item-link-icon center">
                  <i class="icon f7-icons">cloud_download</i>
                  {{ $app.trans('general_settings.backup.restore') }}
                </a>
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
            <i class="icon f7-icons">more_vertical</i>
          </a>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
export default {

  computed: {
    locale: {
      get: function() {
        return this.$app.locale()
      },
      set: function(locale) {
        this.$store.commit("locale", locale)
      }
    }
  },

  methods: {
    onF7Init: function() {
      console.info('>> onF7Init()')
    },

    setLocale(locale) {
      const self = this;

      self.$f7.showIndicator();

      setTimeout(() => {
        self.$f7.hideIndicator();
        self.$store.commit("locale", locale);
        self.$app.router.load("/");
      }, 2600);
    },

    trans: (key) => {
      return this.$app.trans(key, this.$store.getters.locale);
    }
  }
}
</script>

<style scoped>
  .backup-header {
    padding: 15px 0;
  }

  .backup-header h4 {
    margin: 1px 0 0;
  }

  .backup-header .f7-icons {
    font-size: 1.2em;
    /* line-height: 16px; */
  }

  .item-link-icon  .f7-icons {
    margin-right: 10px;
  }
</style>
