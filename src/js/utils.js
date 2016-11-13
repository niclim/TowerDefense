// Make this file great again!
// This file needs tests and needs to be cleaned up (with comments and other useful stuff - cant be bothered at the moment)
// probably can move the game specific grid generation things to the game file

module.exports = function() {
/* ================== Private functions ================*/
/* =====================================================*/
// TODO - add tests
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
            Side values are used to define which side the blocks are on relative to the path direction (i.e. horizontally or vertically)
            */
            switch (pathLines[i].direction) {
                case "up":
                    pathDirection = {
                        x: 0,
                        y: -1,
                        xOffset: 0,
                        yOffset: -12.5,
                        xSide: 12.5,
                        ySide: 0
                    }
                    break;
                case "down":
                    pathDirection = {
                        x: 0,
                        y: 1,
                        xOffset: 0,
                        yOffset: 12.5,
                        xSide: 12.5,
                        ySide: 0
                    }
                    break;
                case "left":
                    pathDirection = {
                        x: -1,
                        y: 0,
                        xOffset: 12.5,
                        yOffset: 0,
                        xSide: 0,
                        ySide: 12.5
                    }
                    break;
                case "right":
                    pathDirection = {
                        x: 1,
                        y: 0,
                        xOffset: 12.5,
                        yOffset: 0,
                        xSide: 0,
                        ySide: 12.5
                    }
                    break;
                default:
                    throw new Error("Invalid direction provided in pathLines");
            }

            // Creates block equal to double the amount of the blockAmount (the equivalent amount of blocks to the path distance)
            // blockBefore refers to blocks either to the left or top of the path
            // blockAfter refers to blocks either to the right or below of the path
            // Creates block locations and gives them offsets to their center positions (for clarity in converting to blocks)
            for (var j = 0; j < blockAmount; j++) {

                var blockBefore = {

                    x: pathLines[i].startPoint.x +
                        pathDirection.xOffset -
                        pathDirection.xSide +
                        (pathDirection.x * 25 * j),

                    y: pathLines[i].startPoint.y +
                        pathDirection.yOffset -
                        pathDirection.ySide +
                        (pathDirection.y * 25 * j )

                },
                    blockAfter = {
                        x: pathLines[i].startPoint.x +
                            pathDirection.xOffset +
                            pathDirection.xSide +
                            (pathDirection.x * 25 * j),

                        y: pathLines[i].startPoint.y  +
                            pathDirection.yOffset +
                            pathDirection.ySide +
                            (pathDirection.y * 25 * j)
                };
                blocks.push(_convertToBlock(blockBefore));
                blocks.push(_convertToBlock(blockAfter));
            }


        }

        return blocks
    }

    // Takes in a position object with coordinates{x, y}
    // returns a block object {x, y} with block numbers
    // Handles edge cases of the block being defined at the edge (36 and 24 which are invalid in the )
    function _convertToBlock(position) {
        var block = {
            x: Math.floor(position.x / 25),
            y: Math.floor(position.y / 25)
        };
        // Adjusts if mouse is at end of container
        // 36 blocks width and 24 blocks height
        if (block.x >= 35) {
            block.x--;
        }

        if (block.y >= 23) {
            block.y--;
        }

        return block;
    }


/* ================== Public functions =================*/
/* =====================================================*/
    function addClass(element, cssClass) {
        if (element.className === "") {
            element.className = cssClass;
        } else {
            element.className += " " + cssClass;
        }
    }

    function removeClass(element, cssClass) {
        var arrayOfClasses = element.className.split(" ");
        for (var i = 0, j = arrayOfClasses.length; i < j; i++) {
            if (arrayOfClasses[i] === cssClass) {
                arrayOfClasses.splice(i, 1);
                i--; j--;
            }
        }
        element.className = arrayOfClasses.join(" ");
    }

    /*
    Takes in a position object (x and y coordinates)
    Returns the top left block position and topleft coordinate of the tower
    Grid blocks are in 25x25 block increments
    */
    function convertPositionToTower(position) {
        var towerPosition = {
            grid: {},
            coordinates: {},
            side: 50
        };

        towerPosition.grid = _convertToBlock(position);

        // Container width and height 900 and 600 px respectively
        towerPosition.coordinates.x = (towerPosition.grid.x / 36) * 900;
        towerPosition.coordinates.y = (towerPosition.grid.y / 24) * 600;
        return towerPosition;
    }

    /*
    checkIfInSquare checks whether a point is in a square (which is a monster or a tower)

    Takes in three arguments
    point - a object with x and y coordinates
    topLeftPoint - an object with x and y coordinates of the top left corner of the square
    sideLength - the length of the square

    Returns a boolean - true if the click overlaps with an element and false
    if it does not
    */
    function checkIfInSquare(point, topLeftPoint, sideLength) {
        if (point.x >= topLeftPoint.x
        && point.x <= topLeftPoint.x + sideLength
        && point.y >= topLeftPoint.y
        && point.y <= topLeftPoint.y + sideLength) {
            return true;
        } else {
            return false;
        }
    }

    /*
    Input: Path - an array of objects containing coordinates where the path will run to
    Output: pathLines - an array of objects containing the startPoint (coordinates), distance of the line and direction (left, right, up, down)
    */
    function convertPathToLines(path) {
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
            line.distance = getPositionDifference(path[i], path[i+1]);
            pathLines.push(line);
        }

        return pathLines;
    }


    // Grid is 36 by 24
    // can be initiated by [x][y] - each block has a boolean to represent whether something is there
    function initiateGrid(pathLines) {
        var grid = [],
            blocks = _createPathBlocks(pathLines);
            console.log(pathLines)
        // Create the grid
        for (var x = 0; x < 36; x++) {
            grid[x] = [];
            for (var y = 0; y < 24; y++) {
                grid[x][y] = {
                    empty: true
                };
            }
        }
        blocks.map(function(block, i) {
            grid[block.x][block.y] = {
                empty: false
            };
        });
        console.table(grid);

        return grid;
    };

    function getPositionDifference(position1, position2) {
        return Math.sqrt(
                Math.pow(position1.x-position2.x, 2) +
                Math.pow(position1.y-position2.y, 2)
        );
    }

    /*
    Takes in a distance (int) and pathLines(array of path objects) and converts it to coordinates for a monster
    
    Returns a coordinate object
    */
    function convertDistanceToCoordinates(distance, pathLines) {
        var coordinates = {};

        for (var i = 0; i < pathLines.length; i ++) {
            if (distance - pathLines[i].distance <= 0) {
                break;
            } else {
                distance -= pathLines[i].distance;
            }
        }

        // Case for when monster is at the end of the thingy - there is a better way to write this but not right now
        if (i === pathLines.length) {
            i--; // Set the counter value to be the last value in the pathlines array
            distance =  pathLines[i].distance;
        }

        // Create a new object to return (instead of modifiying startPoint object)
        coordinates = Object.create(pathLines[i].startPoint);

        switch (pathLines[i].direction) {
            // 15 is a half of the monster width
            // values used to offset the positioning based on the monster direciton movement
            case "up":
                coordinates.x -= 15;
                coordinates.y -= distance + 15;
                break;
            case "down":
                coordinates.x -= 15;
                coordinates.y += distance - 15;
                break;
            case "left":
                coordinates.x -= distance + 15;
                coordinates.y -= 15;
                break;
            case "right":
                coordinates.x += distance - 15;
                coordinates.y -= 15;
                break;
            default:
                throw new Error("Invalid direction provided in pathLines");
        }

        return coordinates
    }

    return {
        addClass: addClass,
        removeClass: removeClass,
        convertPositionToTower: convertPositionToTower,
        checkIfInSquare: checkIfInSquare,
        initiateGrid: initiateGrid,
        getPositionDifference: getPositionDifference,
        convertPathToLines: convertPathToLines,
        convertDistanceToCoordinates: convertDistanceToCoordinates
    }
}();
