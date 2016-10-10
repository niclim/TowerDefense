// Initiate all the components
var Tower = require("./classes/Tower.js");
var GameEngine = require("./classes/Game.js");

// Initiate pubsub
var PubSub = require("pubsub-js");

var game;

// Create extra tower cards when certain research is reached

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
