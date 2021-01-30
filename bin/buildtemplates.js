#!/usr/bin/env node
"use strict";

// set constants
const templatesDir = `${(__dirname)}/../templates`;
const renderedDir = `${__dirname}/../docs`;

// require modules
const fs = require('fs');
const Handlebars = require('../lib/handlebars/enhanced')(templatesDir, renderedDir);

// prepare template data
const slideshowData = {}
const slideshowImagesDir = `${__dirname}/../docs/img/slideshow`;
slideshowData.secondsPerImage = 6;
slideshowData.images = fs.readdirSync(slideshowImagesDir, {withFileTypes: true})
  .filter(item => !item.isDirectory())
  .map(item => `../img/slideshow/${item.name}`);
slideshowData.fullAnimationTime = slideshowData.images.length * slideshowData.secondsPerImage,
slideshowData.keyframePercentPerImage = +(slideshowData.secondsPerImage*100/slideshowData.fullAnimationTime).toFixed(2)
slideshowData.keyframePercentTransition = +(slideshowData.keyframePercentPerImage/2).toFixed(2)

// read file lists & render
const templates = fs.readdirSync(templatesDir, {withFileTypes: true})
  .filter(item => !item.isDirectory())
  .forEach(file => Handlebars.render(file.name, slideshowData))
Handlebars.render("css/banner-slideshow-images.css.hbs", slideshowData);