#! /usr/bin/env node

// Require Project class
const Project = require("./Project");

/* Arguments
  1. Project type
  2. Name of project
  3. Additional options
*/

// Get config files
const ReactWebpackConfig = require("./config/react-webpack");
const ExpressConfig = require("./config/express-app");
const ElectronConfig = require("./config/electron-app");

// Get arguments from user
const [, , ...args] = process.argv;

// Get project`s type and name from arguments
const projectType = args[0];
const projectName = args[1];

if (projectName && projectName.startsWith("-")) {
  return console.log("Name of project CANNOT starts with - (dash).");
}

// Get current user directory
const userDir = process.cwd();

// Return a version message
if (args.includes("--version") || args.includes("-v")) {
  const version = require("./package.json").version;
  return console.log(`Version: ${version}`);
}

// Return a help message
if (args.includes("--help") || args.includes("-h")) {
  const help = require("./config/help");
  return console.log(`
Package name: ${help.name}
Current version: ${help.version}
${help.message}
  `);
}

// Variable for main file
let mainFile = "";

// Require function for check for argument with main file
const { checkForFile } = require("./functions");

switch (projectType) {
  case "react-webpack":
    if (projectName) {
      mainFile = checkForFile(args, "index.js");

      // Change main file path in config
      ReactWebpackConfig.templates[3].path = `/src/${mainFile}`;

      // Change entry path in webpack template file
      const webpackConfigFile = ReactWebpackConfig.templates[0].file;
      ReactWebpackConfig.templates[0].file = webpackConfigFile.replace(
        /index.js/,
        mainFile
      );

      // Create a new React Webpack project
      const ReactWebpack = new Project({
        userDir,
        name: projectName,
        type: projectType,
        packages: ReactWebpackConfig.packages,
        scripts: ReactWebpackConfig.scripts,
        templates: ReactWebpackConfig.templates,
        folders: ReactWebpackConfig.folders,
        mainFile
      });

      ReactWebpack.create();
    } else {
      console.log("Enter a valid name of project");
    }
    break;
  case "express-app":
    if (projectName) {
      mainFile = checkForFile(args, "server.js");

      // Change main file path in config
      ExpressConfig.templates[1].path = `/${mainFile}`;

      // Change main file in scripts
      ExpressConfig.scripts[0].value = `node ${mainFile}`;
      ExpressConfig.scripts[1].value = `nodemon ${mainFile}`;

      // Create a new Express project
      const ExpressApp = new Project({
        userDir,
        name: projectName,
        type: projectType,
        packages: ExpressConfig.packages,
        scripts: ExpressConfig.scripts,
        templates: ExpressConfig.templates,
        folders: ExpressConfig.folders,
        mainFile
      });

      ExpressApp.create();
    } else {
      console.log("Enter a valid name of project");
    }
    break;
  case "electron-app":
    if (projectName) {
      mainFile = checkForFile(args, "index.js");

      // Change main file path in config
      ElectronConfig.templates[1].path = `/${mainFile}`;

      // Create a new Electron project
      const ElectronApp = new Project({
        userDir,
        name: projectName,
        type: projectType,
        packages: ElectronConfig.packages,
        scripts: ElectronConfig.scripts,
        templates: ElectronConfig.templates,
        mainFile
      });

      ElectronApp.create();
    } else {
      console.log("Enter a valid name of project");
    }
    break;

  default:
    if (projectType) {
      console.log(`Type ${projectType} NOT exists.`);
    } else {
      console.log("Enter a project type after new-project command.");
    }
    break;
}
