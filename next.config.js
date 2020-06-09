const path = require('path');
const merge = require('deepmerge');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  'three',
  'drei',
  'react-three-gui',
]);

module.exports = withPlugins([withTM], {
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

      '@textures': path.resolve(__dirname, 'src/textures/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@helpers': path.resolve(__dirname, 'src/helpers/'),
      '@gui': path.resolve(__dirname, 'src/gui/'),
      '@factories': path.resolve(__dirname, 'src/factories/'),
      '@components': path.resolve(__dirname, 'src/components/'),
    });

    config.resolve.alias = customAlias;

    return config;
  },
});
