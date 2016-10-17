// Initiate all the components
var Tower = require("./classes/Tower.js"),
    GameEngine = require("./classes/Game.js"),
    game = new GameEngine;


// HERE IS ALL THE INTERACTION EVENT LISTENERS

/* ============== On start click handlers ==============*/
/* =====================================================*/

// On start, create a game element - these event listeners will be destroyed when the container is overriden
document.getElementById("start-btn").addEventListener("click", function() {
    // Hides the modal lightbox
    document.getElementsByClassName("modal-content")[0].style.display = "none";
    document.getElementsByClassName("modal-background")[0].style.display = "none";
});

// On clicking the information button, show the information panel
document.getElementById("information-btn").addEventListener("click", function() {
    console.log("show information container here");
});

/* ======== Information container interactions =========*/
/* =====================================================*/



/* ================= Information Hover =================*/
/* =====================================================*/
// Shows information about towers or monsters if hovered over
// or active

// Get information from towerdata.js

/* ========== Tower Card Click and placements ==========*/
/* =====================================================*/
// Click a tower card and make "active" which can be placed on UI element
// While it is active - use #dynamic.onmousemove = function -> to Send
// information to the canvas

// set up event listeners at the start which reference functions - these functions depend on the state on the application to control their control flow
var activeTowerSelected = null;
function towerCardClick() {

    var towerName = this.getAttribute("data-tower");
    // NOTE  add active class to active element

    if (/disabled/i.test(this.className)) { // Tower is disabled
        return;
    } else if (activeTowerSelected === null) { // There is no active tower being placed
        // set the active tower selected to be the tower name
        // Set up active elements
        activeTowerSelected = towerName;
        // NOTE add active class to tower clicked
    } else if (activeTowerSelected === towerName) { // The tower card clicked is the same as the active tower
        cancelTowerPlacement();
    } else { // There is an active tower which is not the same as what was clicked
        // NOTE remove active class from previous tower`
        activeTowerSelected = towerName;
        // NOTE add active class to clicked tower card
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

function towerPlacement(e) {
    if (activeTowerSelected === null) {
        return;
    }

    var towerName = activeTowerSelected, // NOTE CHANGE GET TOWER NAME FROM LIST
        canvasContainer = this.getBoundingClientRect(),
        position = {};

    position.x = e.clientX - canvasContainer.left;
    position.y = e.clientY - canvasContainer.top;

    if (game.validateTowerPlacement(towerName, position)) {
        console.log("towerPlaced");
        game.addTower(towerName, position);
    } else {
        console.log("invalid tower placement");
        // show error message somewhere for the user
    }
    activeTowerSelected = null;
}

function cancelTowerPlacement() {
    // NOTE remove active tower card
    activeTowerSelected = null;
}


// Set up event listeners
var towerCards = document.getElementsByClassName("tower-card");
// Convert from nodelist to array
towerCards = Array.prototype.slice.call(towerCards);

// Tower card click event listeners
towerCards.map(function(towerCard) {
    towerCard.addEventListener("click", towerCardClick);
});

// Game container event listeners
document.getElementById("dynamic").onmousemove = onTowerMouseMovement;
document.getElementById("dynamic").addEventListener("click", towerPlacement);

// Tower placement cancelling event listeners
document.onkeydown = function(e) {
    if (e.keyCode === 27) {
        cancelTowerPlacement();
    }
}
