#!/usr/bin/env node
"use strict";

const fs = require('fs');
require('marko/node-require').install({compilerOptions: {
  writeToDisk: false
}});
const templatesDir = `${__dirname}/../templates`;
const renderedDir = `${__dirname}/../docs`;


const wrapper = require(`${templatesDir}/partials/wrapper`);
const templates = fs.readdirSync(templatesDir, {withFileTypes: true})
  .filter(item => !item.isDirectory())
  .map(item => item.name.replace(/\.marko$/, ""));

for (let i=0; i<templates.length; i++){
  console.log(`generating ${templates[i]}`)
  const renderedPage = require(`${templatesDir}/${templates[i]}`).renderToString();
  var writeStream = fs.createWriteStream(`${renderedDir}/${templates[i]}.html`);
  wrapper.stream({ content: renderedPage }).pipe(writeStream)
  //writeStream.end();
  console.log('done');
}