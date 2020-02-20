// Require dependencies
const fs = require("fs");
const shell = require("shelljs");
const chalk = require("chalk");
const { splitPackages, readFile, writeJson, addFile } = require("./functions");

class Project {
  constructor({
    userDir,
    name,
    type,
    packages,
    scripts,
    templates,
    folders,
    mainFile,
    manager
  }) {
    this.userDir = userDir;
    this.name = name;
    this.type = type;
    this.packages = packages ? packages : undefined;
    this.scripts = scripts ? [...scripts] : undefined;
    this.templates = templates ? [...templates] : undefined;
    this.folders = folders ? [...folders] : undefined;
    this.mainFile = mainFile;
    this.manager = manager;
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
    shell.exec(`cd ${this.name} && ${this.manager} init -y`);

    console.log(
      chalk.green("Now, script is installing dependencies to your new project.")
    );

    // Install usual dependencies
    shell.exec(splitPackages(this.packages.usual, this.name, false));

    console.log(
      chalk.green(
        "Usual dependencies was installed and dev dependencies will install now."
      )
    );

    // Install dev dependencies
    if (typeof this.packages.dev !== "undefined") {
      shell.exec(splitPackages(this.packages.dev, this.name, true));
    }

    console.log(
      chalk.green(
        "All dependencies was installed and now script is setting up your new project."
      )
    );

    // Read package.json file in new directory
    const packageJSON = JSON.parse(readFile(`${baseUrl}/package.json`));

    // Add scripts object if user uses yarn as package manager
    if (this.manager === "yarn") {
      packageJSON.scripts = {};
    }

    // Add scripts to package.json file in new directory
    if (this.scripts) {
      this.scripts.forEach(script => {
        const name = script.name;
        const value = script.value;

        packageJSON.scripts[name] = value;
      });
    }

    // Change main file in project
    packageJSON["main"] = this.mainFile;

    // Write changed package.json file
    writeJson(`${baseUrl}/package.json`, packageJSON);

    // Create folders
    if (this.folders) {
      this.folders.forEach(folder => {
        fs.mkdirSync(baseUrl + folder);
      });
    }

    // Add project files
    if (this.templates) {
      this.templates.forEach(template => {
        addFile(baseUrl + template.path, template.file);
      });
    }
  }
}

module.exports = Project;
