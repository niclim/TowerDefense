// Initiate all the components
const Tower = require('./classes/Tower.js'),
  GameEngine = require('./classes/Game.js')

// Import and declare utility functions
const {
  compileTemplate,
  getTowerData,
  getTowerEffects,
  getMonsterTypeInfo,
  addClass,
  removeClass,
  convertPositionToTower } = require('./utils.js')

const constants = require('./gameData/gameConstants.js'),
  towerData = require('./gameData/towerdata.js')

// Import templates
const baseModalTemplate = require('./components/baseModal.js'),
  actionsTemplate = require('./components/actions.js'),
  informationPanelTemplate = require('./components/informationPanel.js'),
  upgradePanelTemplate = require('./components/upgradePanel.js'),
  towerInfoTemplate = require('./components/towerInfo.js'),
  towerCardTemplate = require('./components/towerCard.js')

module.exports = () => {
  // Cache reused DOM elements
  const infoName = document.getElementById('info-name'),
    infoIcon = document.getElementById('info-icon'),
    infoBox1 = document.getElementById('info-box-1'),
    infoBox2 = document.getElementById('info-box-2'),
    infoBox3 = document.getElementById('info-box-3'),
    infoBox4 = document.getElementById('info-box-4'),
    levelInfo = document.getElementById('level'),
    goldInfo = document.getElementById('gold'),
    livesInfo = document.getElementById('lives')
  
  let towerCards,
    towerCardList = []
  
  /*
  Create state variables - These are modified on user interaction events
  State variables
  activeCanvasElement - Changed on a mouse click event on a monster, tower or nothing
  activeTowerSelected - The name of the tower that is being placed by the user
  activeMessage - Message displayed in the canvas (can be used for new levels, invalid tower placements, etc)
  canvasMousePosition -
      onCanvas - boolean to represent whether the mouse is currently on the canvas
      towerPosition - object with a grid value and coordinate value and sides
          grid - the top left block of the tower being placed - towers are a 2x2 grid
          coordinate - the top left corner coordinate
          sides - 50 px
      mousePosition - the current mouse coordinates
  */
  
  let activeCanvasElement = {type: null},
    activeTowerSelected = null,
    activeMessage = {message: null},
    canvasMousePosition = {
      onCanvas: false,
      towerPosition: {},
      mousePosition: {}
    }
  
  const game = new GameEngine() // Privatize this later
  //  creates global variables
  window.dynamicCanvas = document.getElementById('dynamic')
  window.dynamicContext = dynamicCanvas.getContext('2d')
  showStartModal()
  updateInformationPanel()
  renderTowerPanel()
  
  // Declare the game loop
  let lastTime
  function gameLoop () {
    const now = Date.now()
  
    let dt = (now - lastTime) / 1000.0 // Convert to seconds
  
    // Limit the dt so that when the browser changes tabs the game is paused - change this so that execution continues and only rendering stops?
    dt = Math.min(dt, 0.5) // Max dt is half a second
  
    game.runCycle(dt)
  
    // Renders methods based on state variables
    game.render(activeCanvasElement)
    renderInterface(dt)
  
    lastTime = now
    if (game.state === 'playing') {
      requestAnimationFrame(gameLoop)
    } else {
      showGameFinishedModal(game.state === 'won')
    }
  }
  /* =================== Modal functions ================= */
  /* ===================================================== */
  function showModal (html, background = true) {
    // create modal element and attach to dom
    const modalContainer = document.createElement('div'),
      modal = document.createElement('div')
  
    modalContainer.className = 'modal-container'
    modal.id = 'mainModal'
    modal.className = 'modal-content card-pane'
    modal.style.display = 'block'
    modal.innerHTML = html
    modal.addEventListener('click', modalClick)
  
    // create modal background and attach to dom
    const modalBackground = document.createElement('div')
    modalBackground.className = 'modal-background'
  
    if (background) {
      document.body.appendChild(modalBackground)
    } else {
      modal.className += ' tower-info'
    }
    modalContainer.appendChild(modal)
    document.body.appendChild(modalContainer)
  }
  
  function removeModal () {
    const modalElem = document.getElementById('mainModal')
    modalElem.removeEventListener('click', modalClick)
    const modalBackgroundElem = document.getElementsByClassName('modal-background')[0]
    const modalContainer = document.getElementsByClassName('modal-container')[0]
    if (modalContainer) { document.body.removeChild(modalContainer) };
    if (modalBackgroundElem) { document.body.removeChild(modalBackgroundElem) };
  }
  
  function showStartModal () {
    const actions = [
      {
        action: 'start',
        name: 'Start Game'
      },
      {
        action: 'information',
        name: 'Information'
      }
    ]
  
    const actionHtml = actions.reduce((prevAction, action) => {
      return prevAction + compileTemplate(actionsTemplate, action)
    }, '')
  
    const startModal = compileTemplate(baseModalTemplate, {
      title: 'Welcome to Ctional TD!',
      actions: actionHtml
    })
  
    showModal(startModal)
  }
  
  function showGameFinishedModal (gameWon) {
    const title = gameWon ? 'Congratulations, you won!' : 'Better luck next time',
  
      actionHtml = compileTemplate(actionsTemplate, {
        action: 'restart',
        name: 'Restart Game'
      })
  
    const gameFinishedModal = compileTemplate(baseModalTemplate, {
      title,
      content: `<p>Game is over. Do you want to play again?</p>`,
      actions: actionHtml
    })
  
    showModal(gameFinishedModal)
  }
  
  function showInformationModal () {
    const actions = [
      {
        action: 'start',
        name: 'Start Game'
      }
    ]
  
    const actionHtml = actions.reduce((prevAction, action) => {
      return prevAction + compileTemplate(actionsTemplate, action)
    }, '')
  
    const actionModal = compileTemplate(baseModalTemplate, {
      title: 'Information',
      content: `<p>Monsters are trying to reach the end of the path!!! It's your job to stop them. Luckily for you, you have ${constants.STARTINGGOLD} gold lying around to buy towers. Monsters spawn from the left size of the screen and run along the path to reach theend. Every 10 levels, there are stronger monsters that spawn which are harder to take down. Good luck!</p>`,
      actions: actionHtml,
      footerActions: ''
    })
  
    showModal(actionModal)
  }
  
  // At the moment expects only towers with upgrades should be able to access this
  function showUpgradeModal (towerIndex) {
    const towerId = game.towers[towerIndex].id,
      upgrades = towerData[towerId].upgrade,
      columnSpacing = upgrades.length === 1 ? 's6 offset-s3' : 's6'

    const modalContent = upgrades.reduce((prevUpgrade, upgradeObj) => {
      const towerInfo = getTowerData(upgradeObj.name),
        actions = compileTemplate(actionsTemplate, {
          action: 'upgrade',
          name: upgradeObj.name,
          extraData: `data-upgradename='${upgradeObj.name}'`
        })

      const upgradeContent = compileTemplate(towerInfoTemplate, {
        towerDmg: towerInfo.projectile.damage,
        towerTravel: towerInfo.projectile.travelTime,
        towerCost: towerInfo.goldCost,
        towerSpeed: towerInfo.attackSpeed,
        towerRange: towerInfo.range,
        towerTargets: towerInfo.targets,
        towerEffect: getTowerEffects(towerInfo),
        towerType: towerInfo.projectile.type
      })

      return prevUpgrade + compileTemplate(upgradePanelTemplate, {
        spacing: columnSpacing,
        imageSrc: towerData[upgradeObj.name].icon,
        title: `${upgradeObj.name} Tower`,
        content: upgradeContent,
        actions
      })
    }, '')
  
    const upgradeModal = compileTemplate(baseModalTemplate, {
      title: 'Upgrade Tower',
      content: modalContent,
      actions: '',
      footerActions: compileTemplate(actionsTemplate, {
        action: 'close',
        name: 'Close'
      })
    })
  
    showModal(upgradeModal)
  }
  
  /* ================== Render functions ================= */
  /* ===================================================== */
  function renderInterface (dt) {
    updateGameDependentInformation()
    renderTowerPlacement()
    renderMessage(dt)
  }
  
  function updateGameDependentInformation () {
    livesInfo.innerHTML = game.userLives
    goldInfo.innerHTML = game.userGold
    levelInfo.innerHTML = game.level
  
    if (activeCanvasElement.type === 'monster') {
      document.getElementById('monsterHp').innerHTML = Math.floor(game.activeMonsters[activeCanvasElement.index].currentHp)
    } else if (activeCanvasElement.type === 'tower') {
      // Add any relevant tower information here
    }
  }
  
  function renderTowerPanel () {
    let towerHtml = ''
  
    for (let key in towerData) {
      if (towerData[key].primary) {
        towerHtml += compileTemplate(towerCardTemplate, {
          name: key,
          imageSource: towerData[key].icon
        })
      }
    }
  
    document.getElementById('tower-panel').innerHTML = towerHtml
    // Store towerCards into module variables
    towerCards = Array.prototype.slice.call(document.getElementsByClassName('tower-card'))
  }
  
  // Moved this outside of the gameLoop, will only update the relevant data when necessary
  function updateInformationPanel () {
    let sectionHtml
    if (activeCanvasElement.type === 'monster') {
      sectionHtml = renderMonsterInformation(activeCanvasElement.index)
    } else if (activeCanvasElement.type === 'tower') {
      sectionHtml = renderTowerInformation(activeCanvasElement.index)
    } else {
      sectionHtml = renderDefaultInformation()
    }
    document.getElementById('informationPanel').innerHTML = sectionHtml
  }
  
  function renderMonsterInformation (index) {
    const currentHp = Math.floor(game.activeMonsters[index].currentHp),
      maxHp = game.activeMonsters[index].maxHp,
      type = game.activeMonsters[index].type,
      id = game.activeMonsters[index].id,
      moveSpeed = game.activeMonsters[index].baseMs,
      { strengths, weaknesses } = getMonsterTypeInfo(type)
  
    let content = `
      <div class="row">
          <div class="col s6 info-box">
              <div class="capitalize">HP: <span id='monsterHp'>${currentHp}</span> / ${maxHp}</div>
              <div class="capitalize">Base Movespeed: ${moveSpeed}</div>
          </div>
          <div class="col s6 info-box">
              <div class="capitalize">Type: ${type}</div>
              <div class="capitalize">Strengths: ${strengths}</div>
              <div class="capitalize">Weaknesses: ${weaknesses}</div>
          </div>
      </div>
      `
    return compileTemplate(informationPanelTemplate, {
      title: id,
      imagePath: './assets/biggermonster.jpg',
      content
    })
  }
  
  function renderTowerInformation (index) {
    const id = game.towers[index].id,
      towerInfo = getTowerData(id),
      upgradeAvailable = towerInfo.upgrade.length !== 0
    let actions
  
    if (upgradeAvailable) {
      actions = [
        { action: 'upgrade', name: 'Upgrade' },
        { action: 'sell', name: 'Sell' }
      ]
    } else {
      actions = [
        { action: 'sell', name: 'Sell' }
      ]
    }
  
    let content = actions.reduce((prevAction, action) => {
      return prevAction + compileTemplate(actionsTemplate, action)
    }, '')
  
    content += compileTemplate(towerInfoTemplate, {
      towerDmg: towerInfo.projectile.damage,
      towerTravel: towerInfo.projectile.travelTime,
      towerCost: towerInfo.goldCost,
      towerSpeed: towerInfo.attackSpeed,
      towerRange: towerInfo.range,
      towerTargets: towerInfo.targets,
      towerEffect: getTowerEffects(towerInfo),
      towerType: towerInfo.projectile.type
    })
  
    return compileTemplate(informationPanelTemplate, {
      title: id,
      imagePath: './assets/biggermonster.jpg',
      content
    })
  }
  
  function renderDefaultInformation () {
    return compileTemplate(informationPanelTemplate, {
      title: 'Ctional TD',
      imagePath: './assets/biggermonster.jpg',
      content: `
          <p>Have fun playing this game!</p>
          `
    })
  }
  
  function renderMessage (dt) {
    if (activeMessage.message === null) {
  
    } else {
      dynamicContext.globalAlpha = activeMessage.timer > 0 ? activeMessage.timer : 0 // Sets transparency to 0 if a negative number
      dynamicContext.font = constants.MESSAGEFONT
      dynamicContext.textAlign = 'center'
      dynamicContext.fillStyle = constants.MESSAGECOLOR
      dynamicContext.fillText(activeMessage.message, constants.CANVASWIDTH / 2, 50)
      dynamicContext.globalAlpha = 1
  
      if (activeMessage.timer <= 0) {
        activeMessage = {message: null} // Reset message
      } else {
        activeMessage.timer -= dt
      }
    }
  }
  
  function renderTowerPlacement () {
    if (activeTowerSelected === null || !canvasMousePosition.onCanvas) {
      return
    };
  
    const towerData = getTowerData(activeTowerSelected)
    const coordinates = canvasMousePosition.towerPosition.coordinates
  
    dynamicContext.beginPath()
    dynamicContext.globalAlpha = 0.5
  
    // Draw grid validation placement
    if (game.validateTowerPlacement(canvasMousePosition.towerPosition.grid)) {
      dynamicContext.fillStyle = 'green'
    } else {
      dynamicContext.fillStyle = 'red'
    }
    dynamicContext.fillRect(coordinates.x,
      coordinates.y,
      constants.TOWERLENGTH,
      constants.TOWERLENGTH
    )

    dynamicContext.globalAlpha = 0.7
    dynamicContext.rect(
      coordinates.x,
      coordinates.y,
      constants.TOWERLENGTH,
      constants.TOWERLENGTH
    )
    dynamicContext.fillStyle = towerData.color
    dynamicContext.fill()
  
    // Draw tower radius
    dynamicContext.globalAlpha = 0.3
    dynamicContext.arc(coordinates.x, coordinates.y, towerData.range, 0, 2 * Math.PI)
    dynamicContext.fillStyle = 'gray'
    dynamicContext.fill()
  
    dynamicContext.globalAlpha = 1
    dynamicContext.closePath()
  }
  
  /* ================ UI Event Listeners ================= */
  /* ===================================================== */
  /*
  These event listeners control the application by interacting with the game
  object and by changing the state variables (which the render functions use
  to read)
  */
  towerCards.forEach((towerCard) => {
    towerCardList.push(towerCard.getAttribute('data-tower'))
    towerCard.addEventListener('click', towerCardClick)
    addHoverInformation(towerCard)
  })
  
  document.getElementById('dynamic').onmousemove = onCanvasMouseMovement
  document.getElementById('dynamic').addEventListener('click', canvasClick)
  
  document.onkeydown = (e) => {
    if (e.keyCode === 27) {
      cancelTowerPlacement()
    }
  }
  
  // updates activeCanvasElement when monster death or tower removed affects the current selected target
  document.addEventListener('unitRemoved', (e) => {
    // Updates if the active element is the same as the type of unit removed
    if (activeCanvasElement.type === e.detail.element) {
      if (e.detail.index < activeCanvasElement.index) {
        activeCanvasElement.index-- // Update positioning in element
      } else if (e.detail.index === activeCanvasElement.index) {
        activeCanvasElement = {type: null} // Reset
      }
      updateInformationPanel()
    }
  })
  
  // Adds event listeners only to the info box
  document.getElementsByClassName('side-section left')[0].addEventListener('click', (e) => {
    if (activeCanvasElement.type === 'tower') {
      const clickTarget = e.target.getAttribute('data-action')
      switch (clickTarget) {
        case 'upgrade':
          showUpgradeModal(activeCanvasElement.index)
          break
        case 'sell':
          sellTower(activeCanvasElement.index)
          break
        case null:
          return
        default:
          console.log('Uncaught data attribute in side section action', clickTarget)
      }
    }
  })
  
  /* =================== UI Functions ==================== */
  /* ===================================================== */
  function modalClick (e) {
    const clickTarget = e.target.getAttribute('data-action')
  
    switch (clickTarget) {
      case 'start':
        startGame()
        break
      case 'restart':
        restartGame()
        break
      case 'information':
        showInformationModal()
        break
      case 'upgrade':
        const upgradeName = e.target.getAttribute('data-upgradename')
        upgradeTower(activeCanvasElement.index, upgradeName)
        break
      case 'close':
        break
      case null:
        return
      default:
        console.log('Uncaught data attribute in modal action', clickTarget)
        return
    }
    removeModal()
  }
  
  function addHoverInformation (towerCard) {
    const hoverContainer = document.createElement('div'),
      towerType = towerCard.getAttribute('data-tower'),
      towerInfo = towerData[towerType]
  
    hoverContainer.className = 'tower-info-panel card'
    hoverContainer.innerHTML = compileTemplate(towerInfoTemplate, {
      title: towerType + ' Tower',
      towerDmg: towerInfo.projectile.damage,
      towerTravel: towerInfo.projectile.travelTime,
      towerCost: towerInfo.goldCost,
      towerSpeed: towerInfo.attackSpeed,
      towerRange: towerInfo.range,
      towerTargets: towerInfo.targets,
      towerEffect: getTowerEffects(towerInfo),
      towerType: towerInfo.projectile.type
    })
  
    towerCard.appendChild(hoverContainer)
  }
  
  function restartGame () {
    game.setDefaults()
    startGame()
  }
  
  function startGame () {
    game.gameStart()
    // Sets up game loop and render loop
    lastTime = Date.now()
    gameLoop()
  }
  
  /* Click event listener on the tower cards
  Used to control what tower is being actively placed on the canvas
  4 possible flows based on the state of the interface
  1) The tower that was clicked is currently disabled:
      -> function returns
  2) No towers are actively being placed
      -> the clicked tower card now becomes the active tower being placed
  3) The clicked tower is the same as the tower actively being placed
      -> the state is reset so that no towers are actively being placed
  4) The clicked tower is different from the tower actively being placed
      -> the state is changed to the clicked tower becoming the active tower
  */
  function towerCardClick () {
    const towerName = this.getAttribute('data-tower'),
      oldTowerIndex = towerCardList.indexOf(activeTowerSelected),
      newTowerIndex = towerCardList.indexOf(towerName)
  
    if (/disabled/i.test(this.className)) {
  
    } else if (activeTowerSelected === null) {
      activeTowerSelected = towerName
      addClass(towerCards[newTowerIndex], 'active')
      canvasMousePosition.onCanvas = false
    } else if (activeTowerSelected === towerName) {
      cancelTowerPlacement()
      canvasMousePosition.onCanvas = false
    } else {
      removeClass(towerCards[oldTowerIndex], 'active')
      activeTowerSelected = towerName
      addClass(towerCards[newTowerIndex], 'active')
      canvasMousePosition.onCanvas = false
    }
  }
  
  /*
  Called from towerCardClick (when clicking the active tower card) and on an escape key press
  Resets the active tower placement state to null
  */
  function cancelTowerPlacement () {
    removeClass(towerCards[towerCardList.indexOf(activeTowerSelected)], 'active')
    activeTowerSelected = null
  }
  
  /* Mouse move event listener on the canvas
  If the active tower selected state (a tower is being placed by the user):
      -> update the position of the mouse on the canvas (used by the renderTowerPlacement function)
  otherwise:
      -> do nothing
  */
  function onCanvasMouseMovement (e) {
    if (activeTowerSelected === null) {
      return
    };
  
    const canvasContainer = this.getBoundingClientRect(),
      position = {}
  
    position.x = e.clientX - canvasContainer.left
    position.y = e.clientY - canvasContainer.top
    canvasMousePosition.mousePosition = position
    canvasMousePosition.towerPosition = convertPositionToTower(position)
    canvasMousePosition.onCanvas = true
  };
  
  /* Click event listener on the canvas
  Handles two possible canvas click scenarios
  1) A tower is selected and is actively being placed
      -> Clicking will validate the tower placement and check the user's gold
      if both are valid, will tower will be placed (by game object)
      otherwise, an error message will show up
  2) A tower is not selected and is not being placed
      -> Will check whether the click position overlaps with the bounding
      rectangle of monster or tower - if so, it will return the information
      in the information container
  */
  function canvasClick (e) {
    // Get click location relative to the canvas element
    const canvasContainer = this.getBoundingClientRect(),
      position = {},
      towerGridPosition = canvasMousePosition.towerPosition.grid,
      towerCoordinates = canvasMousePosition.towerPosition.coordinates // Passes in grid blocks - this is the topLeft block
  
    position.x = e.clientX - canvasContainer.left
    position.y = e.clientY - canvasContainer.top
  
    // Runs if the user is placing a tower
    if (activeTowerSelected !== null) {
      const towerName = activeTowerSelected,
        towerPlaced = game.placeTower(towerName, towerGridPosition, towerCoordinates)
  
      // If the tower was not placed, show an error message
      if (!towerPlaced.placed) {
        activeMessage = {
          message: towerPlaced.message,
          timer: constants.MESSAGEDURATION // seconds
        }
      }
  
      removeClass(towerCards[towerCardList.indexOf(activeTowerSelected)], 'active')
      activeTowerSelected = null
    } else {
      // User is not running a tower placement
      activeCanvasElement = game.checkClickLocation(position)
      updateInformationPanel()
    }
  }
  
  function sellTower (towerIndex) {
    const sellPrice = game.sellTower(towerIndex)
    activeMessage = {
      message: constants.MESSAGETOWERSOLD + sellPrice + ' Gold',
      timer: constants.MESSAGEDURATION // seconds
    }
    updateInformationPanel()
  }
  
  function upgradeTower (towerIndex, upgradeName) {
    const upgraded = game.upgradeTower(towerIndex, upgradeName)
    if (upgraded) {
      updateInformationPanel()
    } else {
      activeMessage = {
        message: constants.MESSAGENOTENOUGHGOLD,
        timer: constants.MESSAGEDURATION // seconds
      }
    }
  }
}
