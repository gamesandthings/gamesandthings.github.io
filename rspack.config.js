const path = require('path');

module.exports = {
  entry: './launcher/Launcher.ts',
  module: {
    rules: [
       {
        test: /\.ts$/,
        exclude: [/node_modules[\\/]core-js/],
        loader: 'builtin:swc-loader',
        options: {
          // env: {
          //   "targets": "> 0.0%",
          //   "mode": "entry",
          //   "coreJs": "3.46"
          // },

          jsc: {
            parser: {
              syntax: 'typescript',
            },
          },
        },
        type: 'javascript/auto',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'launcher.js',
    path: path.resolve(__dirname, ''),
  },
  experiments: {
        outputModule: true
  },
  //mode: "development"
};