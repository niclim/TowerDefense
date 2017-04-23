var towerData = require("../gameData/towerdata.js"),
    { getPositionDifference } = require("../utils.js"),
    Projectile = require("./Projectiles.js"),
    constants = require("../gameData/gameConstants.js");

// Position refers to the upper left corner of the elements
// Tower width - 50 x 50
var Tower = function(position, id) {
    if (towerData[id] === undefined) {
        throw new Error("Invalid tower name, check html dataattribute or towerdata")
    }
    var loadedTowerData = towerData[id];
    this.id = id;
    this.attackSpeed = loadedTowerData.attackSpeed; // Attack speed
    this.cooldown = 0;
    this.range = loadedTowerData.range; // Range of the tower
    this.effects = loadedTowerData.effects; // Special effect (e.g. slow, splash, etc)
    this.goldCost = loadedTowerData.goldCost;
    this.totalCost = loadedTowerData.totalCost;
    this.upgrade = loadedTowerData.upgrade;
    this.targets = loadedTowerData.targets;
    this.position = position; // object with x and y coordinates - references the top left corner of the tower
    this.position.sideLength = constants.TOWERLENGTH;
    this.renderColor = loadedTowerData.color;
}
// Method the game object uses to run towers
Tower.prototype.runCycle = function(activeMonsters, dt) {
    var targetMonster = null;

    if (this.cooldown < 0) {
        // Creates projectiles up to the number of targets specified by the tower
        var firedShots = 0;
        activeMonsters.forEach((monster) => {
            if (this.checkInRange(monster.position) && (firedShots < this.targets)) {
                monster.projectiles.push(new Projectile(this.id, this.position));
                firedShots++;
            }
        });

        this.cooldown = this.attackSpeed;
    }

    if (this.cooldown >= 0) {
        this.cooldown -= dt;
    }
}

// Takes in a monster's position and checks whether that is in range based on the range - returns true or false if in range which can be used to
Tower.prototype.checkInRange = function(monsterPosition) {
    // using sqrt((x2-x1)^2 - (y2-y1)^2)
    var monsterDistance = getPositionDifference(monsterPosition, this.position);

   if (monsterDistance <= this.range) {
       return true;
   } else {
       return false;
   }
}

// TODO figure out a better way to render towers
Tower.prototype.draw = function(active) {
    // Render tower - replace this with a sprite
    dynamicContext.beginPath();
    dynamicContext.arc(this.position.x + constants.TOWERLENGTH / 2,
        this.position.y + constants.TOWERLENGTH / 2,
        constants.TOWERLENGTH * 0.5,
        0,
        2 * Math.PI
    );
    dynamicContext.fillStyle = this.renderColor;
    dynamicContext.fill();
    // Draw range radius
    if (active) {
        dynamicContext.globalAlpha = 0.3;
        dynamicContext.fillStyle = 'gray';
        dynamicContext.arc(this.position.x, this.position.y, this.range, 0, 2 * Math.PI);
        dynamicContext.fill();

        dynamicContext.globalAlpha = 1;
    }
    dynamicContext.closePath();
}

module.exports = Tower;
