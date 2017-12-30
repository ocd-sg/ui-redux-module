import { resolve } from 'path'
import webpack from 'webpack'

const config = {
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        include: resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true
            }
          }
        ]
      },
      {
        test: /(\.css)$/,
        include: resolve(__dirname, 'src'),
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /(\.css)$/,
        include: resolve(__dirname, 'node_modules'),
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      react: resolve(__dirname, 'node_modules/react'),
      app: resolve(__dirname, 'src/lib')
    }
  },
  externals: [],
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ],
  stats: 'minimal'
}

export default config
