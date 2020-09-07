const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/sketch.js'), 
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    inline: true,
    watchContentBase: true,
    hot: true,
  },
  devtool: 'source-map'      
}