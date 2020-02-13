const fs = require("fs");

module.exports = {
  splitPackages: function(packages, projectName, dev) {
    let packagesString = "";
    packages.forEach(package => {
      packagesString += `${package} `;
    });
    if (dev) {
      return `cd ${projectName} && npm install ${packagesString} --save-dev`;
    } else {
      return `cd ${projectName} && npm install ${packagesString}`;
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
  }
};
