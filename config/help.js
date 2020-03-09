// Require modules
const fs = require("fs");
const path = require("path");

module.exports = function() {
  // Get package`s data
  const package = require("../package.json").name;
  const version = require("../package.json").version;

  // Read message from file
  let message = fs
    .readFileSync(path.join(__dirname, "../templates/help.txt"))
    .toString();
  message = message.replace(/--PACKAGE--/, package);
  message = message.replace(/--VERSION--/, version);

  return console.log(message);
};
