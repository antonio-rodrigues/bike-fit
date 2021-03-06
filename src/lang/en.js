export default {
  name: 'Bike Fit',
  login: 'Login',
  register: 'Register',
  logout: 'Logout',
  settings: 'Settings',
  test: 'Test',
  general_settings: {
    label: 'General Settings',
    select: 'Pick one...',
    change: 'Change...',
    app: {
      about: {
        section: 'About',
        info: 'Info'
      },
      cache: {
        section: 'Application Data',
        reset: 'Reset',
        confirm: 'This will reset all your data. Are you sure?',
        success: 'Application data cleared'
      }
    },
    bike: {
      section: 'Setup your bike',
      brand: 'Brand',
      model: 'Model',
      version: 'Version',
      year: 'Year',
      mileage: 'Mileage'
    },
    legal: {
      insurance: {
        label: 'Insurance',
        company: 'Company',
        startDate: 'Start date',
        period: 'Due date'
      },
      tax: {
        label: 'TAX',
        dueDate: 'Due date'
      }
    },
    backup: {
      label: 'Backup all settings',
      save: 'Save',
      restore: 'Restore',
      success: 'Operation successful',
      failure: 'Upssss! Something went wrong... please, try again later',
      info: {
        row1: 'This app can save your current setting to the Cloud. Click on "Save" to persist your options.',
        row2: 'Made a mistake? Cannot remember what are the previous selected options? Or you simply re-instaled the app... In that case, you easily recover your stored settings from the Cloud. Just click on "Recover".'
      }
    }
  },
  language: 'Prefered Language',
  back: 'Back',
  news_feed: 'News Feed',
  close: 'Close',
  ok: 'OK',
  open_popup: 'Open popup',
  connection_error: 'Connection Error',
  error: {
    title: 'Error',
    general: 'General error',
    connection: 'Connection Error',
    database: 'Database error',
    unknown: 'Unknown error'
  },
  email: 'Email',
  password: 'Password',
  register_new_account: 'Register a new account !',
  first_name: 'First Name',
  last_name: 'Last Name',
  confirm_password: 'Confirm Password',
  have_an_account: 'Have an account ? Sign In',
  login_success: 'You are logged in successfully',
  register_success: 'You are logged up successfully',
  logout_success: 'You are logged out successfully',
  left_menu: 'Left Menu',
  popup: 'Popup',
  cancel: 'Cancel',
  offline_message: 'You are offline',
  online_message: 'You are online',
  please_wait: 'please wait ...',
  home: {
    title: 'Home',
    like: 'Like',
    more: 'Read more',
    nextServices: 'Next services'
  },
  profile: {
    title: 'Profile',
    update: 'Update'
  },
  services: {
    type: {
      CHAIN_FULL_CLEAN: 'Chain full clean',
      CHAIN_LUBE: 'Chain lube',
      CHAIN_REPLACE: 'Replace chain',
      GARAGE: 'Garage service',
      UIC_RENEWAL: 'Renew tax'
    }
  },
  messages: {
    _default: function (e) {
      return 'The ' + e + ' value is not valid.'
    }, after: function (e, n) {
      var t = n[0]
      return 'The ' + e + ' must be after ' + t + '.'
    }, alpha_dash: function (e) {
      return 'The ' + e + ' may contain alpha-numeric characters as well as dashes and underscores.'
    }, alpha_num: function (e) {
      return 'The ' + e + ' may only contain alpha-numeric characters.'
    }, alpha_spaces: function (e) {
      return 'The ' + e + ' may only contain alphabetic characters as well as spaces.'
    }, alpha: function (e) {
      return 'The ' + e + ' may only contain alphabetic characters.'
    }, before: function (e, n) {
      var t = n[0]
      return 'The ' + e + ' must be before ' + t + '.'
    }, between: function (e, n) {
      var t = n[0], a = n[1]
      return 'The ' + e + ' must be between ' + t + ' and ' + a + '.'
    }, confirmed: function (e) {
      return 'The ' + e + ' confirmation does not match.'
    }, credit_card: function (e) {
      return 'The ' + e + ' is invalid.'
    }, date_between: function (e, n) {
      var t = n[0], a = n[1]
      return 'The ' + e + ' must be between ' + t + ' and ' + a + '.'
    }, date_format: function (e, n) {
      var t = n[0]
      return 'The ' + e + ' must be in the format ' + t + '.'
    }, decimal: function (e, n) {
      void 0 === n && (n = ['*'])
      var t = n[0]
      return 'The ' + e + ' must be numeric and may contain ' + ('*' === t ? '' : t) + ' decimal points.'
    }, digits: function (e, n) {
      var t = n[0]
      return 'The ' + e + ' must be numeric and exactly contain ' + t + ' digits.'
    }, dimensions: function (e, n) {
      var t = n[0], a = n[1]
      return 'The ' + e + ' must be ' + t + ' pixels by ' + a + ' pixels.'
    }, email: function (e) {
      return 'The ' + e + ' must be a valid email.'
    }, ext: function (e) {
      return 'The ' + e + ' must be a valid file.'
    }, image: function (e) {
      return 'The ' + e + ' must be an image.'
    }, in: function (e) {
      return 'The ' + e + ' must be a valid value.'
    }, ip: function (e) {
      return 'The ' + e + ' must be a valid ip address.'
    }, max: function (e, n) {
      var t = n[0]
      return 'The ' + e + ' may not be greater than ' + t + ' characters.'
    }, max_value: function (e, n) {
      var t = n[0]
      return 'The ' + e + ' must be ' + t + ' or less.'
    }, mimes: function (e) {
      return 'The ' + e + ' must have a valid file type.'
    }, min: function (e, n) {
      var t = n[0]
      return 'The ' + e + ' must be at least ' + t + ' characters.'
    }, min_value: function (e, n) {
      var t = n[0]
      return 'The ' + e + ' must be ' + t + ' or more.'
    }, not_in: function (e) {
      return 'The ' + e + ' must be a valid value.'
    }, numeric: function (e) {
      return 'The ' + e + ' may only contain numeric characters.'
    }, regex: function (e) {
      return 'The ' + e + ' format is invalid.'
    }, required: function (e) {
      return 'The ' + e + ' is required.'
    }, size: function (e, n) {
      var t = n[0]
      return 'The ' + e + ' must be less than ' + t + ' KB.'
    }, url: function (e) {
      return 'The ' + e + ' is not a valid URL.'
    }
  },

  attributes: {
    username: 'Username',
    email: 'Email',
    password: 'Password',
    repassword: 'Confirm Password',
    first_name: 'First name',
    last_name: 'Last Name'
  }
}
