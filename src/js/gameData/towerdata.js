// This should probably be in a database
module.exports = {
    // Basic tower tree here
    basic: {
        projectile: {
            damage: 5,
            travelTime: 0.5, // time in seconds before impact
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
            travelTime: 0.5, // time in seconds before impact
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
            travelTime: 0.5, // time in seconds before impact
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
            travelTime: 0.5, // time in seconds before impact
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
            travelTime: 0.5, // time in seconds before impact
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
        projectile: {
            damage: 15,
            travelTime: 0.8, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: []
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 2,
        range: 250,
        goldCost: 10,
        totalCost: 10,
        upgrade: [
            {
                name: "siege"
            },
            {
                name: "cannon"
            }
        ]
    },
    siege: {
        projectile: {
            damage: 40,
            travelTime: 0.6, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: []
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 2,
        range: 350,
        goldCost: 30,
        totalCost: 40,
        upgrade: [
            {
                name: "demolition"
            },
            {
                name: "explosion"
            }
        ]
    },
    demolition: {
        projectile: {
            damage: 100,
            travelTime: 0.6, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: []
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 1.5,
        range: 500,
        goldCost: 100,
        totalCost: 140,
        upgrade: []
    },
    explosion: {
        projectile: {
            damage: 60,
            travelTime: 0.6, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: [
                {
                    type: "splash",
                    radius: 200
                }
            ]
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 1.5,
        range: 500,
        goldCost: 100,
        totalCost: 140,
        upgrade: []
    },
    cannon: {
        projectile: {
            damage: 20,
            travelTime: 0.6, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: [
                {
                    type: "amplify",
                    amount: 1.5 // damage multiplier
                }
            ]
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 1,
        range: 350,
        goldCost: 30,
        totalCost: 40,
        upgrade: [
            {
                name: "shrapnel"
            },
            {
                name: "artillery"
            }
        ]
    },
    shrapnel: {
        projectile: {
            damage: 40,
            travelTime: 0.6, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: [
                {
                    type: "amplify",
                    amount: 1.5 // damage multiplier
                }
            ]
        },
        sprite: "TODO",
        targets: 3,
        attackSpeed: 1,
        range: 350,
        goldCost: 80,
        totalCost: 120,
        upgrade: []
    },
    artillery: {
        projectile: {
            damage: 70,
            travelTime: 0.3, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: [
                {
                    type: "amplify",
                    amount: 2 // damage multiplier
                }
            ]
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 1,
        range: 600,
        goldCost: 110,
        totalCost: 150,
        upgrade: []
    },

    // Fire tower tree here
    fire: {
        projectile: {
            damage: 10,
            travelTime: 0.3, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "fire",
            effects: [
                {
                    type: "dot",
                    dps: 5
                }
            ]
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.6,
        range: 300,
        goldCost: 30,
        totalCost: 30,
        upgrade: [
            {
                name: "broiler"
            },
            {
                name: "flamethrower"
            }
        ]
    },
    broiler: {
        projectile: {
            damage: 8,
            travelTime: 0.01, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "fire",
            effects: []
        },
        sprite: "TODO",
        targets: 30,
        attackSpeed: 0.2,
        range: 300,
        goldCost: 60,
        totalCost: 90,
        upgrade: [
            {
                name: "volcano"
            },
            {
                name: "inferno"
            }
        ]
    },
    volcano: {
        projectile: {
            damage: 20,
            travelTime: 0.01, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "fire",
            effects: []
        },
        sprite: "TODO",
        targets: 30,
        attackSpeed: 0.2,
        range: 300,
        goldCost: 110,
        totalCost: 200,
        upgrade: []
    },
    inferno: {
        projectile: {
            damage: 15,
            travelTime: 0.01, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "fire",
            effects: []
        },
        sprite: "TODO",
        targets: 30,
        attackSpeed: 0.2,
        range: 500,
        goldCost: 110,
        totalCost: 200,
        upgrade: []
    },
    flamethrower: {
        projectile: {
            damage: 20,
            travelTime: 0.01, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "fire",
            effects: [
                {
                    type: "dot",
                    dps: 10
                }
            ]
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.5,
        range: 300,
        goldCost: 60,
        totalCost: 90,
        upgrade: [
            {
                name: "napalm"
            }
        ]
    },
    napalm: {
        projectile: {
            damage: 50,
            travelTime: 0.01, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "fire",
            effects: [
                {
                    type: "dot",
                    dps: 30
                }
            ]
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.5,
        range: 400,
        goldCost: 90,
        totalCost: 150,
        upgrade: []
    },

    // Ice starts here
    ice: {
        projectile: {
            damage: 10,
            travelTime: 0.8, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "ice",
            effects: [
                {
                    type: "slow",
                    slow: 0.3 // decimal of how slow - higher is more slow
                }
            ]
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.8,
        range: 300,
        goldCost: 30,
        totalCost: 30,
        upgrade: [
            {
                name: "blizzard"
            },
            {
                name: "frost"
            }
        ]
    },
    blizzard: {
        projectile: {
            damage: 5,
            travelTime: 0.2, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "ice",
            effects: [
                {
                    type: "slow",
                    slow: 0.4 // decimal of how slow - higher is more slow
                }
            ]
        },
        sprite: "TODO",
        targets: 30,
        attackSpeed: 0.8,
        range: 300,
        goldCost: 70,
        totalCost: 100,
        upgrade: [
            {
                name: "arctic"
            }
        ]
    },
    arctic: {
        projectile: {
            damage: 12,
            travelTime: 0.2, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "ice",
            effects: [
                {
                    type: "slow",
                    slow: 0.5 // decimal of how slow - higher is more slow
                }
            ]
        },
        sprite: "TODO",
        targets: 30,
        attackSpeed: 0.8,
        range: 400,
        goldCost: 70,
        totalCost: 170,
        upgrade: []
    },
    frost: {
        projectile: {
            damage: 25,
            travelTime: 0.6, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "ice",
            effects: [
                {
                    type: "slow",
                    slow: 0.5 // decimal of how slow - higher is more slow
                }
            ]
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.8,
        range: 300,
        goldCost: 60,
        totalCost: 90,
        upgrade: [
            {
                name: "tundra"
            },
            {
                name: "permafrost"
            }
        ]
    },
    tundra: {
        projectile: {
            damage: 40,
            travelTime: 0.6, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "ice",
            effects: [
                {
                    type: "slow",
                    slow: 0.65 // decimal of how slow - higher is more slow
                }
            ]
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.8,
        range: 400,
        goldCost: 90,
        totalCost: 180,
        upgrade: []
    },
    permafrost: {
        projectile: {
            damage: 30,
            travelTime: 0.6, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "ice",
            effects: [
                {
                    type: "freeze",
                    duration: 1,
                    chance: 0.2
                }
            ]
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.8,
        range: 400,
        goldCost: 120,
        totalCost: 210,
        upgrade: []
    },
    // Light tower tree here
    light: {
        projectile: {
            damage: 5,
            travelTime: 0.1, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "light",
            effects: []
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.4,
        range: 500,
        goldCost: 30,
        totalCost: 30,
        upgrade: [
            {
                name: "laser"
            },
            {
                name: "electric"
            }
        ]
    },
    laser: {
        projectile: {
            damage: 15,
            travelTime: 0.1, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "light",
            effects: []
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.3,
        range: 600,
        goldCost: 60,
        totalCost: 90,
        upgrade: [
            {
                name: "prism"
            }
        ]
    },
    prism: {
        projectile: {
            damage: 50,
            travelTime: 0.1, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "light",
            effects: []
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.2,
        range: 600,
        goldCost: 180,
        totalCost: 270,
        upgrade: [
            {
                name: "prism"
            }
        ]
    },
    electric: {
        projectile: {
            damage: 15,
            travelTime: 0.1, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "light",
            effects: [
                {
                    type: "bounce",
                    range: 300,
                    bounces: 2
                }
            ]
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.6,
        range: 400,
        goldCost: 60,
        totalCost: 90,
        upgrade: [
            {
                name: "lightning"
            },
            {
                name: "generator"
            }
        ]
    },
    lightning: {
        projectile: {
            damage: 35,
            travelTime: 0.1, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "light",
            effects: [
                {
                    type: "bounce",
                    range: 300,
                    bounces: 2
                }
            ]
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.6,
        range: 400,
        goldCost: 90,
        totalCost: 180,
        upgrade: []
    },
    generator: {
        projectile: {
            damage: 35,
            travelTime: 0.1, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "light",
            effects: []
        },
        sprite: "TODO",
        targets: 3,
        attackSpeed: 0.6,
        range: 400,
        goldCost: 90,
        totalCost: 180,
        upgrade: []
    }

};
