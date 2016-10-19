// Initiate all the components
var Tower = require("./classes/Tower.js"),
    GameEngine = require("./classes/Game.js")

// Cache reused DOM elements
var infoName = document.getElementById("info-name"),
    infoBox1 = document.getElementById("info-box-1"),
    infoBox2 = document.getElementById("info-box-2"),
    infoBox3 = document.getElementById("info-box-3"),
    infoBox4 = document.getElementById("info-box-4");

//  creates global variables
game = new GameEngine;
dynamicCanvas = document.getElementById('dynamic');
dynamicContext = dynamicCanvas.getContext('2d');

runCycle = function() {
    game.runCycle();
    setTimeout(runCycle, 1000);
}

renderCycle = function() {
    game.render();
    requestAnimationFrame(renderCycle);
}

// HERE IS ALL THE INTERACTION EVENT LISTENERS

/* ============== On start click handlers ==============*/
/* =====================================================*/

// On start, create a game element - these event listeners will be destroyed when the container is overriden
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
    console.log("show information container here");
});

/* ======== Information container interactions =========*/
/* =====================================================*/



/* ================= Information Click =================*/
/* =====================================================*/
// Shows information about towers or monsters if hovered over
// or active
var activeCanvasElement = null;


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

// Takes in a position object (location of the click)
// returns an object with information about what is at that position
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

// Get information from towerdata.js

/* ========== Tower Card Click and placements ==========*/
/* =====================================================*/
// Click a tower card and make "active" which can be placed on UI element
// While it is active - use #dynamic.onmousemove = function -> to Send
// information to the canvas

// set up event listeners at the start which reference functions - these functions depend on the state on the application to control their control flow
var activeTowerSelected = null;
var towerCards = document.getElementsByClassName("tower-card");
var towerCardList = [];

function addClass(element, cssClass) {
    if (element.className === "") {
        element.className = cssClass;
    } else {
        element.className += " " + cssClass;
    }
}

function removeClass(element, cssClass) {
    var arrayOfClasses = element.className.split(" ");
    for (var i = 0; i < arrayOfClasses.length; i++) {
        if (arrayOfClasses[i] === cssClass) {
            arrayOfClasses.splice(i, 1);
        }
    }
    element.className = arrayOfClasses.join(" ");
}

function getIndex(towerName) {
    return towerCardList.indexOf(towerName);
}

function towerCardClick() {

    var towerName = this.getAttribute("data-tower");

    if (/disabled/i.test(this.className)) { // Tower is disabled
        return;
    } else if (activeTowerSelected === null) { // There is no active tower being placed
        // set the active tower selected to be the tower name
        // Set up active elements
        activeTowerSelected = towerName;
        addClass(towerCards[getIndex(activeTowerSelected)], "active");
    } else if (activeTowerSelected === towerName) { // The tower card clicked is the same as the active tower
        cancelTowerPlacement();
    } else { // There is an active tower which is not the same as what was clicked
        removeClass(towerCards[getIndex(activeTowerSelected)], "active");
        activeTowerSelected = towerName;
        addClass(towerCards[getIndex(activeTowerSelected)], "active");
    }
}

function onTowerMouseMovement(e) {
    if (activeTowerSelected === null) {
        return
    };
    var canvasContainer = this.getBoundingClientRect();
    var offsetX = e.clientX - canvasContainer.left,
        offsetY = e.clientY - canvasContainer.top;
    // send to display to get rendered
};

// Two possible canvas click scenarios:
// 1) Tower selection is active (place a tower)
// 2) Tower selection is inactive (clicking to get information about a monster or tower on the map)
function canvasClick(e) {
    // Get click location relative to the canvas element
    var canvasContainer = this.getBoundingClientRect(),
    position = {};

    position.x = e.clientX - canvasContainer.left;
    position.y = e.clientY - canvasContainer.top;

    if (activeTowerSelected !== null) { //
        var towerName = activeTowerSelected; // NOTE CHANGE GET TOWER NAME FROM LIST

        if (game.validateTowerPlacement(towerName, position)) {
            console.log("towerPlaced");
            game.addTower(towerName, position);
        } else {
            console.log("invalid tower placement");
            // show error message somewhere for the user
        }
        removeClass(towerCards[getIndex(activeTowerSelected)], "active");
        activeTowerSelected = null;

    } else {
        // check if the position overlaps with the bounding rectangle of monster or tower
        var element = checkClickLocation(position);
        console.log(element);
        if (element.type === "monster") {
            infoName.innerHTML = element.id;

        } else if (element.type === "tower") {
            console.log("show tower information")
        } else {
            infoName.innerHTML = "Awesome TD";
            console.log("show default information")
        }
        // if it is, change the information container
    }

}

function cancelTowerPlacement() {

    removeClass(towerCards[getIndex(activeTowerSelected)], "active");
    activeTowerSelected = null;
}


// Set up event listeners
// Convert from nodelist to array
towerCards = Array.prototype.slice.call(towerCards);

// Tower card click event listeners
towerCards.map(function(towerCard, i) {
    towerCardList.push(towerCard.getAttribute("data-tower"));
    towerCard.addEventListener("click", towerCardClick);
});

// Game container event listeners
document.getElementById("dynamic").onmousemove = onTowerMouseMovement;
document.getElementById("dynamic").addEventListener("click", canvasClick);

// Tower placement cancelling event listeners
document.onkeydown = function(e) {
    if (e.keyCode === 27) {
        cancelTowerPlacement();
    }
}
