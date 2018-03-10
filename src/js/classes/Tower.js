const towerData = require('../gameData/towerdata.js')
const { getPositionDifference } = require('../utils.js')
const Projectile = require('./Projectiles.js')
const constants = require('../gameData/gameConstants.js')

class Tower {
  constructor (position, id) {
    if (towerData[id] === undefined) {
      throw new Error('Invalid tower name, check html dataattribute or towerdata')
    }
    const loadedTowerData = towerData[id]
    this.id = id
    this.attackSpeed = loadedTowerData.attackSpeed // Attack speed
    this.cooldown = 0
    this.range = loadedTowerData.range // Range of the tower
    this.effects = loadedTowerData.effects // Special effect (e.g. slow, splash, etc)
    this.goldCost = loadedTowerData.goldCost
    this.totalCost = loadedTowerData.totalCost
    this.upgrade = loadedTowerData.upgrade
    this.targets = loadedTowerData.targets
    this.position = position // object with x and y coordinates - references the top left corner of the tower
    this.position.sideLength = constants.TOWERLENGTH
    this.renderColor = loadedTowerData.color

    this.tile = new Image()
    this.tile.src = towerData[id].icon
  }

  runCycle (activeMonsters, dt) {
    if (this.cooldown < 0) {
      // Creates projectiles up to the number of targets specified by the tower
      let firedShots = 0
      activeMonsters.forEach((monster) => {
        if (this.checkInRange(monster.position) && (firedShots < this.targets)) {
          monster.projectiles.push(new Projectile(this.id, this.position))
          firedShots++
        }
      })

      this.cooldown = this.attackSpeed
    }

    if (this.cooldown >= 0) {
      this.cooldown -= dt
    }
  }

  checkInRange (monsterPosition) {
    // using sqrt((x2-x1)^2 - (y2-y1)^2)
    const monsterDistance = getPositionDifference(monsterPosition, this.position)

    if (monsterDistance <= this.range) {
      return true
    } else {
      return false
    }
  }

  draw (active) {
    // Render tower
    dynamicContext.drawImage(
      this.tile,
      0, 0, 64, 64,
      this.position.x,
      this.position.y,
      constants.TOWERLENGTH,
      constants.TOWERLENGTH
    )
    
    // Draw range radius
    if (active) {
      dynamicContext.globalAlpha = 0.3
      dynamicContext.fillStyle = 'gray'
      dynamicContext.arc(this.position.x, this.position.y, this.range, 0, 2 * Math.PI)
      dynamicContext.fill()

      dynamicContext.globalAlpha = 1
    }
    dynamicContext.closePath()
  }
}

module.exports = Tower
