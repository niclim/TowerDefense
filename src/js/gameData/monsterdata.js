module.exports = {
    basic: {
        maxHp: 30,
        baseMs: 50, // pixels per second
        type: "normal", // Change this type later
        bounty: 3
    },
    fast: {
        maxHp: 30,
        baseMs: 100, // pixels per second
        type: "normal", // Change this type later
        bounty: 4
    },
    tank: {
        maxHp: 60,
        baseMs: 30,
        type: "normal",
        bounty: 4
    },
    fire: {
        maxHp: 30,
        baseMs: 70,
        type: "fire",
        bounty: 4
    },
    ice: {
        maxHp: 45,
        baseMs: 40,
        type: "ice",
        bounty: 5
    },
    light: {
        maxHp: 20,
        baseMs: 100,
        type: "light",
        bounty: 4
    },
    boss1: {
        maxHp: 500,
        baseMs: 80,
        type: "normal",
        bounty: 20
    },
    boss2: {
        maxHp: 1500,
        baseMs: 80,
        type: "fire",
        bounty: 40
    },
    boss3: {
        maxHp: 2500,
        baseMs: 100,
        type: "fire",
        bounty: 100
    },
    boss4: {
        maxHp: 4500,
        baseMs: 85,
        type: "fire",
        bounty: 40
    },
    boss5: {
        maxHp: 6000,
        baseMs: 95,
        type: "fire",
        bounty: 40
    }
};
