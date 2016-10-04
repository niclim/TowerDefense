var expect = chai.expect;

describe("Monster", function() {
  var monster;

  beforeEach(function() {
    monster = new Monster(100, 10, "normal");
  });

  it("should start with 100% hp", function() {
    expect(monster.currentHp).to.equal(monster.maxHp);
  });

  it("should not have hp greater than its max hp", function() {
    monster.updateHp(20);

    expect(monster.currentHp).to.equal(monster.maxHp);
  });

  it("should die when it's hp is less than 0", function() {

  });

  it("should die when it reaches the end of the maze", function() {

  });

  it("should throw an error if the type is invalid", function() {

  });

})

describe("Light Monster", function() {
  beforeEach(function() {
    lightMonster = new Monster()
  });

  it("should take extra damage from fire", function() {

  })
});
