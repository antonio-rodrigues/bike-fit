<template>
  <div class="page toolbar-fixed" data-page="avatar">

    <navbar :options="{back: true, title: $app.trans('avatar.title')}"></navbar>

    <!-- <div class="page-content">
      <div class="content-block">

        <div class="card bike-card-header-pic">
          <div class="card-header color-white no-border" valign="bottom">...</div>
          <div class="card-content">
            <div class="card-content-inner">

              <div class="content-block">
                <div class="list-block">
                  <ul>
                    <li>
                      <img :src="avatar" class="avatar" />
                    </li>
                    <li>
                      <a href="#" class="item-link item-content open-popup" data-popup=".popup-avatar">
                        <div class="item-inner">
                          <div class="item-title">Set or change avatar</div>
                          <div class="item-after"></div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
          <div class="card-footer">
            <a href="#" class="link" @click="updateAvatar">{{ $app.trans('profile.update') }}</a>
          </div>
        </div>
      </div>
    </div> -->

  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'
  // import AvatarCropper from 'vue-avatar-cropper'
  // const cropImage = require('../../assets/select-avatar-3.png')

  // export default {
  //   computed: {
  //     avatar() {
  //       if (this.user.avatar.toString().indexOf('no-avatar') >= 0) {
  //         return `data:image/png;base64,${this.$app.config.get('defaultAvatar')}`
  //       }
  //       return `data:image/png;base64,${this.user.avatar}`
  //     },
  //     ...mapGetters([
  //       'user'
  //     ])
  //   },

  //   data: function () {
  //     return {
  //       config: {
  //         labels: {
  //           'submit': 'Save',
  //           'cancel': 'Cancel'
  //         }
  //       },
  //       imgPlaceholder: cropImage,
  //       loaded: false,
  //       userAvatar: undefined
  //     }
  //   },

  //   methods: {
  //     onF7Init() { },

  //     updateUserAvatar(resp) {
  //       console.log('__updateUserAvatar', resp)
  //       // this.$http.patch('/users/23', {
  //       //   avatar: resp.relative_url
  //       // }).then(() => {
  //       //   this.userAvatar = resp.relative_url
  //       // })
  //     },

  //     setImage(e) {
  //       const file = e.target.files[0];

  //       if (!file.type.includes('image/')) {
  //         alert('Please select an image file');
  //         return;
  //       }

  //       if (typeof FileReader === 'function') {
  //         const reader = new FileReader();
  //         reader.onload = (event) => {
  //           this.imgSrc = event.target.result;
  //           // rebuild cropperjs with the updated source
  //           this.$refs.cropper.replace(event.target.result);
  //         };
  //         reader.readAsDataURL(file);
  //       } else {
  //         alert('Sorry, FileReader API not supported');
  //       }
  //     },

  //     updateAvatar() {
  //       console.info('TODO: Persist changes on API......')
  //     },

  //     register() {
  //       const self = this

  //       self.$f7.showIndicator()

  //       self.submitted = true
  //       self.$validator.validateAll(this.user).then(valid => {
  //         if (valid) {
  //           self.$store.dispatch('register', self.user).then(() => {
  //             // 200 ok response
  //             self.$f7.addNotification({
  //               title: self.$app.trans('register'),
  //               message: self.$app.trans('register_success'),
  //               hold: 2500
  //             })
  //             self.$app.router.load('/')
  //           }, response => {
  //             // other responses
  //             self.$f7.addNotification({
  //               title: self.$app.trans('register'),
  //               message: response.body.data ? response.body.data : self.$app.trans('connection_error'),
  //               hold: 8000
  //             })
  //           }).then(response => {
  //             self.submitted = false
  //             self.$f7.hideIndicator()
  //           })
  //         } else {
  //           self.$validator.errors.items.reverse().forEach(error => {
  //             self.$f7.addNotification({
  //               title: self.$app.trans('register'),
  //               message: error.msg,
  //               hold: 8000
  //             })
  //           })
  //           self.submitted = false
  //           self.$f7.hideIndicator()
  //         }
  //       })
  //     }
  //   },

  //   components: {
  //     AvatarCropper,
  //     navbar: require('../partials/Navbar.vue'),
  //     card: require('../partials/Card.vue')
  //   }
  // }
</script>

<style lang="scss" scoped>
  /* .page-content .content-block {
    margin: 0;
  }

  .card-header {
    display: none;
  }

  .card-content {
    padding-top: 15px;
  }

  .croppa-container {
    position: relative;
    padding: 0;
    width: 300px;
    height: 300px;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, 0);
    max-width: 300px;
    max-height: 300px;
    border-radius: 50%;
    box-shadow: 0 0 0 1px #fff, 0 0 0 2px #999, 0 1px 3px 3px rgba(0, 0, 0, .2);
  }

  .croppa-container canvas {
    position: relative;
    padding: 0;
    width: 300px;
    height: 300px;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    border-radius: 50%; // box-shadow: 0 0 0 1px #fff, 0 0 0 2px #999, 0 1px 3px 3px rgba(0,0,0,.2);
  }

  .liner {
    // border: 1px solid #BDBDBD;
  }

  .croppa-container:hover {
    background-color: #BDBDBD;
  }

  .buttons-row {
    margin: 20px 0;
  }

  .avatar {
    position: relative;
    top: -10px;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    max-width: 120px;
    max-height: 120px;
    border-radius: 50%;
    box-shadow: 0 0 0 1px #fff, 0 0 0 2px #999, 0 1px 3px 3px rgba(0, 0, 0, .2);
  } */
</style>
