#!/usr/bin/env node
'use strict'

const fs = require('fs/promises')
  , path = require('path')
  , sass = require('sass')

const appRoot = path.resolve(__dirname, '..')
const config = require(path.resolve(appRoot, 'config.json'))

// build html files with Handlebars
// require('../../HandlebarsExtended')({
require('HandlebarsExtended')({
  ...config.paths,
  appRoot
}).buildSite(config)

// build css files from SASS
config.paths.sassFiles && config.paths.sassFiles.forEach(async file => {
  const infile = path.resolve(appRoot, config.paths.sassInputPath, `${file}.scss`)
    , outfile = path.resolve(appRoot, config.paths.sassOutputPath, `${file}.css`)
  try {
    const result = sass.renderSync({
      file : infile,
      outFile : outfile,
      outputStyle : 'compressed'
    })
    await fs.writeFile(outfile, result.css)
  } catch (e) {
    console.log(`failed to compile ${infile} : ${e}`)
  }
})
