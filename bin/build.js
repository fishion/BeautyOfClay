#!/usr/bin/env node
"use strict";

const path = require('path');
//const sass = require('sass');

const appRoot = path.resolve(__dirname, '..');
const config = require(path.resolve(appRoot, 'config.json'));

// build html files with Handlebars
// require('../../HandlebarsExtended')({
require('HandlebarsExtended')({
    ...config.paths,
  appRoot     : appRoot
}).buildSite(config);