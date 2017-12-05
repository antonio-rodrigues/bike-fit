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
              <croppa
                v-model="croppa"
                :width="300"
                :height="300"
                :prevent-white-space="true"
                placeholder=""
                @new-image-drawn="onPickImage"
                @image-remove="onImageRemove"
                :class="{liner: loaded}">
               <img slot="placeholder" :src="imgPlaceholder">
              </croppa>
              <div class="buttons-row">
                <button :disabled="!loaded" @click="croppa.rotate()" class="button button-raised">rotate</button>
                <button :disabled="!loaded" @click="croppa.flipX()" class="button button-raised">flip horizontally</button>
                <button :disabled="!loaded" @click="croppa.flipY()" class="button button-raised">flip vertically</button>
              </div>
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
const cropImage = require('../../assets/select-avatar-3.png')

export default {
  computed: {},

  data: function () {
    return {
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
      },
      croppa: {},
      imgPlaceholder: cropImage,
      loaded: false
    }
  },

  methods: {
    onF7Init () {},

    onPickImage () {
      this.loaded = true
      console.log('Picked new image!')
    },
    onImageRemove () {
      this.loaded = false
    },

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

<style lang="scss" scoped>
.croppa-container {
  padding: 0;
  width: 300px;
  height: 300px;
  background-color: transparent;
}
.liner {
  border: 1px solid #BDBDBD;
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
  box-shadow: 0 0 0 1px #fff, 0 0 0 2px #999, 0 1px 3px 3px rgba(0,0,0,.2);
}
</style>
