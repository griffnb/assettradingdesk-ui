const mainPlopfile = require("../../plopfile");

module.exports = function (plop) {
  // Load the main plopfile to inherit its generators
  mainPlopfile(plop);
};
