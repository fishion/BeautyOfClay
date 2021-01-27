#!/usr/bin/env node
"use strict";

const fs = require('fs');
require('marko/node-require').install({compilerOptions: {
  writeToDisk: false
}});

// set constants
const templatesDir = `${__dirname}/../templates`;
const renderedDir = `${__dirname}/../docs`;
const slideshowImagesDir = `${__dirname}/../docs/img/slideshow`;
const secondsPerImage = 6;

// read file lists
const templates = fs.readdirSync(templatesDir, {withFileTypes: true})
  .filter(item => !item.isDirectory())
  .map(item => item.name.replace(/\.marko$/, ""));
const slideshowImages = fs.readdirSync(slideshowImagesDir, {withFileTypes: true})
  .filter(item => !item.isDirectory())
  .map(item => `../img/slideshow/${item.name}`)

const generate = (pagename, extension) => {
  console.log(`generating ${pagename}`)
  const page = require(`${templatesDir}/${pagename}`);
  var writeStream = fs.createWriteStream(`${renderedDir}/${pagename}.${extension}`);
  page.stream({
    pagename : {
      [pagename] : true
    },
    slideshow: {
      images: slideshowImages,
      secondsPerImage: secondsPerImage
    }
  }).pipe(writeStream)
  console.log('done');
}

for (let i=0; i<templates.length; i++){
  generate(templates[i], 'html');
}
generate('css/banner-slideshow-images','css')