var towerData = require("../gameData/towerdata.js"),
    utils = require("../utils.js"),
    Projectile = require("./Projectiles.js"),
    constants = require("../gameData/gameConstants.js");

// Position refers to the upper left corner of the elements
// Tower width - 50 x 50
var Tower = function(position, id) {
    if (towerData[id] === undefined) {
        throw new Error("Invalid tower name, check html dataattribute or towerdata")
    }
    this.id = id;
    this.attackSpeed = towerData[id].attackSpeed; // Attack speed
    this.cooldown = 0;
    this.range = towerData[id].range; // Range of the tower
    this.effects = towerData[id].effects; // Special effect (e.g. slow, splash, etc)
    this.goldCost = towerData[id].goldCost;
    this.totalCost = towerData[id].totalCost;
    this.upgrade = towerData[id].upgrade;
    this.position = position; // object with x and y coordinates - references the top left corner of the tower
    this.position.sideLength = constants.TOWERLENGTH;
}
// Method the game object uses to run towers
Tower.prototype.runCycle = function(activeMonsters, dt) {
    var targetMonster = null;

    for (var i = 0; i < activeMonsters.length; i++) {
        if (this.checkInRange(activeMonsters[i].position)) {
            targetMonster = i;
            break;
        }
    }

    // Create a projectile if there is a monster in range and the tower has a cooldown of 0
    if (targetMonster !== null && this.cooldown < 0) {
        activeMonsters[targetMonster].projectiles.push(new Projectile(this.id, this.position));
        this.cooldown = this.attackSpeed;
    }

    if (this.cooldown >= 0) {
        this.cooldown -= dt;
    }
}
// change this to reference a list or something where a name can be used to determine the properties
// Takes in a monster's position and checks whether that is in range based on the range - returns true or false if in range which can be used to
Tower.prototype.checkInRange = function(monsterPosition) {
    // using sqrt((x2-x1)^2 - (y2-y1)^2)
    var monsterDistance = utils.getPositionDifference(monsterPosition, this.position);

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
                            constants.TOWERLENGTH,
                            constants.TOWERLENGTH);
    dynamicContext.closePath();
}

module.exports = Tower;
