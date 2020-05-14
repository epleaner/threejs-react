const path = require('path');
const merge = require('deepmerge');

module.exports = {
  webpack: (config) => {
    const customAlias = merge(config.resolve.alias, {
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
    });

    config.resolve.alias = customAlias;

    return config;
  },
};
