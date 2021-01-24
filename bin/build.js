#!/usr/bin/env node
"use strict";

const imagesJsFile = `${__dirname}/../docs/script/banner-slideshow-images.js`;
const imagesCssFile = `${__dirname}/../docs/css/banner-slideshow-images.css`;
const images = [
  '../img/gallery/gallery1.jpg',
  '../img/gallery/gallery2.jpg',
  '../img/gallery/gallery19.jpg',
  '../img/gallery/gallery9.jpg'
];
const secondsPerImage = 6;

const fullAnimationTime = images.length * secondsPerImage;
const keyframePercentPerImage = secondsPerImage*100/fullAnimationTime
const keyframePercentTransition = keyframePercentPerImage/2

/* Build banner css and html */

let slideshowCss = `
  .banner-slideshow li span {
    animation: imageAnimation ${fullAnimationTime}s linear infinite 0s; 
  }`;
for (let i=0; i<images.length; i++){
  slideshowCss += `
    .banner-slideshow li:nth-child(${i+1}) span { 
      background-image: url('${images[i]}');
      animation-delay: ${i*secondsPerImage}s;
    }
  `
}
slideshowCss += `
  @keyframes imageAnimation { 
    0% {
      opacity: 0;
      animation-timing-function: ease-in;
    }
    ${keyframePercentTransition}% {
      opacity: 1;
      animation-timing-function: ease-out;
    }
    ${keyframePercentPerImage}% {
      opacity: 1;
    }
    ${keyframePercentPerImage+keyframePercentTransition}% {
      opacity: 0;
    }
    100% { opacity: 0 }
  }
`

// Write files
const fs = require('fs');
fs.writeFileSync(imagesJsFile, `const bannerSlideshowImages=${JSON.stringify(images)}`)
fs.writeFileSync(imagesCssFile, slideshowCss)

