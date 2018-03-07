module.exports = {
  basic: {
    maxHp: 30,
    baseMs: 50, // pixels per second
    type: 'normal', // Change this type later
    bounty: 4
  },
  fast: {
    maxHp: 30,
    baseMs: 130, // pixels per second
    type: 'normal', // Change this type later
    bounty: 4
  },
  tank: {
    maxHp: 60,
    baseMs: 30,
    type: 'heavy',
    bounty: 4
  },
  fire: {
    maxHp: 30,
    baseMs: 70,
    type: 'fire',
    bounty: 4
  },
  ice: {
    maxHp: 45,
    baseMs: 60,
    type: 'ice',
    bounty: 4
  },
  light: {
    maxHp: 30,
    baseMs: 80,
    type: 'light',
    bounty: 4
  },
  dark: {
    maxHp: 40,
    baseMs: 60,
    type: 'dark',
    bounty: 4
  },
  water: {
    maxHp: 40,
    baseMs: 60,
    type: 'water',
    bounty: 4
  },
  boss1: {
    maxHp: 500,
    baseMs: 80,
    type: 'normal',
    bounty: 20
  },
  boss2: {
    maxHp: 1500,
    baseMs: 80,
    type: 'fire',
    bounty: 40
  },
  boss3: {
    maxHp: 2500,
    baseMs: 100,
    type: 'heavy',
    bounty: 100
  },
  boss4: {
    maxHp: 4500,
    baseMs: 85,
    type: 'water',
    bounty: 40
  },
  boss5: {
    maxHp: 6000,
    baseMs: 95,
    type: 'dark',
    bounty: 40
  }
}
