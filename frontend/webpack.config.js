const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    sb: './js/custom.js',
  },
  output: {
    path: __dirname + '/',
    filename: 'dist/[name]_bundle.js'
  },
  resolve: {
    alias: {
      modules: path.join(__dirname, 'node_modules'),
      common: path.join(__dirname, 'common')
    }
  }, 
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/env',
                {
                  targets: {
                    browsers: [
                      'last 4 versions'
                    ]
                  },
                  useBuiltIns: 'usage'
                }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: './.env', // Path to .env file (this is the default)
      safe: true // load .env.example (defaults to "false" which does not use dotenv-safe)
    })
  ]
};
