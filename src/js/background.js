const { CANVASWIDTH, GRIDSIZE } = require('./gameData/gameConstants')
const { backgroundGrid } = require('./gameData/sprites')
const backgroundCanvas = document.getElementById('static')
const backgroundContext = backgroundCanvas.getContext('2d')

module.exports = () => {
  const tile = new Image()
  tile.src = './assets/tiles.png'

  for (let y = 0; y < 24; y++) {
    for (let x = 0; x < 36; x++) {
      backgroundContext.drawImage(tile, ...backgroundGrid[y][x], x * 25, y * 25, 25, 25)
    }
  }
}
