var towerData = require("../gameData/towerdata.js"),
    utils = require("../utils.js");

// Projectiles are attached to monsters
var Projectile = function(id, towerPosition) {
    this.damage = towerData[id].projectile.damage;
    this.totalTravelTime = towerData[id].projectile.travelTime;
    this.sprite = towerData[id].projectile.sprite;
    this.currentTravelTime = 0;
    this.end = false;
    this.initialPosition = {
        x: towerPosition.x + 25 - 5,
        y: towerPosition.y + 25 - 5
    };
}

Projectile.prototype.draw = function(monsterPosition) {
    var fractionTravelled = this.currentTravelTime / this.totalTravelTime,
        adjustedMonsterPosition = {
            x: monsterPosition.x + 15 - 5,
            y: monsterPosition.y + 15 - 5
        },
        position = utils.getPathPosition(this.initialPosition, adjustedMonsterPosition, fractionTravelled);

    // Calculate a fraction based on currentTravelTime / travelTime to get the position
    dynamicContext.beginPath();
    dynamicContext.fillStyle = "orange";
    dynamicContext.rect(position.x, position.y, 10, 10);
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
