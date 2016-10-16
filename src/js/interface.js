// Initiate all the components
var Tower = require("./classes/Tower.js");
var GameEngine = require("./classes/Game.js");

var game;
// HERE IS ALL THE INTERACTION EVENT LISTENERS

/* ============== On start click handlers ==============*/
/* =====================================================*/

// On start, create a game element - these event listeners will be destroyed when the container is overriden
document.getElementById("start-btn").addEventListener("click", function() {
    // Hides the modal lightbox
    document.getElementsByClassName("modal-content")[0].style.display = "none";
    document.getElementsByClassName("modal-background")[0].style.display = "none";

    // Start the game engine
    game = new GameEngine;
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
// Or maybe use on hover event to show tower??
