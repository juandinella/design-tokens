const {getTokens, camelCase, rgbaGenObject, fullColorHex} = require('../utils')

const getOpacities = (layerName, stylesArtboard) => {
  const palette = {opacity: {}}
  const decorator = element => {
    const {name} = element
    const {r, g, b, a} = element.children[0].fills[0].color
    const colorRGBA = rgbaGenObject(r, g, b, a)
    const tokens = {
      [camelCase(name)]: `${fullColorHex(colorRGBA.a)}`
    }
    Object.assign(palette.opacity, tokens)
  }

  return getTokens(layerName, stylesArtboard, palette, decorator)
}

module.exports = getOpacities
