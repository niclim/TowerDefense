// Make this file great again!
// This file needs tests and needs to be cleaned up (with comments and other useful stuff - cant be bothered at the moment)
// probably can move the game specific grid generation things to the game file

/* ================== Private functions ================*/
/* =====================================================*/
// TODO - add tests

/* ================== Public functions =================*/
/* =====================================================*/
// Takes in a position object with coordinates{x, y}
// returns a block object {x, y} with block numbers
// Handles edge cases of the block being defined at the edge (36 and 24 which are invalid in the )
function convertToBlock(position) {
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

    towerPosition.grid = convertToBlock(position);

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
    var coordinates = {},
        end = false; // Boolean to represent whether the monster is at the end


    for (var i = 0; i < pathLines.length; i ++) {
        if (distance - pathLines[i].distance <= 0) {
            break;
        } else {
            distance -= pathLines[i].distance;
        }
    }

    if (i === pathLines.length) {
        i--; // Set the counter value to be the last value in the pathlines array
        distance =  pathLines[i].distance;
        end = true;
    }

    // Create a new object to return (instead of modifiying startPoint object)
    coordinates = Object.create(pathLines[i].startPoint);
    coordinates.end = end;

    // Case for when monster is at the end of the thingy - there is a better way to write this but not right now

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

// Moved out to be able to test code
module.exports = {
    addClass: addClass,
    removeClass: removeClass,
    convertPositionToTower: convertPositionToTower,
    checkIfInSquare: checkIfInSquare,
    getPositionDifference: getPositionDifference,
    convertToBlock: convertToBlock,
    convertDistanceToCoordinates: convertDistanceToCoordinates
}
