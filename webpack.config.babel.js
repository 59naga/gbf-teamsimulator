import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import autoprefixer from 'autoprefixer-stylus';
import ks from 'kouto-swiss';
import sanitize from 'sanitize.styl';
import stylusResponsiveBreakpoints from 'stylus-responsive-breakpoints';

const { NODE_ENV } = process.env;
const plugins = [];
if (NODE_ENV === 'production') {
  plugins.push(new UglifyJsPlugin());
}

export default {
  mode: NODE_ENV || 'development',
  devServer: {
    contentBase: `${__dirname}/dist`,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: NODE_ENV === 'production' ? undefined : /(node_modules|bower_components)/,
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
