// Canvas
const renderBackground = require('./background.js')
const init = require('./interface.js')
const loadAssets = require('./assetLoader')

// Preloads assets
loadAssets([
  './assets/biggermonster.jpg',
  './assets/tower.jpg',
  './assets/tiles.png'
])
.catch((e) => {
  console.log('assets not loaded')
})
.then(() => {
  renderBackground()
  init()
})
