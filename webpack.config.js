const path = require('path');

module.exports = {
  entry: './launcher/Launcher.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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