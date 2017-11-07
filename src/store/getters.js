// state values available to components, retrieve on computed methods
import { VALUES } from './constants'

export const locale = (state) => {
  return state.locale
}

export const direction = (state) => {
  return state.direction || VALUES.DEFAULT_LANG_DIR
}

export const bike = (state) => {
  return state.bike || null
}

export const mileage = (state) => {
  return state.mileage || null
}

export const insurer = (state) => {
  return state.insurer || null
}
