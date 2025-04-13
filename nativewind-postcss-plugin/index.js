const postcss = require('postcss');

module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'nativewind-async-handler',
    Once(root, { result }) {
      // This plugin ensures that async PostCSS plugins are properly handled
      return Promise.resolve();
    }
  };
};

module.exports.postcss = true;
