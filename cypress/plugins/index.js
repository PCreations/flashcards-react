const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');
const watch = require('@cypress/watch-preprocessor');

module.exports = on => {
  on('file:preprocessor', watch);
  on('file:preprocessor', cypressTypeScriptPreprocessor);
};
