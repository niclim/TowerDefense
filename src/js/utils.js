module.exports = function() {

    /* ================== Helper functions =================*/
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

    // Gets the index of the tower cards based on a tower's name
    function getTowerCardIndex(towerCardList, towerName) {
        return towerCardList.indexOf(towerName);
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

        towerPosition.grid.x = Math.floor(position.x / 25);
        towerPosition.grid.y = Math.floor(position.y / 25);

        // Adjusts if mouse is at end of container
        // 36 blocks width and 24 blocks height
        if (towerPosition.grid.x >= 35) {
            towerPosition.grid.x--;
        }

        if (towerPosition.grid.y >= 23) {
            towerPosition.grid.y--;
        }

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


    return {
        addClass: addClass,
        removeClass: removeClass,
        getTowerCardIndex: getTowerCardIndex,
        convertPositionToTower: convertPositionToTower,
        checkIfInSquare: checkIfInSquare
    }
}();
