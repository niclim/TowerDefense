// Initiate all the components
var Tower = require("./classes/Tower.js"),
    GameEngine = require("./classes/Game.js");

// Import and declare utility functions
var utils = require("./utils.js");

var constants = require("./gameData/gameConstants.js"),
    towerData = require("./gameData/towerdata.js");

// Cache reused DOM elements
var infoName = document.getElementById("info-name"),
    infoIcon = document.getElementById("info-icon"),
    infoBox1 = document.getElementById("info-box-1"),
    infoBox2 = document.getElementById("info-box-2"),
    infoBox3 = document.getElementById("info-box-3"),
    infoBox4 = document.getElementById("info-box-4"),
    levelInfo = document.getElementById("level"),
    goldInfo = document.getElementById("gold"),
    livesInfo = document.getElementById("lives"),
    towerCards = document.getElementsByClassName("tower-card"),
    towerCardList = [];

// Convert from nodelist to array
towerCards = Array.prototype.slice.call(towerCards);

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

var activeCanvasElement = {type: null},
    activeTowerSelected = null,
    activeMessage = {message: null},
    canvasMousePosition = {
        onCanvas: false,
        towerPosition: {},
        mousePosition: {}
    };

//  creates global variables
game = new GameEngine; // Privatize this later
dynamicCanvas = document.getElementById('dynamic');
dynamicContext = dynamicCanvas.getContext('2d');

// Declare the game loop
var lastTime;
function gameLoop() {
    var now = Date.now(),
        dt = (now - lastTime) / 1000.0; // Convert to seconds

    game.runCycle(dt);

    lastTime = now;
    // Renders methods based on state variables
    game.render();
    updateGameDependentInformation();
    renderTowerPlacement();
    renderMessage(dt);
    requestAnimationFrame(gameLoop);
}

/* ================== Render functions =================*/
/* =====================================================*/

function updateGameDependentInformation() {
    livesInfo.innerHTML = game.userLives;
    goldInfo.innerHTML = game.userGold;
    levelInfo.innerHTML = game.level;

    if (activeCanvasElement.type === "monster") {
        document.getElementById("monsterHp").innerHTML = game.activeMonsters[activeCanvasElement.index].currentHp;
    } else if (activeCanvasElement.type === "tower") {
        // Add any relevant tower information here
    }
}

// Moved this outside of the gameLoop, will only update the relevant data when necessary
function updateInformationPanel() {
    if (activeCanvasElement.type === "monster") {
        renderMonsterInformation(activeCanvasElement.index);
    } else if (activeCanvasElement.type === "tower") {
        renderTowerInformation(activeCanvasElement.index);
    } else {
        renderDefaultInformation();
    }
}

// ID refers to the type of monster and index is the index of the active monster in the active monster's array
function renderMonsterInformation(index) {
    var currentHp = game.activeMonsters[index].currentHp,
        maxHp = game.activeMonsters[index].maxHp,
        type = game.activeMonsters[index].type,
        id = game.activeMonsters[index].id;

    infoName.innerHTML = id;
    // Change icon to active monster - use a sprite
    infoBox1.innerHTML = "HP: <span id='monsterHp'>" + currentHp + "</span> / " + maxHp;
    infoBox2.innerHTML = "Type: " + type;
    infoBox3.innerHTML = "Strengths: All sorts mate" ;
    infoBox4.innerHTML = "Weaknesses: Ducks" ;
}

// ID refers to the type of tower and index is the index of the active tower in the active tower's array
// TODO add number of targetrs
function renderTowerInformation(index) {
    var id = game.towers[index].id,
        damage = towerData[id].projectile.damage,
        type = towerData[id].projectile.type,
        effect = "",
        range = game.towers[index].range,
        speed = game.towers[index].attackSpeed,
        upgradeAvailable = towerData[id].upgrade.length !== 0;

    if (towerData[id].projectile.effects.length === 0) {
        effect = "None"
    } else {
        towerData[id].projectile.effects.forEach(function(e) {
            effect += e + " ";
        });
    }

    infoName.innerHTML = id;
    // Change icon to tower monster - use a sprite
    infoBox1.innerHTML = "Damage: " + damage + " <br>Range: " + range + " <br>Effect: " + effect;
    infoBox2.innerHTML = "Attack Speed: " + speed + " <br>Type: " + type;
    infoBox3.innerHTML = upgradeAvailable ? "<a class='waves-effect waves-light btn red' id='upgradeButton'>Upgrade</a>" : "";
    infoBox4.innerHTML = "<a class='waves-effect waves-light btn red' id='sellButton'>Sell</a>";
}

function renderDefaultInformation() {
    infoName.innerHTML = "Awesome TD";
    // Change icon to default image - use a sprite
    infoBox1.innerHTML = "This is some text";
    infoBox2.innerHTML = "This is different text";
    infoBox3.innerHTML = "This is ??? text" ;
    infoBox4.innerHTML = "This 1231241235" ;
}

function renderMessage(dt) {
    if (activeMessage.message === null) {
        return;
    } else {
        dynamicContext.globalAlpha = activeMessage.timer > 0 ? activeMessage.timer : 0; // Sets transparency to 0 if a negative number
        dynamicContext.font = constants.MESSAGEFONT;
        dynamicContext.textAlign = "center";
        dynamicContext.fillStyle = constants.MESSAGECOLOR;
        dynamicContext.fillText(activeMessage.message, constants.CANVASWIDTH / 2, 50);
        dynamicContext.globalAlpha = 1;

        if (activeMessage.timer <= 0) {
            activeMessage = {message: null}; // Reset message
        } else {
            activeMessage.timer -= dt;
        }
    }
}

function renderTowerPlacement() {
    if (activeTowerSelected === null ||
        !canvasMousePosition.onCanvas) {
        return
    };

    var coordinates = canvasMousePosition.towerPosition.coordinates;
    dynamicContext.beginPath();
    dynamicContext.globalAlpha = 0.5;

    // Draw grid validation placement
    if (game.validateTowerPlacement(canvasMousePosition.towerPosition.grid)) {
        dynamicContext.fillStyle = "green";
    } else {
        dynamicContext.fillStyle = "red";
    }
    dynamicContext.fillRect(coordinates.x,
                            coordinates.y,
                            constants.TOWERLENGTH,
                            constants.TOWERLENGTH
     );

     // Draw tower
    dynamicContext.globalAlpha = 0.7;
    dynamicContext.arc(coordinates.x + constants.TOWERLENGTH / 2,
                       coordinates.y + constants.TOWERLENGTH / 2,
                       constants.TOWERLENGTH * 0.6,
                       0,
                       2 * Math.PI,
                       false
     );
    dynamicContext.fillStyle = 'gray';
    dynamicContext.fill();

    dynamicContext.globalAlpha = 1;
    dynamicContext.closePath();
}

/* ================ UI Event Listeners =================*/
/* =====================================================*/
document.getElementById("mainModal").addEventListener("click", modalClick);

/*
These event listeners control the application by interacting with the game
object and by changing the state variables (which the render functions use
to read)
*/
towerCards.forEach(function(towerCard, i) {
    towerCardList.push(towerCard.getAttribute("data-tower"));
    towerCard.addEventListener("click", towerCardClick);
});

document.getElementById("dynamic").onmousemove = onCanvasMouseMovement;
document.getElementById("dynamic").addEventListener("click", canvasClick);

document.onkeydown = function(e) {
    if (e.keyCode === 27) {
        cancelTowerPlacement();
    }
}

// updates activeCanvasElement when monster death or tower removed affects the current selected target
document.addEventListener("unitRemoved", function(e) {
    // Updates if the active element is the same as the type of unit removed
    if (activeCanvasElement.type === e.detail.element) {
        if (e.detail.index < activeCanvasElement.index) {
            activeCanvasElement.index--; // Update positioning in element
        } else if (e.detail.index === activeCanvasElement.index) {
            activeCanvasElement = {type: null} // Reset
        }
        updateInformationPanel();
    }
});

// Adds event listeners only to the info box
document.getElementsByClassName("side-section left")[0].addEventListener("click", function(e) {
    if (activeCanvasElement.type === "tower") {
        if (e.target.id === "upgradeButton") {
            showUpgradeOptions(activeCanvasElement.index);
        } else if (e.target.id === "sellButton") {
            sellTower();
        }
    }
})

/* =================== UI Functions ====================*/
/* =====================================================*/
function modalClick(e) {
    var clickTarget = e.target.getAttribute("data-action");

    switch (clickTarget) {
        case "start":
            startGame();
            break;
        case "information":
            console.log("show information container here");
            break;
        case "upgrade":
            var upgradeName = e.target.getAttribute("data-upgradename");
            upgradeTower(activeCanvasElement.index, upgradeName);
            break;
        default:
            return;
    }
    document.getElementById("mainModal").style.display = "none";
    document.getElementsByClassName("modal-background")[0].style.display = "none";
}

function startGame() {
    game.gameStart();
    // Sets up game loop and render loop
    lastTime = Date.now();
    gameLoop();
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
function towerCardClick() {

    var towerName = this.getAttribute("data-tower"),
        oldTowerIndex = towerCardList.indexOf(activeTowerSelected),
        newTowerIndex = towerCardList.indexOf(towerName);

    if (/disabled/i.test(this.className)) {
        return;

    } else if (activeTowerSelected === null) {
        activeTowerSelected = towerName;
        utils.addClass(towerCards[newTowerIndex], "active");
        canvasMousePosition.onCanvas = false;
    } else if (activeTowerSelected === towerName) {
        cancelTowerPlacement();
        canvasMousePosition.onCanvas = false;
    } else {
        utils.removeClass(towerCards[oldTowerIndex], "active");
        activeTowerSelected = towerName;
        utils.addClass(towerCards[newTowerIndex], "active");
        canvasMousePosition.onCanvas = false;
    }
}

/*
Called from towerCardClick (when clicking the active tower card) and on an escape key press
Resets the active tower placement state to null
*/
function cancelTowerPlacement() {
    utils.removeClass(towerCards[towerCardList.indexOf(activeTowerSelected)], "active");
    activeTowerSelected = null;
}

/* Mouse move event listener on the canvas
If the active tower selected state (a tower is being placed by the user):
    -> update the position of the mouse on the canvas (used by the renderTowerPlacement function)
otherwise:
    -> do nothing
*/
function onCanvasMouseMovement(e) {
    if (activeTowerSelected === null) {
        return
    };

    var canvasContainer = this.getBoundingClientRect(),
        position = {};

    position.x = e.clientX - canvasContainer.left;
    position.y = e.clientY - canvasContainer.top;
    canvasMousePosition.mousePosition = position;
    canvasMousePosition.towerPosition = utils.convertPositionToTower(position);
    canvasMousePosition.onCanvas = true;
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
function canvasClick(e) {
    // Get click location relative to the canvas element
    var canvasContainer = this.getBoundingClientRect(),
        position = {},
        towerGridPosition = canvasMousePosition.towerPosition.grid,
        towerCoordinates = canvasMousePosition.towerPosition.coordinates; // Passes in grid blocks - this is the topLeft block

    position.x = e.clientX - canvasContainer.left;
    position.y = e.clientY - canvasContainer.top;

    // Runs if the user is placing a tower
    if (activeTowerSelected !== null) {
        var towerName = activeTowerSelected,
            towerPlaced = game.placeTower(towerName, towerGridPosition, towerCoordinates);

        // If the tower was not placed, show an error message
        if (!towerPlaced.placed) {
            activeMessage = {
                message: towerPlaced.message,
                timer: constants.MESSAGEDURATION // seconds
            }
        }

        utils.removeClass(towerCards[towerCardList.indexOf(activeTowerSelected)], "active");
        activeTowerSelected = null;
    } else {
        // User is not running a tower placement
        activeCanvasElement = game.checkClickLocation(position);
        updateInformationPanel();
    }
}

function sellTower() {
    game.sellTower(activeCanvasElement.index);
    updateInformationPanel();
}

// At the moment expects only towers with upgrades should be able to access this
function showUpgradeOptions(towerIndex) {
    // Figure out where to show the upgrade contianer
    document.getElementById("mainModal").style.display = "block";
    document.getElementsByClassName("modal-background")[0].style.display = "block";

    var towerId = game.towers[towerIndex].id,
        upgrades = towerData[towerId].upgrade;

    // Todo move HTML out into a template
    var title = "Upgrade Tower",
        content = "";

    upgrades.forEach(function(upgradeObj) {
        var towerDataObject = towerData[upgradeObj.name];
        content += "<a class='waves-effect waves-light btn-large red' data-action='upgrade' data-upgradename='" + upgradeObj.name + "'>" + upgradeObj.name + " Upgrade</a>";
    });

    document.getElementById("mainModalTitle").innerHTML = title;
    document.getElementById("mainModalContent").innerHTML = content;

}

function upgradeTower(towerIndex, upgradeName) {
   var upgraded = game.upgradeTower(towerIndex, upgradeName);
    if (upgraded) {
        updateInformationPanel();
    } else {
        activeMessage = {
            message: constants.MESSAGENOTENOUGHGOLD,
            timer: constants.MESSAGEDURATION // seconds
        }
    }
}
