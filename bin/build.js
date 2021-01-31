#!/usr/bin/env node
"use strict";

// set paths
const templatesDir = `${(__dirname)}/../templates`;
const renderedDir = `${__dirname}/../docs`;

// require modules
const fs = require('fs');
const Handlebars = require('../lib/handlebars/enhanced')(templatesDir, renderedDir);

// read file lists & render
fs.readdirSync(templatesDir, {withFileTypes: true})
  .filter(item => !item.isDirectory())
  .forEach(file => Handlebars.render(file.name))
Handlebars.render("css/banner-slideshow-images.css.hbs", "index");