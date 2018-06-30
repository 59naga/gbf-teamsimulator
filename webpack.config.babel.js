import { DefinePlugin } from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import { name, version } from './package.json';

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  new DefinePlugin({
    NAME: JSON.stringify(name),
    VERSION: JSON.stringify(version),
    SEPARATOR: JSON.stringify('-'),
  }),
];
if (isProduction) {
  plugins.push(new UglifyJsPlugin());
}

export default {
  mode: process.env.NODE_ENV || 'development',
  devServer: {
    contentBase: `${__dirname}/dist`,
  },

  devtool: isProduction ? undefined : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: isProduction ? undefined : /(node_modules|bower_components)/,
        use: isProduction ? ['babel-loader'] : [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.yaml$/,
        use: [
          'json-loader',
          'yaml-loader',
        ],
      },
    ],
  },

  plugins,
};
