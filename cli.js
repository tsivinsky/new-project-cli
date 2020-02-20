#! /usr/bin/env node

// Require dependencies
const chalk = require("chalk");
const fs = require("fs");

// Require Project class
const Project = require("./Project");

/* Arguments
  1. Project type
  2. Project name
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
  return console.log(chalk.red("Name of project CANNOT starts with - (dash)."));
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

// Require function for check for arguments with main file
const { checkForFile, checkForManager, checkForProxy } = require("./functions");

switch (projectType) {
  case "react-webpack":
    if (projectName) {
      mainFile = checkForFile("index.js");
      manager = checkForManager();

      // Change main file path in config
      ReactWebpackConfig.templates[3].path = `/src/${mainFile}`;

      // Change entry path in webpack template file
      let webpackConfigFile = ReactWebpackConfig.templates[0].file;
      webpackConfigFile = webpackConfigFile.replace(
        /--MAINFILENAME--/,
        mainFile
      );

      const proxy = checkForProxy();
      if (proxy) {
        // Get proxy text from txt file
        let proxyText = fs.readFileSync("./templates/proxy.txt").toString();
        proxyText = proxyText.replace(/--PROXY--/, proxy);
        webpackConfigFile = webpackConfigFile.replace(
          /--PORT--/,
          'port: "3000",\n' + proxyText
        );
      } else {
        webpackConfigFile = webpackConfigFile.replace(
          /--PORT--/,
          'port: "3000"'
        );
      }

      // Save new webpack config file in templates
      ReactWebpackConfig.templates[0].file = webpackConfigFile;

      // Create a new React Webpack project
      const ReactWebpack = new Project({
        userDir,
        name: projectName,
        type: projectType,
        packages: ReactWebpackConfig.packages,
        scripts: ReactWebpackConfig.scripts,
        templates: ReactWebpackConfig.templates,
        folders: ReactWebpackConfig.folders,
        mainFile,
        manager
      });

      ReactWebpack.create();
    } else {
      console.log(chalk.yellow("Enter a valid name of project"));
    }
    break;
  case "express-app":
    if (projectName) {
      mainFile = checkForFile("server.js");
      manager = checkForManager();

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
        mainFile,
        manager
      });

      ExpressApp.create();
    } else {
      console.log(chalk.yellow("Enter a valid name of project"));
    }
    break;
  case "electron-app":
    if (projectName) {
      mainFile = checkForFile("main.js");
      manager = checkForManager();

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
        mainFile,
        manager
      });

      ElectronApp.create();
    } else {
      console.log(chalk.yellow("Enter a valid name of project"));
    }
    break;

  default:
    if (projectType) {
      console.log(chalk.red(`Type ${projectType} NOT exists.`));
    } else {
      console.log(
        chalk.yellow("Enter a project type after new-project command.")
      );
    }
    break;
}
