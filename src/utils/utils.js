/*
 * Hack to prevent the body from scrolling when opening an overlay
 */
export function setBodyScroll (scrollable) {
  if (scrollable) {
    document.body.classList.remove('no-scroll')
  } else {
    document.body.classList.add('no-scroll')
  }
}

export function getGeolocation () {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    } else {
      reject('geolocation')
    }
  })
}
