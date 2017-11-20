// component methods
export function onF7Init () {
  console.info('@Settings.onF7Init()')
  const self = this
  self.bikeLabel = self.bike ? self.bike.title : self.trans('general_settings.bike.model')
  self.insurerLabel = self.insurer ? self.insurer.company : self.trans('general_settings.legal.insurance.company')
  self.insuranceDueDateLabel = self.trans('general_settings.legal.insurance.period')
  self.loadData()
  // init calendar ctrl

  const insuranceCalendar = self.$f7.calendar({
    input: '#calendar-default',
    value: self.insurerDueDate,
    onDayClick (p, dayContainer, year, month, day) {
      if (day) {
        self.$store.dispatch('setInsurerDueDate', new Date(year, month, day))
      }
      onInsuranceCalendarClose()
    }
  })
  const onInsuranceCalendarClose = () => insuranceCalendar.close()
}

export function handleError (stack) {
  const self = this
  console.error(stack)
  self.$f7.hidePreloader()
  self.$f7.addNotification({
    title: self.$app.trans('error.title'),
    message: stack.data ? stack.data : self.$app.trans('error.connection'),
    hold: 6000
  })
}

// COMMON
export function loadData () {
  const self = this
  self.$f7.showPreloader(self.trans('please_wait'))
  Promise.all([
    self.loadBikeModels(),
    self.loadInsureCompanies()
  ]).then(() => {
    console.log('Data loaded!')
    self.$f7.hidePreloader()
  })
  .catch(reason => self.handleError(reason))
}

export function trans (key) {
  return this.$app.trans(key, this.$store.getters.locale)
}

// LANGUAGE
export function setLocale (locale) {
  const self = this
  self.$f7.showIndicator()
  console.log('__ settings.setLocale()', locale)

  setTimeout(() => {
    self.$f7.hideIndicator()
    self.$store.dispatch('setLocale', locale)
    self.$app.router.load('/')
  }, 2600)
}

// APP DATA
export function clearCache () {
  const self = this
  self.$f7.confirm(self.$app.trans('general_settings.app.cache.confirm'), self.$app.trans('general_settings.app.cache.section'), () => {
    self.$f7.showIndicator()
    setTimeout(() => {
      self.$store.dispatch('appReset') // .then().catch(reason => self.handleError(reason))
      // self.$f7.alert(self.$app.trans('general_settings.app.cache.success'))
      self.$f7.hideIndicator()
      self.$app.router.load('/') // reload, must login again
    }, 2000)
  })
}
