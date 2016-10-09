var Tower = function(damage, speed, range, type, effect) {
  this.damage = damage;
  this.speed = speed; // Attack speed
  this.range = range; // Range of the tower
  this.type = type; // Type of damage
  this.effect = effect; // Special effect (e.g. slow, splash, etc)
}
// change this to reference a list or something where a name can be used to determine the properties


module.exports = Tower;
