var GameEngine = function() {
  this.userGold = 10;
  this.level = 1;
  this.userLives = 30;


  // Goes through and disables towers that can't be used yet
  // Tower placed method
  // game has some sort of memory remembering where the towers are placed
  // pubsub implementation
  // each game cycle sends update to each monster and tower to run on a game cycle
  // the constructor makes it that they subscribe to it - when die they unsubscribe
}

module.exports = GameEngine;
