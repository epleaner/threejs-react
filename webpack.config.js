const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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

      '@three': path.resolve('node_modules/three/build/three.module.js'),
      '@three-controls': path.resolve(
        'node_modules/three/examples/jsm/controls'
      ),
      '@three-libs': path.resolve('node_modules/three/examples/jsm/libs'),
      '@three-gui': path.resolve(
        'node_modules/three/examples/jsm/libs/dat.gui.module.js'
      ),
      '@three-modules': path.resolve('node_modules/three/examples/jsm'),

      '@textures': path.resolve(__dirname, 'src/assets/textures/'),
      '@styles': path.resolve(__dirname, 'src/assets/styles/'),
      '@helpers': path.resolve(__dirname, 'src/helpers/'),
      '@factories': path.resolve(__dirname, 'src/helpers/factories/'),
    },
    extensions: ['.js', '.jsx'],
  },
  plugins: [new CleanWebpackPlugin()],
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
