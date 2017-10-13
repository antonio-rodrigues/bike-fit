// actions to dispatch > commit mutation > change the state - use for async ops

export const setToken = (context, payload) => {
  context.commit('SET_TOKEN', payload)
}

export const setLocale = (context, payload) => {
  context.commit('SET_LOCALE', payload)
}

export const getSomeDataFromAPI = (context) => {
  context.commit('LOADING')
  Request.getFuelLog(context.getters.pagination).then(res => {
    context.commit('SET_FUEL_LOGS', res.objects.all || [])
    context.commit('SET_TOTAL', res.total || 0)
    context.commit('SUCCESS')
  })
  .catch(e => {
    context.commit('ERROR', e)
  })
}

export const updateSomeTotal = (context, payload) => {
   context.commit('UPDATE_NEWS_TOTAL', payload)
}

export const paginate = (context, payload) => {
  context.commit('SUCCESS')
  context.dispatch('updateSomeTotal', payload) // <---- you can dispatch other actions
}
