var GameEngine = function() {
    this.userGold = 10;
    this.level = 1;
    this.userLives = 30;
    this.activeMonsters = {}; // List of active monsters in the
    this.towers = {}; // object of tower objects

    // Goes through and disables towers that can't be used yet
}

GameEngine.prototype.addMonster = function(name) {
    // add monster (specified by name) to game
}

GameEngine.prototype.addTower = function(name, position) {
    // add tower (specified by name) at location
}

// method to check gold before place tower or upgrade
GameEngine.prototype.checkGold = function(goldCost) {
    if (goldCost > this.userGold) {
        return true;
    } else {
        return false;
    }
};

GameEngine.prototype.gameOver = function() {

}

GameEngine.prototype.gameWon = function() {

}

// New level method
GameEngine.prototype.nextLevel = function() {

}

GameEngine.prototype.render = function() {
    // send state to the display object to render
};

GameEngine.prototype.runCycle = function() {
    // loop through active monsters and towers and run the cycle
    // Each runCycle method returns information for the gameEngine to
    // process (e.g. the monster died, tower changed)

    // loop and check death of monsters - update accordingly

    // Send information to render
}

// method to upgrade tower

GameEngine.prototype.validateTowerPlacement = function(name, position) {
    // returns true or false whether tower placement is valid
    return true;
}

// redraw canvas

module.exports = GameEngine;
