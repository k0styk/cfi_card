const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const sass = require('./webpack/sass');
const sourceMap = require('./webpack/sourceMap');
const images = require('./webpack/images');
const babel = require('./webpack/babel');
const lintJS = require('./webpack/js.lint');
const extractCSS = require('./webpack/css.extract');
const devserver = require('./webpack/devserver');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const source = ph => path.join(__dirname, 'src', ph?ph:'');
const build = ph => path.join(__dirname, 'dist', ph?ph:'');

const common = merge([
  {
    entry: {
      'index': source('server/entrypoint.js')
    },
    output: {
      path: build(),
      publicPath: '/',
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': source(),
        '@components': source('client/components/'),
        '@views': source('client/views/'),
        '@pages': source('client/pages/'),
        '@redux': source('client/redux/'),
        '@client': source('client/'),
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: 'body',
        chunks: ['index', 'common'],
        template: source('public/html/index.html'),
        favicon: source('public/img/favicon.png'),
        cache: false
      })
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          'common': {
            minChunks: 2,
            chunks: 'all',
            name: 'common',
            priority: 10,
            enforce: true,
          },
        },
      },
    },
  },
  lintJS({ options: {
    fix: false,
    failOnError: true,
    emitError: true,
    emitWarning: true,
  }}),
  images(),
  // fonts(),
  babel(),
]);

module.exports = function(env, argv) {
  if (argv.mode === 'production') {
    return merge([
      common,
      {
        plugins: [
          new webpack.DefinePlugin({
            __LOGGER__: env && env.logger? JSON.stringify(env.logger):null
          })
        ]
      },
      extractCSS(),
      // {
      //   optimization: {
      //     minimizer: [
      //       new UglifyJsPlugin({
      //         // cache: true,
      //         // parallel: true,
      //         // uglifyOptions: {
      //         //   output: {
      //         //     comments: false
      //         //   }
      //         // }
      //       }),
      //     ]
      //   }
      // }
    ]);
  }
  if (argv.mode === 'development') {
    return merge([
      common,
      {
        plugins: [
          new webpack.DefinePlugin({
            __LOGGER__: env && env.logger? JSON.stringify(env.logger):null
          })
        ]
      },
      argv.devserver && devserver(),
      sass(),
      sourceMap(),
    ]);
  }
};