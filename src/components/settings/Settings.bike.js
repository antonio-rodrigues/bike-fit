// component methods: BIKE
export function transformToList (payload) {
  return payload.map(item => {
    return { title: `${item.brand} ${item.model} (${item.makeYear})`, ...item }
  })
}

export function loadBikeModels () {
  const self = this
  return self.$store.dispatch('bikes').then().catch(reason => self.handleError(reason))
}

export function searchAll (query) {
  const self = this
  let found = []
  for (var i = 0; i < self.bikes.length; i++) {
    if (self.bikes[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i)
  }
  return found
}

export function selectBike (id) {
  const self = this
  const bike = self.getBikeById(id)
  self.selectedBike = id
  self.bikeLabel = bike.title
  self.$store.dispatch('setBike', bike) // persist choice
}

export function getBikeById (id) {
  const self = this
  return self.bikes.filter(i => i.id === id)[0] || {}
}
