const path = require('path');

module.exports = {
  entry: {
    formevents : './src/js/formevents.js',
  },
  mode: 'development', devtool: false,
  //mode: 'production',
  target: 'node',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'docs/js'),
    //libraryTarget: 'commonjs'
  }
}