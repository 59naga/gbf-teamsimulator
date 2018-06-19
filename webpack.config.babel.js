import { DefinePlugin } from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import autoprefixer from 'autoprefixer-stylus';
import ks from 'kouto-swiss';
import sanitize from 'sanitize.styl';
import stylusResponsiveBreakpoints from 'stylus-responsive-breakpoints';

import { name, version } from './package.json';

const { NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';

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
  mode: NODE_ENV || 'development',
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
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true,
              use: [autoprefixer(), ks(), sanitize(), stylusResponsiveBreakpoints()],
            },
          },
        ],
      },
    ],
  },

  plugins,
};
