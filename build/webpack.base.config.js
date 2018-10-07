// zenbu, 全部, bs: 27/08/2018 part of Dapp for ConsenSys Academy

const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// bs added for minifying JavaScript:
const BabiliPlugin = require('babili-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const isProd = true

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash:8].js'
    // filename: '[name].js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public')
    },
    extensions: ['.js', '.jsx', '.css']
    // modules: [
    //   path.resolve(__dirname, 'node_modules'),
    // ],
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: 'warning'
  },
  optimization: {
    minimizer: [
      new BabiliPlugin(),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      // filename: 'common.[contenthash:8].css',
      filename: 'common.[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].css'
      // filename: 'common.css'
    })
  ],
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        // include: [path.join(__dirname, 'src')]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // bs: name: '[name].[ext]?[hash]'
          name: '[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(styl(us)?)$/,
        // resourceQuery: /module/,
        use: [
          'style-loader',
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}
