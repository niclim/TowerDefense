let exportData = []
let currentLevel

const monsterLookup = [
  {
    type: 'basic',
    amount: 10
  },
  {
    type: 'fire',
    amount: 10
  },
  {
    type: 'ice',
    amount: 10
  },
  {
    type: 'light',
    amount: 10
  },
  {
    type: 'tank',
    amount: 10
  },
  {
    type: 'fast',
    amount: 10
  },
  {
    type: 'dark',
    amount: 10
  },
  {
    type: 'water',
    amount: 10
  }
]

for (let i = 0; i < 50; i++) {
  switch (i) {
    case 9:
      currentLevel = {
        type: 'boss1',
        amount: 4
      }
      break
    case 19:
      currentLevel = {
        type: 'boss2',
        amount: 4
      }
      break
    case 29:
      currentLevel = {
        type: 'boss3',
        amount: 4
      }
      break
    case 39:
      currentLevel = {
        type: 'boss4',
        amount: 4
      }
      break
    case 49:
      currentLevel = {
        type: 'boss5',
        amount: 4
      }
      break
    default:
      currentLevel = Object.assign({}, monsterLookup[i % 6])
  }

  // Set multipliers for health and bounty
  if (i < 3) {
    currentLevel.bountyMultiplier = (i + 1) * 0.3
    currentLevel.hpMultiplier = (i + 1) * 0.4
  } else if (i < 6) {
    currentLevel.bountyMultiplier = i * 0.4
    currentLevel.hpMultiplier = i * 0.6
  } else if (i < 12) {
    currentLevel.bountyMultiplier = i * 0.5
    currentLevel.hpMultiplier = i * 0.8
  } else if (i < 18) {
    currentLevel.bountyMultiplier = i * 0.6
    currentLevel.hpMultiplier = i * 1
  } else if (i < 24) {
    currentLevel.bountyMultiplier = i * 0.6
    currentLevel.hpMultiplier = i * 1.2
  } else if (i < 30) {
    currentLevel.bountyMultiplier = i * 0.6
    currentLevel.hpMultiplier = i * 1.4
  } else if (i < 36) {
    currentLevel.bountyMultiplier = i * 0.6
    currentLevel.hpMultiplier = i * 1.6
  } else if (i < 42) {
    currentLevel.bountyMultiplier = i * 0.6
    currentLevel.hpMultiplier = i * 2
  } else {
    currentLevel.bountyMultiplier = i * 0.6
    currentLevel.hpMultiplier = i * 3
  }

  exportData.push(currentLevel)
}

module.exports = exportData
