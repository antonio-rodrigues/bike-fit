<template>
  <div class="page toolbar-fixed" data-page="avatar">

    <navbar :options="{back: true, title: $app.trans('avatar.title')}"></navbar>

    <div class="page-content">
      <!-- avatar -->
      <div class="content-block">

        <div class="card bike-card-header-pic">
          <div class="card-header color-white no-border" valign="bottom">...</div>
          <div class="card-content">
            <div class="card-content-inner">
              <!--avatar-cropper-->
              <input type="file" name="image" accept="image/*"
                style="font-size: 1.0em; padding: 10px 0;"
                @change="setImage"
              />
              <br />
              <div style="max-width: 900px; display: inline-block;">
                <vue-cropper
                  ref="cropper"
                  :guides="test"
                  :view-mode="config.viewMode"
                  :drag-mode="config.dragMode"
                  :auto-crop-area="config.autoCropArea"
                  :min-container-width="config.minContainerWidth"
                  :min-container-height="config.minContainerHeight"
                  :background="config.background"
                  :rotatable="config.rotatable"
                  :aspect-ratio="config.aspectRatio"
                  :src="imgSrc"
                  alt="Source image"
                  :cropmove="cropImage">
                </vue-cropper>
              </div>
              <br />
              <img
                v-show="cropImg"
                :src="cropImg"
                class="avatar"
                alt="Cropped avatar image"
              />
              <br />
            </div>
          </div>
          <div class="card-footer">
            <a href="#" class="link" @click="updateAvatar">{{ $app.trans('profile.update') }}</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs'

export default {
  data: function () {
    return {
      test: new Boolean(true),
      valid: false,
      imgSrc: '',
      cropImg: '',
      config: {
        guides: true,
        viewMode: 2,
        dragMode: 'crop',
        autoCropArea: 0.5,
        minContainerWidth: 300,
        minContainerHeight: 300,
        background: true,
        rotatable: true,
        aspectRatio: 1 / 1
      }
    }
  },

  methods: {
    onF7Init () {},

    setImage (e) {
      const file = e.target.files[0];

      if (!file.type.includes('image/')) {
          alert('Please select an image file');
          return;
      }

      if (typeof FileReader === 'function') {
          const reader = new FileReader();
          reader.onload = (event) => {
              this.imgSrc = event.target.result;
              // rebuild cropperjs with the updated source
              this.$refs.cropper.replace(event.target.result);
          };
          reader.readAsDataURL(file);
      } else {
          alert('Sorry, FileReader API not supported');
      }
    },

    cropImage () {
        // get image data for post processing, e.g. upload or setting image src
        this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },

    rotate () {
        // guess what this does :)
        this.$refs.cropper.rotate(90);
    },

    updateAvatar () {
      console.info('TODO: Persist changes on API......')
    },

    register () {
      const self = this

      self.$f7.showIndicator()

      self.submitted = true
      self.$validator.validateAll(this.user).then(valid => {
        if (valid) {
          self.$store.dispatch('register', self.user).then(() => {
            // 200 ok response
            self.$f7.addNotification({
              title: self.$app.trans('register'),
              message: self.$app.trans('register_success'),
              hold: 2500
            })
            self.$app.router.load('/')
          }, response => {
            // other responses
            self.$f7.addNotification({
              title: self.$app.trans('register'),
              message: response.body.data ? response.body.data : self.$app.trans('connection_error'),
              hold: 8000
            })
          }).then(response => {
            self.submitted = false
            self.$f7.hideIndicator()
          })
        } else {
          self.$validator.errors.items.reverse().forEach(error => {
            self.$f7.addNotification({
              title: self.$app.trans('register'),
              message: error.msg,
              hold: 8000
            })
          })
          self.submitted = false
          self.$f7.hideIndicator()
        }
      })
    }
  },

  components: {
    navbar: require('../partials/Navbar.vue'),
    card: require('../partials/Card.vue')
  }
}
</script>

<style scoped lang="css">
cropper {
  width: 400px;
  height: 400px;
}
.croppa-container {
  width: 100%;
  background-color: white;
  border: 3px solid #424242;
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
  box-shadow: 0 0 0 1px #fff, 0 0 0 2px #999, 0 1px 3px 3px rgba(0,0,0,.2);
}
</style>
