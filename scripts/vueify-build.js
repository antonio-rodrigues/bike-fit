const fs = require('fs')
const browserify = require('browserify')
const vueify = require('vueify')

browserify('www/js/index.js')
  .transform(vueify)
  .bundle()
  .pipe(fs.createWriteStream('www/js/bundle.js'))
