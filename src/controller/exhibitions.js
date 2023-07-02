'use strict'

const fs = require('fs')
  , path = require('path')

// constants
const appRoot = path.resolve(__dirname, '../..')
  , docsRoot = path.join(appRoot, 'docs')
const config = require(path.resolve(appRoot, 'config.json'))

// workshop images
const images = fs.readdirSync(path.join(docsRoot, config.galleryPaths.exhibitions), { withFileTypes : true })
  .filter(item => !item.isDirectory())
  .filter(item => !item.name.match(/^\./)) // filter out dot files

module.exports = {
  festival21 : images.filter(item => item.name.match(/^festival21/)).map(item => item.name),
  festivalmay22 : images.filter(item => item.name.match(/^festivalmay22/)).map(item => item.name),
  baseURL : config.galleryPaths.exhibitions
}
