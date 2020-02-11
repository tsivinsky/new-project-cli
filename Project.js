// Require dependencies
const fs = require("fs");
const shell = require("shelljs");
const { splitPackages, readFile, writeJson, addFile } = require("./functions");

class Project {
  constructor({ userDir, name, type, packages, scripts, templates, folders }) {
    this.userDir = userDir;
    this.name = name;
    this.type = type;
    this.packages = packages;
    this.scripts = [...scripts];
    this.templates = [...templates];
    this.folders = [...folders];
  }

  create() {
    // Create variable of base url
    const baseUrl = this.userDir + "/" + this.name;

    // Check folder of project name for existing
    if (fs.existsSync(baseUrl)) {
      return console.log(`Folder with name \"${this.name}\" already exists.`);
    }

    // Create a project folder
    fs.mkdirSync(baseUrl);

    // Cd to a new project folder and initialize it
    shell.exec(`cd ${this.name} && npm init -y`);

    console.log("Now, script is installing dependencies to your new project.");

    // Install usual dependencies
    shell.exec(splitPackages(this.packages.usual, this.name, false));

    console.log(
      "Usual dependencies was installed and dev dependencies will install now."
    );

    // Install dev dependencies
    if (typeof this.packages.dev !== "undefined") {
      shell.exec(splitPackages(this.packages.dev, this.name, true));
    }

    console.log(
      "All dependencies was installed and now script is setting up your new project."
    );

    // Read package.json file in new directory
    const packageJSON = JSON.parse(readFile(`${baseUrl}/package.json`));

    // Add scripts to package.json file in new directory
    this.scripts.forEach(script => {
      const name = script.name;
      const value = script.value;

      packageJSON.scripts[name] = value;
    });
    writeJson(`${baseUrl}/package.json`, packageJSON);

    // Create folders
    this.folders.forEach(folder => {
      fs.mkdirSync(baseUrl + folder);
    });

    // Add project files
    this.templates.forEach(template => {
      addFile(baseUrl + template.path, template.file);
    });
  }
}

module.exports = Project;
