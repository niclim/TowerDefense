var constants = require("./gameData/gameConstants.js"),
    towerData = require("./gameData/towerdata.js");

/* ================== Public functions =================*/
/* =====================================================*/
function addClass(element, cssClass) {
    if (element.className === "") {
        element.className = cssClass;
    } else {
        element.className += " " + cssClass;
    }
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
    return (point.x >= topLeftPoint.x
    && point.x <= topLeftPoint.x + sideLength
    && point.y >= topLeftPoint.y
    && point.y <= topLeftPoint.y + sideLength)
}

/*
Takes in a distance (int) and pathLines(array of path objects) and converts it to coordinates for a monster
Returns a coordinate object
*/
function convertDistanceToCoordinates(distance, pathLines) {
    var coordinates,
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
    if (!end) {
        switch (pathLines[i].direction) {
            // 15 is a half of the monster width
            // values used to offset the positioning based on the monster direciton movement
            case "up":
            coordinates.x -= constants.MONSTERLENGTH/2;
            coordinates.y -= distance + constants.MONSTERLENGTH/2;
            break;
            case "down":
            coordinates.x -= constants.MONSTERLENGTH/2;
            coordinates.y += distance - constants.MONSTERLENGTH/2;
            break;
            case "left":
            coordinates.x -= distance + constants.MONSTERLENGTH/2;
            coordinates.y -= constants.MONSTERLENGTH/2;
            break;
            case "right":
            coordinates.x += distance - constants.MONSTERLENGTH/2;
            coordinates.y -= constants.MONSTERLENGTH/2;
            break;
            default:
            throw new Error("Invalid direction provided in pathLines");
        }
    } else {
        switch (pathLines[i].direction) {
            case "up":
                coordinates.y -= pathLines[i].distance;
                break;
            case "down":
                coordinates.y += pathLines[i].distance;
                break;
            case "left":
                coordinates.x -= pathLines[i].distance;
                break;
            case "right":
                coordinates.x += pathLines[i].distance;
                break;
            default:
                throw new Error("Invalid direction provided in pathLines");
        }

    }

    return coordinates
}

// Takes in a position object with coordinates{x, y}
// returns a block object {x, y} with block numbers
// Handles edge cases of the block being defined at the edge (36 and 24 which are invalid in the )
function convertToBlock(position) {
    var xGridAmount = constants.CANVASWIDTH / constants.GRIDSIZE,
        yGridAmount = constants.CANVASHEIGHT / constants.GRIDSIZE;

    if (position.x > (xGridAmount * (constants.TOWERLENGTH/2)) ||
        position.y > (yGridAmount * (constants.TOWERLENGTH/2))) {
        console.log(position)
        throw new Error("Position out of grid range");
    }

    var block = {
        x: Math.floor(position.x / (constants.TOWERLENGTH/2)),
        y: Math.floor(position.y / (constants.TOWERLENGTH/2))
    };
    // Adjusts if mouse is at end of container
    // 36 blocks width and 24 blocks height
    if (block.x >= xGridAmount - 1) {
        block.x--;
    }

    if (block.y >= yGridAmount - 1) {
        block.y--;
    }

    return block;
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
        side: constants.TOWERLENGTH
    },
        xGridAmount = constants.CANVASWIDTH / constants.GRIDSIZE,
        yGridAmount = constants.CANVASHEIGHT / constants.GRIDSIZE;


    towerPosition.grid = convertToBlock(position);

    // Container width and height 900 and 600 px respectively
    towerPosition.coordinates.x = (towerPosition.grid.x / xGridAmount) * constants.CANVASWIDTH;
    towerPosition.coordinates.y = (towerPosition.grid.y / yGridAmount) * constants.CANVASHEIGHT;
    return towerPosition;
}
/*
getPathPosition inputs:
initialPosition: position object {x, y}
finalPosition: position object {x, y}
fractionTravelled: decimal of how far along the path

Output: position object {x, y}
*/
function getPathPosition(pos1, pos2, fractionTravelled) {
    var finalPosition = {},
        angle = Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x), // the line angle (in radians) from pos1 to pos2 with respect to the origin
        distanceFromPos1 = getPositionDifference(pos1, pos2) * fractionTravelled;

    finalPosition.x = pos1.x + distanceFromPos1 * Math.cos(angle);
    finalPosition.y = pos1.y + distanceFromPos1 * Math.sin(angle);

    return finalPosition;
}

function getPositionDifference(position1, position2) {
    return Math.sqrt(
            Math.pow(position1.x-position2.x, 2) +
            Math.pow(position1.y-position2.y, 2)
    );
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

function getTowerData(towerType) {
    return towerData[towerType];
}

// Inserts variables into a html template -
function compileTemplate(template, object) {
    var html = template;
    for (var key in object) {
        html = html.replace(`{{${key}}}`, object[key]);
    }
    return html
}
module.exports = {
    addClass,
    checkIfInSquare,
    convertToBlock,
    convertDistanceToCoordinates,
    convertPositionToTower,
    getPathPosition,
    getPositionDifference,
    removeClass,
    compileTemplate,
    getTowerData
}


