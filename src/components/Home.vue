<template>
  <div class="page toolbar-fixed homepage" data-page="home">

    <navbar></navbar>

    <div class="page-content pull-to-refresh-content">
      <div class="pull-to-refresh-layer">
        <div class="preloader"></div>
        <!-- <div class="pull-to-refresh-arrow"></div> -->
      </div>
      <div class="content-block">
        <!-- <card v-for="post in posts" :post="post" :key="post.id" @liked="posts.filter(row => { return row.id == post.id})[0].isLiked = true"></card> -->

        <div class="card bike-card-header-pic">
          <div class="card-header color-white no-border background-photo" valign="bottom">...</div>
          <div class="card-content">
            <div class="card-content-inner">
              <img src="img/my-bike.png" class="avatar" />
              <p class="color-gray">Posted on January 25, 2017</p>
              <p>Quisque eget vestibulum nulla...</p>
            </div>
          </div>
          <div class="card-footer">
            <a href="#" class="link">Like</a>
            <a href="#" class="link">Read more</a>
          </div>
        </div>

      </div>
    </div>

    <!-- <div class="toolbar toolbar-bottom ">
      <div class="toolbar-inner">
        <a href="#" class="link">1</a>
        <a href="#" class="link">2</a>
        <a href="#" class="link">3</a>
        <a href="#" class="link">4</a>
      </div>
    </div> -->

  </div>
</template>

<script>
import Vue from 'vue'

export default {
  computed: {
    posts: function() {
      return this.$store.getters.posts;
    }
  },

  data: function() {
    return {};
  },

  mounted: function() {
    console.log("Home.vue");

    /*const self = this;

    self.$app.on("cordova", function (app) {
        app.f7.alert("cordova loaded");
    });

    self.$app.load(function (app) {
      navigator.geolocation.getCurrentPosition(function (position) {
          app.f7.alert('Latitude: ' + position.coords.latitude + '\n' +
              'Longitude: ' + position.coords.longitude + '\n' +
              'Altitude: ' + position.coords.altitude + '\n' +
              'Accuracy: ' + position.coords.accuracy + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
              'Heading: ' + position.coords.heading + '\n' +
              'Speed: ' + position.coords.speed + '\n' +
              'Timestamp: ' + position.timestamp + '\n');
      }, function (error) {
          app.f7.alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
      });

      app.f7.addNotification({
          title: 'Cordova',
          message: 'Device is ready !',
          button: {
              text: 'Close Me',
              color: 'lightgreen'
          },
          onClose: function () {
              app.f7.alert('Device : ' + app.cordova.device.manufacturer + ' ' + app.cordova.device.platform + ' ' + app.cordova.device.version)
          }
      });

      app.f7.alert("hhahahah");
    });*/
  },

  methods: {
    onF7Init: function() {
      const self = this;
      self.getPosts();

      // pull to reload event
      self.$$('.pull-to-refresh-content').on("ptr:refresh", () => {
        self.getPosts();
      });
    },

    getPosts: function() {
      const self = this;

      self.$store.dispatch("posts").then(response => {
        // success response
        self.$f7.pullToRefreshDone();
        self.$f7.initImagesLazyLoad(".homepage");
      }, response => {
        // other responses
        self.$f7.pullToRefreshDone();
        self.$f7.addNotification({
          title: self.$app.trans('login'),
          message: response.body.data ? response.body.data : self.$app.trans("connection_error"),
          hold: 8000
        });
      });
    }
  },
  components: {
    navbar: require("./partials/Navbar.vue"),
    card: require("./partials/Card.vue")
  }
}
</script>

<style scoped>
  .bike-card-header-pic .card-header {
    height: 40vw;
    background-size: cover;
    background-position: 50% 25%;
  }

  .background-photo {
    /* background: url(img/road-bg.png); */
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
