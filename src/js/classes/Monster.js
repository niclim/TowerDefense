var monsterData = require("../gameData/monsterdata.js");

var Monster = function(id) {
    this.id = id;
    this.currentHp = monsterData[id].maxHp;
    this.maxHp = monsterData[id].maxHp;
    this.baseMs = monsterData[id].baseMs; // Movement speed - "units" per second
    this.type = monsterData[id].type;
    this.position = { // All monsters are created in the same position
        x: 0,
        y: 485
    }
};
// Method the game object uses to move monsters
Monster.prototype.runCycle = function() {

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
    return this.currentHp <= 0;
};

// Expects up, down, left or right
Monster.prototype.move = function(direction) {
    var speed = this.baseMs;

    // some basic monster Movement
    //  NOTE such a hassle to figure this out
    //  TODO not finished, not even going to try and finish will figure out how this should work later
    if (this.position.x <= 50 && this.position.y < 500) {
        this.position.x += speed;
    } else if (this.position.x >= 50 && this.position.y >= 90) {
        this.position.y -= speed;
    } else if (this.position.x <= 180 && this.position.y >= 80) {
        this.position.x += speed;
    }

    //  may not be the best way to do this but ill keep it because not even sure how to do this movement part
    // if (typeof direction !== "string") {
    //     throw new TypeError("direction is not a string");
    // }
    // direction = direction.toLowerCase();
    // switch (direction) {
    //     case "up":
    //     case "down":
    //     case "left":
    //     case "right":
    //     default:
    //         throw new Error("Invalid direction");
    // }
};

// Can take in a positive or negative number
Monster.prototype.updateHp = function(hpChange) {
    this.currentHp += hpChange;

    if (this.currentHp > this.maxHp) {
        this.currentHp = this.maxHp;
    }
};

module.exports = Monster;
