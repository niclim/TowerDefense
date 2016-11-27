var monsterData = require("../gameData/monsterdata.js"),
    utils = require("../utils.js");

var Monster = function(id) {
    this.id = id;
    this.currentHp = monsterData[id].maxHp;
    this.maxHp = monsterData[id].maxHp;
    this.baseMs = monsterData[id].baseMs; // Movement speed - "units" per second
    this.type = monsterData[id].type;
    this.bounty = monsterData[id].bounty;
    this.projectiles = [];
    this.distanceTravelled = 0;
    this.position = {}; // Initial position is defined by the path
    this.sideLength = 30;
};
// Method the game object uses to move monsters
Monster.prototype.runCycle = function(gamePath) {
    var status = {};
    this.move(gamePath);

    this.projectiles.forEach(function(projectile, i, projectileArray) {
        projectile.move();
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
    dynamicContext.rect(this.position.x, this.position.y, 30, 30);
    dynamicContext.stroke();
    dynamicContext.fillStyle = "red";
    dynamicContext.fillRect(this.position.x,
                            this.position.y + 30/3,
                            30 * this.currentHp/this.maxHp,
                            30/3);
    dynamicContext.closePath();

}

Monster.prototype.destroy = function() {

};

Monster.prototype.checkDeath = function() {
    return this.currentHp <= 0 || this.position.end;
};

Monster.prototype.move = function(pathLines) {
    this.distanceTravelled += this.baseMs;
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
