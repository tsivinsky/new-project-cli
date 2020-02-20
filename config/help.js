// Require modules
const fs = require("fs");
const path = require("path");

// Get version of package
const version = require("../package.json").version;

// Read message from file
const message = fs.readFileSync(path.join(__dirname, "../templates/help.txt"));

module.exports = {
  name: "new-project",
  version,
  message
};
