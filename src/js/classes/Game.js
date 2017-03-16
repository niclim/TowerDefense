//  require Monster to gain access
var Monster = require("./Monster.js"),
    Tower = require("./Tower.js"),
    towerData = require("../gameData/towerdata.js"),
    levelData = require("../gameData/leveldata.js"),
    utils = require("../utils.js"),
    pathCoordinates = require("../gameData/pathdata.js"),
    constants = require("../gameData/gameConstants.js");

var GameEngine = function() {
    this.userGold = constants.STARTINGGOLD;
    this.level = 0;
    this.userLives = constants.STARTINGLIVES;
    this.activeMonsters = []; // List of active monsters in the game
    this.towers = []; // object of tower objects
    this.timer = constants.TIMEBETWEENMONSTERCREATE;
    this.nextLevelCalled = false;
    this.monstersToCreate = 0;
    this.gameState = "start"; // Possible values are start, lost, won, playing
    this.gamePath = _convertPathToLines(pathCoordinates.path);
    this.gameGrid = _initiateGrid(this.gamePath);
}

GameEngine.prototype.addMonster = function(level) {
    level--; // Change to access correct array
    var monster = new Monster(levelData[level].type, levelData[level].multiplier);
    this.activeMonsters.push(monster);
}

GameEngine.prototype.addTower = function(id, position, gridPosition, goldCost) {
    this.userGold -= goldCost;
    var tower = new Tower(position, id);
    this.towers.push(tower);
    // Set gameGrid positioning
    this.gameGrid[gridPosition.x][gridPosition.y] = {empty: false};
    this.gameGrid[gridPosition.x + 1][gridPosition.y] = {empty: false};
    this.gameGrid[gridPosition.x][gridPosition.y + 1] = {empty: false};
    this.gameGrid[gridPosition.x + 1][gridPosition.y + 1] = {empty: false};
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
            element.index = i;
            break;
        }
    }

    // If nothing was found, loop through towers
    if (element.type === undefined) {
        for (var i = 0; i < this.towers.length; i++) {
            if (utils.checkIfInSquare(position, this.towers[i].position, this.towers[i].position.sideLength)) {
                element.type = "tower";
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

GameEngine.prototype.checkGameState = function() {
    if (this.level === constants.FINALLEVEL + 1) { // MAX level
        this.gameState = "won";
    } else if (this.userLives <= 0) {
        this.gameState = "lost";
    }
}

// method to check gold before place tower or upgrade
GameEngine.prototype.checkGold = function(goldCost) {
    if (goldCost <= this.userGold) {
        return true;
    } else {
        return false;
    }
}

GameEngine.prototype.gameOver = function() {

}

GameEngine.prototype.gameStart = function() {
    this.gameState = "playing";
    this.nextLevel();
}

GameEngine.prototype.gameWon = function() {

}

GameEngine.prototype.nextLevel = function() {
    // Only calls the next level once - nextLevelCalled is reset on a new monster creation
    this.monstersToCreate = levelData[this.level].amount; // this.level refers to the next level
    this.level++;
    this.nextLevelCalled = false;
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

        this.addTower(towerName, towerCoordinates, gridPosition, goldCost);
        return {
            placed: true
        };
    } else {

        if (!this.validateTowerPlacement(gridPosition)) {
            return {
                placed: false,
                message: constants.MESSAGEINVALIDPLACEMENT
            }
        } else {
            return {
                placed: false,
                message: constants.MESSAGENOTENOUGHGOLD
            }
        }
    }

}

GameEngine.prototype.render = function() {

    if (this.gameState === "playing") {
        // send state to the display object to render
        dynamicContext.beginPath();
        dynamicContext.clearRect(0, 0, dynamicCanvas.width, dynamicCanvas.height);

        // Render towers first so that if monsters are larger they show above towers
        this.towers.forEach(function(tower) {
            tower.draw();
        })

        //  loop through list of active monsters and render them
        //  TODO probably need to find a better way to rend them apart from random rectangle
        this.activeMonsters.forEach(function(activeMonster) {
            activeMonster.draw();

            // Renders projectile animations that are active for each monster
            activeMonster.projectiles.forEach(function(projectile) {
                projectile.draw(activeMonster.position);
            });
        });

        dynamicContext.closePath();

    } else if (this.gameState === "lost") {
        // Add render method to add thing
        console.log("you lost lol");
    } else if (this.gameState === "won") {
        // Add render method to add thing
        console.log("congrats you won");
    }

};

// Changed values to be based off dt (change in time since last render)
GameEngine.prototype.runCycle = function(dt) {
    this.checkGameState();

    if (this.gameState === "playing") {
        // loop through active monsters and towers and run the cycle
        // Each runCycle method returns information for the gameEngine to
        // process (e.g. the monster died, tower changed)

        // Adds monsters if there are monsters to create - creates 10 per level
        if (this.monstersToCreate > 0) {
            //  timer to add monsters
            this.timer -= dt;
            if (this.timer <= 0) {
                this.addMonster(this.level); // send through the level number
                this.timer = constants.TIMEBETWEENMONSTERCREATE; // Every 1 second create a new monster
                this.monstersToCreate--;
                this.nextLevelCalled = false;
            }
        }

        // Calls the next level if all the monsters are dead - TODO add a delay to space out between levels
        // Checks whether there are any monsters left and whether all the monsters have been created
        if (this.activeMonsters.length === 0 && this.monstersToCreate === 0) {
            if (!this.nextLevelCalled) {
                setTimeout(function() {
                    this.nextLevel();
                }.bind(this), constants.TIMEBETWEENLEVELS * 1000);

                this.nextLevelCalled = true;
            }
        } else {
            this.activeMonsters.forEach(function(activeMonster, i, monsterArray) {
                // moves the monsters and checks whether they get to the end of the cycle
                // also factor to have a projectiles array - which means that each cycle for monsters they will take damage
                var monsterStatus = activeMonster.runCycle(this.gamePath, dt);

                if (!monsterStatus.alive) {
                    if (monsterStatus.giveGold) {
                        this.userGold += activeMonster.bounty
                    } else {
                        this.userLives--;
                    }
                    var monsterDeath = new CustomEvent("unitRemoved", {"detail": {index: i, element: "monster"}});
                    document.dispatchEvent(monsterDeath);
                    monsterArray.splice(i, 1);
                }
            }.bind(this));

            // Run tower cycles here - pass in active monsters - towers only create projectiles
            this.towers.forEach(function(tower) {
                tower.runCycle(this.activeMonsters, dt); // Pass in active monsters and attach projectiles to them
            }.bind(this));
        }


    }
}

GameEngine.prototype.sellTower = function(towerIndex) {
    var gridPosition = utils.convertToBlock(this.towers[towerIndex].position),
        towerDeath = new CustomEvent("unitRemoved", {"detail": {index: towerIndex, element: "tower"}});
    // Dispatch the tower death event for the ui to update
    document.dispatchEvent(towerDeath);

    this.userGold += Math.floor(this.towers[towerIndex].totalCost * 0.75);
    this.towers.splice(towerIndex, 1);

    // Remove tower from the game grid
    this.gameGrid[gridPosition.x][gridPosition.y].empty = true;
    this.gameGrid[gridPosition.x + 1][gridPosition.y].empty = true;
    this.gameGrid[gridPosition.x][gridPosition.y + 1].empty = true;
    this.gameGrid[gridPosition.x + 1][gridPosition.y + 1].empty = true;
    return true;
}

GameEngine.prototype.upgradeTower = function(towerIndex) {
    // TODO CHANGE upgrade[0] to upgrade[index] when added
    // Check for sufficient gold
    var upgradeName  = this.towers[towerIndex].upgrade[0].name;

    if (towerData[upgradeName].goldCost > this.userGold) {
        return false;
    } else {
        // Create a the upgraded tower at the same position and replace that in the towers array
        // TODO for now, upgrade is going to be 0, need to add to handle multiple upgrades
        var upgradedTower = new Tower(this.towers[towerIndex].position, this.towers[towerIndex].upgrade[0].name);
        this.userGold -= towerData[upgradeName].goldCost;
        this.towers.splice(towerIndex, 1, upgradedTower);
        return true;
    }
}

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
        var blockAmount = Math.floor(pathLines[i].distance / constants.GRIDSIZE) + 1,
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
                    xSide: constants.GRIDSIZE / 2,
                    ySide: 0
                }
                break;
            case "down":
                pathDirection = {
                    x: 0,
                    y: 1,
                    xSide: constants.GRIDSIZE / 2,
                    ySide: 0
                }
                break;
            case "left":
                pathDirection = {
                    x: -1,
                    y: 0,
                    xSide: 0,
                    ySide: constants.GRIDSIZE / 2
                }
                break;
            case "right":
                pathDirection = {
                    x: 1,
                    y: 0,
                    xSide: 0,
                    ySide: constants.GRIDSIZE / 2
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

                x: pathLines[i].startPoint.x -
                    pathDirection.xSide +
                    (pathDirection.x * constants.GRIDSIZE * j) +
                    (pathDirection.x * constants.GRIDSIZE / 2), // Adds a slight offset

                y: pathLines[i].startPoint.y -
                    pathDirection.ySide +
                    (pathDirection.y * constants.GRIDSIZE * j ) +
                    (pathDirection.y * constants.GRIDSIZE / 2) // Adds a slight offset

            },
                blockAfter = {
                    x: pathLines[i].startPoint.x +
                        pathDirection.xSide +
                        (pathDirection.x * constants.GRIDSIZE * j) +
                        (pathDirection.x * constants.GRIDSIZE / 2), // Adds a slight offset

                    y: pathLines[i].startPoint.y  +
                        pathDirection.ySide +
                        (pathDirection.y * constants.GRIDSIZE * j) +
                        (pathDirection.y * constants.GRIDSIZE / 2) // Adds a slight offset
            };
            // Edge case for when the path exits the screen (there is definitely a better way to handle this)
            // This is such a bad solution lol.
            if (blockBefore.x < constants.CANVASWIDTH && blockBefore.y < constants.CANVASHEIGHT) {
                blocks.push(utils.convertToBlock(blockBefore));
            }
            if (blockAfter.x < constants.CANVASWIDTH && blockAfter.y < constants.CANVASHEIGHT) {
                blocks.push(utils.convertToBlock(blockAfter));
            }
        }


    }

    return blocks
}

// Grid is 36 by 24
// can be initiated by [x][y] - each block has a boolean to represent whether something is there
function _initiateGrid(pathLines) {
    var grid = [],
        blocks = _createPathBlocks(pathLines),
        xGridAmount = constants.CANVASWIDTH / constants.GRIDSIZE,
        yGridAmount = constants.CANVASHEIGHT / constants.GRIDSIZE;

    // Create the grid
    for (var x = 0; x < xGridAmount; x++) {
        grid[x] = [];
        for (var y = 0; y < yGridAmount; y++) {
            grid[x][y] = {
                empty: true
            };
        }
    }
    // Loop through the blocks (which are on the path) and
    blocks.map(function(block) {
        grid[block.x][block.y] = {
            empty: false
        };
    });

    return grid;
};

module.exports = GameEngine;
