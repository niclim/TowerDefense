//  require Monster to gain access
var Monster = require("./Monster.js"),
    Tower = require("./Tower.js"),
    towerData = require("../gameData/towerdata.js"),
    utils = require("../utils.js"),
    pathCoordinates = require("../gameData/pathdata.js");

var GameEngine = function() {
    this.userGold = 10;
    this.level = 1;
    this.userLives = 30;
    this.activeMonsters = []; // List of active monsters in the
    this.towers = []; // object of tower objects
    this.timer = 1;
    this.gamePath = utils.convertPathToLines(pathCoordinates.path)
    this.gameGrid = utils.initiateGrid(this.gamePath);
}

GameEngine.prototype.addMonster = function(name) {
    // add monster (specified by name) to game
    var monster = new Monster("monster1");
    this.activeMonsters.push(monster);
}

GameEngine.prototype.addTower = function(id, position, goldCost) {
    this.userGold -= goldCost;
    var tower = new Tower(position, id);
    this.towers.push(tower);

}

// method to check gold before place tower or upgrade
GameEngine.prototype.checkGold = function(goldCost) {
    if (goldCost <= this.userGold) {
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

    // Render towers first so that if monsters are larger they show above towers
    for (var i = 0, j = this.towers.length; i < j; i ++) {
        this.towers[i].draw();
    }

    //  loop through list of active monsters and render them
    //  TODO probably need to find a better way to rend them apart from random rectangle
    for (var i = 0, j = this.activeMonsters.length; i < j; i ++) {
        this.activeMonsters[i].draw();
    }

    dynamicContext.closePath();

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

// grid tower
GameEngine.prototype.validateTowerPlacement = function(gridPosition) {
    // Checks all 4 positions
    var positionValid = this.gameGrid[gridPosition.x][gridPosition.y].empty
    && this.gameGrid[gridPosition.x + 1][gridPosition.y].empty
    && this.gameGrid[gridPosition.x][gridPosition.y + 1].empty
    && this.gameGrid[gridPosition.x + 1][gridPosition.y + 1].empty;

    return positionValid;
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

/*
Takes in a position object (location of the click)
Returns an object with information about what is at that position
{type: null} if nothing found
*/
GameEngine.prototype.checkClickLocation = function(position) {
    var element = {};
    // Loops through activeMonsters
    for (var i = 0; i < this.activeMonsters.length; i++) {
        if (utils.checkIfInSquare(position, this.activeMonsters[i].position, this.activeMonsters[i].position.sideLength)) {
            element.type = "monster";
            element.id = this.activeMonsters[i].id;
            element.index = i;
            break;
        }
    }

    // If nothing was found, loop through towers
    if (element.type === undefined) {
        for (var i = 0; i < this.towers.length; i++) {
            if (utils.checkIfInSquare(position, this.towers[i].position, this.towers[i].position.sideLength)) {
                element.type = "tower";
                element.id = this.towers[i].id;
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

/*
placeTower handles the validation of the tower placement (position and sufficient gold)
Takes in 3 arguments:
towerName - string specifying what tower is being placed
gridPosition - top left grid block of where the tower would be placed
towerCoordinates - top left coordinate of a tower
Returns an object with a boolean to represent whether the tower is placed and an error message if the tower was not placed
*/
GameEngine.prototype.placeTower = function(towerName, gridPosition, towerCoordinates) {
    var goldCost = towerData[towerName].goldCost;
    // Validate tower placement
    if (this.validateTowerPlacement(gridPosition)
    && this.checkGold(goldCost)) {

        this.addTower(towerName, towerCoordinates, goldCost);
        return {
            placed: true
        };
    } else {

        if (!this.validateTowerPlacement(gridPosition)) {
            return {
                placed: false,
                message: "Invalid Tower Placement"
            }
        } else {
            return {
                placed: false,
                message: "Not Enough Gold"
            }
        }
    }

}


module.exports = GameEngine;
