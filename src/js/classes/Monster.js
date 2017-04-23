const monsterData = require("../gameData/monsterdata.js"),
    { getDamageModifier, convertDistanceToCoordinates } = require("../utils.js"),
    constants = require("../gameData/gameConstants.js");

const Monster = function(id, level) {
    this.id = id;
    this.maxHp = Math.floor(Math.pow(level, 1.2) * monsterData[id].maxHp * (level * 0.6 + 1));
    this.currentHp = this.maxHp;
    this.baseMs = monsterData[id].baseMs; // Movement speed - "units" per second
    this.type = monsterData[id].type;
    this.bounty = Math.floor(monsterData[id].bounty *  (level * 0.2 + 1));
    this.projectiles = [];
    this.distanceTravelled = 0;
    this.position = {}; // Initial position is defined by the path
    this.sideLength = constants.MONSTERLENGTH;
    this.effects = {};
};
// Method the game object uses to move monsters
Monster.prototype.runCycle = function(gamePath, dt) {
    this.move(gamePath, dt);

    this.projectiles.forEach((projectile, i, projectileArray) => {
        projectile.move(dt, this.position);
        if (projectile.end) {
            // Object.assign doesn't do deep merge - only need to go one level down to prevent reference copying
            for (let key in projectile.effects) {
                // TODO figure out how to prioritize multiple effects with different values, e.g. two slows with 0.5 and 0.2 (prioritize the higher one)

                this.effects[key] = Object.assign({}, projectile.effects[key]);

                // Copy over ID so game can create antoher projectile for bounce
                if (key === "bounce") {
                    this.effects.bounce.id = projectile.id;
                } else if (key === "splash") {
                    this.effects.splash.damage = projectile.damage;
                }
            }

            this.updateHp(-projectile.damage * getDamageModifier(projectile.type, this.type));
            projectileArray.splice(i, 1);
        }
    });

    // Handle effects here and timers
    this.handleEffects(dt);
}

Monster.prototype.draw = function() {
    dynamicContext.beginPath();
    dynamicContext.rect(this.position.x, this.position.y, constants.MONSTERLENGTH, constants.MONSTERLENGTH);
    dynamicContext.stroke();
    dynamicContext.fillStyle = "red";
    dynamicContext.fillRect(this.position.x,
                            this.position.y + constants.MONSTERLENGTH/3,
                            Math.max(constants.MONSTERLENGTH * this.currentHp/this.maxHp, 0), // Minimum value is 0 - can be caused by splash
                            constants.MONSTERLENGTH/3);
    dynamicContext.closePath();

}

Monster.prototype.checkDeath = function() {
    let status = {};

    if (this.currentHp <= 0 || this.position.end) {
        status.alive = false;
        status.giveGold = !this.position.end; // Does not give gold if the monster reached the end
    } else {
        status.alive = true;
    }
    return status;
};

Monster.prototype.handleEffects = function(dt) {
    // Loop through all the effects on the monster
    // Effects to handle: splash, slow, freeze, dot, amplify, bounce
    for (let key in this.effects) {
        switch (key) {
            case "freeze":
                if (Math.random() < this.effects.freeze.chance) {
                    this.effects.frozen = {
                        timer: this.effects.freeze.timer
                    }
                }
                delete this.effects[key];
                break;
            case "splash":
            case "bounce":
                // These are handled in the game.runCycle method
                break;
            case "dot":
                this.updateHp(this.effects[key].amount * dt * -1);
            case "slow":
            case "amplify":
            case "frozen":
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
    let modifier = 1;

    // Freeze is priority over slow (should be highest to lowest)
    if (this.effects.hasOwnProperty("frozen")) {
        modifier = 0;
    } else if (this.effects.hasOwnProperty("slow")) {
        modifier = 1 - this.effects.slow.amount;
    }

    this.distanceTravelled += this.baseMs * dt * modifier;
    this.position = convertDistanceToCoordinates(this.distanceTravelled, pathLines);
};

// Can take in a positive or negative number
Monster.prototype.updateHp = function(hpChange) {
    let modifier = 1;

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
