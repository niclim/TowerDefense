var towerData = require("../gameData/towerdata.js"),
    utils = require("../utils.js"),
    constants = require("../gameData/gameConstants.js");

// Projectiles are attached to monsters
var Projectile = function(id, towerPosition) {
    this.id = id;
    this.damage = towerData[id].projectile.damage;
    this.totalTravelTime = towerData[id].projectile.travelTime;
    this.sprite = towerData[id].projectile.sprite;
    this.type = towerData[id].projectile.type;
    this.effects = {};
    for (key in towerData[id].projectile.effects) {
        this.effects[key] = Object.assign({}, towerData[id].projectile.effects[key]);
    }
    this.currentTravelTime = 0;
    this.end = false;
    this.initialPosition = {
        x: towerPosition.x + (constants.TOWERLENGTH/2) - (constants.PROJECTILELENGTH/2),
        y: towerPosition.y + (constants.TOWERLENGTH/2) - (constants.PROJECTILELENGTH/2)
    };
}

Projectile.prototype.draw = function(monsterPosition) {
    var fractionTravelled = this.currentTravelTime / this.totalTravelTime,
        adjustedMonsterPosition = {
            x: monsterPosition.x + (constants.MONSTERLENGTH/2) - (constants.PROJECTILELENGTH/2),
            y: monsterPosition.y + (constants.MONSTERLENGTH/2) - (constants.PROJECTILELENGTH/2)
        },
        position = utils.getPathPosition(this.initialPosition, adjustedMonsterPosition, fractionTravelled);

    // Calculate a fraction based on currentTravelTime / travelTime to get the position
    dynamicContext.beginPath();
    dynamicContext.fillStyle = "orange";
    dynamicContext.rect(position.x, position.y, constants.PROJECTILELENGTH, constants.PROJECTILELENGTH);
    dynamicContext.fill();
    // Change this to use a sprite
    // draw based on position here

    dynamicContext.closePath();
}

Projectile.prototype.move = function(dt) {
    this.currentTravelTime += dt;
    if (this.currentTravelTime >= this.totalTravelTime) {
        this.end = true;
    }
}

module.exports = Projectile;
