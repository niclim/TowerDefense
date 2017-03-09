module.exports = {
    basic: {
        projectile: {
            damage: 5,
            travelTime:0.5, // time in seconds before impact
            sprite: "abc", // change this to have animations
            type: "normal", //
            effect: "none"
        },
        sprite: "asdasda", 
        attackSpeed: 1, // 1 second per attack
        range: 300,
        goldCost: 10,
        totalCost: 10, // Used for upgraded towers
        upgrade: [{
            name: "advanced"
        }]
    },
    advanced: {
        projectile: {
            damage: 15,
            travelTime:0.5, // time in seconds before impact
            sprite: "abc", // change this to have animations
            type: "normal", //
            effect: "none"
        },
        sprite: "asdasda", 
        attackSpeed: 0.8, // 1 second per attack
        range: 400,
        goldCost: 20,
        totalCost: 30, // Used for upgraded towers
        upgrade: [{
            name: "expert"
        }]
    },
    expert: {
        projectile: {
            damage: 45,
            travelTime:0.5, // time in seconds before impact
            sprite: "abc", // change this to have animations
            type: "normal", //
            effect: "none"
        },
        sprite: "asdasda", 
        attackSpeed: 0.8, // 1 second per attack
        range: 400,
        goldCost: 60,
        totalCost: 90, // Used for upgraded towers
        upgrade: []
    }
};
