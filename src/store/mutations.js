/* global localStorage */

// mutation setters - possible mutations to state
export const APP_RESET = (state, payload) => {
  localStorage.clear()
}

export const SET_TOKEN = (state, payload) => {
  state.token = payload
  localStorage.setItem('token', payload)
}

export const SET_LOCALE = (state, payload) => {
  state.locale = payload
  localStorage.setItem('locale', payload)
}

export const SET_BIKE = (state, payload) => {
  state.bike = payload
  localStorage.setItem('bike', JSON.stringify(payload))
}

export const SET_MILEAGE = (state, payload) => {
  state.mileage = payload
  localStorage.setItem('mileage', payload)
}

export const SET_INSURER = (state, payload) => {
  state.insurer = payload
  localStorage.setItem('insurer', JSON.stringify(payload))
}

export const UPDATE_NEWS_TOTAL = (state, payload) => {
  state.newsTotal = payload
}

export const LOADING = (state) => {
  state.status = {
    loading: true,
    success: false,
    error: false
  }
}

export const SUCCESS = (state) => {
  state.status = {
    loading: false,
    success: true,
    error: false
  }
}

export const ERROR = (state, payload) => {
  state.status = {
    loading: false,
    success: false,
    error: payload
  }
}

export const CLEAR_ERROR = (state) => {
  state.status = {
    loading: false,
    success: false,
    error: false
  }
}
