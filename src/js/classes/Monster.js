var monsterData = require("../gameData/monsterdata.js"),
    utils = require("../utils.js"),
    constants = require("../gameData/gameConstants.js");

var Monster = function(id, multiplier) {
    this.id = id;
    this.currentHp = Math.floor(monsterData[id].maxHp * multiplier);
    this.maxHp = Math.floor(monsterData[id].maxHp * multiplier);
    this.baseMs = monsterData[id].baseMs; // Movement speed - "units" per second
    this.type = monsterData[id].type;
    this.bounty = Math.floor(monsterData[id].bounty * multiplier);
    this.projectiles = [];
    this.distanceTravelled = 0;
    this.position = {}; // Initial position is defined by the path
    this.sideLength = constants.MONSTERLENGTH;
};
// Method the game object uses to move monsters
Monster.prototype.runCycle = function(gamePath, dt) {
    var status = {};
    this.move(gamePath, dt);

    this.projectiles.forEach(function(projectile, i, projectileArray) {
        projectile.move(dt);
        if (projectile.end) {
            this.updateHp(-projectile.damage);
            projectileArray.splice(i, 1);
        }
    }.bind(this));

    this.checkDeath();

    if (this.checkDeath()) {
        status.alive = false;
        status.giveGold = !this.position.end; // Does not give gold if the monster reached the end
    } else {
        status.alive = true;
    }

    return status;
}

Monster.prototype.draw = function() {
    dynamicContext.beginPath();
    dynamicContext.rect(this.position.x, this.position.y, constants.MONSTERLENGTH, constants.MONSTERLENGTH);
    dynamicContext.stroke();
    dynamicContext.fillStyle = "red";
    dynamicContext.fillRect(this.position.x,
                            this.position.y + constants.MONSTERLENGTH/3,
                            constants.MONSTERLENGTH * this.currentHp/this.maxHp,
                            constants.MONSTERLENGTH/3);
    dynamicContext.closePath();

}

Monster.prototype.checkDeath = function() {
    return this.currentHp <= 0 || this.position.end;
};

Monster.prototype.move = function(pathLines, dt) {
    this.distanceTravelled += this.baseMs * dt;
    this.position = utils.convertDistanceToCoordinates(this.distanceTravelled, pathLines);
};

// Can take in a positive or negative number
Monster.prototype.updateHp = function(hpChange) {
    this.currentHp += hpChange;

    if (this.currentHp > this.maxHp) {
        this.currentHp = this.maxHp;
    }
};

module.exports = Monster;
