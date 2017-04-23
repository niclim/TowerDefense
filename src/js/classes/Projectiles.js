const towerData = require("../gameData/towerdata.js"),
    { getPathPosition } = require("../utils.js"),
    constants = require("../gameData/gameConstants.js");

// Projectiles are attached to monsters
const Projectile = function(id, towerPosition) {
    this.id = id;
    this.damage = towerData[id].projectile.damage;
    this.totalTravelTime = towerData[id].projectile.travelTime;
    this.sprite = towerData[id].projectile.sprite;
    this.type = towerData[id].projectile.type;
    this.effects = {};

    for (let key in towerData[id].projectile.effects) {
        this.effects[key] = Object.assign({}, towerData[id].projectile.effects[key]);
    }

    this.currentTravelTime = 0;
    this.end = false;
    this.initialPosition = {
        x: towerPosition.x + (constants.TOWERLENGTH/2) - (constants.PROJECTILELENGTH/2),
        y: towerPosition.y + (constants.TOWERLENGTH/2) - (constants.PROJECTILELENGTH/2)
    };
    this.projectilePosition = this.initialPosition;
}

Projectile.prototype.draw = function() {
    // Calculate a fraction based on currentTravelTime / travelTime to get the position
    dynamicContext.beginPath();
    dynamicContext.fillStyle = "orange";
    dynamicContext.rect(this.projectilePosition.x, this.projectilePosition.y, constants.PROJECTILELENGTH, constants.PROJECTILELENGTH);
    dynamicContext.fill();
    // Change this to use a sprite
    // draw based on position here

    dynamicContext.closePath();
}

Projectile.prototype.move = function(dt, targetPosition) {
    this.currentTravelTime += dt;
    if (this.currentTravelTime >= this.totalTravelTime) {
        this.end = true;
    }

    const fractionTravelled = this.currentTravelTime / this.totalTravelTime,
        adjustedMonsterPosition = {
            x: targetPosition.x + (constants.MONSTERLENGTH/2) - (constants.PROJECTILELENGTH/2),
            y: targetPosition.y + (constants.MONSTERLENGTH/2) - (constants.PROJECTILELENGTH/2)
        };
    this.projectilePosition = getPathPosition(this.initialPosition, adjustedMonsterPosition, fractionTravelled);
}

module.exports = Projectile;
