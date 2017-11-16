<template>
  <div class="page no-navbar" data-page="login">

    <!-- page-content has additional login-screen content -->
    <div class="page-content login-screen-content">
      <div class="login-screen-title">
        <a href="#home">{{ $app.trans("name") }}</a>
      </div>

      <!-- Login form -->
      <form @submit.prevent="login">
        <div class="list-block">
          <ul>
            <li>
              <div class="item-content">
                <div class="item-media">
                  <i class="icon f7-icons">person</i>
                </div>
                <div class="item-inner">
                  <div class="item-title label">{{ $app.trans('email') }}</div>
                  <div class="item-input">
                    <input type="text" autocomplete="off" name="email" v-validate="'required|email'" v-model="user.email" :placeholder="$app.trans('email')">
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="item-content">
                <div class="item-media">
                  <i class="icon f7-icons">lock</i>
                </div>
                <div class="item-inner">
                  <div class="item-title label">{{ $app.trans('password') }}</div>
                  <div class="item-input">
                    <input type="password" autocomplete="off" name="password" v-validate="'required|min:10'" v-model="user.password" :placeholder="$app.trans('password')">
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <f7-block>
            <button style="width: 100%" type="submit" :disabled="submitted" class="button button-big button-fill" color="blue">{{ $app.trans('login') }}
            </button>
            <br/>
            <a href="/register" class="button button-big">{{ $app.trans('register_new_account') }}</a>
          </f7-block>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLogged () {
      return this.$store.getters.auth
    },
    loginError () {
      return this.$store.state.status.loginError
    }
  },

  data: function () {
    return {
      user: {
        // username: 'dean',
        email: 'james.dean@biker.movie',
        password: 'Password.123'
      },
      submitted: false
    }
  },

  methods: {
    onF7Init: () => {
    },

    login () {
      const self = this

      self.$f7.showIndicator()
      self.submitted = true

      self.$validator.validateAll().then(valid => {
        if (valid) {
          self.$store.dispatch('login', self.user).then(() => {
            // 200 ok response
            self.$f7.addNotification({
              title: self.$app.trans('login'),
              message: self.$app.trans('login_success'),
              hold: 1600
            })
            setTimeout(() => {
              self.$app.router.load('/')
              self.$f7.hideIndicator()
            }, 2000)
          }, response => {
            // other responses
            console.warn('Login:', JSON.stringify(response))
            self.$f7.addNotification({
              title: self.$app.trans('login'),
              message: response.body.data ? response.body.data : self.$app.trans('connection_error'),
              hold: 6000
            })
          }).then(() => {
            // finally
            self.submitted = false
            // self.$f7.hideIndicator()
          })
        } else {
          console.group('Login')
          self.$validator.errors.items.reverse().forEach(error => {
            console.error('Error:', JSON.stringify(error))
            self.$f7.addNotification({
              title: self.$app.trans('login'),
              message: error.msg,
              hold: 6000
            })
          })
          console.groupEnd()
          self.submitted = false
          self.$f7.hideIndicator()
        }
      })
    }
  }
}
</script>
