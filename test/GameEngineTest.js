var expect = chai.expect;
describe("Game", function() {
  describe("Game Start", function() {
    var game;
    beforeEach(function(){
      game = new GameEngine();
    });
    it("should start with 10 user gold", function() {
      expect(game.userGold).to.equal(10);
    });

    it("should start with 30 lives", function() {
      expect(game.userLives).to.equal(30);
    });

    it("should start at level 1", function() {
      expect(game.level).to.equal(1);
    });
  });

  describe("Game Cycle", function() {
    it("should be called when the game starts", function() {

    });

    it("should be called on requestAnimationFrame (loops)", function() {

    });
  });
});
