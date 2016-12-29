var path = require('path')

module.exports = {
  entry: './src/index.ts',

  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },

  devtool: 'source-map',

  resolve: {
    extensions: [
      '',
      '.webpack.js',
      '.ts',
      '.js'
    ],
    fallback: [path.join(__dirname, 'node_modules')],
    alias: {
      'src': path.join(__dirname, 'src')
    }
  },

  module: {
    loaders: [{
      test: /\.ts$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }],

    preLoaders: [{
      test: /\.js$/,
      loader: 'source-map-loader',
      exclude: /node_modules/
    }]
  }
}
