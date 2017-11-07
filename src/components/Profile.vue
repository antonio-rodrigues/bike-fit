<template>
  <div class="page toolbar-fixed profilepage" data-page="profile">

    <navbar :options="{back: true, title: $app.trans('profile.title')}"></navbar>

    <div class="page-content">
      <div class="content-block">
        <div class="card bike-card-header-pic">
          <div class="card-header color-white no-border background-photo" valign="bottom">...</div>
          <div class="card-content">
            <div class="card-content-inner">
              <img :src="images.avatar" class="avatar" />
              <h4>{{ bike.title }}</h4>
              <p class="color-gray">{{ user.userId }}</p>
            </div>
          </div>
          <div class="card-footer">
            <a href="#" class="link">{{ $app.trans('profile.update') }}</a>
            <!-- <a href="#" class="link">{{ $app.trans('home.more') }}</a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
import { mapGetters } from 'vuex'
import bgImage from '../assets/road-bg.png'
import avatarImage from '../assets/my-bike.png'

export default {
  computed: {
    ...mapGetters([
      'user', 'bike'
    ])
  },

  data: () => {
    return {
      images: {
        background: bgImage,
        avatar: avatarImage
      }
    }
  },

  mounted: () => {
    console.log('> Profile.vue: mounted')
  },

  methods: {
    // onF7Init: function() {},
  },

  components: {
    navbar: require('./partials/Navbar.vue'),
    card: require('./partials/Card.vue')
  }
}
</script>

<style scoped>
  .bike-card-header-pic .card-header {
    height: 35vw;
    background-size: cover;
    background-position: 50% 25%;
  }

  .background-photo {
    background: url(../assets/road-bg.png);
    background-color: #000000;
    opacity: 0.8;
  }

  .avatar {
    position: relative;
    top: -15px;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    max-width: 110px;
    max-height: 110px;
    border-radius: 50%;
    box-shadow: 0 0 0 1px #fff, 0 0 0 2px #999, 0 1px 3px 3px rgba(0,0,0,.2);
  }
</style>
