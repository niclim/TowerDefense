// Canvas
require('./background.js')
const init = require('./interface.js')
const loadAssets = require('./assetLoader')
loadAssets([
  './assets/biggermonster.jpg',
  './assets/tower.jpg'
]).then(() => {
  init()
}).catch((e) => {
  console.log('assets not loaded')
})
