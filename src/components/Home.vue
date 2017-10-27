<template>
  <div class="page toolbar-fixed homepage" data-page="home">

    <navbar></navbar>

    <div class="page-content pull-to-refresh-content">
      <div class="pull-to-refresh-layer">
          <div class="preloader"></div>
          <div class="pull-to-refresh-arrow"></div>
      </div>

      <div v-if="!isLogged" class="content-block center">
        <h1><i class="f7-icons">login</i> Login, please!</h1>
      </div>

      <div v-if="isLogged" class="content-block">
        <div class="content-block center">
          <i class="f7-icons color-red size-50">settings</i>
        </div>

        <div class="content-block-title">{{ $app.trans("home.nextServices") }}</div>
        <div class="list-block">
          <ul>
            <li class="item-content" v-for="service in services" :post="service" :key="service.id">
              <div class="item-media"><i class="icon f7-icons">{{ serviceIcon(service) }}</i></div>
              <div class="item-inner">
                <div class="item-title">{{ $app.trans("services.type." + service.typeId) }}</div>
                <div class="item-after">{{ service.serviceDate.split('T')[0] }}</div>
              </div>
            </li>
          </ul>
          <div class="list-block-label">This items will generate notifications</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
// import { mapActions, mapGetters } from 'vuex'
import bgImage from '../assets/road-bg.png'
import bikeImage from '../assets/my-bike.png'

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
    services () {
      return this.$store.getters.services
    },
    error () {
      return this.$store.state.status.error
    }
  },

  data: () => {
    return {
      isLogged: false,
      images: {
        background: bgImage,
        bike: bikeImage
      }
    }
  },

  mounted: () => {
    console.log('@Home.vue')
  },

  methods: {
    onF7Init () {
      const self = this
      if (self.$app.auth.user('id')) {
        this.isLogged = true
      }
      self.getNextServiceList()
      // pull to reload event
      self.$$('.pull-to-refresh-content').on('ptr:refresh', () => {
        self.getNextServiceList()
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
      self.$store.dispatch('services').then(() => {
        self.$f7.pullToRefreshDone()
        // self.$f7.initImagesLazyLoad('.homepage')
      })
      .catch(reason => self.handleError(reason))
    },

    serviceIcon (service) {
      return mapServiceIcon(service.typeId)
    }
  },

  components: {
    navbar: require('./partials/Navbar.vue'),
    card: require('./partials/Card.vue')
  }
}
</script>

<style scoped>
  .center {
    text-align: center;
    padding: 5px;
  }
  .size-50 {
    font-size: 50px;
  }

  .bike-card-header-pic .card-header {
    height: 40vw;
    background-size: cover;
    background-position: 50% 25%;
  }

  .background-photo {
    /* background: url(../assets/road-bg.png); */
    background-color: #000000;
    opacity: 0.8;
  }

  .avatar {
    position: relative;
    top: -15px;
    left: 50%;
    right: auta;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    max-width: 110px;
    max-height: 110px;
    position: relative;
    border-radius: 50%;
    box-shadow: 0 0 0 1px #fff, 0 0 0 2px #999, 0 1px 3px 3px rgba(0,0,0,.2);
  }
</style>
