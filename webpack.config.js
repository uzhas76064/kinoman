const path = require('path');
const CopyPlugin=require('copy-webpack-plugin');

module.exports = {
  mode: "development",
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "bundle.js",
    clean: true
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public" },
      ],
    }),
  ],
   devtool: 'source-map',
   module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }
    ]
  }
}
