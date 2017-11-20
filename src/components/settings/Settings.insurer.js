// component methods: INSURER
export function loadInsureCompanies () {
  const self = this
  return self.$store.dispatch('insurers').then().catch(reason => self.handleError(reason))
}

export function searchAllInsurers (query) {
  const self = this
  let found = []
  for (var i = 0; i < self.insurers.length; i++) {
    if (self.insurers[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i)
  }
  return found
}

export function selectInsurer (id) {
  const self = this
  const insurerData = self.insurers.filter(i => i.id === id)[0] || {}
  self.insurerLabel = insurerData.company
  self.$store.dispatch('setInsurer', insurerData) // persist choice
}
