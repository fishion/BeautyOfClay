"use strict";

const fs = require('fs');

// constants
const slideshowImagesDir = `${__dirname}/../../docs/img/slideshow`;
const secondsPerImage = 6

// slideshow images
const slideshow = {
  images : fs.readdirSync(slideshowImagesDir, {withFileTypes: true})
    .filter(item => !item.isDirectory())
    .map(item => `../img/slideshow/${item.name}`)
}

// calculated values
slideshow.secondsPerImage = secondsPerImage;
slideshow.fullAnimationTime = slideshow.images.length * slideshow.secondsPerImage,
slideshow.keyframePercentPerImage = +(slideshow.secondsPerImage*100/slideshow.fullAnimationTime).toFixed(2)
slideshow.keyframePercentTransition = +(slideshow.keyframePercentPerImage/2).toFixed(2)


module.exports = {
  slideshow : slideshow
};