const towerData = require('../gameData/towerdata.js')
const { getPathPosition } = require('../utils.js')
const constants = require('../gameData/gameConstants.js')

// Projectiles are attached to monsters
class Projectile {
  constructor (id, towerPosition) {
    this.id = id
    this.damage = towerData[id].projectile.damage
    this.totalTravelTime = towerData[id].projectile.travelTime
    this.type = towerData[id].projectile.type
    this.effects = {}

    for (let key in towerData[id].projectile.effects) {
      this.effects[key] = Object.assign({}, towerData[id].projectile.effects[key])
    }

    this.currentTravelTime = 0
    this.end = false
    this.initialPosition = {
      x: towerPosition.x + (constants.TOWERLENGTH / 2) - (constants.PROJECTILELENGTH / 2),
      y: towerPosition.y + (constants.TOWERLENGTH / 2) - (constants.PROJECTILELENGTH / 2)
    }
    this.projectilePosition = this.initialPosition

    this.tile = new Image()
    this.tile.src = './assets/explosions.png'
    switch (towerData[id].projectile.sprite) {
      case 'explosion':
        this.sprite = [240, 60, 20, 20]
        this.projectileSize = [20, 20]
        break
    }
  }

  draw () {
    dynamicContext.drawImage(
      this.tile,
      ...this.sprite,
      this.projectilePosition.x,
      this.projectilePosition.y,
      ...this.projectileSize
    )
  }

  move(dt, targetPosition) {
    this.currentTravelTime += dt
    if (this.currentTravelTime >= this.totalTravelTime) {
      this.end = true
    }

    const fractionTravelled = this.currentTravelTime / this.totalTravelTime,
      adjustedMonsterPosition = {
        x: targetPosition.x + (constants.MONSTERLENGTH / 2) - (constants.PROJECTILELENGTH / 2),
        y: targetPosition.y + (constants.MONSTERLENGTH / 2) - (constants.PROJECTILELENGTH / 2)
      }
    this.projectilePosition = getPathPosition(this.initialPosition, adjustedMonsterPosition, fractionTravelled)

  }
}

module.exports = Projectile
