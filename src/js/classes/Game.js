//  require Monster to gain access
var Monster = require("./Monster.js");

var GameEngine = function() {
    this.userGold = 10;
    this.level = 1;
    this.userLives = 30;
    this.activeMonsters = []; // List of active monsters in the
    this.towers = {}; // object of tower objects
    this.timer = 1;
    // Goes through and disables towers that can't be used yet
}

GameEngine.prototype.addMonster = function(name) {
    // add monster (specified by name) to game
    var monster = new Monster(30, 10, 1);
    this.activeMonsters.push(monster);
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
    dynamicContext.beginPath();
    dynamicContext.clearRect(0, 0, dynamicCanvas.width, dynamicCanvas.height);

    //  loop through list of active monsters and render them
    //  TODO probably need to find a better way to rend them apart from random rectangle
    for (var i = 0, j = this.activeMonsters.length; i < j; i ++) {
        this.activeMonsters[i].draw();
    }

    // dynamicContext.
};

GameEngine.prototype.runCycle = function() {
    //  beginning of cycle check if any monsters have died if so remove from active monsters
    this.checkMonsterDeath();
    // loop through active monsters and towers and run the cycle
    // Each runCycle method returns information for the gameEngine to
    // process (e.g. the monster died, tower changed)

    //  timer to add monsters
    this.timer--;
    if (this.timer < 1) {
        this.addMonster('blah');
        this.timer = 10;
    }
    for (var i = 0, j = this.activeMonsters.length; i < j; i ++) {
        this.activeMonsters[i].move();
    }
    // Send information to render
}

// method to upgrade tower

GameEngine.prototype.validateTowerPlacement = function(name, position) {
    // returns true or false whether tower placement is valid
    return true;
}

GameEngine.prototype.checkMonsterDeath = function() {
    for (var i = 0, j = this.activeMonsters.length; i < j; i ++) {
        if (this.activeMonsters[i].checkDeath()) {
            this.activeMonsters.splice(i, 1);
            i--;
            j--;
        }
    }
}

// redraw canvas

module.exports = GameEngine;
