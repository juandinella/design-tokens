/* eslint-disable no-console */
const fs = require('fs')
const ora = require('ora')
const fetch = require('node-fetch')
const path = require('path')

const DESIGN_TOKENS_PATH = path.join(process.cwd(), '.', 'tokens')

const {
  getColors,
  getTypography,
  getSpacing,
  getShadows,
  getBreakpoints,
  getRadius,
  getFontSizes,
  getOpacities
} = require('./types')

const genFile = tokens => {
  if (!fs.existsSync(DESIGN_TOKENS_PATH)) {
    fs.mkdirSync(DESIGN_TOKENS_PATH)
  }

  fs.writeFile(
    `${DESIGN_TOKENS_PATH}/tokens.json`,
    JSON.stringify(tokens, null, 2),
    err => {
      if (err) throw new Error(`\x1b[31m\n\n❌ ${err}\n\n`)
      console.log('\x1b[32m✔︎\x1b[0m Figma design tokens created!\n')
    }
  )
}

const genTokens = (apikey, id) => {
  const spinner = ora('🚀 Connecting with Figma...\n').start()

  const FETCH_PATH = 'https://api.figma.com/v1/files'
  const FETCH_URL = `${FETCH_PATH}/${id}`
  const FETCH_DATA = {
    method: 'GET',
    headers: {
      'X-Figma-Token': apikey
    }
  }

  try {
    fetch(FETCH_URL, FETCH_DATA)
      .then(response => {
        spinner.text = '🚀 Generating Figma design tokens...\n'
        return response.json()
      })
      .then(styles => {
        if (styles.status !== 403 && styles.status !== 404) {
          const figmaTree = styles.document.children[0].children

          genFile({
            ...getColors('Colors', figmaTree),
            ...getSpacing('Spacings', figmaTree),
            ...getTypography('Typography', figmaTree),
            ...getShadows('Shadows', figmaTree),
            ...getRadius('Radius', figmaTree),
            ...getBreakpoints('Breakpoints', figmaTree),
            ...getFontSizes('FontSizes', figmaTree),
            ...getOpacities('Opacities', figmaTree)
          })

          spinner.stop()
        }
      })
      .catch(err => {
        spinner.stop()
        throw new Error(`\x1b[31m\n\n❌ ${err}\n`)
      })
  } catch (err) {
    throw new Error(`\x1b[31m\n\n❌ ${err}\n\n`)
  }
}

module.exports = genTokens
