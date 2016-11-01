/*
 * Module Dependencies
 * */

var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var extractCSS = new ExtractTextPlugin('css/squares-grid.min.css')

// Plugins POSTCSS
var lost = require('lost') //GridSystem with PostCSS
var autoprefixer = require('autoprefixer') //autoprefixer
var rucksackCSS = require('rucksack-css') //font-size responsive
var mediasMinMax = require('postcss-media-minmax') //Abreviación de sintaxis en los Media queries con >= o <=
var customMedias = require('postcss-custom-media') //Crea media queries custom como: @custom-media --mobile (min-width: 500px)

// Routes

var BUILD_DIR = path.join(__dirname, 'dist') //Outpout
var APP_DIR = path.join(__dirname, 'src') //Input

var config = {
  resolve: {
    extensions: ['', '.js', '.sass', '.scss', '.html']
  },
  entry: APP_DIR,
  output: {
    path: BUILD_DIR,
    filename: 'js/[name].bundle.js',
    publicPath: '/'
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    inline: true
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: APP_DIR,
      exclude: /(node_modules|bower_components)/,
      loader: "babel-loader"
    },{
      test: /\.(sass|scss)$/,
      loader: extractCSS.extract(['css?minimize','postcss','sass'])
    }]
  },
  postcss: function () {
    return {
      plugins: [
        autoprefixer,
        lost,
        rucksackCSS,
        mediasMinMax,
        customMedias
      ]
    }
  },
  sassLoader: {
    indentedSyntax: true
  },
  plugins: [extractCSS]
}

module.exports = config;
