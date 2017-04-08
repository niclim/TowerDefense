// This should probably be in a database
module.exports = {
    // Basic tower tree here
    basic: {
        projectile: {
            damage: 5,
            travelTime: 0.5, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal", //
            effects: {}
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
        ],
        color: 'green'
    },
    advanced: {
        projectile: {
            damage: 15,
            travelTime: 0.5, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: {}
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
        ],
        color: 'green'
    },
    expert: {
        projectile: {
            damage: 45,
            travelTime: 0.5, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: {}
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.8,
        range: 400,
        goldCost: 60,
        totalCost: 90,
        upgrade: [],
        color: 'green'
    },
    multishot: {
        projectile: {
            damage: 5,
            travelTime: 0.5, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: {}
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
        ],
        color: 'green'
    },
    expertMultishot: {
        projectile: {
            damage: 30,
            travelTime: 0.5, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: {}
        },
        sprite: "TODO",
        targets: 4,
        attackSpeed: 0.8,
        range: 400,
        goldCost: 100,
        totalCost: 130,
        upgrade: [],
        color: 'green'
    },

    // Heavy tower tree here
    heavy: {
        projectile: {
            damage: 15,
            travelTime: 0.8, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: {}
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
        ],
        color: 'black'
    },
    siege: {
        projectile: {
            damage: 40,
            travelTime: 0.6, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: {}
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
        ],
        color: 'black'
    },
    demolition: {
        projectile: {
            damage: 100,
            travelTime: 0.6, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: {}
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 1.5,
        range: 500,
        goldCost: 100,
        totalCost: 140,
        upgrade: [],
        color: 'black'
    },
    explosion: {
        projectile: {
            damage: 60,
            travelTime: 0.6, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: {
                splash: {
                    radius: 200
                }
            }
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 1.5,
        range: 500,
        goldCost: 100,
        totalCost: 140,
        upgrade: [],
        color: 'black'
    },
    cannon: {
        projectile: {
            damage: 20,
            travelTime: 0.6, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: {
                amplify: {
                    amount: 1.5,
                    timer: 3
                }
            }
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
        ],
        color: 'black'
    },
    shrapnel: {
        projectile: {
            damage: 40,
            travelTime: 0.6, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: {
                amplify: {
                    amount: 1.5,
                    timer: 3
                }
            }
        },
        sprite: "TODO",
        targets: 3,
        attackSpeed: 1,
        range: 350,
        goldCost: 80,
        totalCost: 120,
        upgrade: [],
        color: 'black'
    },
    artillery: {
        projectile: {
            damage: 70,
            travelTime: 0.3, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "normal",
            effects: {
                amplify: {
                    amount: 2,
                    timer: 3
                }
            }
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 1,
        range: 600,
        goldCost: 110,
        totalCost: 150,
        upgrade: [],
        color: 'black'
    },

    // Fire tower tree here
    fire: {
        projectile: {
            damage: 10,
            travelTime: 0.3, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "fire",
            effects: {
                dot: {
                    amount: 5, // dps
                    timer: 2
                }
            }
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
        ],
        color: 'red'
    },
    broiler: {
        projectile: {
            damage: 8,
            travelTime: 0.01, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "fire",
            effects: {}
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
        ],
        color: 'red'
    },
    volcano: {
        projectile: {
            damage: 20,
            travelTime: 0.01, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "fire",
            effects: {}
        },
        sprite: "TODO",
        targets: 30,
        attackSpeed: 0.2,
        range: 300,
        goldCost: 110,
        totalCost: 200,
        upgrade: [],
        color: 'red'
    },
    inferno: {
        projectile: {
            damage: 15,
            travelTime: 0.01, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "fire",
            effects: {}
        },
        sprite: "TODO",
        targets: 30,
        attackSpeed: 0.2,
        range: 500,
        goldCost: 110,
        totalCost: 200,
        upgrade: [],
        color: 'red'
    },
    flamethrower: {
        projectile: {
            damage: 4,
            travelTime: 1, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "fire",
            effects: {
                dot: {
                    amount: 10, // dps
                    timer: 3
                }
            }
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.1,
        range: 300,
        goldCost: 60,
        totalCost: 90,
        upgrade: [
            {
                name: "napalm"
            }
        ],
        color: 'red'
    },
    napalm: {
        projectile: {
            damage: 50,
            travelTime: 0.01, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "fire",
            effects: {
                dot: {
                    amount: 30, // dps
                    timer: 4
                }
            }
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.5,
        range: 400,
        goldCost: 90,
        totalCost: 150,
        upgrade: [],
        color: 'red'
    },

    // Ice starts here
    ice: {
        projectile: {
            damage: 10,
            travelTime: 0.8, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "ice",
            effects: {
                slow: {
                    amount: 0.3, // %slow
                    timer: 2
                }
            }
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
        ],
        color: 'blue'
    },
    blizzard: {
        projectile: {
            damage: 5,
            travelTime: 0.2, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "ice",
            effects: {
                slow: {
                    amount: 0.4, // %slow
                    timer: 3
                }
            }
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
        ],
        color: 'blue'
    },
    arctic: {
        projectile: {
            damage: 12,
            travelTime: 0.2, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "ice",
            effects: {
                slow: {
                    amount: 0.5, // %slow
                    timer: 3
                }
            }
        },
        sprite: "TODO",
        targets: 30,
        attackSpeed: 0.8,
        range: 400,
        goldCost: 70,
        totalCost: 170,
        upgrade: [],
        color: 'blue'
    },
    frost: {
        projectile: {
            damage: 25,
            travelTime: 0.6, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "ice",
            effects: {
                slow: {
                    amount: 0.5, // %slow
                    timer: 3
                }
            }
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
        ],
        color: 'blue'
    },
    tundra: {
        projectile: {
            damage: 40,
            travelTime: 0.6, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "ice",
            effects: {
                slow: {
                    amount: 0.65, // %slow
                    timer: 3
                }
            }
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.8,
        range: 400,
        goldCost: 90,
        totalCost: 180,
        upgrade: [],
        color: 'blue'
    },
    permafrost: {
        projectile: {
            damage: 30,
            travelTime: 0.6, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "ice",
            effects: {
                freeze: {
                    chance: 0.2,
                    timer: 1
                }
            }
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.8,
        range: 400,
        goldCost: 120,
        totalCost: 210,
        upgrade: [],
        color: 'blue'
    },
    // Light tower tree here
    light: {
        projectile: {
            damage: 5,
            travelTime: 0.1, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "light",
            effects: {}
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
        ],
        color: 'yellow'
    },
    laser: {
        projectile: {
            damage: 15,
            travelTime: 0.1, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "light",
            effects: {}
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
        ],
        color: 'yellow'
    },
    prism: {
        projectile: {
            damage: 50,
            travelTime: 0.1, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "light",
            effects: {}
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
        ],
        color: 'yellow'
    },
    electric: {
        projectile: {
            damage: 15,
            travelTime: 0.1, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "light",
            effects: {
                bounce: {
                    amount: 2,
                    range: 300
                }
            }
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
        ],
        color: 'yellow'
    },
    lightning: {
        projectile: {
            damage: 35,
            travelTime: 0.1, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "light",
            effects: {
                bounce: {
                    amount: 2,
                    range: 300
                }
            }
        },
        sprite: "TODO",
        targets: 1,
        attackSpeed: 0.6,
        range: 400,
        goldCost: 90,
        totalCost: 180,
        upgrade: [],
        color: 'yellow'
    },
    generator: {
        projectile: {
            damage: 35,
            travelTime: 0.1, // time in seconds before impact
            sprite: "TODO", // change this to have animations
            type: "light",
            effects: {}
        },
        sprite: "TODO",
        targets: 3,
        attackSpeed: 0.6,
        range: 400,
        goldCost: 90,
        totalCost: 180,
        upgrade: [],
        color: 'yellow'
    }

};
