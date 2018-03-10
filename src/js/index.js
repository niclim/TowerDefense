// Canvas
const renderBackground = require('./background.js')
const init = require('./interface.js')
const loadAssets = require('./assetLoader')

// Preloads assets
loadAssets([
  './assets/biggermonster.jpg',
  './assets/tiles.png',
  './assets/monsters.png',
  './assets/basic.png',
  './assets/fire.png',
  './assets/heavy.png',
  './assets/ice.png',
  './assets/light.png'
])
.catch((e) => {
  console.log('assets not loaded')
})
.then(() => {
  renderBackground()
  init()
})
