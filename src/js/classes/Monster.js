var Monster = function(maxHp, ms, type) {
  this.currentHp = maxHp;
  this.maxHp = maxHp;
  this.ms = ms; // Movement speed
  this.type = type;
};

Monster.prototype.create = function() {
  // adds position onto the map

};

Monster.prototype.destroy = function() {

}

Monster.prototype.move = function() {

};

// Can take in a positive or negative number
Monster.prototype.updateHp = function(hpChange) {
  this.currentHp += hpChange;

  if (this.currentHp > this.maxHp) {
    this.currentHp = this.maxHp;
  }
};
