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
    this.effects = {};
};
// Method the game object uses to move monsters
Monster.prototype.runCycle = function(gamePath, dt) {
    var status = {};
    this.move(gamePath, dt);

    this.projectiles.forEach(function(projectile, i, projectileArray) {
        projectile.move(dt);
        if (projectile.end) {
            // Object.assign doesn't do deep merge - only need to go one level down to prevent reference copying
            for (key in projectile.effects) {
                this.effects[key] = Object.assign({}, projectile.effects[key]);
                // Copy over ID so game can create antoher projectile for bounce
                if (this.effects.hasOwnProperty("bounce")) {
                    this.effects.bounce.id = projectile.id;
                }
            }

            this.updateHp(-projectile.damage);
            projectileArray.splice(i, 1);
        }
    }.bind(this));

    // Handle effects here and timers
    this.handleEffects(dt);

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

Monster.prototype.handleEffects = function(dt) {
    // Loop through all the effects on the monster
    // Effects to handle: splash, slow, freeze, dot, amplify, bounce
    for (key in this.effects) {
        switch (key) {
            case "freeze":
                console.log('handle freeze here')
                delete this.effects[key];
                break;
            case "splash":
                // These are handled in the game.runCycle method
                break;
            case "bounce":
                // These are handled in the game.runCycle method
                break;
            case "dot":
                this.updateHp(this.effects[key].amount * dt * -1);
            case "slow":
            case "amplify":
                // Reduce timer
                this.effects[key].timer -= dt;
                if (this.effects[key].timer < 0) {
                    delete this.effects[key];
                }
                break;
            default:
                console.log(key, "unexpected key in effects object");
        }
    }
}

Monster.prototype.move = function(pathLines, dt) {
    var modifier = 1;

    if (this.effects.hasOwnProperty("slow")) {
        modifier = 1 - this.effects.slow.amount;
    }

    this.distanceTravelled += this.baseMs * dt * modifier;
    this.position = utils.convertDistanceToCoordinates(this.distanceTravelled, pathLines);
};

// Can take in a positive or negative number
Monster.prototype.updateHp = function(hpChange) {
    var modifier = 1;

    // Only amplifies damage if the monster is taking damage
    if (hpChange < 0 && this.effects.hasOwnProperty("amplify")) {
        modifier = this.effects.amplify.amount;
    }

    this.currentHp += hpChange * modifier;

    if (this.currentHp > this.maxHp) {
        this.currentHp = this.maxHp;
    }
};

module.exports = Monster;
