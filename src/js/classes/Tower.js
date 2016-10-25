var towerData = require("../gameData/towerdata.js");
// Position refers to the upper left corner of the elements
// Tower width - 50 x 50
var Tower = function(position, id) {
    if (towerData[id] === undefined) {
        throw Error("Invalid tower name, check html dataattribute or towerdata")
    }
    this.id = id;
    this.damage = towerData[id].damage;
    this.speed = towerData[id].speed; // Attack speed
    this.range = towerData[id].range; // Range of the tower
    this.type = towerData[id].type; // Type of damage
    this.effect = towerData[id].effect; // Special effect (e.g. slow, splash, etc)
    this.goldCost = towerData[id].goldCost;
    this.position = position; // object with x and y coordinates - should not change
}
// Method the game object uses to run towers
Tower.prototype.runCycle = function() {

}
// change this to reference a list or something where a name can be used to determine the properties
// Takes in a monster's position and checks whether that is in range based on the range - returns true or false if in range which can be used to
Tower.prototype.checkInRange = function(monsterPosition) {
    // using sqrt((x2-x1)^2 - (y2-y1)^2)
    var monsterDistance =
    Math.sqrt(
        Math.Pow(monsterPosition.x-this.position.x)
    -   Math.Pow(monsterPosition.y-this.position.y)
   );

   if (monsterDistance <= this.range) {
       return true;
   } else {
       return false;
   }
}

Tower.prototype.draw = function() {
    dynamicContext.beginPath();
    dynamicContext.fillStyle = "green";
    dynamicContext.fillRect(this.position.x,
                            this.position.y,
                            50,
                            50);
    dynamicContext.closePath();
}

module.exports = Tower;
