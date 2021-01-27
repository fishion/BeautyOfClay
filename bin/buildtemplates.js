#!/usr/bin/env node
"use strict";

const fs = require('fs');
require('marko/node-require').install({compilerOptions: {
  writeToDisk: false
}});
const templatesDir = `${__dirname}/../templates`;
const renderedDir = `${__dirname}/../docs`;
const slideshowImagesDir = `${__dirname}/../docs/img/slideshow`;


const templates = fs.readdirSync(templatesDir, {withFileTypes: true})
  .filter(item => !item.isDirectory())
  .map(item => item.name.replace(/\.marko$/, ""));

  
const slideshowImages = fs.readdirSync(slideshowImagesDir, {withFileTypes: true})
  .filter(item => !item.isDirectory())
  .map(item => `../img/slideshow/${item.name}`)



for (let i=0; i<templates.length; i++){
  const pagename = templates[i];
  console.log(`generating ${pagename}`)
  const page = require(`${templatesDir}/${pagename}`);
  var writeStream = fs.createWriteStream(`${renderedDir}/${pagename}.html`);
  page.stream({
    pagename : {
      [pagename] : true
    },
    slideshowImages: slideshowImages,
  }).pipe(writeStream)
  console.log('done');
}