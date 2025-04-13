const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add all file extensions to be processed by metro
config.resolver.sourceExts = [
  'js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'
];

// Add support for CSS files
config.transformer.babelTransformerPath = require.resolve('react-native-css-transformer');

module.exports = config;
