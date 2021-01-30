const Handlebars = require('handlebars');
const fs = require('fs');

const wrappersPath = "partials/wrappers";
const includesPath = "partials/includes";

module.exports = (templatesDir, renderedDir) => {
  const hbs = Handlebars

  // add helpers
  hbs.registerHelper("math", (lvalue, operator, rvalue) => {
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
  

  hbs.registerHelper("wrap", function(wrapper, options) {
    const compiledWrapper = hbs.compile(
      fs.readFileSync(`${templatesDir}/${wrappersPath}/${wrapper}.html.hbs`,'utf8').toString()
    );
    return compiledWrapper({ ...this, ...options.hash, content : options.fn(this) })
  });
  hbs.registerHelper("include", function(include, options) {
    const compiledInclude = hbs.compile(
      fs.readFileSync(`${templatesDir}/${includesPath}/${include}.html.hbs`,'utf8').toString()
    );
    return compiledInclude({ ...this, ...options.hash})
  });


  // main render method
  hbs.render = (templateName, slideshowData) => {
    // pull apart template path
    const [fileName, fileExt] = templateName.split('.'); // myfile.html.hbs

    // prep data
    const data = {
      pagename : {
        [fileName] : true
      },
      slideshow: slideshowData
    };

    // render template
    console.log(`rendering ${fileName}`)
    const template = hbs.compile( fs.readFileSync(`${templatesDir}/${templateName}`,'utf8').toString() );
    fs.writeFile(`${renderedDir}/${fileName}.${fileExt}`, template(data), (err) => {
      if(err){
        console.error(err)
      } else {
        console.log(`finished rendering ${fileName}`)
      }
    })   
  }

  return hbs;

}