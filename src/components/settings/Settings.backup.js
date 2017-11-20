// component methods: BACKUP
export function cloudBackup () {
  const self = this
  console.log('__ onCloudBackup()')
  self.$f7.alert(self.$app.trans('general_settings.backup.success'), self.$app.trans('general_settings.backup.save'))
}

export function cloudRestore () {
  const self = this
  console.log('__ onCloudRestore()')
  self.$f7.alert(self.$app.trans('general_settings.backup.failure'), self.$app.trans('general_settings.backup.restore'))
}

export function showBackupInfo () {
  this.$f7.popup('.popup-info-backup')
}
