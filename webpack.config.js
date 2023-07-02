const path = require('path')

module.exports = {
  entry : {
    formevents : './src/js/formevents.js',
    workshops : './src/js/workshops.js'
  },
  // mode: 'development', devtool: false,
  mode : 'production',
  output : {
    filename : '[name].js',
    path : path.join(__dirname, 'docs/js')
  }
}
