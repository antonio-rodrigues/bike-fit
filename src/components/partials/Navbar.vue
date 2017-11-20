<template>
  <div class="navbar">
    <!--nav.full-toolbar-->
    <div v-if="!getOptions.back" class="navbar-inner">
      <div class="left">
        <a href="#" class="link icon-only open-panel" :data-panel="{'left': $app.isLTR(), 'right': $app.isRTL()}">
          <i class="icon icon-bars"></i>
        </a>
      </div>
      <div class="center">
        <span class="app-title">BIKE</span><span class="app-title__black">FIT</span>
      </div>
      <div class="right">
        <!-- <span v-if="$app.auth.check()">{{ $app.auth.user("username") }}</span> -->
        <a href="#" data-popover=".popover-user" class="link icon-only open-popover">
          <i class="f7-icons">person</i>
        </a>
      </div>
    </div>
    <!--nav.back-->
    <div v-if="getOptions.back" class="navbar-inner">
      <div class="left">
        <a href="#" class="link icon-only" @click="goBack()">
          <i class="icon f7-icons">arrow-left</i>
        </a>
      </div>
      <div class="center app-title">
        {{ getOptions.title }}
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'options'
  ],
  computed: {
    getOptions () {
      return Object.assign({ // default values, if not set
        title: null,
        back: false,
        modal: 'none'
      }, this.options)
    }
  },
  methods: {
    // TODO : pass this back, handle on caller component
    goBack () {
      if (this.options.modal) this.$f7.closeModal(this.options.modal)
      this.$app.router.back()
    }
  }
}
</script>
<style scoped>
  .app-title {
    color: #ffffff;
  }
  .app-title__black {
    margin-left: 2px;
    color: rgb(44, 44, 44);
  }
</style>
