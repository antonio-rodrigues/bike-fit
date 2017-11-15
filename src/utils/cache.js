/* global localStorage */
const prefix = (item) => `CACHE_${item}`

// TODO: add auto-expires and invalidate cache flag

export const get = (item) => {
  return localStorage.getItem(prefix(item)) ? JSON.stringify(localStorage.getItem(prefix(item))) : null
}

export const getJson = (item) => {
  return localStorage.getItem(prefix(item)) ? JSON.parse(localStorage.getItem(prefix(item))) : null
}

export const set = (item, payload) => {
  return localStorage.setItem(prefix(item), payload)
}

export const setJson = (item, payload) => {
  return localStorage.setItem(prefix(item), JSON.stringify(payload))
}
