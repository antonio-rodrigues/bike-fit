/* global localStorage */
const prefix = (item) => `CACHE_${item}`
const env = process.env

// TODO: add auto-expires and invalidate cache flag

export const get = (item) => {
  if (process.env.NODE_ENV === 'development') return null
  return localStorage.getItem(prefix(item)) ? JSON.stringify(localStorage.getItem(prefix(item))) : null
}

export const getJson = (item) => {
  if (process.env.NODE_ENV === 'development') return null
  return localStorage.getItem(prefix(item)) ? JSON.parse(localStorage.getItem(prefix(item))) : null
}

export const set = (item, payload) => {
  if (env.NODE_ENV === 'development') return null
  return localStorage.setItem(prefix(item), payload)
}

export const setJson = (item, payload) => {
  if (env.NODE_ENV === 'development') return null
  return localStorage.setItem(prefix(item), JSON.stringify(payload))
}
