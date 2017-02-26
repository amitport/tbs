const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = function(env) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        {
          test: /\.html$/,
          loader: `ngtemplate-loader?relativeTo=${path.resolve(__dirname, './src')}/!html-loader`
        },
        {
          test: /\.(png|svg)$/,
          loader: 'file-loader'
        }
      ]
    },
    entry: {
      main: './src/index.js'
    },
    output: {
      publicPath: '/',
      filename: '[chunkhash].[name].js',
      path: path.resolve(__dirname, 'build')
    },
    plugins: [
      new CleanWebpackPlugin(['build']),
      new HtmlWebpackPlugin({
        template: './src/index.ejs'
      }),
      new ScriptExtHtmlWebpackPlugin({
        inline: 'manifest'
      }),
      new ExtractTextPlugin('[chunkhash].styles.css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
          return module.context && module.context.indexOf('node_modules') !== -1;
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      })
    ],
    devServer: {
      contentBase: path.join(__dirname, 'src'),
      compress: true,
      port: 5000
    }
  }
}
