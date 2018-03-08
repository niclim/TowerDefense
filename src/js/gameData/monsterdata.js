module.exports = {
  basic: {
    maxHp: 30,
    baseMs: 50, // pixels per second
    type: 'normal', // Change this type later
    bounty: 4,
    sprite: 'orange'
  },
  fast: {
    maxHp: 30,
    baseMs: 130, // pixels per second
    type: 'normal', // Change this type later
    bounty: 4,
    sprite: 'green'
  },
  tank: {
    maxHp: 60,
    baseMs: 30,
    type: 'heavy',
    bounty: 4,
    sprite: 'red'
  },
  fire: {
    maxHp: 30,
    baseMs: 70,
    type: 'fire',
    bounty: 4,
    sprite: 'red'
  },
  ice: {
    maxHp: 45,
    baseMs: 60,
    type: 'ice',
    bounty: 4,
    sprite: 'blue'
  },
  light: {
    maxHp: 30,
    baseMs: 80,
    type: 'light',
    bounty: 4,
    sprite: 'orange'
  },
  dark: {
    maxHp: 40,
    baseMs: 60,
    type: 'dark',
    bounty: 4,
    sprite: 'red'
  },
  water: {
    maxHp: 40,
    baseMs: 60,
    type: 'water',
    bounty: 4,
    sprite: 'blue'
  },
  boss1: {
    maxHp: 500,
    baseMs: 80,
    type: 'normal',
    bounty: 20,
    sprite: 'green'
  },
  boss2: {
    maxHp: 1500,
    baseMs: 80,
    type: 'fire',
    bounty: 40,
    sprite: 'orange'
  },
  boss3: {
    maxHp: 2500,
    baseMs: 100,
    type: 'heavy',
    bounty: 100,
    sprite: 'green'
  },
  boss4: {
    maxHp: 4500,
    baseMs: 85,
    type: 'water',
    bounty: 40,
    sprite: 'red'
  },
  boss5: {
    maxHp: 6000,
    baseMs: 95,
    type: 'dark',
    bounty: 40,
    sprite: 'blue'
  }
}
