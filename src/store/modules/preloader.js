/* global Image */
const done = {}

export default {
  load (assets) {
    if (!Array.isArray(assets)) {
      return Promise.reject('Preloader.load(assets) - assets should be an array')
    }

    return Promise.all(assets.map((src) => {
      if (done[src]) {
        return Promise.resolve()
      }
      return this.loadImage(src)
    }))
  },
  loadImage: function (src) {
    return new Promise((resolve, reject) => {
      let image = new Image()
      image.onload = function () {
        resolve()
      }
      image.onerror = function (err) {
        console.error('Could not preload', src, err)
        resolve() // resolve anyway
      }
      image.src = src
      done[src] = true
    })
  }
}
