import moment from 'moment'

export function date (val, format) {
  return val ? moment(val, format).format('LL') : '-'
}
