const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'eval-source-map',
  resolve: {
    alias: {
      Mesh: path.resolve(__dirname, 'src/mesh/'),
      Camera: path.resolve(__dirname, 'src/camera/'),
      Scene: path.resolve(__dirname, 'src/scene/'),
      Canvas: path.resolve(__dirname, 'src/canvas/'),
      '@textures': path.resolve(__dirname, 'src/assets/textures/'),
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            { plugins: ['@babel/plugin-proposal-class-properties'] },
          ],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
};
