module.exports = {
  // Basic tower tree here
  basic: {
    projectile: {
      damage: 5,
      travelTime: 0.5, // time in seconds before impact
      sprite: 'explosion', // change this to have animations
      type: 'normal',
      effects: {}
    },
    primary: true,
    icon: './assets/basic.png',
    sprite: 'explosion',
    targets: 1,
    attackSpeed: 1, // 1 second per attack
    range: 300,
    goldCost: 10,
    totalCost: 10, // Used for upgraded towers
    upgrade: [
      {
        name: 'advanced'
      },
      {
        name: 'multishot'
      }
    ]
  },
  advanced: {
    projectile: {
      damage: 15,
      travelTime: 0.5, // time in seconds before impact
      sprite: 'explosion', // change this to have animations
      type: 'normal',
      effects: {}
    },
    primary: false,
    icon: './assets/basic.png',
    sprite: 'explosion',
    targets: 1,
    attackSpeed: 0.8,
    range: 400,
    goldCost: 20,
    totalCost: 30,
    upgrade: [
      {
        name: 'expert'
      }
    ]
  },
  expert: {
    projectile: {
      damage: 45,
      travelTime: 0.5, // time in seconds before impact
      sprite: 'explosion', // change this to have animations
      type: 'normal',
      effects: {}
    },
    primary: false,
    icon: './assets/basic.png',
    sprite: 'explosion',
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
      sprite: 'explosion', // change this to have animations
      type: 'normal',
      effects: {}
    },
    primary: false,
    icon: './assets/basic.png',
    sprite: 'explosion',
    targets: 3,
    attackSpeed: 0.8,
    range: 400,
    goldCost: 20,
    totalCost: 30,
    upgrade: [
      {
        name: 'expertMultishot'
      }
    ]
  },
  expertMultishot: {
    projectile: {
      damage: 30,
      travelTime: 0.5, // time in seconds before impact
      sprite: 'explosion', // change this to have animations
      type: 'normal',
      effects: {}
    },
    primary: false,
    icon: './assets/basic.png',
    sprite: 'explosion',
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
      sprite: 'explosion', // change this to have animations
      type: 'siege',
      effects: {}
    },
    primary: true,
    icon: './assets/heavy.png',
    sprite: 'explosion',
    targets: 1,
    attackSpeed: 2,
    range: 250,
    goldCost: 10,
    totalCost: 10,
    upgrade: [
      {
        name: 'siege'
      },
      {
        name: 'cannon'
      }
    ]
  },
  siege: {
    projectile: {
      damage: 40,
      travelTime: 0.6, // time in seconds before impact
      sprite: 'explosion', // change this to have animations
      type: 'siege',
      effects: {}
    },
    primary: false,
    icon: './assets/heavy.png',
    sprite: 'explosion',
    targets: 1,
    attackSpeed: 2,
    range: 350,
    goldCost: 30,
    totalCost: 40,
    upgrade: [
      {
        name: 'demolition'
      },
      {
        name: 'explosion'
      }
    ]
  },
  demolition: {
    projectile: {
      damage: 100,
      travelTime: 0.6, // time in seconds before impact
      sprite: 'explosion', // change this to have animations
      type: 'siege',
      effects: {}
    },
    primary: false,
    icon: './assets/heavy.png',
    sprite: 'explosion',
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
      sprite: 'explosion', // change this to have animations
      type: 'siege',
      effects: {
        splash: {
          radius: 200
        }
      }
    },
    primary: false,
    icon: './assets/heavy.png',
    sprite: 'explosion',
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
      sprite: 'explosion', // change this to have animations
      type: 'siege',
      effects: {
        amplify: {
          amount: 1.5,
          timer: 3
        }
      }
    },
    primary: false,
    icon: './assets/heavy.png',
    sprite: 'explosion',
    targets: 1,
    attackSpeed: 1,
    range: 350,
    goldCost: 30,
    totalCost: 40,
    upgrade: [
      {
        name: 'shrapnel'
      },
      {
        name: 'artillery'
      }
    ]
  },
  shrapnel: {
    projectile: {
      damage: 40,
      travelTime: 0.6, // time in seconds before impact
      sprite: 'explosion', // change this to have animations
      type: 'siege',
      effects: {
        amplify: {
          amount: 1.5,
          timer: 3
        }
      }
    },
    primary: false,
    icon: './assets/heavy.png',
    sprite: 'explosion',
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
      sprite: 'explosion', // change this to have animations
      type: 'siege',
      effects: {
        amplify: {
          amount: 2,
          timer: 3
        }
      }
    },
    primary: false,
    icon: './assets/heavy.png',
    sprite: 'explosion',
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
      sprite: 'explosion', // change this to have animations
      type: 'fire',
      effects: {
        burn: {
          amount: 5, // dps
          timer: 2
        }
      }
    },
    primary: true,
    icon: './assets/fire.png',
    sprite: 'explosion',
    targets: 1,
    attackSpeed: 0.6,
    range: 300,
    goldCost: 30,
    totalCost: 30,
    upgrade: [
      {
        name: 'broiler'
      },
      {
        name: 'flamethrower'
      }
    ]
  },
  broiler: {
    projectile: {
      damage: 8,
      travelTime: 0.01, // time in seconds before impact
      sprite: 'explosion', // change this to have animations
      type: 'fire',
      effects: {
        burn: {
          amount: 10, // dps
          timer: 3
        }
      }
    },
    primary: false,
    icon: './assets/fire.png',
    sprite: 'explosion',
    targets: 30,
    attackSpeed: 0.2,
    range: 300,
    goldCost: 60,
    totalCost: 90,
    upgrade: [
      {
        name: 'volcano'
      },
      {
        name: 'inferno'
      }
    ]
  },
  volcano: {
    projectile: {
      damage: 20,
      travelTime: 0.01, // time in seconds before impact
      sprite: 'explosion', // change this to have animations
      type: 'fire',
      effects: {
        burn: {
          amount: 10, // dps
          timer: 3
        }
      }
    },
    primary: false,
    icon: './assets/fire.png',
    sprite: 'explosion',
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
      sprite: 'explosion', // change this to have animations
      type: 'fire',
      effects: {
        burn: {
          amount: 10, // dps
          timer: 3
        }
      }
    },
    primary: false,
    icon: './assets/fire.png',
    sprite: 'explosion',
    targets: 30,
    attackSpeed: 0.2,
    range: 500,
    goldCost: 110,
    totalCost: 200,
    upgrade: []
  },
  flamethrower: {
    projectile: {
      damage: 4,
      travelTime: 1, // time in seconds before impact
      sprite: 'explosion', // change this to have animations
      type: 'fire',
      effects: {}
    },
    primary: false,
    icon: './assets/fire.png',
    sprite: 'explosion',
    targets: 1,
    attackSpeed: 0.1,
    range: 300,
    goldCost: 60,
    totalCost: 90,
    upgrade: [
      {
        name: 'napalm'
      },
      {
        name: 'nova'
      }
    ]
  },
  napalm: {
    projectile: {
      damage: 10,
      travelTime: 1, // time in seconds before impact
      sprite: 'explosion', // change this to have animations
      type: 'fire',
      effects: {}
    },
    primary: false,
    icon: './assets/fire.png',
    sprite: 'explosion',
    targets: 1,
    attackSpeed: 0.1,
    range: 400,
    goldCost: 90,
    totalCost: 150,
    upgrade: []
  },
  nova: {
    projectile: {
      damage: 10,
      travelTime: 0.3, // time in seconds before impact
      sprite: 'explosion', // change this to have animations
      type: 'fire',
      effects: {
        burn: {
          amount: 40, // dps
          timer: 2
        }
      }
    },
    primary: false,
    icon: './assets/fire.png',
    sprite: 'explosion',
    targets: 3,
    attackSpeed: 1,
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
      sprite: 'explosion', // change this to have animations
      type: 'ice',
      effects: {
        slow: {
          amount: 0.3, // %slow
          timer: 2
        }
      }
    },
    primary: true,
    icon: './assets/ice.png',
    sprite: 'explosion',
    targets: 1,
    attackSpeed: 0.8,
    range: 300,
    goldCost: 30,
    totalCost: 30,
    upgrade: [
      {
        name: 'blizzard'
      },
      {
        name: 'frost'
      }
    ]
  },
  blizzard: {
    projectile: {
      damage: 5,
      travelTime: 0.2, // time in seconds before impact
      sprite: 'explosion', // change this to have animations
      type: 'ice',
      effects: {
        slow: {
          amount: 0.4, // %slow
          timer: 3
        }
      }
    },
    primary: false,
    icon: './assets/ice.png',
    sprite: 'explosion',
    targets: 30,
    attackSpeed: 0.8,
    range: 300,
    goldCost: 70,
    totalCost: 100,
    upgrade: [
      {
        name: 'arctic'
      }
    ]
  },
  arctic: {
    projectile: {
      damage: 12,
      travelTime: 0.2, // time in seconds before impact
      sprite: 'explosion', // change this to have animations
      type: 'ice',
      effects: {
        slow: {
          amount: 0.5, // %slow
          timer: 3
        }
      }
    },
    primary: false,
    icon: './assets/ice.png',
    sprite: 'explosion',
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
      sprite: 'explosion', // change this to have animations
      type: 'ice',
      effects: {
        slow: {
          amount: 0.5, // %slow
          timer: 3
        }
      }
    },
    primary: false,
    icon: './assets/ice.png',
    sprite: 'explosion',
    targets: 1,
    attackSpeed: 0.8,
    range: 300,
    goldCost: 60,
    totalCost: 90,
    upgrade: [
      {
        name: 'tundra'
      },
      {
        name: 'permafrost'
      }
    ]
  },
  tundra: {
    projectile: {
      damage: 40,
      travelTime: 0.6, // time in seconds before impact
      sprite: 'explosion', // change this to have animations
      type: 'ice',
      effects: {
        slow: {
          amount: 0.65, // %slow
          timer: 3
        }
      }
    },
    primary: false,
    icon: './assets/ice.png',
    sprite: 'explosion',
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
      sprite: 'explosion', // change this to have animations
      type: 'ice',
      effects: {
        freeze: {
          chance: 0.2,
          timer: 1
        }
      }
    },
    primary: false,
    icon: './assets/ice.png',
    sprite: 'explosion',
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
      sprite: 'explosion', // change this to have animations
      type: 'light',
      effects: {}
    },
    primary: true,
    icon: './assets/light.png',
    sprite: 'explosion',
    targets: 1,
    attackSpeed: 0.4,
    range: 500,
    goldCost: 30,
    totalCost: 30,
    upgrade: [
      {
        name: 'laser'
      },
      {
        name: 'electric'
      }
    ]
  },
  laser: {
    projectile: {
      damage: 15,
      travelTime: 0.1, // time in seconds before impact
      sprite: 'explosion', // change this to have animations
      type: 'light',
      effects: {}
    },
    primary: false,
    icon: './assets/light.png',
    sprite: 'explosion',
    targets: 1,
    attackSpeed: 0.3,
    range: 600,
    goldCost: 60,
    totalCost: 90,
    upgrade: [
      {
        name: 'prism'
      }
    ]
  },
  prism: {
    projectile: {
      damage: 50,
      travelTime: 0.1, // time in seconds before impact
      sprite: 'explosion', // change this to have animations
      type: 'light',
      effects: {}
    },
    primary: false,
    icon: './assets/light.png',
    sprite: 'explosion',
    targets: 1,
    attackSpeed: 0.2,
    range: 600,
    goldCost: 180,
    totalCost: 270,
    upgrade: [
      {
        name: 'prism'
      }
    ]
  },
  electric: {
    projectile: {
      damage: 15,
      travelTime: 0.1, // time in seconds before impact
      sprite: 'explosion', // change this to have animations
      type: 'light',
      effects: {
        bounce: {
          amount: 2,
          range: 300
        }
      }
    },
    primary: false,
    icon: './assets/light.png',
    sprite: 'explosion',
    targets: 1,
    attackSpeed: 0.6,
    range: 400,
    goldCost: 60,
    totalCost: 90,
    upgrade: [
      {
        name: 'lightning'
      },
      {
        name: 'generator'
      }
    ]
  },
  lightning: {
    projectile: {
      damage: 35,
      travelTime: 0.1, // time in seconds before impact
      sprite: 'explosion', // change this to have animations
      type: 'light',
      effects: {
        bounce: {
          amount: 2,
          range: 300
        }
      }
    },
    primary: false,
    icon: './assets/light.png',
    sprite: 'explosion',
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
      sprite: 'explosion', // change this to have animations
      type: 'light',
      effects: {}
    },
    primary: false,
    icon: './assets/light.png',
    sprite: 'explosion',
    targets: 3,
    attackSpeed: 0.6,
    range: 400,
    goldCost: 90,
    totalCost: 180,
    upgrade: []
  }
}
