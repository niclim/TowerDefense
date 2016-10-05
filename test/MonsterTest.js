var expect = chai.expect;

describe("Monster", function() {
  var monster;

  beforeEach(function() {
    monster = new Monster(100, 10, "normal");
  });

  describe("Monster Create", function() {
    it("should start with 100% hp", function() {
      expect(monster.currentHp).to.equal(monster.maxHp);
    });

    it("should have a move speed greater than 0", function() {

    });

    it("should have a valid type and throw an error if the type is invalid", function() {

    });

    it("should start in the initial position of x = 0, y = 500", function() {
      expect(monster.position.x).to.equal(0);
      expect(monster.position.y).to.equal(500);
    });
  });

  describe("Monster HP/Death", function() {
    it("should not have hp greater than its max hp", function() {
      monster.updateHp(20);
      expect(monster.currentHp).to.equal(monster.maxHp);
    });

    it("should only die when it's hp is less or equal to 0", function() {
      monster.updateHp(-10000);
      expect(monster.checkDeath()).to.be.true;

      var aliveMonster = new Monster(100, 10, "normal");
      aliveMonster.updateHp(-99);
      expect(aliveMonster.checkDeath()).to.be.false;

      var deadMonster = new Monster(100, 10, "normal");
      deadMonster.updateHp(-100);
      expect(deadMonster.checkDeath()).to.be.true;

    });

    it("should die when it reaches the end of the maze", function() {

    });

  });

  describe("Monster Movement", function() {

    it("should move it's position in relation to its movement and direction", function() {

    });

    // Path is defined in the background.js file
    it("should stick to the defined path", function() {

    });

  });

});
