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

// Get arguments from user
const [, , ...args] = process.argv;

// Get project`s type and name from arguments
const projectType = args[0];
const projectName = args[1];

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

switch (projectType) {
  case "react-webpack":
    if (projectName) {
      // Create a new React Webpack project
      const ReactWebpack = new Project({
        userDir,
        name: projectName,
        type: projectType,
        packages: ReactWebpackConfig.packages,
        scripts: ReactWebpackConfig.scripts,
        templates: ReactWebpackConfig.templates,
        folders: ReactWebpackConfig.folders
      });

      ReactWebpack.create();
    } else {
      console.log("Enter a valid name of project");
    }
    break;
  case "express-app":
    if (projectName) {
      // Create a new Express project
      const ExpressApp = new Project({
        userDir,
        name: projectName,
        type: projectType,
        packages: ExpressConfig.packages,
        scripts: ExpressConfig.scripts,
        templates: ExpressConfig.templates,
        folders: ExpressConfig.folders
      });

      ExpressApp.create();
    } else {
      console.log("Enter a valid name of project");
    }
    break;

  default:
    console.log("Enter a project type after new-project command");
    break;
}
