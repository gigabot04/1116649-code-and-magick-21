const path = require("path");

module.exports = {
  entry: [
    "./js/helpersModule.js",
    "./js/backend.js",
    "./js/otherWizards.js",
    "./js/openClose.js",
    "./js/color.js",
    "./js/movePopup.js",
    "./js/stat.js",
    "./js/avatar.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
