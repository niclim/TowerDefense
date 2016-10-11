var Monster = function(maxHp, baseMs, type) {
  this.currentHp = maxHp;
  this.maxHp = maxHp;
  this.baseMs = baseMs; // Movement speed - "units" per second
  this.type = type;
  this.position = { // All monsters are created in the same position
    x: 0,
    y: 500
  }
};
// Method the game object uses to move monsters
Monster.prototype.runCycle = function() {

}

Monster.prototype.destroy = function() {

};

Monster.prototype.checkDeath = function() {

};

// Expects up, down, left or right
Monster.prototype.move = function(direction) {
  if (typeof direction !== "string") {
    throw new TypeError("direction is not a string");
  }
  direction = direction.toLowerCase();
  switch(direction) {
    case "up":
    case "down":
    case "left":
    case "right":
    default:
      throw new Error("Invalid direction");
  }
};

// Can take in a positive or negative number
Monster.prototype.updateHp = function(hpChange) {
  this.currentHp += hpChange;

  if (this.currentHp > this.maxHp) {
    this.currentHp = this.maxHp;
  }
};

module.exports = Monster;
