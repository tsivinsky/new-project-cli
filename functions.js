const fs = require("fs");
const flags = require("node-flags");

module.exports = {
  splitPackages: function(packages, projectName, dev, manager) {
    let packagesString = "";
    packages.forEach(package => {
      packagesString += `${package} `;
    });
    if (dev) {
      return `cd ${projectName} && ${
        manager === "npm" ? "npm install" : "yarn add"
      } ${packagesString} -D`;
    } else {
      return `cd ${projectName} && ${
        manager === "npm" ? "npm install" : "yarn add"
      } ${packagesString}`;
    }
  },
  addFile: function(path, file) {
    fs.appendFileSync(path, file, "utf-8");
  },
  readFile: function(path) {
    return fs.readFileSync(path, "utf-8");
  },
  writeJson: function(path, file) {
    fs.writeFileSync(path, JSON.stringify(file, null, 2), "utf-8");
  },
  checkForFile: function(defaultFile) {
    if (flags.get("main-file")) {
      return flags.get("main-file");
    } else {
      return defaultFile;
    }
  },
  checkForManager: function() {
    if (flags.get("yarn")) {
      return "yarn";
    } else {
      return "npm";
    }
  },
  checkForProxy: function() {
    if (flags.get("proxy")) {
      return flags.get("proxy");
    }
  }
};
