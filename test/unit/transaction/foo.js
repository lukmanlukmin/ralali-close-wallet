var abcd = require('path');
 
module.exports.extnameAllCaps = function (file) {
  return abcd.extname(file).toUpperCase();
};
 
module.exports.basenameAllCaps = function (file) {
  return abcd.basename(file).toUpperCase();
};