const load = src => {
  const img = new Image()
  img.src = src
  return new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
  })
}

const autoResolve = new Promise((resolve, reject) => { resolve() })

const loadAssets = assetSrcs => {
  const promises = assetSrcs.map(src => load(src)) 
  return assetSrcs.length === 0 ? autoResolve : Promise.all(promises)
}

module.exports = loadAssets
