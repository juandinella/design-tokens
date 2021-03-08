# Ripio Design Tokens

A tool made by Ripio to generate Figma design tokens as variables.

## Standalone

1. Clone the project
2. Rename `config.figma.template` to `config.figma.json`
3. Add your Figma API Key and Figma file ID
4. `npm run tokens`

## As a dependecy

Add scripts

```
  "figma-tokens": "npm run figma-tokens:api",
  "figma-tokens:api": "./node_modules/figma-tokens/bin/figma-tokens-api.js",
```
