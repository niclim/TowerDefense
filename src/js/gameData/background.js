const repeat = (arr, count) => {
  let final = []
  for (let i = 0; i < count; i++) {
    final = [...final, ...arr]
  }
  return final
}
const bg = {
  grass: [25, 50, 25, 25],
  pTop: [100, 125, 25, 25],
  pLeft: [75, 150, 25, 25],
  pRight: [125, 150, 25, 25],
  pBottom: [100, 175, 25, 25],
  pULInner: [75, 125, 25, 25],
  pULOuter: [200, 250, 25, 25],
  pURInner: [125, 125, 25, 25],
  pUROuter: [150, 250, 25, 25],
  pLLInner: [75, 175, 25, 25],
  pLLOuter: [200, 200, 25, 25],
  pLRInner: [125, 175, 25, 25],
  pLROuter: [150, 200, 25, 25]
}

const horizontal = {
  grass: new Array(36).fill(bg.grass),
  pTopUpper: repeat([bg.grass, bg.grass, bg.pULInner, bg.pTop, bg.pTop, bg.pTop, bg.pTop, bg.pTop, bg.pTop, bg.pURInner, bg.grass, bg.grass], 3),
  pTopLower: repeat([bg.grass, bg.grass, bg.pLeft, bg.pLROuter, bg.pBottom, bg.pBottom, bg.pBottom, bg.pBottom, bg.pLLOuter, bg.pRight, bg.grass, bg.grass], 3),
  pMidMiddle: repeat([bg.grass, bg.grass, bg.pLeft, bg.pRight, bg.grass, bg.grass, bg.grass, bg.grass, bg.pLeft, bg.pRight, bg.grass, bg.grass], 3),
  pBotUpper: [
    bg.pTop, bg.pTop,
    ...repeat([bg.pULOuter, bg.pRight, bg.grass, bg.grass, bg.grass, bg.grass, bg.pLeft, bg.pUROuter, bg.pTop, bg.pTop, bg.pTop, bg.pTop], 2),
    bg.pULOuter, bg.pRight, bg.grass, bg.grass, bg.grass, bg.grass, bg.pLeft, bg.pUROuter, bg.pTop, bg.pTop
  ],
  pBotLower: [
    bg.pBottom, bg.pBottom,
    ...repeat([bg.pBottom, bg.pLRInner, bg.grass, bg.grass, bg.grass, bg.grass, bg.pLLInner, bg.pBottom, bg.pBottom, bg.pBottom, bg.pBottom, bg.pBottom], 2),
    bg.pBottom, bg.pLRInner, bg.grass, bg.grass, bg.grass, bg.grass, bg.pLLInner, bg.pBottom, bg.pBottom, bg.pBottom
  ]
}
const backgroundGrid = [
  horizontal.grass,
  horizontal.grass,
  horizontal.grass,
  horizontal.pTopUpper,
  horizontal.pTopLower,
  horizontal.pMidMiddle,
  horizontal.pMidMiddle,
  horizontal.pMidMiddle,
  horizontal.pMidMiddle,
  horizontal.pMidMiddle,
  horizontal.pMidMiddle,
  horizontal.pMidMiddle,
  horizontal.pMidMiddle,
  horizontal.pMidMiddle,
  horizontal.pMidMiddle,
  horizontal.pMidMiddle,
  horizontal.pMidMiddle,
  horizontal.pMidMiddle,
  horizontal.pMidMiddle,
  horizontal.pBotUpper,
  horizontal.pBotLower,
  horizontal.grass,
  horizontal.grass,
  horizontal.grass
]

module.exports = {
  backgroundGrid
}
