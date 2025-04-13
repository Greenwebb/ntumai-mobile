const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Ensure resolver extensions include all necessary file types
config.resolver.sourceExts = [
  'js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'
];

// Add assetExts for all file types your app uses
config.resolver.assetExts = config.resolver.assetExts || [];
config.resolver.assetExts.push('db', 'mp3', 'ttf', 'obj', 'png', 'jpg', 'jpeg');

// Apply NativeWind configuration
module.exports = withNativeWind(config, { input: './tailwind.config.js' });
