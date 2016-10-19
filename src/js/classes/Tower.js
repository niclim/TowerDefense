var towerData = require("../gameData/towerdata.js");

var Tower = function(position, id) {
    this.id = id;
    this.damage = towerData[id].damage;
    this.speed = towerData[id].speed; // Attack speed
    this.range = towerData[id].range; // Range of the tower
    this.type = towerData[id].type; // Type of damage
    this.effect = towerData[id].effect; // Special effect (e.g. slow, splash, etc)
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
