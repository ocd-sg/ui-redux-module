import { resolve } from 'path'
import webpack from 'webpack'
import baseConfig from './webpack.config.base.babel'

import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

const {
  TITLE = 'Module'
} = process.env

const config = {
  ...baseConfig,
  module: {
    ...baseConfig.module
  },
  entry: [
    resolve(__dirname, 'src/app/index.js')
  ],
  output: {
    path: resolve(__dirname, 'app'),
    filename: 'bundle.min.js'
  },
  plugins: [
    ...baseConfig.plugins,
    new ExtractTextPlugin(
      {
        filename: 'styles.css',
        allChunks: true
      }
    ),
    new UglifyJsPlugin({
      minimize: true
    }),
    new HtmlWebpackPlugin({
      title: TITLE
    })
  ]
}

export default config
