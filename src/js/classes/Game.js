//  require Monster to gain access
const Monster = require('./Monster.js')
const Tower = require('./Tower.js')
const Projectile = require('./Projectiles.js')
const towerData = require('../gameData/towerdata.js')
const levelData = require('../gameData/leveldata.js')
const { checkIfInSquare, getPositionDifference, convertToBlock } = require('../utils.js')
const pathCoordinates = require('../gameData/pathdata.js')
const constants = require('../gameData/gameConstants.js')

class GameEngine {
  constructor () {
    this.userGold = constants.STARTINGGOLD
    this.level = 0
    this.userLives = constants.STARTINGLIVES
    this.activeMonsters = [] // List of active monsters in the game
    this.towers = [] // object of tower objects
    this.timer = constants.TIMEBETWEENMONSTERCREATE
    this.nextLevelCalled = false
    this.monstersToCreate = 0
    this.unfinishedProjectiles = []
    this.state = 'start' // Possible values are start, playing, won, lost
    this.gamePath = _convertPathToLines(pathCoordinates.path)
    this.gameGrid = _initiateGrid(this.gamePath)
  }

  addMonster (level) {
    // Level lookup needs to be modified to access correct levelData array index
    const monster = new Monster(levelData[level - 1].type, level)
    this.activeMonsters.push(monster)
  }

  addTower (id, position, gridPosition, goldCost) {
    this.userGold -= goldCost
    const tower = new Tower(position, id)
    this.towers.push(tower)
    // Set gameGrid positioning
    this.gameGrid[gridPosition.x][gridPosition.y] = { empty: false }
    this.gameGrid[gridPosition.x + 1][gridPosition.y] = { empty: false }
    this.gameGrid[gridPosition.x][gridPosition.y + 1] = { empty: false }
    this.gameGrid[gridPosition.x + 1][gridPosition.y + 1] = { empty: false }
  }

  /*
  Takes in a position object (location of the click)
  Returns an object with information about what is at that position
  {type: null} if nothing found
  */
  checkClickLocation (position) {
    let element = {}
    // Loops through activeMonsters
    this.activeMonsters.some((activeMonster, i) => {
      if (checkIfInSquare(position, activeMonster.position, activeMonster.sideLength)) {
        element.type = 'monster'
        element.index = i
        return true
      } else {
        return false
      }
    })

    // If nothing was found, loop through towers
    if (element.type === undefined) {
      this.towers.some((tower, i) => {
        if (checkIfInSquare(position, tower.position, tower.position.sideLength)) {
          element.type = 'tower'
          element.index = i
          return true
        } else {
          return false
        }
      })
    }

    // If no towers or monsters found return a type of null
    if (element.type === undefined) {
      element.type = null
    }

    return element
  }

  checkGameState () {
    if (this.level === constants.FINALLEVEL + 1) { // MAX level
      this.state = 'won'
    } else if (this.userLives <= 0) {
      this.state = 'lost'
    }
  }

  checkGold (goldCost) {
    return goldCost <= this.userGold
  }

  gameStart () {
    this.state = 'playing'
    this.level = 0
    this.nextLevel()
  }

  handleEffects (activeMonster, i) {
    // Handle splash,bounce here
    if (activeMonster.effects.hasOwnProperty('splash')) {
      // Search all monsters in range of this
      const splashRange = activeMonster.effects.splash.radius

      this.activeMonsters.forEach((searchMonster, j) => {
        if (i !== j) {
          const distance = getPositionDifference(searchMonster.position, activeMonster.position)
          if (distance < splashRange) {
            searchMonster.updateHp(-activeMonster.effects.splash.damage)
          }
        }
      })
      delete activeMonster.effects.splash
    } else if (activeMonster.effects.hasOwnProperty('bounce')) {
      const bounceRange = activeMonster.effects.bounce.range
      if (activeMonster.effects.bounce.amount > 0) {
        // search all monsters in range of bounce
        this.activeMonsters.some((searchMonster, j) => {
          if (i !== j) {
            const distance = getPositionDifference(searchMonster.position, activeMonster.position)
            if (distance < bounceRange) {
              const id = activeMonster.effects.bounce.id,
                position = Object.assign({}, activeMonster.position) // Shallow copy

              position.x += (constants.MONSTERLENGTH / 2) - (constants.TOWERLENGTH / 2)
              position.y += (constants.MONSTERLENGTH / 2) - (constants.TOWERLENGTH / 2)

              const addedProjectile = new Projectile(id, position)

              // Reduce the number of bounces based on previous projectile
              // TODO figure out a way to prevent bouncing to same monster - if it matters?
              addedProjectile.effects.bounce.amount = activeMonster.effects.bounce.amount - 1

              searchMonster.projectiles.push(addedProjectile)
              return true
            } else {
              // Keep searching
              return false
            }
          }
        })
      }

      delete activeMonster.effects.bounce
    }
  }

  nextLevel () {
    // Only calls the next level once - nextLevelCalled is reset on a new monster creation
    this.monstersToCreate = levelData[this.level].amount // this.level refers to the next level
    this.level++
    this.nextLevelCalled = false
  }

  /*
  placeTower handles the validation of the tower placement (position and sufficient gold)
  Takes in 3 arguments:
  towerName - string specifying what tower is being placed
  gridPosition - top left grid block of where the tower would be placed
  towerCoordinates - top left coordinate of a tower
  Returns an object with a boolean to represent whether the tower is placed and an error message if the tower was not placed
  */
  placeTower (towerName, gridPosition, towerCoordinates) {
    const goldCost = towerData[towerName].goldCost
    // Validate tower placement
    if (this.validateTowerPlacement(gridPosition) && this.checkGold(goldCost)) {
      this.addTower(towerName, towerCoordinates, gridPosition, goldCost)
      return { placed: true }
    } else {
      return {
        placed: false,
        message: this.validateTowerPlacement(gridPosition) ? constants.MESSAGENOTENOUGHGOLD : constants.MESSAGEINVALIDPLACEMENT
      }
    }
  }

  render (activeCanvasElement) {
    // send state to the display object to render
    dynamicContext.beginPath()
    dynamicContext.clearRect(0, 0, dynamicCanvas.width, dynamicCanvas.height)
    
    // Render towers first so that if monsters are larger they show above towers
    this.towers.forEach((tower, i) => {
      const active = activeCanvasElement.type === 'tower' && activeCanvasElement.index === i
      tower.draw(active)
    })
    
    //  loop through list of active monsters and render them
    this.activeMonsters.forEach((activeMonster) => {
      activeMonster.draw()
    
      // Renders projectile animations that are active for each monster
      activeMonster.projectiles.forEach((projectile) => {
        projectile.draw()
      })
    })

    // This needs to be deferred until all the monsters are drawn - prevent hp bar overlapping
    this.activeMonsters.forEach(activeMonster => {
      activeMonster.drawHealth()
    })

    this.unfinishedProjectiles.forEach((projectile) => {
      projectile.draw()
    })
    
    dynamicContext.closePath()
  }

  runCycle (dt) {
    this.checkGameState()
    // loop through active monsters and towers and run the cycle
    // Each runCycle method returns information for the gameEngine to
    // process (e.g. the monster died, tower changed)

    // Adds monsters if there are monsters to create - creates 10 per level
    if (this.monstersToCreate > 0) {
      //  timer to add monsters
      this.timer -= dt
      if (this.timer <= 0) {
        this.addMonster(this.level) // send through the level number
        this.timer = constants.TIMEBETWEENMONSTERCREATE // Every 1 second create a new monster
        this.monstersToCreate--
        this.nextLevelCalled = false
      }
    }

    // Checks whether there are any monsters left and whether all the monsters have been created
    if (this.activeMonsters.length === 0 && this.monstersToCreate === 0 && !this.nextLevelCalled) {
      setTimeout(() => this.nextLevel(), constants.TIMEBETWEENLEVELS * 1000)

      this.nextLevelCalled = true
    }

    this.activeMonsters.forEach((activeMonster, i, monsterArray) => {
      // moves the monsters and checks whether they get to the end of the cycle
      // also factor to have a projectiles array - which means that each cycle for monsters they will take damage
      activeMonster.runCycle(this.gamePath, dt)

      // Handles external effects to the monsters (splash and bounce effects)
      this.handleEffects(activeMonster, i)

      const monsterStatus = activeMonster.checkDeath()

      if (!monsterStatus.alive) {
        if (monsterStatus.giveGold) {
          this.userGold += activeMonster.bounty
        } else {
          this.userLives--
        }
        const monsterDeath = new CustomEvent('unitRemoved', { 'detail': { index: i, element: 'monster' } })
        document.dispatchEvent(monsterDeath)
        // Copy over projectiles before monster is removed- need to do direct reference copy because it's an object with prototype properties
        this.unfinishedProjectiles = activeMonster.projectiles
        this.unfinishedProjectiles.forEach((projectile) => {
          projectile.target = activeMonster.position
        })
        monsterArray.splice(i, 1)
      }
    })

    // Run tower cycles here - pass in active monsters - towers only create projectiles
    this.towers.forEach((tower) => {
      tower.runCycle(this.activeMonsters, dt) // Pass in active monsters and attach projectiles to them
    })

    this.unfinishedProjectiles.forEach((projectile, i, projectileArray) => {
      projectile.move(dt, projectile.target)
      if (projectile.end) {
        projectileArray.splice(i, 1)
      }
    })
  }

  sellTower (towerIndex) {
    const gridPosition = convertToBlock(this.towers[towerIndex].position),
      towerDeath = new CustomEvent('unitRemoved', { 'detail': { index: towerIndex, element: 'tower' } }),
      sellPrice = Math.floor(this.towers[towerIndex].totalCost * 0.75)
    // Dispatch the tower death event for the ui to update
    document.dispatchEvent(towerDeath)

    this.userGold += sellPrice
    this.towers.splice(towerIndex, 1)

    // Remove tower from the game grid
    this.gameGrid[gridPosition.x][gridPosition.y].empty = true
    this.gameGrid[gridPosition.x + 1][gridPosition.y].empty = true
    this.gameGrid[gridPosition.x][gridPosition.y + 1].empty = true
    this.gameGrid[gridPosition.x + 1][gridPosition.y + 1].empty = true
    return sellPrice
  }

  upgradeTower (towerIndex, upgradeName) {
    // Check for sufficient gold
    if (towerData[upgradeName].goldCost > this.userGold) {
      return false
    } else {
      // Create a the upgraded tower at the same position and replace that in the towers array
      var upgradedTower = new Tower(this.towers[towerIndex].position, upgradeName)
      this.userGold -= towerData[upgradeName].goldCost
      this.towers.splice(towerIndex, 1, upgradedTower)
      return true
    }
  }

  validateTowerPlacement (gridPosition) {
    // Checks all 4 positions
    const positionValid = this.gameGrid[gridPosition.x][gridPosition.y].empty &&
      this.gameGrid[gridPosition.x + 1][gridPosition.y].empty &&
      this.gameGrid[gridPosition.x][gridPosition.y + 1].empty &&
      this.gameGrid[gridPosition.x + 1][gridPosition.y + 1].empty
    return positionValid
  }
}

/*
Input: Path - an array of objects containing coordinates where the path will run to
Output: pathLines - an array of objects containing the startPoint (coordinates),
        distance of the line and direction (left, right, up, down)
*/
function _convertPathToLines (path) {
  let pathLines = []
  for (let i = 0; i < path.length - 1; i++) {
    let line = {}

    // Assume that the direction is only 4 ways
    if (path[i + 1].x - path[i].x === 0) {
      if (path[i + 1].y - path[i].y > 0) {
        line.direction = 'down'
      } else {
        line.direction = 'up'
      }
    } else {
      if (path[i + 1].x - path[i].x === 0 > 0) {
        line.direction = 'left'
      } else {
        line.direction = 'right'
      }
    }
    line.startPoint = path[i]
    line.distance = getPositionDifference(path[i], path[i + 1])
    pathLines.push(line)
  }

  return pathLines
}

/*
Converts a pathLines array (an array of objects with a startPoint,
direction and a distance) into an array of grid blocks ()
Note that there will be some overlap with blocks, however,
as they are only used to set grid positions to not empty, overlap is not an issue
*/
function _createPathBlocks (pathLines) {
  let blocks = []
  // Loops through all the pathLines and creates blocks based on that
  for (let i = 0; i < pathLines.length; i++) {
    // blockAmount refers to the amount of blocks that follow the path
    let blockAmount = Math.floor(pathLines[i].distance / constants.GRIDSIZE) + 1,
      pathDirection
    /* Set direction
        x: 1 = right
        x: -1 = left
        y: 1 = down
        y: -1 = up
        Offset values help center the grid blocks (i.e. inline with the direction)
        Side values are used to define which side the blocks are on relative to
        the path direction (i.e. horizontally or vertically)
        */
    switch (pathLines[i].direction) {
      case 'up':
        pathDirection = {
          x: 0,
          y: -1,
          xSide: constants.GRIDSIZE / 2,
          ySide: 0
        }
        break
      case 'down':
        pathDirection = {
          x: 0,
          y: 1,
          xSide: constants.GRIDSIZE / 2,
          ySide: 0
        }
        break
      case 'left':
        pathDirection = {
          x: -1,
          y: 0,
          xSide: 0,
          ySide: constants.GRIDSIZE / 2
        }
        break
      case 'right':
        pathDirection = {
          x: 1,
          y: 0,
          xSide: 0,
          ySide: constants.GRIDSIZE / 2
        }
        break
      default:
        throw new Error('Invalid direction provided in pathLines')
    }

    /*
        Creates block equal to double the amount of the blockAmount (the equivalent amount of blocks to the path distance)
        blockBefore refers to blocks either to the left or top of the path
        blockAfter refers to blocks either to the right or below of the path
        Creates block locations and gives them offsets to their center positions (for clarity in converting to blocks)
        */
    for (let j = 0; j < blockAmount; j++) {
      let blockBefore = {

          x: pathLines[i].startPoint.x -
                    pathDirection.xSide +
                    (pathDirection.x * constants.GRIDSIZE * j) +
                    (pathDirection.x * constants.GRIDSIZE / 2), // Adds a slight offset

          y: pathLines[i].startPoint.y -
                    pathDirection.ySide +
                    (pathDirection.y * constants.GRIDSIZE * j) +
                    (pathDirection.y * constants.GRIDSIZE / 2) // Adds a slight offset

        },
        blockAfter = {
          x: pathLines[i].startPoint.x +
                        pathDirection.xSide +
                        (pathDirection.x * constants.GRIDSIZE * j) +
                        (pathDirection.x * constants.GRIDSIZE / 2), // Adds a slight offset

          y: pathLines[i].startPoint.y +
                        pathDirection.ySide +
                        (pathDirection.y * constants.GRIDSIZE * j) +
                        (pathDirection.y * constants.GRIDSIZE / 2) // Adds a slight offset
        }
      // Edge case for when the path exits the screen (there is definitely a better way to handle this)
      // This is such a bad solution lol.
      if (blockBefore.x < constants.CANVASWIDTH && blockBefore.y < constants.CANVASHEIGHT) {
        blocks.push(convertToBlock(blockBefore))
      }
      if (blockAfter.x < constants.CANVASWIDTH && blockAfter.y < constants.CANVASHEIGHT) {
        blocks.push(convertToBlock(blockAfter))
      }
    }
  }

  return blocks
}

// Grid is 36 by 24
// can be initiated by [x][y] - each block has a boolean to represent whether something is there
function _initiateGrid (pathLines) {
  let grid = [],
    blocks = _createPathBlocks(pathLines),
    xGridAmount = constants.CANVASWIDTH / constants.GRIDSIZE,
    yGridAmount = constants.CANVASHEIGHT / constants.GRIDSIZE

    // Create the grid
  for (let x = 0; x < xGridAmount; x++) {
    grid[x] = []
    for (let y = 0; y < yGridAmount; y++) {
      grid[x][y] = {
        empty: true
      }
    }
  }
  // Loop through the blocks and specify the path location
  blocks.forEach((block) => {
    grid[block.x][block.y] = {
      empty: false
    }
  })

  return grid
};

module.exports = GameEngine
