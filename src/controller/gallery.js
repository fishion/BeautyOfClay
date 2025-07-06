'use strict'

const fs = require('fs')
  , path = require('path')

// constants
const appRoot = path.resolve(__dirname, '../..')
  , docsRoot = path.join(appRoot, 'docs')
const config = require(path.resolve(appRoot, 'config.json'))

const getImages = dirPath => {
  return fs.readdirSync(path.join(docsRoot, dirPath), { withFileTypes : true })
    .filter(item => !item.isDirectory())
    .filter(item => !item.name.match(/^\./)) // filter out dot files
    .reverse() // put newest images first
    .map(item => item.name)
}

module.exports = {
  childrensArtImages : {
    baseURL : config.galleryPaths.childrensArtImages,
    images : getImages(config.galleryPaths.childrensArtImages)
  },
  galleryImages : {
    baseURL : config.galleryPaths.gallery,
    images : getImages(config.galleryPaths.gallery)
  }
}
