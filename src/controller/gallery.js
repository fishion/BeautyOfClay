'use strict'

const fs = require('fs')
  , path = require('path')

// constants
const appRoot = path.resolve(__dirname, '../..')
  , docsRoot = path.join(appRoot, 'docs')
const config = require(path.resolve(appRoot, 'config.json'))

// workshop images
const images = fs.readdirSync(path.join(docsRoot, config.galleryPaths.gallery), { withFileTypes : true })
  .filter(item => !item.isDirectory())
  .filter(item => !item.name.match(/^\./)) // filter out dot files
  .reverse() // put newest images first
  .map(item => item.name)

module.exports = {
  galleryImages : images,
  baseURL : config.galleryPaths.gallery
}
