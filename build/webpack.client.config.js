// zenbu, 全部, bs: 27/08/2018 part of Dapp for ConsenSys Academy

const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const config = merge(base, {
  mode: 'production',
  entry: {
    app: './src/entry-client.js'
  },
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      'process.env.VUE_ENV': '"client"'
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: '/dist',
      seed: {
        manifest_version: 1,
        version: '1.1.11',
        name: 'zenbu Dapp ConsenSys ETHSF',
        short_name: 'zenbu Dapp',
        icons: [{
          src: 'logo-48.png',
          type: 'image/png',
          size: '48x48'
        }],
        start_url: '/',
        display: 'standalone',
        theme_color: '#f60',
        background_color: '#f2f3f5'
      }
    }),
    new VueSSRClientPlugin(),
    new SWPrecachePlugin({
      cacheId: 'zenbu',
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst'
        }
      ]
    })
  ]
})

// if (process.env.NODE_ENV === 'production') {
//   config.plugins.push(
// auto generate service worker
//    new SWPrecachePlugin({
//       cacheId: 'vue-fdm',
//      filename: 'service-worker.js',
//      minify: true,
//      dontCacheBustUrlsMatching: /./,
//      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
//      runtimeCaching: [
//        {
//          urlPattern: '/portal-ssr',
//          handler: 'networkFirst'
//        }
//      ]
//    })
//  )
// }

module.exports = config
