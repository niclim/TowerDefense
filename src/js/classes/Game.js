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
    this.gamePath = _convertPathToLines(pathCoordinates.path);
    console.log(this.gamePath);
    this.gameGrid = _initiateGrid(this.gamePath);
    console.table(this.gameGrid)
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

/*
Takes in a position object (location of the click)
Returns an object with information about what is at that position
{type: null} if nothing found
*/
GameEngine.prototype.checkClickLocation = function(position) {
    var element = {};
    // Loops through activeMonsters
    for (var i = 0; i < this.activeMonsters.length; i++) {
        if (utils.checkIfInSquare(position, this.activeMonsters[i].position, this.activeMonsters[i].sideLength)) {
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

// method to check gold before place tower or upgrade
GameEngine.prototype.checkGold = function(goldCost) {
    if (goldCost <= this.userGold) {
        return true;
    } else {
        return false;
    }
};

GameEngine.prototype.checkMonsterDeath = function() {
    for (var i = 0, j = this.activeMonsters.length; i < j; i ++) {
        if (this.activeMonsters[i].checkDeath()) {
            this.activeMonsters.splice(i, 1);
            i--;
            j--;
        }
    }
}

GameEngine.prototype.gameOver = function() {

}

GameEngine.prototype.gameWon = function() {

}

// New level method
GameEngine.prototype.nextLevel = function() {

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
        this.activeMonsters[i].move(this.gamePath);

        // The monster is destroyed in the next cycle of runCycle in the monster.checkDeath value
        if (this.activeMonsters[i].position.end) {
            this.userLives--;
        }
    }
    // Send information to render
}

// method to upgrade tower

/*
Takes in a gridPosition object (points to the top left corner of the tower)
Towers take up a 2x2 grid - this function checks all positions
Returns true if the position is a valid placement for a tower
Returns false if the position is invalid
*/
GameEngine.prototype.validateTowerPlacement = function(gridPosition) {
    // Checks all 4 positions
    var positionValid = this.gameGrid[gridPosition.x][gridPosition.y].empty
    && this.gameGrid[gridPosition.x + 1][gridPosition.y].empty
    && this.gameGrid[gridPosition.x][gridPosition.y + 1].empty
    && this.gameGrid[gridPosition.x + 1][gridPosition.y + 1].empty;
    return positionValid;
}

/*
Input: Path - an array of objects containing coordinates where the path will run to
Output: pathLines - an array of objects containing the startPoint (coordinates),
        distance of the line and direction (left, right, up, down)
*/
function _convertPathToLines(path) {
    var pathLines = [];
    for (var i = 0; i < path.length - 1; i++) {
        var line = {};

        // Assume that the direction is only 4 ways
        if (path[i+1].x - path[i].x === 0) {

            if (path[i+1].y - path[i].y > 0) {
                line.direction = "down";
            } else {
                line.direction = "up";
            }
        } else {
            if (path[i+1].x - path[i].x === 0 > 0) {

                line.direction = "left";
            } else {
                line.direction = "right";
            }
        }
        line.startPoint = path[i];
        line.distance = utils.getPositionDifference(path[i], path[i+1]);
        pathLines.push(line);
    }

    return pathLines;
}

/*
Converts a pathLines array (an array of objects with a startPoint,
direction and a distance) into an array of grid blocks ()
Note that there will be some overlap with blocks, however,
as they are only used to set grid positions to not empty, overlap is not an issue
*/
function _createPathBlocks(pathLines) {
    var blocks = [];
    // Loops through all the pathLines and creates blocks based on that
    for (var i = 0; i < pathLines.length; i++) {
        // blockAmount refers to the amount of blocks that follow the path
        var blockAmount = Math.floor(pathLines[i].distance / 25) + 1,
            pathDirection;
        /* Set direction
        x: 1 = right
        x: -1 = left
        y: 1 = down
        y: -1 = up
        Offset values help center the grid blocks (i.e. inline with the direction)
        Side values are used to define which side the blocks are on relative to
        the path direction (i.e. horizontally or vertically)
        */
        switch (pathLines[i].direction) {
            case "up":
                pathDirection = {
                    x: 0,
                    y: -1,
                    xSide: 12.5,
                    ySide: 0
                }
                break;
            case "down":
                pathDirection = {
                    x: 0,
                    y: 1,
                    xSide: 12.5,
                    ySide: 0
                }
                break;
            case "left":
                pathDirection = {
                    x: -1,
                    y: 0,
                    xSide: 0,
                    ySide: 12.5
                }
                break;
            case "right":
                pathDirection = {
                    x: 1,
                    y: 0,
                    xSide: 0,
                    ySide: 12.5
                }
                break;
            default:
                throw new Error("Invalid direction provided in pathLines");
        }

        /*
        Creates block equal to double the amount of the blockAmount (the equivalent amount of blocks to the path distance)
        blockBefore refers to blocks either to the left or top of the path
        blockAfter refers to blocks either to the right or below of the path
        Creates block locations and gives them offsets to their center positions (for clarity in converting to blocks)
        */
        for (var j = 0; j < blockAmount; j++) {

            var blockBefore = {

                x: pathLines[i].startPoint.x +
                    pathDirection.xSide +
                    (pathDirection.x * 25 * j),

                y: pathLines[i].startPoint.y +
                    pathDirection.ySide +
                    (pathDirection.y * 25 * j )

            },
                blockAfter = {
                    x: pathLines[i].startPoint.x +
                        pathDirection.xSide +
                        (pathDirection.x * 25 * j),

                    y: pathLines[i].startPoint.y  +
                        pathDirection.ySide +
                        (pathDirection.y * 25 * j)
            };
            blocks.push(utils.convertToBlock(blockBefore));
            blocks.push(utils.convertToBlock(blockAfter));
        }


    }

    return blocks
}

// Grid is 36 by 24
// can be initiated by [x][y] - each block has a boolean to represent whether something is there
function _initiateGrid(pathLines) {
    var grid = [],
        blocks = _createPathBlocks(pathLines);
    // Create the grid
    for (var x = 0; x < 36; x++) {
        grid[x] = [];
        for (var y = 0; y < 24; y++) {
            grid[x][y] = {
                empty: true
            };
        }
    }
    // Loop through the blocks (which are on the path) and
    blocks.map(function(block, i) {
        grid[block.x][block.y] = {
            empty: false
        };
    });

    return grid;
};

module.exports = GameEngine;
