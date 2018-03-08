const monsterData = require('../gameData/monsterdata')
const { getDamageModifier, convertDistanceToCoordinates } = require('../utils')
const constants = require('../gameData/gameConstants')
const levelData = require('../gameData/leveldata')

class Monster {
  constructor (id, level) {
    this.id = id
    this.maxHp = Math.floor(levelData[level].hpMultiplier * monsterData[id].maxHp)
    this.currentHp = this.maxHp
    this.baseMs = monsterData[id].baseMs // Movement speed - "units" per second
    this.type = monsterData[id].type
    this.bounty = Math.floor(levelData[level].bountyMultiplier * monsterData[id].bounty)
    this.projectiles = []
    this.distanceTravelled = 0
    this.position = {} // Initial position is defined by the path
    this.sideLength = constants.MONSTERLENGTH
    this.effects = {}

    switch (monsterData[id].sprite) {
      case 'green':
        this.spriteDim = [32 * 1, 32, 32]
        break
      case 'orange':
        this.spriteDim = [32 * 3, 32, 32]
        break
      case 'red':
        this.spriteDim = [32 * 5, 32, 32]
        break
      case 'blue':
        this.spriteDim = [32 * 7, 32, 32]
        break
    }
    this.currentSprite = 1
    this.updateSprite = constants.UPDATESPRITETIME
    this.tile = new Image()
    this.tile.src = './assets/monsters.png'
  }

  runCycle (gamePath, dt) {
    this.move(gamePath, dt)

    this.projectiles.forEach((projectile, i, projectileArray) => {
      projectile.move(dt, this.position)
      if (projectile.end) {
        // Object.assign doesn't do deep merge - only need to go one level down to prevent reference copying
        for (let key in projectile.effects) {
          // TODO figure out how to prioritize multiple effects with different values, e.g. two slows with 0.5 and 0.2 (prioritize the higher one)

          this.effects[key] = Object.assign({}, projectile.effects[key])

          // Copy over ID so game can create antoher projectile for bounce
          if (key === 'bounce') {
            this.effects.bounce.id = projectile.id
          } else if (key === 'splash') {
            this.effects.splash.damage = projectile.damage
          }
        }

        this.updateHp(-projectile.damage * getDamageModifier(projectile.type, this.type))
        projectileArray.splice(i, 1)
      }
    })

    this.handleEffects(dt)

    this.updateSprite -= dt
    if (this.updateSprite < 0) {
      this.updateSprite = constants.UPDATESPRITETIME
      this.currentSprite = this.currentSprite >= 6 ? 1 : this.currentSprite + 1
    }
  }

  draw () {
    dynamicContext.drawImage(
      this.tile,
      this.currentSprite * 32,
      ...this.spriteDim,
      this.position.x,
      this.position.y,
      constants.MONSTERLENGTH,
      constants.MONSTERLENGTH
    )

    dynamicContext.beginPath()
    dynamicContext.fillStyle = 'red'
    dynamicContext.fillRect(
      this.position.x,
      this.position.y - constants.MONSTERLENGTH / 3,
      Math.max(constants.MONSTERLENGTH * this.currentHp / this.maxHp, 0), // Minimum value is 0 - can be caused by splash
      constants.MONSTERLENGTH / 3)
    dynamicContext.closePath()
  }

  checkDeath () {
    let status = {}

    if (this.currentHp <= 0 || this.position.end) {
      status.alive = false
      status.giveGold = !this.position.end // Does not give gold if the monster reached the end
    } else {
      status.alive = true
    }
    return status
  }

  handleEffects (dt) {
    // Loop through all the effects on the monster
    // Effects to handle: splash, slow, freeze, burn, amplify, bounce
    for (let key in this.effects) {
      switch (key) {
        case 'freeze':
          if (Math.random() < this.effects.freeze.chance) {
            this.effects.frozen = {
              timer: this.effects.freeze.timer
            }
          }
          delete this.effects[key]
          break
        case 'splash':
        case 'bounce':
          // These are handled in the game.runCycle method
          break
        case 'burn':
          this.updateHp(this.effects[key].amount * dt * -1)
        case 'slow':
        case 'amplify':
        case 'frozen':
          // Reduce timer
          this.effects[key].timer -= dt
          if (this.effects[key].timer < 0) {
            delete this.effects[key]
          }
          break
        default:
          console.log(key, 'unexpected key in effects object')
      }
    }
  }

  move (pathLines, dt) {
    let modifier = 1

    // Freeze is priority over slow (should be highest to lowest)
    if (this.effects.hasOwnProperty('frozen')) {
      modifier = 0
    } else if (this.effects.hasOwnProperty('slow')) {
      modifier = 1 - this.effects.slow.amount
    }

    this.distanceTravelled += this.baseMs * dt * modifier
    this.position = convertDistanceToCoordinates(this.distanceTravelled, pathLines)
  }

  updateHp (hpChange) {
    let modifier = 1

    // Only amplifies damage if the monster is taking damage
    if (hpChange < 0 && this.effects.hasOwnProperty('amplify')) {
      modifier = this.effects.amplify.amount
    }

    this.currentHp += hpChange * modifier

    if (this.currentHp > this.maxHp) {
      this.currentHp = this.maxHp
    }
  }
}

module.exports = Monster
