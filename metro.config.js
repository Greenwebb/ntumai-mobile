const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add all file extensions to be processed by metro
config.resolver.sourceExts = [
  'js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'
];

module.exports = config;
