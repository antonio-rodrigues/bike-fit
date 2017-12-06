<template>
  <div class="page toolbar-fixed profilepage" data-page="profile">

    <navbar :options="{back: true, title: $app.trans('profile.title')}"></navbar>

    <div class="page-content">
      <div class="content-block">
        <div class="card bike-card-header-pic">
          <div class="card-header color-white no-border background-photo" valign="bottom">...</div>
          <div class="card-content">
            <div class="card-content-inner">
              <a href="#" class="item-link item-content open-popup" data-popup=".popup-avatar">
                <div class="item-inner">
                  <img :src="avatar" class="avatar" />
                </div>
              </a>
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

    <!-- Avatar Popup -->
    <div class="popup popup-avatar">
      <div class="content-block">
        <p><a href="#" class="close-popup">{{ $app.trans('back') }}</a></p>
        <!--avatar-cropper-->
        <div class="text-center">
          <img v-if="userAvatar">
          <div id="pick-avatar" class="avatar-placeholder">
            <img class="image-placeholder" :src="config.imgPlaceholder" />
          </div>
          <avatar-cropper
            :uploaded="updateUserAvatar"
            :labels="config.labels"
            :uploadHandler="onUpload"
            :uploadFormData="user"
            trigger="#pick-avatar">
          </avatar-cropper>
          <p>
            <img :src="userAvatar" class="avatar" />
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AvatarCropper from 'vue-avatar-cropper'
const bgImage = require('../../assets/road-bg.png')
const cropImage = require('../../assets/select-avatar-3.png')

export default {
  computed: {
    avatar () {
      if (this.user.avatar.toString().indexOf('no-avatar') >= 0) {
        return `data:image/png;base64,${this.$app.config.get('defaultAvatar')}`
      }
      return `data:image/png;base64,${this.user.avatar}`
    },
    ...mapGetters([
      'user'
    ])
  },

  data: () => {
    return {
      images: {
        background: bgImage
      },
      config: {
        imgPlaceholder: cropImage,
        uploadUrl: 'Persons',
        labels: {
          submit: 'Ok',
          cancel: 'Cancel'
        }
      },
      loaded: false,
      userAvatar: undefined
    }
  },

  mounted () {
    this.config.labels.submit = this.$app.trans('actions.ok')
    this.config.labels.cancel = this.$app.trans('actions.cancel')
  },

  methods: {
    // onF7Init: function() {},

    updateUserAvatar(resp) {
      console.log('__updateUserAvatar', resp)
      // this.$http.patch('/users/23', {
      //   avatar: resp.relative_url
      // }).then(() => {
      //   this.userAvatar = resp.relative_url
      // })
    },
    onUpload (payload) {
      console.log('__onUpload', payload, payload.data)
      this.userAvatar = payload.element.currentSrc
      // this.user.avatar = r.image2.currentSrc
    },
    onUploadFormData (r) {
      console.log('__onUploadFormData', r)
    },
  },

  components: {
    AvatarCropper,
    navbar: require('../partials/Navbar.vue'),
    card: require('../partials/Card.vue')
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
    background: url(http://antonio-rodrigues.com/img/road-bg.png);
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

  .avatar-placeholder {
    position: relative;
    margin-top: 10px;
    background-color: black;
    width: 300px;
    height: 300px;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, 0);
    border-radius: 50%;
    opacity: 0.75;
  }
  .image-placeholder {
    width: 100%;
    height: auto;
  }
</style>
