module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["nativewind/babel", { 
        mode: "compileOnly",
        tailwindConfig: "./tailwind.config.js"
      }],
      'react-native-reanimated/plugin'
    ]
  };
};
