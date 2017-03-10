module.exports = {
    // Basic tower tree here
    basic: {
        projectile: {
            damage: 5,
            travelTime:0.5, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal", //
            effects: []
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 1, // 1 second per attack
        range: 300,
        goldCost: 10,
        totalCost: 10, // Used for upgraded towers
        upgrade: [
            {
                name: "advanced"
            },
            {
                name: "multishot"
            }
        ]
    },
    advanced: {
        projectile: {
            damage: 15,
            travelTime:0.5, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: []
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.8,
        range: 400,
        goldCost: 20,
        totalCost: 30,
        upgrade: [
            {
                name: "expert"
            }
        ]
    },
    expert: {
        projectile: {
            damage: 45,
            travelTime:0.5, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: []
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.8,
        range: 400,
        goldCost: 60,
        totalCost: 90,
        upgrade: []
    },
    multishot: {
        projectile: {
            damage: 5,
            travelTime:0.5, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: []
        },
        sprite: "TODO",
        targets: 3,
        attackSpeed: 0.8,
        range: 400,
        goldCost: 20,
        totalCost: 30,
        upgrade: [
            {
                name: "expertMultishot"
            }
        ]
    },
    expertMultishot: {
        projectile: {
            damage: 30,
            travelTime:0.5, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: []
        },
        sprite: "TODO",
        targets: 4,
        attackSpeed: 0.8,
        range: 400,
        goldCost: 100,
        totalCost: 130,
        upgrade: []
    },

    // Heavy tower tree here
    heavy: {
        
    }
};
