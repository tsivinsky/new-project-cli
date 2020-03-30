#! /usr/bin/env node

// Require dependencies
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

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
if (args[0] === "--help" || args[0] === "-h") {
  require("./config/help")();
  return;
}

// Variable for main file
let mainFile = "";

// Require function for check for arguments with main file
const { checkForFile, checkForManager, checkForProxy } = require("./functions");

switch (projectType) {
  case "react":
    if (projectName) {
      mainFile = checkForFile("index.js");
      manager = checkForManager();

      if (mainFile === "app.js") {
        return console.log(
          chalk.red("Sorry but you cannot create main file with name of app.js")
        );
      }

      // Change main file path in config
      ReactWebpackConfig.templates[3].path = `/src/${mainFile}`;

      // Change entry path in webpack template file
      let webpackConfigFile = ReactWebpackConfig.templates[0].file;
      webpackConfigFile = webpackConfigFile.replace(
        /--MAINFILENAME--/,
        mainFile
      );

      // Code which check for --proxy flag
      const proxy = checkForProxy();
      if (proxy) {
        // Get proxy text from txt file
        let proxyText = fs
          .readFileSync(path.join(__dirname, "templates/proxy.txt"))
          .toString();
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

      // Code which check for --no-sass flag
      const styleRegexFile = fs
        .readFileSync(
          path.join(__dirname, "templates/react-webpack/styleRegex.txt")
        )
        .toString();

      if (args.includes("--no-sass")) {
        // Replace scss regex with css one
        const cssRegex = styleRegexFile.split("-")[0];
        webpackConfigFile = webpackConfigFile.replace(
          /--STYLE REGEX--/,
          cssRegex
        );

        // Remove sass loader
        const styleLoaders = '["style-loader", "css-loader"]';
        webpackConfigFile = webpackConfigFile.replace(
          /--STYLE LOADERS--/,
          styleLoaders
        );

        // Remove sass dependencies from packages array
        ReactWebpackConfig.packages.dev.splice(
          ReactWebpackConfig.packages.dev.length - 2
        );

        // Read App.jsx file template and change import of scss file to css file
        let appJSX = ReactWebpackConfig.templates[4].file;
        appJSX = appJSX.replace(/style.scss/, "style.css");

        // Save new App.jsx file template
        ReactWebpackConfig.templates[4].file = appJSX;

        // Rename scss file in project to css
        ReactWebpackConfig.templates[5].path = "/src/style/style.css";
      } else {
        const scssRegex = styleRegexFile.split("-")[1];

        webpackConfigFile = webpackConfigFile.replace(
          /--STYLE REGEX--/,
          scssRegex
        );

        const styleLoaders = '["style-loader", "css-loader", "sass-loader"]';
        webpackConfigFile = webpackConfigFile.replace(
          /--STYLE LOADERS--/,
          styleLoaders
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

      ReactWebpack.bye();
    } else {
      console.log(chalk.yellow("Enter a valid name of project"));
    }
    break;
  case "express":
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

      ExpressApp.bye();
    } else {
      console.log(chalk.yellow("Enter a valid name of project"));
    }
    break;
  case "electron":
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

      ElectronApp.bye();
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
