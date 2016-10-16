var Tower = function(damage, speed, range, type, effect, position) {
    this.damage = damage;
    this.speed = speed; // Attack speed
    this.range = range; // Range of the tower
    this.type = type; // Type of damage
    this.effect = effect; // Special effect (e.g. slow, splash, etc)
    this.position = position; // object with x and y coordinates - should not change
}
// Method the game object uses to run towers
Tower.prototype.runCycle = function() {

}
// change this to reference a list or something where a name can be used to determine the properties
// Takes in a monster's position and checks whether that is in range based on the range - returns true or false if in range which can be used to
Tower.prototype.checkInRange = function(monsterPosition) {

}

module.exports = Tower;
