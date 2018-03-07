/*
Note this only affects projectiles, does not affect DOT damage
First key represents the tower type/projectile type
second key represents the monster type
I.E.
{
    towerType: {
        monsterType: damageModifier
    }
}
*/
module.exports = {
  normal: {
    normal: 1,
    heavy: 0.6,
    fire: 1,
    ice: 1,
    light: 1,
    dark: 1,
    water: 1
  },
  siege: {
    normal: 0.8,
    heavy: 1.5,
    fire: 1,
    ice: 1,
    light: 1,
    dark: 1,
    water: 1
  },
  fire: {
    normal: 1,
    heavy: 0.8,
    fire: 0.65,
    ice: 2,
    light: 1.2,
    dark: 0.9,
    water: 0.5
  },
  ice: {
    normal: 1,
    heavy: 0.8,
    fire: 0.5,
    ice: 0.9,
    light: 1.2,
    dark: 1.2,
    water: 1.5
  },
  light: {
    normal: 1,
    heavy: 0.8,
    fire: 0.8,
    ice: 0.8,
    light: 1,
    dark: 2,
    water: 0.8
  }
}
