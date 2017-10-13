// state values available to components, retrieve on computed methods
import * as VALUES from './constants'

export const locale = (state) => {
  return state.locale
}

export const direction = (state) => {
  return state.direction || VALUES.DEFAULT_LANG_DIR
}