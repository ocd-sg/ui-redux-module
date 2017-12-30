import { resolve } from 'path'
import webpack from 'webpack'
import baseConfig from './webpack.config.base.babel'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import DashboardPlugin from 'webpack-dashboard/plugin'

const {
  HOST = 'localhost',
  PORT = 9000,
  TITLE = 'Module'
} = process.env

const config = {
  ...baseConfig,
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
    resolve(__dirname, 'src/app/index.js')
  ],
  output: {
    publicPath: `http://${HOST}:${PORT}/`,
    filename: 'bundle.js'
  },
  devServer: {
    host: HOST,
    port: PORT,
    headers: {'Access-Control-Allow-Origin': '*'},
    hot: true,
    stats: 'minimal',
    proxy: {
      '/api': {
        target: 'http://localhost:8082',
        secure: false
      }
    }
  },
  plugins: [
    ...baseConfig.plugins,
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: TITLE
    })
  ]
}

export default config
