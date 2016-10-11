var GameEngine = function() {
  this.userGold = 10;
  this.level = 1;
  this.userLives = 30;
  this.activeMonsters = {}; // List of active monsters in the
  this.towers = {};


  // Goes through and disables towers that can't be used yet
}

// New level method

GameEngine.prototype.runCycle = function() {
  // loop through active monsters and towers and run the cycle

  // loop and check death of monsters - update accordingly
}

// method to check gold before place tower or upgrade

// method to upgrade tower

GameEngine.prototype.validateTowerPlacement = function() {

}

// redraw canvas

module.exports = GameEngine;
