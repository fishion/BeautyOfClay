"use strict";

const fs = require('fs');

// constants
const imageLocation = 'img/festival/'

// workshop images
const images = fs.readdirSync(`${__dirname}/../../docs/${imageLocation}`, {withFileTypes: true})
  .filter(item => !item.isDirectory())
  .map(item => item.name)

module.exports = {
  festivalImages : images,
  baseURL: imageLocation
};