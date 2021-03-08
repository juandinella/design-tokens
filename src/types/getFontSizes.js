const {getTokens, camelCase} = require('../utils')

const getFontSizes = (layerName, stylesArtboard) => {
  const palette = {fontsizes: {}}
  const decorator = element => {
    const {name} = element
    const {fontSize} = element.children[0].style

    const tokens = {
      [camelCase(name)]: {
        fontSize: `${fontSize}px`
      }
    }
    Object.assign(palette.fontsizes, tokens)
  }

  return getTokens(layerName, stylesArtboard, palette, decorator)
}

module.exports = getFontSizes
