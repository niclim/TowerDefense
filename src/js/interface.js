// Initiate all the components
var Tower = require("./classes/Tower.js"),
    GameEngine = require("./classes/Game.js"),
    monsterData = require("./gameData/monsterdata.js"),
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
    livesInfo = document.getElementById("lives");

var towerCards = document.getElementsByClassName("tower-card"),
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
game = new GameEngine;
dynamicCanvas = document.getElementById('dynamic');
dynamicContext = dynamicCanvas.getContext('2d');

runCycle = function() {
    game.runCycle();
    updateGameInformation();
    // I assume the game is going to run fast than this after? if not need to add updateGameInformation to a few other places
    setTimeout(runCycle, 1000);
}

renderCycle = function() {
    game.render();
    // Renders the information and error messages based on the state variables
    renderTowerPlacement();
    renderMessage();
    requestAnimationFrame(renderCycle);
}

/* ================== Helper functions =================*/
/* =====================================================*/
function addClass(element, cssClass) {
    if (element.className === "") {
        element.className = cssClass;
    } else {
        element.className += " " + cssClass;
    }
}

function removeClass(element, cssClass) {
    var arrayOfClasses = element.className.split(" ");
    for (var i = 0, j = arrayOfClasses.length; i < j; i++) {
        if (arrayOfClasses[i] === cssClass) {
            arrayOfClasses.splice(i, 1);
            i--; j--;
        }
    }
    element.className = arrayOfClasses.join(" ");
}

// Gets the index of the tower cards based on a tower's name
function getTowerCardIndex(towerName) {
    return towerCardList.indexOf(towerName);
}

/*
Takes in a position object (x and y coordinates)
Returns the top left block position and topleft coordinate of the tower
Grid blocks are in 25x25 block increments
*/
function convertTowerToGridBlock(position) {
    var towerPosition = {
        grid: {},
        coordinates: {},
        side: 50
    };

    towerPosition.grid.x = Math.floor(position.x / 25);
    towerPosition.grid.y = Math.floor(position.y / 25);

    // Adjusts if mouse is at end of container
    // 36 blocks width and 24 blocks height
    if (towerPosition.grid.x >= 35) {
        towerPosition.grid.x--;
    }

    if (towerPosition.grid.y >= 23) {
        towerPosition.grid.y--;
    }

    // Container width and height 900 and 600 px respectively
    towerPosition.coordinates.x = (towerPosition.grid.x / 36) * 900;
    towerPosition.coordinates.y = (towerPosition.grid.y / 24) * 600;
    return towerPosition;
}

/* ================== Render functions =================*/
/* =====================================================*/
// Render functions run every game cycle (on the renderCycle function call)
// Renders based on the state variables

function updateGameInformation() {
    livesInfo.innerHTML = game.userLives;
    goldInfo.innerHTML = game.userGold;
    levelInfo.innerHTML = game.level;

    if (activeCanvasElement.type === "monster") {
        renderMonsterInformation(activeCanvasElement.id, activeCanvasElement.index);
    } else if (activeCanvasElement.type === "tower") {
        renderTowerInformation(activeCanvasElement.id, activeCanvasElement.index);
    } else {
        renderDefaultInformation();
    }
}

// ID refers to the type of monster and index is the index of the active monster in the active monster's array
function renderMonsterInformation(id, index) {
    var currentHp = game.activeMonsters[index].currentHp,
        maxHp = game.activeMonsters[index].maxHp,
        type = game.activeMonsters[index].type;
    infoName.innerHTML = id;
    // Change icon to active monster - use a sprite
    infoBox1.innerHTML = "HP: " + currentHp + " / " + maxHp;
    infoBox2.innerHTML = "Type: " + type;
    infoBox3.innerHTML = "Strengths: All sorts mate" ;
    infoBox4.innerHTML = "Weaknesses: Ducks" ;
}

// ID refers to the type of tower and index is the index of the active tower in the active tower's array
function renderTowerInformation(id, index) {
    infoName.innerHTML = id;
    // Change icon to active monster - use a sprite
    infoBox1.innerHTML = "Damage: <br> Range: <br> Effect: ";
    infoBox2.innerHTML = "Attack Speed: <br> Type: " ;
    infoBox3.innerHTML = "<a class='waves-effect waves-light btn red'>Upgrade</a>" ;
    infoBox4.innerHTML = "<a class='waves-effect waves-light btn red'>Sell</a>" ;
    // Change icon to tower monster - use a sprite

}

function renderDefaultInformation() {
    infoName.innerHTML = "Awesome TD";
    // Change icon to default image - use a sprite
    infoBox1.innerHTML = "This is some text";
    infoBox2.innerHTML = "This is different text";
    infoBox3.innerHTML = "This is ??? text" ;
    infoBox4.innerHTML = "This 1231241235" ;
}

// Maybe change this to "renderMessage"
function renderMessage() {
    if (activeMessage.message === null) {
        return;
    } else {
        dynamicContext.globalAlpha = activeMessage.timer / 50;
        dynamicContext.font = '40pt Droid Sans';
        dynamicContext.textAlign = "center";
        dynamicContext.fillStyle = "red";
        dynamicContext.fillText(activeMessage.message, 450, 50);
        dynamicContext.globalAlpha = 1;

        if (activeMessage.timer === 0) {
            activeMessage = {message: null}; // Reset error message
        } else {
            activeMessage.timer--;
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

    if (true) { // check for valid tower placement
        dynamicContext.fillStyle = "green";
        dynamicContext.fillRect(coordinates.x,
                                coordinates.y,
                                50,
                                50
         );

        dynamicContext.globalAlpha = 0.7;
        dynamicContext.arc(coordinates.x + 25,
                           coordinates.y + 25,
                           30,
                           0,
                           2 * Math.PI,
                           false
         );
        dynamicContext.fillStyle = 'gray';
        dynamicContext.fill();

    } else {
        // do some sort of logic to highlight the tiles that the tower would be placed on and show the tower on those positions
        // this would run when tower placement is invalid
    }
    dynamicContext.globalAlpha = 1;
    dynamicContext.closePath();
}

/* ================ UI Event Listeners =================*/
/* =====================================================*/
document.getElementById("start-btn").addEventListener("click", function() {
    // Hides the modal lightbox
    document.getElementsByClassName("modal-content")[0].style.display = "none";
    document.getElementsByClassName("modal-background")[0].style.display = "none";

    // run repeating function that runs game engine run cycle and rendering
    setTimeout(runCycle, 1000);
    requestAnimationFrame(renderCycle);
});

// On clicking the information button, show the information panel
document.getElementById("information-btn").addEventListener("click", function() {
    // TODO - add information modal information thingy
    console.log("show information container here");
});

/*
These event listeners control the application by interacting with the game
object and by changing the state variables (which the render functions use
to read)
*/
towerCards.map(function(towerCard, i) {
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

/* =================== UI Functions ====================*/
/* =====================================================*/
/*
Takes in three arguments - location of the click, location of an element
(i.e. monster or tower) and the type (whether it is a monster or a tower -
different dimensions)
Returns a boolean - true if the click overlaps with an element and false
if it does not
*/
function comparePositions(clickPosition, elementPosition, type) {
    var sideLength = type === "monster" ? 30 : 50; // width and height of the element
    if (clickPosition.x >= elementPosition.x
    && clickPosition.x <= elementPosition.x + sideLength
    && clickPosition.y >= elementPosition.y
    && clickPosition.y <= elementPosition.y + sideLength) {
        return true;
    } else {
        return false;
    }
}

/*
Takes in a position object (location of the click)
Returns an object with information about what is at that position
{type: null} if nothing found
*/
function checkClickLocation(position) {
    var element = {};
    // Loops through activeMonsters
    for (var i = 0; i < game.activeMonsters.length; i++) {
        if (comparePositions(position, game.activeMonsters[i].position, "monster")) {
            element.type = "monster";
            element.id = game.activeMonsters[i].id;
            element.index = i;
            break;
        }
    }

    // If nothing was found, loop through towers
    if (element.type === undefined) {
        for (var i = 0; i < game.towers.length; i++) {
            if (comparePositions(position, game.towers[i].position, "tower")) {
                element.type = "tower";
                element.id = game.towers[i].id;
                element.index = i;
                break;
            }
        }
    }

    // If no towers or monsters found return a type of null
    if (element.type === undefined) {
        element.type = null;
    }

    return element;
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
        oldTowerIndex = getTowerCardIndex(activeTowerSelected),
        newTowerIndex = getTowerCardIndex(towerName);

    if (/disabled/i.test(this.className)) {
        return;

    } else if (activeTowerSelected === null) {
        activeTowerSelected = towerName;
        addClass(towerCards[newTowerIndex], "active");
        canvasMousePosition.onCanvas = false;
    } else if (activeTowerSelected === towerName) {
        cancelTowerPlacement();
        canvasMousePosition.onCanvas = false;
    } else {
        removeClass(towerCards[oldTowerIndex], "active");
        activeTowerSelected = towerName;
        addClass(towerCards[newTowerIndex], "active");
        canvasMousePosition.onCanvas = false;

    }
}

/*
Called from towerCardClick (when clicking the active tower card) and on an escape key press
Resets the active tower placement state to null
*/
function cancelTowerPlacement() {
    removeClass(towerCards[getTowerCardIndex(activeTowerSelected)], "active");
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
    canvasMousePosition.towerPosition = convertTowerToGridBlock(position);
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
        position = canvasMousePosition.mousePosition,
        towerGridPosition = canvasMousePosition.towerPosition.grid,
        towerCoordinates = canvasMousePosition.towerPosition.coordinates; // Passes in grid blocks - this is the topLeft block

    // Runs if the user is placing a tower
    if (activeTowerSelected !== null) { //
        var towerName = activeTowerSelected,
            goldCost = towerData[towerName].goldCost;

        // Validate tower placement
        // NOTE NEED TO REFACTOR THIS TO REFLECT UI PLACEMENT
        if (game.validateTowerPlacement(towerGridPosition)
        && game.checkGold(goldCost)) {
            game.addTower(towerCoordinates, towerName, goldCost);

        } else {

            if (!game.validateTowerPlacement(towerGridPosition)) {
                activeMessage = {
                    message: "Invalid Tower Placement",
                    timer: 50 // frames
                }
            } else {
                activeMessage = {
                    message: "Not Enough Gold",
                    timer: 50 // frames
                }
            }
        }

        removeClass(towerCards[getTowerCardIndex(activeTowerSelected)], "active");
        activeTowerSelected = null;
    } else {
        // User is not running a tower placement
        activeCanvasElement = checkClickLocation(position);
    }

}
