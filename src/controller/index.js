"use strict";

const fs = require('fs');
const path = require('path');

// constants
const appRoot = path.resolve(__dirname, '../..');
const docsRoot = path.join(appRoot, 'docs');
const config = require(path.resolve(appRoot, 'config.json'));

const secondsPerImage = config.slideshow.secondsPerImage

// slideshow images
const slideshow = {
  images : fs.readdirSync(path.join(docsRoot, config.slideshow.imagesPath), {withFileTypes: true})
    .filter(item => !item.isDirectory())
    .filter(item => !item.name.match(/^\./)) //filter out dot files
    .map(item => `../img/slideshow/${item.name}`)
}

// calculated values
slideshow.secondsPerImage = secondsPerImage;
slideshow.fullAnimationTime = slideshow.images.length * secondsPerImage,
slideshow.keyframePercentPerImage = +(secondsPerImage*100/slideshow.fullAnimationTime).toFixed(2)
slideshow.keyframePercentTransition = +(slideshow.keyframePercentPerImage/2).toFixed(2)

module.exports = {
  slideshow : slideshow
};