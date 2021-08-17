"use strict";

const fs = require('fs');

// constants
const imageLocation = 'img/workshop/'

// workshop images
const images = fs.readdirSync(`${__dirname}/../../docs/${imageLocation}`, {withFileTypes: true})
  .filter(item => !item.isDirectory())
  .filter(item => !item.name.match(/^\./)) //filter out dot files
  .map(item => item.name)

module.exports = {
  workshopImages : images,
  baseURL: imageLocation
};