var expect = chai.expect;

describe("Utilities", function() {
    describe("convertToBlock", function() {
        var position1,
            position2,
            position3,
            positionInvalid1,
            positionInvalid2;
        // Set up tests
        beforeEach(function() {
            position1 = {x: 37.5, y: 37.5};
            position2 = {x: 325.5, y: 212.5};
            position3 = {x: 500, y: 300};
            positionInvalid1 = {x: 7800, y: 50},
            positionInvalid2 = {x: 50, y: 5000}; // greater than the size of the grid
        });

        it("should take in a position object (with x and y coordinates) and return a grid object (with x and y values with the corresponding location)", function() {
            var block1 = convertToBlock(position1),
                block2 = convertToBlock(position2);
            expect(block1.x).to.equal(1);
            expect(block1.y).to.equal(1);

            expect(block2.x).to.equal(13);
            expect(block2.y).to.equal(8);
        });

        it("should treat edge cases (25) to round up", function(){
            var block3 = convertToBlock(position3);
            expect(block3.x).to.equal(20);
            expect(block3.y).to.equal(12);
        });

        it("should not mutate the position values", function() {
            var positionArchive1 = position1,
                positionArchive2 = position2,
                positionArchive3 = position3;

            convertToBlock(position1);
            convertToBlock(position2);
            convertToBlock(position3);

            expect(position1).to.equal(positionArchive1);
            expect(position2).to.equal(positionArchive2);
            expect(position3).to.equal(positionArchive3);
        });

        it("should throw an error when if the position is greater than the grid", function() {
            expect(function() {
                convertToBlock(positionInvalid1)
            }).to.throw(Error);

            expect(function() {
                convertToBlock(positionInvalid2)
            }).to.throw(Error);

        });

        it("should convert blocks that are 1 greater than the bottom right square to the bottom right square", function() {
            // This is account for grid values on the edge of the container
            // This is probably something that will hide bad code.... should probably remove and fix other code....
        });
    });

    describe("addClass", function() {
        // Figure out how to test these things properly - not a pure function so... need to use stub/mocks?
        it("should add a string to an element's class name", function() {

        });
    });

    describe("removeClass", function() {
        // Figure out how to test these things properly - not a pure function so... need to use stub/mocks?
        it("should remove a string to an element's class name", function() {

        });

    });

    describe("convertPositionToTower", function() {
        var position1,
            position2,
            position3,
            position4,
            towerPosition1,
            towerPosition2,
            towerPosition3,
            towerPosition4;

        beforeEach(function() {
            position1 = {x: 50, y: 300};
            position2 = {x: 150, y: 400};
            position3 = {x: 312.5, y: 87.5};
            position4 = {x: 62.5, y: 112.5};
            towerPosition1 = convertPositionToTower(position1);
            towerPosition2 = convertPositionToTower(position2);
            towerPosition3 = convertPositionToTower(position3);
            towerPosition4 = convertPositionToTower(position4);
        });

        it("should take in a position object (x and y coordinates) and return an object", function() {
            expect(towerPosition1).to.be.an("object");
            expect(towerPosition2).to.be.an("object");
            expect(towerPosition3).to.be.an("object");
        });

        it("should return an object with a grid position, coordinate position and side length", function() {

            expect(towerPosition1).to.have.all.keys("grid", "coordinates", "side");
            expect(towerPosition1.grid).to.be.an("object")
                .and.to.have.all.keys("x", "y");
            expect(towerPosition1.coordinates).to.be.an("object")
                .and.to.have.all.keys("x", "y");

            expect(towerPosition2).to.have.all.keys("grid", "coordinates", "side");
            expect(towerPosition2.grid).to.be.an("object")
                .and.to.have.all.keys("x", "y");
            expect(towerPosition2.coordinates).to.be.an("object")
                .and.to.have.all.keys("x", "y");

            expect(towerPosition3).to.have.all.keys("grid", "coordinates", "side");
            expect(towerPosition3.grid).to.be.an("object")
                .and.to.have.all.keys("x", "y");
            expect(towerPosition3.coordinates).to.be.an("object")
                .and.to.have.all.keys("x", "y");
        });

        it("should convert the position into the equivalent grid position object", function() {
            expect(towerPosition1.grid.x).to.equal(2);
            expect(towerPosition1.grid.y).to.equal(12);
            expect(towerPosition2.grid.x).to.equal(6);
            expect(towerPosition2.grid.y).to.equal(16);
            expect(towerPosition3.grid.x).to.equal(12);
            expect(towerPosition3.grid.y).to.equal(3);
            expect(towerPosition4.grid.x).to.equal(2);
            expect(towerPosition4.grid.y).to.equal(4);
        });

        it("should convert the position into the equivalent coordinate - (this will be the top left corner of the square)", function() {
            expect(towerPosition1.coordinates.x).to.equal(50);
            expect(towerPosition1.coordinates.y).to.equal(300);
            expect(towerPosition2.coordinates.x).to.equal(150);
            expect(towerPosition2.coordinates.y).to.equal(400);
            expect(towerPosition3.coordinates.x).to.equal(300);
            expect(towerPosition3.coordinates.y).to.equal(75);
            expect(towerPosition4.coordinates.x).to.equal(50);
            expect(towerPosition4.coordinates.y).to.equal(100);
        });

        it("should return a side length equal to the tower size", function() {
            expect(towerPosition1.side).to.equal(50);
            expect(towerPosition2.side).to.equal(50);
            expect(towerPosition3.side).to.equal(50);
            expect(towerPosition4.side).to.equal(50);
        });
    });

    describe("checkIfInSquare", function() {

        var test1,
            test2,
            test3,
            test4,
            test5,
            test6,
            test7,
            test8,
            test9;

        beforeEach(function() {
            var point1 = {x: 50, y: 50},
                point2 = {x: 126, y: 342},
                point3 = {x: 660, y: 210},
                topLeftPoint1 = {x: 25, y: 25},
                topLeftPoint2 = {x: 100, y: 300},
                topLeftPoint3 = {x: 650, y: 175},
                sideLength = 50;

            test1 = checkIfInSquare(point1, topLeftPoint1, sideLength);
            test2 = checkIfInSquare(point1, topLeftPoint2, sideLength);
            test3 = checkIfInSquare(point1, topLeftPoint3, sideLength);
            test4 = checkIfInSquare(point2, topLeftPoint1, sideLength);
            test5 = checkIfInSquare(point2, topLeftPoint2, sideLength);
            test6 = checkIfInSquare(point2, topLeftPoint3, sideLength);
            test7 = checkIfInSquare(point3, topLeftPoint1, sideLength);
            test8 = checkIfInSquare(point3, topLeftPoint2, sideLength);
            test9 = checkIfInSquare(point3, topLeftPoint3, sideLength);
        });

        it("should return true if the point is inside the square and false if it is not", function() {
            expect(test1).to.be.true;
            expect(test2).to.be.false;
            expect(test3).to.be.false;
            expect(test4).to.be.false;
            expect(test5).to.be.true;
            expect(test6).to.be.false;
            expect(test7).to.be.false;
            expect(test8).to.be.false;
            expect(test9).to.be.true;
        });
    });

    describe("getPositionDifference", function() {
        it("should take in two position objects and return the distance between them", function() {
            var position1 = {x: 0, y: 0},
                position2 = {x: 600, y: 250},
                position3 = {x: 35, y: 500},
                position4 = {x: 185, y: 325},
                position5 = {x: 325, y: 160},
                position6 = {x: 325, y: 100};

            // Get the floor to fudge the numbers to be whole - easy to compare test case
            expect(Math.floor(getPositionDifference(position1, position2))).to.equal(650);
            expect(Math.floor(getPositionDifference(position2, position3))).to.equal(617);
            expect(Math.floor(getPositionDifference(position3, position4))).to.equal(230);
            expect(Math.floor(getPositionDifference(position4, position5))).to.equal(216);
            expect(Math.floor(getPositionDifference(position5, position6))).to.equal(60);
            expect(Math.floor(getPositionDifference(position2, position4))).to.equal(421);
            expect(Math.floor(getPositionDifference(position2, position6))).to.equal(313);
        });
    });

    describe("convertDistanceToCoordinates", function() {
        var pathLines1 = [];

        beforeEach(function() {
            // lol this hard coding makes me go crazy
            // convert this to use the other function - is this bad practice since its a function we made??????
            pathLines1.push({
                distance: 75,
                direction: "right",
                startPoint: {
                    x: 0,
                    y: 500
                }
            });

            pathLines1.push({
                distance: 400,
                direction: "up",
                startPoint: {
                    x: 75,
                    y: 500
                }
            });

            pathLines1.push({
                distance: 150,
                direction: "right",
                startPoint: {
                    x: 75,
                    y: 100
                }
            });

            pathLines1.push({
                distance: 400,
                direction: "down",
                startPoint: {
                    x: 225,
                    y: 100
                }
            });

            pathLines1.push({
                distance: 150,
                direction: "right",
                startPoint: {
                    x: 225,
                    y: 500
                }
            });

            pathLines1.push({
                distance: 400,
                direction: "up",
                startPoint: {
                    x: 375,
                    y: 500
                }
            });

            pathLines1.push({
                distance: 150,
                direction: "right",
                startPoint: {
                    x: 375,
                    y: 100
                }
            });

            pathLines1.push({
                distance: 400,
                direction: "down",
                startPoint: {
                    x: 525,
                    y: 100
                }
            });

            pathLines1.push({
                distance: 150,
                direction: "right",
                startPoint: {
                    x: 525,
                    y: 500
                }
            });

            pathLines1.push({
                distance: 400,
                direction: "up",
                startPoint: {
                    x: 675,
                    y: 500
                }
            });

            pathLines1.push({
                distance: 150,
                direction: "right",
                startPoint: {
                    x: 675,
                    y: 100
                }
            });

            pathLines1.push({
                distance: 400,
                direction: "down",
                startPoint: {
                    x: 825,
                    y: 100
                }
            });

            pathLines1.push({
                distance: 75,
                direction: "right",
                startPoint: {
                    x: 825,
                    y: 500
                }
            });

        });

        it("should take a distance (integer value) and a pathLines array of Objects containing", function() {
            convertDistanceToCoordinates(20, pathLines1);
            convertDistanceToCoordinates(200, pathLines1);
            convertDistanceToCoordinates(600, pathLines1);
            convertDistanceToCoordinates(7430, pathLines1);
            convertDistanceToCoordinates(735, pathLines1);
        });

        it("should return the equivalent coordinates based on the distance travelled and the path", function() {
            // Also need to take into account monster size - monster size is 30 - half is 15
            expect(convertDistanceToCoordinates(20, pathLines1).x).to.equal(5);
            expect(convertDistanceToCoordinates(20, pathLines1).y).to.equal(485);
            expect(convertDistanceToCoordinates(200, pathLines1).x).to.equal(60);
            expect(convertDistanceToCoordinates(200, pathLines1).y).to.equal(360);
            expect(convertDistanceToCoordinates(250, pathLines1).x).to.equal(60);
            expect(convertDistanceToCoordinates(250, pathLines1).y).to.equal(310);
            expect(convertDistanceToCoordinates(300, pathLines1).x).to.equal(60);
            expect(convertDistanceToCoordinates(300, pathLines1).y).to.equal(260);
            expect(convertDistanceToCoordinates(380, pathLines1).x).to.equal(60);
            expect(convertDistanceToCoordinates(380, pathLines1).y).to.equal(180);
            expect(convertDistanceToCoordinates(550, pathLines1).x).to.equal(135);
            expect(convertDistanceToCoordinates(550, pathLines1).y).to.equal(85);
            expect(convertDistanceToCoordinates(625, pathLines1).x).to.equal(210);
            expect(convertDistanceToCoordinates(625, pathLines1).y).to.equal(85);
            expect(convertDistanceToCoordinates(800, pathLines1).x).to.equal(210);
            expect(convertDistanceToCoordinates(800, pathLines1).y).to.equal(260);
            expect(convertDistanceToCoordinates(1460, pathLines1).x).to.equal(360);
            expect(convertDistanceToCoordinates(1460, pathLines1).y).to.equal(200);
            expect(convertDistanceToCoordinates(2250, pathLines1).x).to.equal(635);
            expect(convertDistanceToCoordinates(2250, pathLines1).y).to.equal(485);
            expect(convertDistanceToCoordinates(2750, pathLines1).x).to.equal(735);
            expect(convertDistanceToCoordinates(2750, pathLines1).y).to.equal(85);

        });

        it("should return the end position if the distance travelled is greater than the pathLines combined distance", function() {
            var totalDistance = 0;

            pathLines1.forEach(function(line) {
                totalDistance += line.distance;
            });

            totalDistance += 15; // This is the half of the monster size

            var overDistance1 = totalDistance,
                overDistance2 = totalDistance + 50,
                overDistance3 = totalDistance + 150,
                overDistance4 = totalDistance + 350,
                overDistance5 = totalDistance + 500,
                overDistance6 = totalDistance + 5000;

            var lastLine1 = pathLines1[pathLines1.length - 1],
                endPoint1 = Object.create(lastLine1.startPoint),
                distance1 = lastLine1.distance;

            switch (pathLines1[pathLines1.length - 1].direction) {
                case "up":
                    endPoint1.y -= distance1;
                    break;
                case "down":
                    endPoint1.y += distance1;
                    break;
                case "left":
                    endPoint1.x -= distance1;
                    break;
                case "right":
                    endPoint1.x += distance1;
                    break;
                default:
                    throw new Error("Invalid direction provided in pathLines");
            }

            expect(convertDistanceToCoordinates(overDistance1, pathLines1).x).to.equal(endPoint1.x);
            expect(convertDistanceToCoordinates(overDistance1, pathLines1).y).to.equal(endPoint1.y);
            expect(convertDistanceToCoordinates(overDistance2, pathLines1).x).to.equal(endPoint1.x);
            expect(convertDistanceToCoordinates(overDistance2, pathLines1).y).to.equal(endPoint1.y);
            expect(convertDistanceToCoordinates(overDistance3, pathLines1).x).to.equal(endPoint1.x);
            expect(convertDistanceToCoordinates(overDistance3, pathLines1).y).to.equal(endPoint1.y);
            expect(convertDistanceToCoordinates(overDistance4, pathLines1).x).to.equal(endPoint1.x);
            expect(convertDistanceToCoordinates(overDistance4, pathLines1).y).to.equal(endPoint1.y);
            expect(convertDistanceToCoordinates(overDistance5, pathLines1).x).to.equal(endPoint1.x);
            expect(convertDistanceToCoordinates(overDistance5, pathLines1).y).to.equal(endPoint1.y);
            expect(convertDistanceToCoordinates(overDistance6, pathLines1).x).to.equal(endPoint1.x);
            expect(convertDistanceToCoordinates(overDistance6, pathLines1).y).to.equal(endPoint1.y);
        });
    });
});
