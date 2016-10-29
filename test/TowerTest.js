var expect = chai.expect;

describe("Tower", function() {
    var tower;
    beforeEach(function() {
        var position = {
            x: 50,
            y: 50
        }
        tower = new Tower("basic");
    });

    describe("Tower Create", function() {
        it("should create a tower in the a position", function() {

        });

        it("should not create a tower in the path position", function() {

        });

        it("should reduce the cost of the tower from the user's gold", function() {

        });
    });

    describe("Tower Upgrade", function() {
        it("should remove the current tower when upgraded", function() {

        });

        it("should add the upgraded tower to the old position", function() {

        });

        it("should reduce the cost of the upgrade from the user's gold", function() {

        });
    });

    describe("Tower Attack", function() {
        it("should attack based on it's attack speed", function() {

        });
    });
});
