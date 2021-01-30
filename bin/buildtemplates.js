#!/usr/bin/env node
"use strict";

const fs = require('fs');
var Handlebars = require('handlebars');

// set constants
const templatesDir = `${__dirname}/../templates`;
const renderedDir = `${__dirname}/../docs`;

Handlebars.registerHelper("math", (lvalue, operator, rvalue) => {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);
  return {
      "+": lvalue + rvalue,
      "-": lvalue - rvalue,
      "*": lvalue * rvalue,
      "/": lvalue / rvalue,
      "%": lvalue % rvalue
  }[operator];
});


Handlebars.registerHelper("wrap", function(wrapper, options) {
  const compiledWrapper = Handlebars.compile(
    fs.readFileSync(`${templatesDir}/components/${wrapper}.html.hbs`,'utf8').toString()
  );
  return compiledWrapper({ ...this, ...options.hash, content : options.fn(this) })
});



const slideshowData = {}
const slideshowImagesDir = `${__dirname}/../docs/img/slideshow`;
slideshowData.secondsPerImage = 6;
slideshowData.images = fs.readdirSync(slideshowImagesDir, {withFileTypes: true})
  .filter(item => !item.isDirectory())
  .map(item => `../img/slideshow/${item.name}`);
slideshowData.fullAnimationTime = slideshowData.images.length * slideshowData.secondsPerImage,
slideshowData.keyframePercentPerImage = +(slideshowData.secondsPerImage*100/slideshowData.fullAnimationTime).toFixed(2)
slideshowData.keyframePercentTransition = +(slideshowData.keyframePercentPerImage/2).toFixed(2)


// define render function
const render = (file) => {
  // pull apart filepath
  const fileName = file.replace(new RegExp(`^${templatesDir}/`), "")
  const fileParts = fileName.split('.'); // myfile.html.hbs
  const fileOb = {
    name : fileParts[0],
    extension : fileParts[1]
  }
  console.log(`rendering ${fileOb.name}`)
  const template = Handlebars.compile(
    fs.readFileSync(file,'utf8').toString()
  );

  // render it with data
  const output = template({
    pagename : {
      [fileOb.name] : true
    },
    slideshow: slideshowData
  });

  fs.writeFile(`${renderedDir}/${fileOb.name}.${fileOb.extension}`, output, (err) => {
    if(err){
      console.error(err)
    } else {
      console.log(`finished rendering ${fileOb.name}`)
    }
  })

}


// read file lists & render
const templates = fs.readdirSync(templatesDir, {withFileTypes: true})
  .filter(item => !item.isDirectory())
  .map(item => `${templatesDir}/${item.name}`);
for (let i=0; i<templates.length; i++){
  render(templates[i]);
}
render(`${templatesDir}/css/banner-slideshow-images.css.hbs`);