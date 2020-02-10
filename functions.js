const fs = require("fs");

function splitPackages(packages, projectName) {
  let packagesString = "";
  packages.forEach(package => {
    packagesString += `${package} `;
  });
  return `cd ${projectName} && npm install ${packagesString}`;
}

function addFile(path, file) {
  fs.appendFileSync(path, file, "utf-8");
}

function readFile(path) {
  return fs.readFileSync(path, "utf-8");
}

function writeJson(path, file) {
  fs.writeFileSync(path, JSON.stringify(file, null, 2), "utf-8");
}

module.exports = {
  splitPackages,
  addFile,
  readFile,
  writeJson
};
